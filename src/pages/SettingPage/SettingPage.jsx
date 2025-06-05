import React, { useState } from "react";
import { UpdateDetail, UpdatePassword } from "../../components";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br rounded-lg from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white">
      <h2 className="text-3xl font-bold border-b border-gray-700 pb-3 mb-6">Settings</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex flex-col gap-3">
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === "details"
                ? "bg-purple-600 text-white font-semibold shadow"
                : "bg-[#2c2c2c] border border-gray-600 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            My Details
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === "password"
                ? "bg-purple-600 text-white font-semibold shadow"
                : "bg-[#2c2c2c] border border-gray-600 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] bg-gray-800" />

        {/* Content */}
        <div className="w-full md:flex-1 bg-[#1e1e1e] border border-gray-700 rounded-lg p-6 shadow-md">
          {activeTab === "details" ? <UpdateDetail /> : <UpdatePassword />}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
