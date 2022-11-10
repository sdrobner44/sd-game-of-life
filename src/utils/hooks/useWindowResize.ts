import { useState, useEffect } from 'react';
// import JetsonBreakpointWidth from "../constants/JetsonBreakpointWidths";

// const { smallTablet, largeTablet, desktop } = JetsonBreakpointWidth;

const windowEvent = 'resize';

function useWindowResize(): {
  vpWidth: number;
  vpHeight: number;
} {
  const [vpWidth, setWidth] = useState<number>(0);
  const [vpHeight, setHeight] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      const { innerWidth: vpWidth, innerHeight: vpHeight } = window;
      setWidth(vpWidth);
      setHeight(vpHeight);      
    }

    handleResize();
    window.addEventListener(windowEvent, handleResize);
    return () => window.removeEventListener(windowEvent, handleResize);
  }, []);

  return {
    vpWidth,
    vpHeight
  };
}

export default useWindowResize;
