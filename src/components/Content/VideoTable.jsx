import React, { useState } from "react";
import { togglePublishVideo, deleteVideo, editVideo } from "../../utils/api";
import ToggleSwitch from "./ToggleSwitch";
import FileUpload from "./FileUpload";

const VideoTable = ({ video }) => {
  const [isPublished, setIsPublished] = useState(video.isPublished);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editedVideo, setEditedVideo] = useState({
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
  });

  const handleTogglePublish = async () => {
    try {
      const updated = await togglePublishVideo(video._id);
      setIsPublished(updated);
    } catch (e) {
      console.error("Toggle error", e);
    }
  };

  const handleEditSubmit = async () => {
    if (!editedVideo.title || !editedVideo.description) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", editedVideo.title);
      formData.append("description", editedVideo.description);
      if (editedVideo.thumbnail instanceof File)
        formData.append("thumbnail", editedVideo.thumbnail);

      await editVideo(video._id, formData);
      setIsEditing(false);
      window.location.reload();
    } catch (e) {
      console.error("Edit error", e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (file) => {
    if (file) setEditedVideo((prev) => ({ ...prev, thumbnail: file }));
  };

  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-[#2a2a2a] transition">
        {/* Status column: Toggle on top, label below */}
        <td className="p-4 text-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <ToggleSwitch isOn={isPublished} onToggle={handleTogglePublish} />
            <span className="text-xs text-white opacity-70">
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </td>

        <td className="pl-7 max-w-xs truncate">{video.title}</td>
        <td className="pl-10 ">{video.likesCount}</td>
        <td className="pl-8">{new Date(video.createdAt).toLocaleDateString()}</td>
        <td className=" space-x-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-lg text-white shadow-xl space-y-4">
            <h2 className="text-lg font-semibold">Edit Video</h2>

            <input
              type="text"
              name="title"
              value={editedVideo.title}
              onChange={(e) =>
                setEditedVideo({ ...editedVideo, title: e.target.value })
              }
              placeholder="Title"
              className="w-full p-2 bg-[#2c2c2c] rounded border border-gray-600 focus:ring-2 focus:ring-purple-600 outline-none"
            />

            <textarea
              name="description"
              value={editedVideo.description}
              onChange={(e) =>
                setEditedVideo({ ...editedVideo, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-2 bg-[#2c2c2c] rounded border border-gray-600 focus:ring-2 focus:ring-purple-600 outline-none"
              rows={4}
            />

            <FileUpload
              onFileSelect={handleFileChange}
              acceptedFileTypes={{ "image/*": [".jpg", ".png", ".webp"] }}
              disabled={isUploading}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditSubmit}
                disabled={isUploading}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                {isUploading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl text-white shadow-xl space-y-4 max-w-sm w-[90%]">
            <h2 className="text-lg font-bold">Delete Video</h2>
            <p className="text-gray-400">
              Are you sure you want to delete this video?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteVideo(video._id);
                  setIsDeleting(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTable;
