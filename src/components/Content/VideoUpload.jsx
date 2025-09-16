import React, { useState } from "react";
import { publishVideo } from "../../utils/api";
import FileUpload from "./FileUpload";
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/error';
import { grammarCorrect } from "../../utils/api";

const VideoUpload = ({ userDetail }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail || !videoFile || !title || !description) {
      toast.error("All fields are required");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("videoFile", videoFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await publishVideo(formData);
      toast.success("Video uploaded successfully!");
      setIsOpen(false);
      setThumbnail(null);
      setVideoFile(null);
      setTitle("");
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(getErrorMessage(error, "Failed to upload video"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFixGrammar = async () => {
    setLoading(true);
    try {
      const result = await grammarCorrect({ title, description });
      setTitle(result.data.title);
      setDescription(result.data.description);
      toast.success("Grammar fixed!");
    } catch (error) {
      toast.error(getErrorMessage(error, "Grammar correction failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-6 text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back, {userDetail?.fullName}</h1>
          <p className="text-gray-400 text-sm">Track, manage and forecast your videos.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Upload Video
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="relative bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl w-full max-w-md shadow-lg animate-fade-in text-white 
                max-h-[90vh] overflow-y-auto scrollbar-hide">

            <h2 className="text-xl font-semibold mb-4 text-white">Upload Video</h2>
            <form onSubmit={handleSubmit} className="space-y-4 pb-4">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Thumbnail</label>
                <FileUpload onFileSelect={setThumbnail} acceptedFileTypes="image/*" />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Video</label>
                <FileUpload onFileSelect={setVideoFile} acceptedFileTypes="video/*" />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  rows={4}
                  disabled={isUploading}
                />
              </div>

              <div className="flex justify-between items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleFixGrammar}
                  disabled={loading}
                  className={`px-4 py-2 rounded text-white text-sm ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading ? "Correcting..." : "Fix Grammar"}
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setDescription("");
                      setTitle("");
                      setThumbnail(null);
                      setVideoFile(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg transition text-white ${isUploading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default VideoUpload;
