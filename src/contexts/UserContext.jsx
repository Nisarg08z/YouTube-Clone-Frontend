import React, { createContext, useState } from 'react';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
  const [isLogedin, setisLogedin] = useState(false);
  const [ userDetail, setuserDetail ] = useState(null);
  
  return (
    <UserContext.Provider value={{ isLogedin, setisLogedin, userDetail, setuserDetail}}>
      {children}
    </UserContext.Provider>
  );
};
