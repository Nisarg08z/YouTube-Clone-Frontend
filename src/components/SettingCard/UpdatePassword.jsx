import React, { useState } from "react";
import { changePassword } from "../../utils/api";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.oldPassword) errors.oldPassword = "Old password is required.";
    if (!formData.newPassword) errors.newPassword = "New password is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await changePassword(formData);
      toast.success("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      toast.error("Failed to change password.");
      if (error.response?.status === 400) {
        setErrors({ oldPassword: "Invalid old password." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label className="text-sm text-gray-400">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-400">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
};

export default UpdatePassword;
