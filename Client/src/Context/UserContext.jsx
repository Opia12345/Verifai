import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
    if (storedUserName) {
      setUsername(storedUserName);
    }
  }, []);

  const updateUserEmail = (email) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const updateUsername = (name) => {
    setUsername(name);
    localStorage.setItem("userName", name);
  };

  return (
    <UserContext.Provider
      value={{ userEmail, updateUserEmail, username, updateUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
