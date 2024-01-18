import React, { useEffect, useState } from 'react';

export default function useResize() {
    const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Attach the event listener to the window object
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render the component
  return width
}
