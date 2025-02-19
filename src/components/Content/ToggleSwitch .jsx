import React, { useState } from "react";

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
        className="sr-only peer"
      />
      <div
        className={`w-12 h-6 rounded-full transition duration-300 ${
          isOn ? "bg-purple-500" : "bg-gray-300"
        } peer-checked:bg-purple-500`}
      ></div>
      <div
        className={`absolute left-1 top-1 w-4 h-4 bg-black rounded-full transition-transform ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </label>
  );
};

export default ToggleSwitch

