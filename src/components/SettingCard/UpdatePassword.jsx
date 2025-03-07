import React, { useState } from 'react';
import { changePassword } from '../../utils/api';

const UpdatePassword = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.oldPassword.trim()) errors.oldPassword = 'Old password is required.';
    if (!formData.newPassword.trim()) errors.newPassword = 'New password is required.';

    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage({});

    try {
      await changePassword(formData);

      alert('Your password has been changed successfully.');
      setFormData({ oldPassword: '', newPassword: '' });
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage({ oldPassword: 'Invalid old password.' });
      } else {
        setErrorMessage({ general: 'An error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div>
        <label className="block">Old Password</label>
        <input
          type="password"
          className="w-full p-2 bg-gray-800 rounded"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
        />
        {errorMessage.oldPassword && <p className="text-red-500 text-sm mt-2">{errorMessage.oldPassword}</p>}
      </div>
      <div>
        <label className="block mt-4">New Password</label>
        <input
          type="password"
          className="w-full p-2 bg-gray-800 rounded"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
        />
        {errorMessage.newPassword && <p className="text-red-500 text-sm mt-2">{errorMessage.newPassword}</p>}
      </div>
      {errorMessage.general && <p className="text-red-500 text-sm mt-2">{errorMessage.general}</p>}
      <button
        onClick={handleChangePassword}
        className="mt-4 px-4 py-2 bg-purple-600 rounded"
        disabled={loading}
      >
        {loading ? 'Changing...' : 'Change Password'}
      </button>
    </div>
  );
};

export default UpdatePassword;
