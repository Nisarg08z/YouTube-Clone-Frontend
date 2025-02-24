import React from 'react'

const UpdatePassword = () => {
  return (
    <div className="mt-6">
    <label className="block">New Password</label>
    <input type="password" className="w-full p-2 bg-gray-800 rounded" />
    <label className="block mt-4">Confirm Password</label>
    <input type="password" className="w-full p-2 bg-gray-800 rounded" />
    <button className="mt-4 px-4 py-2 bg-purple-600 rounded">Change Password</button>
  </div>
  )
}

export default UpdatePassword