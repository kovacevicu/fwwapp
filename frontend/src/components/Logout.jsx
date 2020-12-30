import React, { useEffect } from "react";

function Logout(props) {
  useEffect(() => {
    localStorage.clear();
    window.location = "/";
  }, []);
  return null;
}

export default Logout;
