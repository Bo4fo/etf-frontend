import React from "react";
import "../assets/styles/pages/return-policy.css";
import Terms from "../components/common/TermsBanner";

const ShippingPolicy = () => {
  return (
    <div className="return-policy">
      <Terms />
      <h5> Introduction</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        At CUNNINGZ, we are committed to ensuring your complete satisfaction
        with our products. If, for any reason, you are not entirely pleased with
        your purchase, our return and refund policy is designed to assist you
        efficiently.
      </p>
      <h5>Eligibility for Returns</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        To qualify for a return, please ensure the following:
        <br />
        1. Purchase Date: The item was purchased within the last 30 days.
        <br />
        2. Condition: The item is unused, in its original condition, and
        includes all original packaging and tags.
      </p>
      <h5> Non-Returnable Items</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        Please note that the following items are not eligible for return:
        <br />
        1. Contact Us: Email our customer service team at cunningz12@gmail.com
        (mailto:cunningz12@gmail.com) with your order number and the reason for
        the return.
        <br />
        2. Authorization: Upon approval, you will receive a Return Authorization
        Number (RAN) along with detailed return instructions.
        <br />
        3. Shipping: Securely package the item, including the RAN, and send it
        to the address provided by our customer service team. We recommend using
        a trackable shipping service or purchasing shipping insurance to ensure
        the item’s safe return.
      </p>

      <h5>Refund Process</h5>
      <hr style={{ border: "0.2px solid white" }} />

      <p>
        Once we receive and inspect your returned item, we will notify you of
        the refund approval status:
        <br />
        1. Approved Refunds: If approved, a credit will be applied to your
        original payment method within 10 to 12 business days.
        <br />
        2. Partial Refunds: In certain situations, partial refunds may be
        granted (e.g., if the item is not in its original condition, is damaged,
        or is missing parts not due to our error).
      </p>

      <h5> Delayed or Missing Refunds</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        If you have not received your refund within the expected timeframe,
        please:
        <br />
        • Check your bank account or credit card statement. <br /> • Contact
        your credit card company, as processing times can vary. <br /> • Reach
        out to your bank, as there may be processing delays.
        <br />
        If you have completed these steps and still have not received your
        refund, please contact us at cunningz12@gmail.com
      </p>
      <h5> Exchanges</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        We replace items only if they are defective or damaged. If you need to
        exchange an item for the same product, please email us at
        cunningz12@gmail.com with your order number and details of the issue.
      </p>
      <h5> Shipping Costs</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        Returns: Customers are responsible for return shipping costs. Shipping
        fees are non-refundable.
        <br /> • Exchanges: If exchanging a defective or damaged item, we will
        cover the shipping costs for sending the replacement to you.
      </p>
      <h5> Contact Information</h5>
      <hr style={{ border: "0.2px solid white" }} />
      <p>
        For any questions or further assistance regarding our Return and Refund
        Policy, please contact us: <br />• Email: cunningz12@gmail.com <br />{" "}
        •Phone: N/A
        <br /> • Address : N/A
      </p>
      <h6>
        {" "}
        Thank you for choosing CUNNINGZ. Your satisfaction is our top priority.
      </h6>
      {/* <hr style={{ border: "0.2px solid white" }} /> */}
    </div>
  );
};

export default ShippingPolicy;
