import React from 'react';

function PlayListCard({ playlist }) {
  if (!playlist) return null;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-72 flex flex-col">
      <div className="w-full h-40 relative">
        <img
          src={'https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp'}
          alt="playlist cover"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
          {playlist?.videos?.length || 0} Videos
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold">{playlist.name}</h3>
      </div>
    </div>
  );
}

export default PlayListCard;
