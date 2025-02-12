import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, SignUp, Login, Profile , VideoPage, LikeVideos} from './pages';
import Layout from './Layout.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="video/:videoId" element={<VideoPage />} />
          <Route path="like/Videos" element={<LikeVideos />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
