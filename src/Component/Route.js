import { useEffect, useState } from "react";
/* eslint-disable import/no-anonymous-default-export */
export default ({ path, children }) => {
  const [currentLocation, setCurrentLocation] = useState(
    window.location.pathname
  );
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentLocation(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);
  return currentLocation === path ? children : "";
};
