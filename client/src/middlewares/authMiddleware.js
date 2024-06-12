import React, { createContext, useState, useEffect } from "react";

const authMiddleware = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <authMiddleware.Provider value={{ user, setUser }}>
      {children}
    </authMiddleware.Provider>
  );
};

export default authMiddleware;
