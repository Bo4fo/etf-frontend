import React, { useState, useEffect } from "react";
import "../../assets/styles/components/LoadingSpinner.css";

const ImageLoader = ({ children, loadingImage }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="image-loader-overlay">
        <div className="image-loader-container">
          <div className="image-loader-animation">
            {loadingImage ? (
              <img
                src={loadingImage}
                alt="Loading"
                className="image-loader-image"
              />
            ) : (
              <div className="image-loader-fallback">Loading...</div>
            )}
            <div className="image-loader-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ImageLoader;
