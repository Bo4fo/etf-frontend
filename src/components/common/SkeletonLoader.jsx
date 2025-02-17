import React from "react";
import "./ProductSkeleton.css";

const SkeletonLoader = () => {
  return (
    <div className="productSkeleton">
      <div className="skeleton-product-card">
        <div className="skeleton-image-wrapper">
          <div className="skeleton-image pulse"></div>
        </div>
        <div className="skeleton-info">
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-price pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
