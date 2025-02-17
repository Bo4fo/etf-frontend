import React, { useState } from "react";
import "../assets/styles/pages/newsletter.css";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="form-container">
      <h2>Subscribe to Our Newsletter</h2>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Subscribe</button>
      </form> */}
    </div>
  );
};

export default NewsletterForm;
