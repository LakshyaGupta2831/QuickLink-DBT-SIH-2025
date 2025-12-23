import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.jsx";
import { backendUrl } from "../App.jsx";

let AuthContextProvider = (props) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  // {
  //   email: "sahil.22311046@viit.ac.in",
  //   state: "Maharashtra",
  //   city: "pune",
  //   isSeeded: "false",
  //   isProfileComplete: "false",
  // }

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateCheckCount = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/auth/updateCount`, {
        method: "GET",
        credentials: "include", // send cookies (token)
        headers: {
          "Content-Type": "application/json",
        },
      });

      return;
    } catch (err) {
      console.error("Failed to update count:", err);

      return null;
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("error");
    }
  };

  let value = {
    logout,
    login,
    IsAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    updateCheckCount,
  };

  useEffect(() => {
    console.log("printing user " + user);
    console.log("printing isAuthenticated " + IsAuthenticated);
  }, [user, IsAuthenticated]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
