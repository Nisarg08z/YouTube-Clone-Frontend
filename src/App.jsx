import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, SignUp, Login, Profile, VideoPage, LikeVideos, WatchHistory, PlayList, Subscribers, Content, SettingPage, Search } from './pages';
import { SignalPlayListAllValues } from "./components/PlayList"
import Layout from './Layout.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#2d2d2d',
            color: '#fff',
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="video/:videoId" element={<VideoPage />} />
            <Route path="like/Videos" element={<LikeVideos />} />
            <Route path="WatchHistory" element={<WatchHistory />} />
            <Route path="playlist" element={<PlayList />} />
            <Route path="playlist/:playlistId" element={<SignalPlayListAllValues />} />
            <Route path='Subscribers' element={<Subscribers />} />
            <Route path='Content' element={<Content />} />
            <Route path='Setting' element={<SettingPage />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>

  );
};

export default App;
