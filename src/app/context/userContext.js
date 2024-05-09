"use client";
import { createContext, useContext, useState } from "react";

export const context = createContext({});

export const useUser = () => {
  return useContext(context);
};

function UserContext({ children }) {
  const [user, setUser] = useState(null);
  return (
    <context.Provider value={{user, setUser}}>
      {children}
    </context.Provider>
  );
};

export default UserContext;