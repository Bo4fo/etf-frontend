import React, { useState, useRef, useEffect, useContext } from "react";
import "../../assets/styles/components/homenavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGripLines } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import {
  faTimes,
  faSearch,
  faShoppingCart,
  faTimesCircle,
  faPlus,
  faMinus,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import debounce from "lodash.debounce";
import axios from "axios";
import CurrencyModal from "../common/CurrencyModal";
import CurrencySelectorSidebar from "../common/CurrencySelectorSidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] =
    useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const { toggleCart, cartItems, setCurrency } = useContext(CartContext);

  const token = localStorage.getItem("token");
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/catalogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCatalogs(response.data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
  }, []);

  const handleUserClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/orders");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      isOpen &&
      !sidebarRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeSearch = () => {
    setIsSearchVisible(false);
    setIsDropdownVisible(false);
    setSearchQuery("");
  };

  const toggleShopDropdown = () => {
    if (isCollectionsDropdownOpen) {
      setIsCollectionsDropdownOpen(false);
    }
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const toggleCollectionsDropdown = () => {
    if (isShopDropdownOpen) {
      setIsShopDropdownOpen(false);
    }
    setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      debouncedFetchSearchResults(query);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { query },
      });
      setSearchResults(response.data);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setSearchResults([]);
    }
  };

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

  const handleResultClick = (id) => {
    navigate(`/products/${id}`);
    closeSearch();
  };

  useEffect(() => {
    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, []);

  return (
    <div className="homenav-wrapper">
      <nav className="navbar">
        <div className="sidelines">
          <FaGripLines onClick={toggleSidebar} />
        </div>

        <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/CUNNINGZ_white_text.png"
              alt="navlogo"
            />
          </Link>
        </div>

        <div className="navbar-icons">
          <div className="user-icon" onClick={handleUserClick}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="search-icon">
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={toggleSearch}
            />
          </div>

          {isSearchVisible && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="close-search-icon"
                onClick={closeSearch}
              />
              {isDropdownVisible && (
                <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                    <div className="search-results-grid">
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="search-dropdown-item"
                          onClick={() => handleResultClick(product._id)}
                        >
                          <img
                            src={product.imageUrl[0]}
                            alt={product.name}
                            className="search-dropdown-image"
                          />
                          <span className="search-dropdown-text">
                            {product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="search-no-results">
                      Consider verifying your spelling or trying alternative
                      keywords.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="cart-icon" onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && <span className="cart-dot"></span>}
          </div>
        </div>

        <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
          <button className="close-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Currency Selector */}
          <CurrencySelectorSidebar
            setShowCurrencyModal={setShowCurrencyModal}
          />
          {showCurrencyModal && (
            <CurrencyModal
              onClose={() => setShowCurrencyModal(false)}
              onSelectCurrency={(selectedCurrency) => {
                setCurrency(selectedCurrency);
                setShowCurrencyModal(false);
              }}
            />
          )}

          <div className="navbar-links">
            {/* Shop Dropdown */}
            <span className="nav-link navstyle" onClick={toggleShopDropdown}>
              <h1>SHOP</h1>
              <FontAwesomeIcon
                icon={isShopDropdownOpen ? faMinus : faPlus}
                className="plus-icon"
              />
            </span>
            {isShopDropdownOpen && (
              <div className="dropdown">
                <Link
                  to="/products"
                  className="dropdown-link"
                  onClick={toggleSidebar}
                >
                  VIEW ALL
                </Link>
                <Link
                  to="/new-arrivals"
                  className="dropdown-link"
                  onClick={toggleSidebar}
                >
                  NEW ARRIVALS
                </Link>
              </div>
            )}

            {/* Collections Dropdown */}
            <span
              className="nav-link navstyle"
              onClick={toggleCollectionsDropdown}
            >
              <h1>COLLECTIONS</h1>
              <FontAwesomeIcon
                icon={isCollectionsDropdownOpen ? faMinus : faPlus}
                className="plus-icon"
              />
            </span>
            {isCollectionsDropdownOpen && (
              <div className="dropdown">
                {catalogs.map((catalog) => (
                  <div
                    key={catalog._id}
                    className="dropdown-link"
                    onClick={() => {
                      navigate(`/collections/${catalog._id}`);
                      toggleSidebar();
                    }}
                  >
                    {catalog.name}
                  </div>
                ))}
              </div>
            )}

            <div className="links-container">
              <div className="links-box">
                <Link
                  to="/contact"
                  className="nav-link"
                  onClick={toggleSidebar}
                >
                  CONTACT
                </Link>
                <Link
                  to="/return-policy"
                  className="nav-link"
                  onClick={toggleSidebar}
                >
                  RETURN & REFUND POLICY
                </Link>
                <Link to="/terms" className="nav-link" onClick={toggleSidebar}>
                  TERMS OF SERVICE
                </Link>
                <Link
                  to="/shipping"
                  className="nav-link"
                  onClick={toggleSidebar}
                >
                  SHIPPING POLICY
                </Link>
                <Link
                  to="/about-us"
                  className="nav-link"
                  onClick={toggleSidebar}
                >
                  ABOUT US
                </Link>
                <Link
                  to="/about-iron"
                  className="nav-link"
                  onClick={toggleSidebar}
                >
                  ABOUT IRON BOY X CUNNINGZ
                </Link>
              </div>

              <div className="search-container-side">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input-side"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>
            </div>

            <div className="social-icons-side">
              <FontAwesomeIcon icon={faInstagram} className="social-icon1" />
              <FontAwesomeIcon icon={faYoutube} className="social-icon2" />
              <FontAwesomeIcon icon={faEnvelope} className="social-icon3" />
            </div>
          </div>

          {/* side Logo */}
          <div className="sidebar-logo">
            <Link to="/">
              <img
                src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/images/side-logo.jpg"
                alt="Logo"
                className="sidebar-logo-img"
              />
            </Link>
          </div>
        </div>

        {isSearchVisible && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="close-search-icon"
              onClick={closeSearch}
            />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
