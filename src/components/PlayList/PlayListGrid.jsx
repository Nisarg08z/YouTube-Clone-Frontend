import React from 'react'
import PlayListCard from './PlayListCard';

const PlayListGrid = ({playlists}) =>  {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <PlayListCard 
              key={playlist._id} 
              playlist={playlist} 
            />
          ))}
        </div>
      );
}

export default PlayListGrid