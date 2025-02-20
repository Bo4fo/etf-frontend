import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../../assets/styles/components/currencymodal.css";

const CurrencyModal = ({ onClose, onSelectCurrency }) => {
  const { isLoading } = useContext(CartContext);
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    return storedCurrency || "GHS";
  });

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleConfirm = () => {
    if (selectedCurrency) {
      localStorage.setItem("selectedCurrency", selectedCurrency);
      onSelectCurrency(selectedCurrency);
      localStorage.setItem("hasSelectedCurrency", "true");
      onClose();
    }
  };

  return (
    <div className="currency-modal-overlay">
      <div className="currency-modal">
        <h2>Welcome to Cunningz</h2>
        <p>Please select your currency to continue to our online store.</p>
        <select
          value={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="currency-select"
        >
          <option value="GHS">Ghana Cedis (GHS)</option>
          <option value="USD">US Dollars (USD)</option>
          <option value="EUR">Euros (EUR)</option>
          <option value="GBP">British Pounds (GBP)</option>
          <option value="NGN">Nigerian Naira (NGN)</option>{" "}
        </select>
        <button
          onClick={handleConfirm}
          className="confirm-button"
          disabled={isLoading}
        >
          {isLoading ? "Loading rates..." : "CONFIRM CURRENCY"}
        </button>
      </div>
    </div>
  );
};

export default CurrencyModal;
