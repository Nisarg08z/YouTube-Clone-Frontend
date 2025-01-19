import React, { createContext, useState } from 'react';

// Create UserContext
export const UserContext = createContext();

// UserContext Provider component
export const UserProvider = ({ children }) => {
  const [isLogedin, setisLogedin] = useState(false);

  return (
    <UserContext.Provider value={{ isLogedin, setisLogedin}}>
      {children}
    </UserContext.Provider>
  );
};
