import React from "react";
import VideoTable from "./VideoTable";

const VideoTableGrid = ({ videos }) => {
  return (
    <div className="container w-full p-4 overflow-x-auto">
      <table className="w-full bg-[#1e1e1e] text-white rounded-lg overflow-hidden shadow-md table-fixed border border-gray-700">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-6 text-center w-32 align-middle">Status</th>
            <th className="py-3 px-6 text-left w-1/3">Title</th>
            <th className="py-3 px-6 text-left w-24">Likes</th>
            <th className="py-3 px-6 text-left w-40">Uploaded</th>
            <th className="py-3 px-6 text-left w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <VideoTable key={video._id} video={video} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTableGrid;
