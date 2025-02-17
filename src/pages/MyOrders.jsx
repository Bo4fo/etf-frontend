import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        setError("An error occurred while fetching orders.");
      }
    };

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile({
            name: data.name || "John Doe",
            email: data.email || "johndoe@example.com",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchOrders();
    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderOrdersTable = () => (
    <div className="orders-table-container">
      {error && <div className="error-message">{error}</div>}
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id || order.orderId}>
                <td>{order.orderId || order._id}</td>
                <td>
                  {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td>{order.status || "Pending"}</td>
                <td>${(order.total || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="wishlist-container">
      <h3>My Wishlist</h3>
      <div className="wishlist-items">
        <p>0 items currently in your wishlist.</p>
        {/* You can expand this later to show actual wishlist items */}
        <div className="wishlist-empty-state">
          <p>Looks like your wishlist is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="start-shopping-btn"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-container">
      <h3>My Profile</h3>
      <div className="profile-details">
        <div className="profile-field">
          <strong>Name:</strong>
          <p>{userProfile.name}</p>
        </div>
        <div className="profile-field">
          <strong>Email:</strong>
          <p>{userProfile.email}</p>
        </div>
        {/* <div className="profile-actions">
          <button
            className="edit-profile-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className="orders-page-container">
      <div className="toolbar">
        <h2>My Account</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="account-tabs">
        <button
          className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          My Orders
        </button>
        <button
          className={`tab-button ${activeTab === "wishlist" ? "active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist
        </button>
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "orders" && renderOrdersTable()}
        {activeTab === "wishlist" && renderWishlist()}
        {activeTab === "profile" && renderProfile()}
      </div>
    </div>
  );
};

export default OrdersPage;
