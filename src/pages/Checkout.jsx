import React, { useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Dhl from "../assets/logos/DHL-Logo-PNG7.png";
import Paystack from "../assets/logos/paystack.512x504.png";
import "../assets/styles/pages/order-summery.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const shippingMethods = [
  {
    id: "pickup",
    name: "In-Store Pickup / Click-and-Collect",
    description: "2-3 Business Days",
    price: 0,
  },
  {
    id: "local",
    name: "Local Shipping (Ghana)",
    description: "1-2 Business Days",
    price: 150,
  },
  {
    id: "international",
    name: "International Shipping",
    description: "5-7 Business Days",
    price: 1499.4,
  },
];

const groupCartItems = (cartItems) => {
  const groupedItems = {};

  cartItems.forEach((item) => {
    const key = `${item.name}-${item.size}`;
    if (!groupedItems[key]) {
      groupedItems[key] = { ...item, sizes: [], quantities: [] };
    }
    groupedItems[key].sizes.push(item.size);
    groupedItems[key].quantities.push(item.quantity);
  });

  return Object.values(groupedItems).map((item) => ({
    ...item,
    size: item.sizes.join(", "),
    quantity: item.quantities.reduce((sum, qty) => sum + qty, 0),
  }));
};

const CheckoutPage = () => {
  const { cartItems, currency, formatPrice, getCartDataForOrder } =
    useContext(CartContext);
  const [formData, setFormData] = useState({
    email: "",
    newsletter: false,
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [selectedShipping, setSelectedShipping] = useState("");
  const [showShippingError, setShowShippingError] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shippingCost = useMemo(() => {
    const method = shippingMethods.find((m) => m.id === selectedShipping);
    return method ? method.price : 0;
  }, [selectedShipping]);

  const total = subtotal + shippingCost;

  const groupedCartItems = useMemo(
    () => groupCartItems(cartItems),
    [cartItems]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedShipping) {
      setShowShippingError(true);
      return;
    }

    try {
      const cartData = getCartDataForOrder();

      const payload = {
        email: formData.email,
        total: total,
        shippingCost,
        shippingMethod: selectedShipping,
        items: cartData.items,
        currency: "GHS",
        originalCurrency: currency,
        orderNote: cartData.orderNote,
      };

      if (selectedShipping !== "pickup") {
        payload.shippingAddress = {
          fullName: `${formData.firstName} ${formData.lastName}`,
          street: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        };
      }

      console.log("Payload being sent:", payload);

      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payments/create`,
        payload
      );

      if (paymentResponse.data.data.authorization_url) {
        localStorage.setItem("pendingOrderId", paymentResponse.data.orderId);
        window.location.href = paymentResponse.data.data.authorization_url;
      } else {
        throw new Error("Authorization URL not provided");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShippingChange = (shippingId) => {
    setSelectedShipping(shippingId);
    setShowShippingError(false);
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="checkout form-section">
                <h2>Contact</h2>
                <div className="checkout form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="newsletter">Email me news and offers</label>
                </div>
              </div>

              <div className="checkout form-section">
                <h2>Delivery</h2>
                <div className="checkout form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="checkout form-group name-fields">
                  <div>
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="checkout form-group">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address or P.O. Box"
                  />
                </div>
                <div className="checkout form-group">
                  <label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout form-group">
                  <label htmlFor="state">State/Region</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout form-group">
                  <label htmlFor="postalCode">Postal code (optional)</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="checkout form-section">
                <h2>Shipping Method</h2>
                {showShippingError && (
                  <div className="text-red-600 mb-4">
                    Please select a shipping method before proceeding
                  </div>
                )}
                <div className="space-y-4">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`checkout shipping-method cursor-pointer p-4 border rounded-lg ${
                        selectedShipping === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleShippingChange(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="checkout method-name font-semibold">
                            {method.name}
                          </span>
                          <p className="checkout method-description text-gray-600">
                            {method.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="checkout method-price font-semibold">
                            {formatPrice(method.price)}
                          </p>
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={selectedShipping === method.id}
                            onChange={() => handleShippingChange(method.id)}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="checkout submit-button"
                disabled={cartItems.length === 0}
              >
                Pay Now
              </button>
            </form>
          </div>

          <div className="checkout order-summary bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty</p>
            ) : (
              <div className="checkout order-items space-y-4">
                {groupedCartItems.map((item) => (
                  <div
                    key={`${item.name}-${item.size}`}
                    className="checkout order-item flex items-center border-b pb-4 mb-4"
                  >
                    <div className="checkout item-image">
                      <img
                        src={
                          Array.isArray(item.imageUrl) &&
                          item.imageUrl.length > 0
                            ? item.imageUrl[0]
                            : `/placeholder.svg?height=80&width=80`
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover mr-4"
                      />
                    </div>
                    <div className="checkout item-details flex-grow">
                      <div className="item-box">
                        <p className="checkout item-name font-bold text-lg">
                          {item.name}
                        </p>
                        <p className="checkout item-price text-lg font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="checkout item-size text-sm text-gray-600">
                        Size: {item.size}
                      </p>
                      <p className="checkout item-quantity text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="checkout order-totals mt-6 space-y-4">
              <div className="checkout total-row flex justify-between">
                <p className="checkout total-label font-semibold">Subtotal</p>
                <p className="checkout total-amount">{formatPrice(subtotal)}</p>
              </div>
              <div className="checkout total-row flex justify-between">
                <p className="checkout total-label font-semibold">Shipping</p>
                <p className="checkout total-amount">
                  {selectedShipping
                    ? formatPrice(shippingCost)
                    : "Select shipping method"}
                </p>
              </div>
              <div className="checkout total-row flex justify-between border-t-2 pt-4 font-bold">
                <p className="checkout total-label">Total</p>
                <p className="checkout total-amount text-xl">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            <div className="checkout logo-container flex justify-between mt-6">
              <img
                src={Paystack}
                alt="Paystack Logo"
                className="checkout payment-logo w-32 h-auto object-contain"
              />
              <img
                src={Dhl}
                alt="DHL Logo"
                className="checkout shipping-logo w-32 h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
