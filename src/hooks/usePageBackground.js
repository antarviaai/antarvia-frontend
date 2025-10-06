// src/hooks/usePageBackground.js
import { useEffect } from 'react';

const usePageBackground = (imageUrl) => {
  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.classList.add('auth-page-wrapper'); // Reusing our handy CSS class
    
    // Cleanup function to remove the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = null;
      document.body.classList.remove('auth-page-wrapper');
    };
  }, [imageUrl]); // Re-run if the image URL ever changes
};

export default usePageBackground;