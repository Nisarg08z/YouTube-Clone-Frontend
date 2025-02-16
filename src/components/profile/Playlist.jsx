import React from 'react'
import { PlayList } from '../../pages';

const Playlist = ({ userId }) => {
  return (
    <>
      <PlayList userid={userId} />
    </>
  );
}

export default Playlist