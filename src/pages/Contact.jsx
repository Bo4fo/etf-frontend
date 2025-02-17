import React from "react";
import "../assets/styles/pages/contact.css";
import Contact from "../components/common/ContactBanner";

const ShippingPolicy = () => {
  return (
    <div className="contact-policy">
      <Contact />

      <hr style={{ border: "0.2px solid white" }} />

      {/* Contact Section */}
      <div className="contact-section">
        <h5>Phone Number</h5>
        <p>+200000000</p>
      </div>

      {/* Email  Section */}
      <div className="email-section">
        <h5>Email Us</h5>
        <p>support@cunningz.shop</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
