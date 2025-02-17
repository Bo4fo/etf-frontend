import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageLoader from "./components/common/LoadingSpinner";
import NavbarSwitcher from "./components/common/NavbarSwitcher";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/common/Footer";
import CartProvider from "./context/CartContext";
import { CartContext } from "./context/CartContext";
import "./assets/styles/main.css";
import OrderSummary from "./pages/Checkout";
import Contact from "./pages/Contact";
import ReturnPolicy from "./pages/Rfp";
import Shipping from "./pages/Shipping";
import Terms from "./pages/Terms";
import AboutUs from "./pages/AboutUs";
import AboutIron from "./pages/AboutIron";
import Orders from "./pages/MyOrders";
import ResetPassword from "./pages/ResetPassword";
import LoginPage from "./pages/LoginPage";
import CurrencyModal from "./components/common/CurrencyModal";
import LoaderImage from "./assets/images/mark black.png";
import PaymentSuccess from "./pages/PaymentSuccess";
import CollectionsPage from "./pages/CollectionsPage";
import NewArrivals from "./pages/NewArrivals";

function AppContent() {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const { setCurrency } = useContext(CartContext);

  useEffect(() => {
    const hasSelectedCurrency = localStorage.getItem("hasSelectedCurrency");
    const storedCurrency = localStorage.getItem("selectedCurrency");

    if (!hasSelectedCurrency) {
      setShowCurrencyModal(true);
    } else if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, [setCurrency]);

  const handleSelectCurrency = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    localStorage.setItem("selectedCurrency", selectedCurrency);
    localStorage.setItem("hasSelectedCurrency", "true");
    setShowCurrencyModal(false);
  };

  return (
    <Router>
      <ImageLoader loadingImage={LoaderImage}>
        <div className="app">
          <NavbarSwitcher />
          <Cart />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />{" "}
              <Route path="/new-arrivals:id" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/about-iron" element={<AboutIron />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route
                path="/collections/:catalogId"
                element={<CollectionsPage />}
              />
              <Route
                path="/collections/:catalogId/products/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </main>
          <Footer />
          {showCurrencyModal && (
            <CurrencyModal
              onClose={() => setShowCurrencyModal(false)}
              onSelectCurrency={handleSelectCurrency}
            />
          )}
        </div>
      </ImageLoader>
    </Router>
  );
}

// Main App component
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
