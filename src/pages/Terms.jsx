import React from "react";
import "../assets/styles/pages/terms.css";
import Terms from "../components/common/TermsBanner";

const ShippingPolicy = () => {
  return (
    <div className="terms-policy">
      <Terms />
      <h5>Services Overview</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        CUNNINGZ is dedicated to crafting bespoke clothing and providing styling
        services tailored for artists. Our commitment lies in delivering
        exceptional, high-quality fashion pieces that meet the unique
        preferences of our clientele
      </p>
      <h5>Customer Obligations</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        1. Care Guidelines: To preserve the quality and longevity of CUNNINGZ
        apparel, customers are advised against using bleach on any purchased
        items. <br />
        2. Return Policy: Should there be any concerns or issues with received
        products, customers are encouraged to return the items within 24 hours
        of delivery.
      </p>
      <h5>Privacy Practices</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        1. Information Collection: We gather personal details essential for
        order processing and customer support, including but not limited to
        names, addresses, emails, and payment information. <br />
        2.Usage of Data: The collected information is utilized solely for order
        fulfillment, enhancing customer service, and refining our offerings.
        <br />
        3. Data Security: Robust security protocols are in place to safeguard
        your personal data against unauthorized access, disclosure, or misuse.
        <br />
        4. Third-Party Disclosure: CUNNINGZ does not sell, trade, or share
        personal information with external parties, except when necessary to
        complete your order (e.g., sharing details with shipping providers).
      </p>

      <h5>Payment and Refund Terms</h5>
      <hr style={{ border: "0.2px solid white" }} />

      <p>
        1. Payment: Full payment is required at the time of placing an order for
        any product or service.
        <br />
        2. Refunds: Refunds are processed for items returned within the
        stipulated 24-hour window, provided they adhere to our return
        conditions.
      </p>

      <h5> Limitation of Liability</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        CUNNINGZ shall not be held liable for any indirect, incidental, or
        consequential damages arising from the use of our products. <br /> Our
        liability is confined to the amount paid by the customer for the
        purchased items.
        <br />
        For further inquiries or assistance, please reach out to us at
        cunningz12@gmail.com Note: This document is subject to updates.
        Customers are encouraged to review our Terms of Service  periodically.
      </p>
    </div>
  );
};

export default ShippingPolicy;
