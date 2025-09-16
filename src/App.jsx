import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, SignUp, Login, Profile, VideoPage, LikeVideos, WatchHistory, PlayList, Subscribers, Content, SettingPage, Search, NotFound } from './pages';
import { SignalPlayListAllValues } from "./components/PlayList"
import Layout from './Layout.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
            <Route path="like/Videos" element={<ProtectedRoute><LikeVideos /></ProtectedRoute>} />
            <Route path="WatchHistory" element={<ProtectedRoute><WatchHistory /></ProtectedRoute>} />
            <Route path="playlist" element={<ProtectedRoute><PlayList /></ProtectedRoute>} />
            <Route path="playlist/:playlistId" element={<ProtectedRoute><SignalPlayListAllValues /></ProtectedRoute>} />
            <Route path='Subscribers' element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
            <Route path='Content' element={<ProtectedRoute><Content /></ProtectedRoute>} />
            <Route path='Setting' element={<ProtectedRoute><SettingPage /></ProtectedRoute>} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>

  );
};

export default App;
