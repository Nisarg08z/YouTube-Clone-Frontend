import React, { useState, useContext, useEffect } from "react";
import { updateAvatar, updateCoverImage, updateAccountDetails } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/error";

const UpdateDetail = () => {
  const userContext = useContext(UserContext);
  const { userDetail, setuserDetail } = userContext || {};

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail) {
      setFullName(userDetail.fullName || "");
      setUsername(userDetail.username || "");
    }
  }, [userDetail]);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setuserDetail((prev) => ({ ...prev, [type]: previewUrl }));

    const formData = new FormData();
    formData.append(type, file);

    try {
      type === "avatar" ? await updateAvatar(formData) : await updateCoverImage(formData);
      toast.success(`${type === "avatar" ? "Avatar" : "Cover image"} updated!`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Image upload failed."));
    }
  };

  const handleAccountUpdate = async () => {
    setLoading(true);
    try {
      await updateAccountDetails({ fullName, username });
      setuserDetail((prev) => ({ ...prev, fullName, username }));
      toast.success("Account updated successfully!");
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("Username already exists.");
      } else {
        toast.error(getErrorMessage(error, "Failed to update account."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn ">
      <div className="relative w-full h-48 rounded-lg overflow-hidden ">
        <img
          src={userDetail?.coverImage || "/default-cover.jpg"}
          alt="Cover"
          className="object-cover w-full h-full "
        />
        <label className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition cursor-pointer">
          <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, "coverImage")} />
          <span className="text-white">Change Cover Image</span>
        </label>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={userDetail?.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-800"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition cursor-pointer rounded-full">
            <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, "avatar")} />
            <span className="text-xs text-white">Change</span>
          </label>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{userDetail?.fullName || "Unknown User"}</h3>
          <p className="text-sm text-gray-400">@{userDetail?.username}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      <button
        onClick={handleAccountUpdate}
        className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default UpdateDetail;
