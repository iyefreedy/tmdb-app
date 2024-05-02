import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setState({
      width: width,
      height: height,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        width: width,
        height: height,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size: state };
};
