import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPrompt = ({
  onClose,
  title = "Login Required",
  message = "Please log in to continue using this feature.",
  showLogin = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="bg-[#1e1e1e] text-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">{title}</h2>
        <p className="text-sm sm:text-base text-gray-300 text-center mb-6">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm sm:text-base transition"
          >
            Close
          </button>
          {showLogin && (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm sm:text-base transition"
            >
              Log In
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPrompt;
