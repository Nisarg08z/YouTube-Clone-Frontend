import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { VideoProvider } from './contexts/VideoContext';
import { UserProvider } from './contexts/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> 
      <VideoProvider>
        <App />
      </VideoProvider>
    </UserProvider>
  </React.StrictMode>
);
