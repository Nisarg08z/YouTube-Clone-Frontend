import React, { useState } from "react";
import { togglePublishVideo, deleteVideo, editVideo } from "../../utils/api";
import ToggleSwitch from "./ToggleSwitch ";
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
      const updatedStatus = await togglePublishVideo(video._id); 
      setIsPublished(updatedStatus);
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };
  

  const handleEditChange = (e) => {
    setEditedVideo({ ...editedVideo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setEditedVideo({ ...editedVideo, thumbnail: file });
  };

  const handleEditSubmit = async () => {
    if (!editedVideo.title || !editedVideo.description) {
      alert("Title and description are required.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", editedVideo.title);
      formData.append("description", editedVideo.description);

      // Only append thumbnail if it's selected
      if (editedVideo.thumbnail) {
        formData.append("thumbnail", editedVideo.thumbnail);
      }

      await editVideo(video._id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setIsUploading(false);
    }
  };


  const handleDeleteClick = () => {
    setIsDeleting(true); // Show the delete confirmation modal
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteVideo(video._id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setIsDeleting(false); // Close the confirmation modal
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false); // Close the confirmation modal without deleting
  };

  return (
    <>
      <tr className="border-b border-gray-600 hover:bg-gray-700">
        <td className="py-3 px-6">
          <ToggleSwitch isOn={isPublished} onToggle={handleTogglePublish} />
        </td>

        <td className="py-3 px-6">
          <span className="ml-2">{isPublished ? "Published" : "Not Published"}</span>
        </td>

        <td className="py-3 px-6 break-words w-1/3">{video.description}</td>

        <td className="py-3 px-6">{video.likesCount}</td>

        <td className="py-3 px-6">{new Date(video.createdAt).toLocaleDateString()}</td>

        <td className="py-3 px-6 flex space-x-2 items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Render the edit modal outside of <tbody> */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
            <h3 className="text-lg font-semibold mb-4">Edit Video</h3>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editedVideo.title}
              onChange={handleEditChange}
              className="bg-gray-700 text-white px-2 py-1 rounded w-full mb-3"
              disabled={isUploading}
            />

            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={editedVideo.description}
              onChange={handleEditChange}
              className="bg-gray-700 text-white px-2 py-1 rounded w-full mb-3"
              disabled={isUploading}
            />

            <label className="block mb-2">Thumbnail</label>
            <FileUpload
              onFileSelect={handleFileChange}
              acceptedFileTypes="image/*"
              disabled={isUploading}
            />

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleEditSubmit}
                className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none ${isUploading ? "cursor-not-allowed bg-gray-500" : ""}`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
            <h3 className="text-lg font-semibold mb-4">Delete Video</h3>
            <p>Are you sure you want to delete this video? Once it's deleted, you won't be able to recover it.</p>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoTable;
