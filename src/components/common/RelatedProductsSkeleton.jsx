// src/components/RelatedProductsSkeleton.js
import React from "react";
import "./skeletonLoader.css";

const RelatedProductsSkeleton = () => {
  return (
    <div className="relatedskeleton">
      <div className="related-products-skeleton-container">
        <div className="section-title-skeleton pulse"></div>
        <div className="related-products-grid-skeleton">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="related-product-skeleton">
              <div className="related-image-skeleton pulse"></div>
              <div className="related-info-skeleton">
                <div className="related-title-skeleton pulse"></div>
                <div className="related-price-skeleton pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsSkeleton;
