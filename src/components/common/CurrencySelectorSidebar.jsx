import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ReactCountryFlag from "react-country-flag";
import "../../assets/styles/pages/currencyselector.css";

const currencyToCountry = {
  GHS: "GH",
  USD: "US",
  EUR: "EU",
  GBP: "GB",
  NGN: "NG",
};

const CurrencySelectorSidebar = ({ setShowCurrencyModal }) => {
  const { currency } = useContext(CartContext);

  return (
    <div className="currency-box" onClick={() => setShowCurrencyModal(true)}>
      <ReactCountryFlag
        countryCode={currencyToCountry[currency]}
        svg
        style={{ width: "24px", height: "24px" }}
      />
      <span className="text-currency">{currency}</span>
    </div>
  );
};

export default CurrencySelectorSidebar;
