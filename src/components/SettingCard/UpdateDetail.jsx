import React, { useState, useContext, useEffect } from "react";
import { updateAvatar, updateCoverImage, updateAccountDetails } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

const UpdateDetail = () => {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.setuserDetail) {
    console.error("Error: setUserDetail is missing from UserContext!");
  }

  const { userDetail, setuserDetail } = userContext || {};

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    const newImageUrl = URL.createObjectURL(file);

    if (setuserDetail) {
      setuserDetail((prev) => ({
        ...prev,
        [type]: newImageUrl,
      }));
    } else {
      console.error("setuserDetail is not available!");
    }

    const formData = new FormData();
    formData.append(type, file);

    try {
      if (type === "avatar") {
        await updateAvatar(formData);
      } else {
        await updateCoverImage(formData);
      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleAccountUpdate = async () => {
    setLoading(true);
    setErrorMessage(""); 

    try {
      const data = { fullName, username };
      await updateAccountDetails(data);


      setuserDetail((prev) => ({
        ...prev,
        fullName,
        username,
      }));

    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage("Username already exists. Please choose another.");
      } else {
        console.error("Error updating account:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto">
      {/* Cover Image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden">
        <img
          src={userDetail?.coverImage || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition">
          <span className="text-sm">Change Cover Image</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "coverImage")}
          />
        </label>
      </div>

      {/* Avatar and Details */}
      <div className="flex items-center mt-6">
        <div className="relative">
          <img
            src={userDetail?.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-800 object-cover"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 cursor-pointer transition rounded-full">
            <span className="text-xs">Change</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "avatar")}
            />
          </label>
        </div>

        <div className="ml-6">
          <h1 className="text-xl font-semibold">{userDetail?.fullName || "Unknown User"}</h1>
          <p className="text-gray-400">@{userDetail?.username}</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mt-6">
        <div className="grid gap-4">
          <div>
            <label className="block text-gray-400 text-sm">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded focus:ring focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-400 text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded focus:ring focus:ring-purple-500 outline-none"
          />
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>

        <button
          onClick={handleAccountUpdate}
          className="mt-6 w-full py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default UpdateDetail;
