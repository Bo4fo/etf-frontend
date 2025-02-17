import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../assets/styles/components/cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    toggleCart,
    totalPrice,
    formatPrice,
    orderNote,
    setOrderNote,
    currency,
    currencySymbols,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate("/order-summary");
  };

  const handleBrowseProducts = () => {
    toggleCart();
    navigate("/products");
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.countInStock) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={toggleCart} />}

      <div className={`cart ${isCartOpen ? "open" : ""}`}>
        <div className="cart-container">
          {/* Fixed Header */}
          <div className="cart-header">
            <div className="cart-header-top">
              <h6>YOUR CART</h6>
            </div>
            <div className="cart-header-currency">
              <button
                className="close-cart-btn"
                onClick={toggleCart}
                aria-label="Close cart"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="cart-content-scroll">
            {cartItems.length === 0 ? (
              <div className="cart-empty-box">
                <h6>Your cart is empty.</h6>
                <div className="browse-product">
                  <span onClick={handleBrowseProducts}>Browse Products</span>
                </div>
              </div>
            ) : (
              <ul className="cart-items">
                {cartItems.map((item, index) => (
                  <li key={item.id || index} className="cart-item">
                    <img
                      src={
                        item.imageUrl?.[0] || "/path-to-placeholder-image.jpg"
                      }
                      alt={item.name || "Item"}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <div className="item-box">
                        <span className="item-name">{item.name}</span>
                        <span>{formatPrice(item.price)}</span>
                      </div>
                      <span>Size: {item.size || "N/A"}</span>
                      <div className="cart-item-quantity">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={item.quantity <= 1}
                          className={item.quantity <= 1 ? "disabled" : ""}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => handleQuantityChange(item, 1)}
                          disabled={item.quantity >= item.countInStock}
                          className={
                            item.quantity >= item.countInStock ? "disabled" : ""
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      {/* showing stock info */}
                      {/* {item.countInStock > 0 && (
                        <span className="stock-info">
                          {item.countInStock - item.quantity} left in stock
                        </span>
                      )} */}
                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Fixed Footer */}
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="order-note">
                <label htmlFor="order-note">Add a note to your order:</label>
                <textarea
                  id="order-note"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  rows={3}
                  className="no-resize"
                />
              </div>

              <div className="total-box">
                <span>SubTotal: </span>
                <span>
                  {currencySymbols[currency]} {Number(totalPrice).toFixed(2)}
                </span>
              </div>

              <span className="cart-tax-shipping">
                Tax included.{" "}
                <Link to="/shipping" className="shipping-link">
                  Shipping
                </Link>{" "}
                calculated at checkout.
              </span>

              <div className="checkout-box">
                <button className="checkout-btn" onClick={handleCheckout}>
                  Check out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
