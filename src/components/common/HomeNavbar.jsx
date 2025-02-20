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
  // faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import debounce from "lodash.debounce";
import axios from "axios";
import CurrencyModal from "../common/CurrencyModal";
import CurrencySelectorSidebar from "../common/CurrencySelectorSidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isSearchVisible, setIsSearchVisible] = useState(false);
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
    // if (isSearchVisible) {
    //   setIsSearchVisible(false);
    // }
  };

  // const toggleSearch = () => {
  //   setIsSearchVisible(!isSearchVisible);
  // };

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

  // const closeSearch = () => {
  //   setIsSearchVisible(false);
  //   setIsDropdownVisible(false);
  //   setSearchQuery("");
  // };

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
    // closeSearch();
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
          <span>Eternal Feels</span>
        </div>

        {/* <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/CUNNINGZ_white_text.png"
              alt="navlogo"
            />
          </Link>
        </div> */}

        <div className="navbar-icons">
          <div className="cart-icon">
            <div className="shop-box">
              <div className="shopbag" onClick={toggleCart}>
                <span>Bag</span>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ fontSize: "12px" }}
                />
                {cartItems.length > 0 && <span className="cart-dot"></span>}
              </div>
              <FaGripLines
                onClick={toggleSidebar}
                style={{ fontSize: "18px" }}
              />

              {cartItems.length > 0 && <span className="cart-dot"></span>}
            </div>
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
          </div>
        </div>
        {/* 
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
        )} */}
      </nav>
    </div>
  );
}

export default Navbar;
