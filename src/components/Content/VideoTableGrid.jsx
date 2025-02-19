import React from "react";
import VideoTable from "./VideoTable";

const VideoTableGrid = ({ videos }) => {
  return (
    <div className="container w-full p-4 overflow-x-auto">
      <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-md table-fixed">
        <thead>
          {/* First header row with a spanning "Status" column */}
          <tr className="border-b border-gray-600">
            <th colSpan="2" className="py-3 px-6 text-center w-32">Status</th>
            <th className="py-3 px-6 text-left w-1/3">Description</th>
            <th className="py-3 px-6 text-left w-24">Likes</th>
            <th className="py-3 px-6 text-left w-40">Date Uploaded</th>
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

