import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { HiMenuAlt4 } from "react-icons/hi";
import Logo from "../../assets/logos/ETERNAL FEELS.png";
import "../../assets/styles/components/homenavbar.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-primary">
        <div className="header-logo">
          <a href="/" aria-label="Homepage">
            <img
              src={Logo}
              alt="Logo"
              className={isMenuOpen ? "text-white" : "text-black"}
            />
          </a>
        </div>
        <div className="header-links">
          <a
            href="/collections/shop-all"
            className={isMenuOpen ? "text-white" : "text-black"}
          >
            SHOP ALL
          </a>
          <a
            href="/pages/photos-and-videos"
            className={isMenuOpen ? "text-white" : "text-black"}
          >
            PHOTOS AND VIDEOS
          </a>
          <a
            href="/pages/customer-support"
            className={isMenuOpen ? "text-white" : "text-black"}
          >
            CUSTOMER SUPPORT
          </a>
          <a
            href="/pages/stockists"
            className={isMenuOpen ? "text-white" : "text-black"}
          >
            STOCKISTS
          </a>
          <a
            href="/track-your-order"
            className={isMenuOpen ? "text-white" : "text-black"}
          >
            TRACK YOUR ORDER
          </a>
        </div>
      </div>

      <div className="header-secondary">
        <span
          className={`header-cart ${isMenuOpen ? "text-white" : "text-black"}`}
          role="button"
          aria-label="Cart"
        >
          Bag (2)
        </span>
        <button
          className="menu-toggle-btn"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <MdClose
              className={`menu-icon ${isMenuOpen ? "rotate" : ""} text-white`}
            />
          ) : (
            <HiMenuAlt4
              className="menu-icon text-black"
              style={{ color: "white" }}
            />
          )}
        </button>
      </div>

      <div
        className={`header-sidebar ${
          isMenuOpen ? "header-sidebar--visible" : ""
        }`}
      >
        <div className="header-sidebar-menu">
          <div className="shop-all-box">
            <a href="/collections/shop-all" onClick={toggleMenu}>
              SHOP ALL
            </a>
          </div>

          <a href="/pages/photos-and-videos" onClick={toggleMenu}>
            PHOTOS AND VIDEOS
          </a>
          <a href="/pages/customer-support" onClick={toggleMenu}>
            CUSTOMER SUPPORT
          </a>
          <a href="/pages/stockists" onClick={toggleMenu}>
            STOCKISTS
          </a>
          <a href="/track-your-order" onClick={toggleMenu}>
            TRACK YOUR ORDER
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
