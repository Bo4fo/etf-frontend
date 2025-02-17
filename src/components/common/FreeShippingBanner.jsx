import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./FreeShippingBanner.css";

const FreeShippingBanner = () => {
  const { formatPrice } = useContext(CartContext);

  const freeShippingThreshold = formatPrice(500);

  return (
    <div className="free-shipping-banner-container">
      <div className="free-shipping-banner">
        🎉 Free Shipping on orders over {freeShippingThreshold}! 🎉
      </div>
      <div className="free-shipping-banner">
        🎉 Free Shipping on orders over {freeShippingThreshold}! 🎉
      </div>
      <div className="free-shipping-banner">
        🎉 Free Shipping on orders over {freeShippingThreshold}! 🎉
      </div>
      <div className="free-shipping-banner">
        🎉 Free Shipping on orders over {freeShippingThreshold}! 🎉
      </div>
      <div className="free-shipping-banner">
        🎉 Free Shipping on orders over {freeShippingThreshold}! 🎉
      </div>
    </div>
  );
};

export default FreeShippingBanner;
