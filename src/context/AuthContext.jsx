import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("youtube_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [credential, setCredential] = useState(() => {
    return localStorage.getItem("youtube_credential") || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("youtube_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("youtube_user");
    }
  }, [user]);

  useEffect(() => {
    if (credential) {
      localStorage.setItem("youtube_credential", credential);
    } else {
      localStorage.removeItem("youtube_credential");
    }
  }, [credential]);

  const login = (userData, userCredential) => {
    setUser(userData);
    setCredential(userCredential);
  };

  const logout = () => {
    setUser(null);
    setCredential(null);
    localStorage.removeItem("youtube_user");
    localStorage.removeItem("youtube_credential");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        credential,
        accessToken: credential,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
