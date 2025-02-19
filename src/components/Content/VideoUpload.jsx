import React, { useState } from "react";
import { publishVideo } from "../../utils/api";
import FileUpload from "./FileUpload";

const VideoUpload = ({ userDetail }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!thumbnail || !videoFile || !title || !description) {
            alert("All fields are required");
            return;
        }

        setIsUploading(true); // Show loading state

        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("videoFile", videoFile);
        formData.append("title", title);
        formData.append("description", description);

        try {
            await publishVideo(formData);
            alert("Video uploaded successfully!");
            setIsOpen(false);
            setThumbnail(null);
            setVideoFile(null);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload video");
        } finally {
            setIsUploading(false); // Hide loading state
        }
    };

    return (
        <div className="pb-4 bg-black text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome back, {userDetail?.fullName}</h1>
                    <p className="text-gray-400">Track, manage and forecast your customers and orders.</p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                >
                    + Upload Video
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block">Thumbnail</label>
                            <FileUpload onFileSelect={setThumbnail} acceptedFileTypes="image/*" />
                            <label className="block">Video</label>
                            <FileUpload onFileSelect={setVideoFile} acceptedFileTypes="video/*" />

                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 bg-gray-700 rounded"
                                disabled={isUploading}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 bg-gray-700 rounded"
                                disabled={isUploading}
                            ></textarea>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    disabled={isUploading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 rounded-lg transition ${isUploading
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-purple-500 hover:bg-purple-600"
                                        } text-white`}
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
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
