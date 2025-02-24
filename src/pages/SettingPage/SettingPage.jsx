import React, { useState } from "react";
import { UpdateDetail, UpdatePassword } from "../../components";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="p-6 text-white">
      {/* Heading with underline */}
      <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
        Settings
      </h2>

      {/* Main Layout */}
      <div className="flex mt-6">
        {/* Sidebar Navigation */}
        <div className="w-1/5 flex flex-col space-y-2">
          <button
            className={`px-4 py-2 text-left rounded-md ${
              activeTab === "details"
                ? "bg-white text-black font-semibold"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("details")}
          >
            My Details
          </button>
          <button
            className={`px-4 py-2 text-left rounded-md ${
              activeTab === "password"
                ? "bg-white text-black font-semibold"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>


        <div className="w-[2px] bg-gray-700 mx-6"></div>


        <div className="w-3/5 p-4 bg-gray-900 rounded-md">
          {activeTab === "details" ? <UpdateDetail /> : <UpdatePassword />}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
