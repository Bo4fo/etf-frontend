import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import "../assets/styles/pages/success.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      localStorage.removeItem("cart");

      localStorage.removeItem("orderNote");

      console.log("Local storage and order note cleared.");

      localStorage.setItem("hasRefreshed", "true");

      window.location.reload();
    }

    return () => {
      localStorage.removeItem("hasRefreshed");
    };
  }, []);

  const handleLoginRedirect = () => navigate("/login");

  const renderSnowflakes = () =>
    Array.from({ length: 50 }, (_, i) => {
      const randomX = Math.random();
      const randomDuration = Math.random();
      const randomDelay = Math.random();

      return (
        <div
          key={i}
          className="snowflake"
          style={{
            "--random-x": randomX,
            "--random-duration": randomDuration,
            "--random-delay": randomDelay,
          }}
        >
          ❄
        </div>
      );
    });

  return (
    <div className="success-page">
      <div className="snow-animation">{renderSnowflakes()}</div>
      <div className="success-container">
        <div className="success-card">
          <div className="text-center">
            <div className="success-icon-wrapper">
              <div className="success-icon">
                <HiCheckCircle size={48} className="text-white" />
              </div>
            </div>
            <h2 className="success-title">Thank You for Your Order!</h2>
            <p className="success-description">
              Please use the link below to log in and track your order status.
            </p>
            <button onClick={handleLoginRedirect} className="success-button">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
