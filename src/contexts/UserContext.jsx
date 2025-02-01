import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser} from '../utils/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogedin, setisLogedin] = useState(false);
  const [userDetail, setuserDetail] = useState(null);

  // Check if the user is logged in
  const checkLogin = async () => {
    try {
      const user = await fetchCurrentUser();
      setuserDetail(user.data);
      setisLogedin(true);
      //console.log(user.data)
    } catch (error) {
      try {
        const { accessToken } = await refreshAccessToken();
        localStorage.setItem('token', accessToken);
        await checkLogin();
      } catch (refreshError) {
        setisLogedin(false);
        setuserDetail(null);
      }
    }
  };

  
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ isLogedin, setisLogedin, userDetail, setuserDetail }}
    >
      {children}
    </UserContext.Provider>
  );
};
