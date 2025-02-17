import React from "react";
import "./ProductDetailsSkeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="detailskeleton">
      <div className="product-details-skeleton-container">
        <div className="product-images-skeleton">
          <div className="main-image-skeleton pulse"></div>
          <div className="thumbnail-container">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="thumbnail-skeleton pulse"></div>
            ))}
          </div>
        </div>

        <div className="product-info-skeleton">
          <div className="title-skeleton pulse"></div>
          <div className="price-skeleton pulse"></div>

          <div className="category-skeleton pulse"></div>

          <div className="size-section-skeleton">
            <div className="size-label-skeleton pulse"></div>
            <div className="size-options-skeleton">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="size-option-skeleton pulse"></div>
              ))}
            </div>
          </div>

          <div className="quantity-skeleton">
            <div className="quantity-label-skeleton pulse"></div>
            <div className="quantity-control-skeleton pulse"></div>
          </div>

          <div className="button-skeleton pulse"></div>

          <div className="description-skeleton">
            <div className="description-header-skeleton pulse"></div>
            <div className="description-content-skeleton">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="description-line-skeleton pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
