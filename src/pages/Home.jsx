import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/pages/home.css";

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [cunningz, setCunningz] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTitles, setShowTitles] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const BASE_URL =
    process.env.REACT_APP_BASE_URL || process.env.REACT_APP_API_URL;
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchBanners(), fetchCatalogs()]);
        setCunningz(false);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setCunningz(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const windowHeight = containerRef.current.clientHeight;
        const newIndex = Math.floor(scrollPosition / windowHeight);

        setActiveIndex(newIndex);
        setShowTitles(newIndex > 0);
      }
    };

    const container = containerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isDataLoaded]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

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

  // const handleShopNowClick = () => {
  //   navigate("/products");
  // };

  const handleCatalogClick = (catalogId) => {
    navigate(`/collections/${catalogId}`);
  };

  if (cunningz) {
    return (
      <div className="loading">
        <span className="drop-letter">c</span>
        <span className="drop-letter">u</span>
        <span className="drop-letter">n</span>
        <span className="drop-letter">n</span>
        <span className="drop-letter">i</span>
        <span className="drop-letter">n</span>
        <span className="drop-letter">g</span>
        <span className="drop-letter">z</span>
      </div>
    );
  }

  return (
    <div className="homebox">
      <div className="home" ref={containerRef}>
        <div className="banners-container">
          {banners.map((banner, index) => (
            <div key={index} className="banner-container">
              {banner.fileType === "video" ? (
                <video className="banner-media" autoPlay loop muted playsInline>
                  <source src={banner.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  className="banner-media"
                  src={banner.fileUrl}
                  alt={`Banner ${index + 1}`}
                />
              )}

              {/* {index === 0 && (
                <div className="center-content">
                  <button
                    className="shop-now-button"
                    onClick={handleShopNowClick}
                  >
                    Shop Now{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="arrow-icon"
                    />
                  </button>
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* Overlay Titles */}
        {isDataLoaded && (
          <div
            className={`all-titles-container ${!showTitles ? "hidden" : ""}`}
          >
            {catalogs.map((catalog, index) => (
              <div
                key={catalog._id}
                className={`title-overlay ${
                  index === activeIndex - 1 ? "active" : ""
                }`}
                style={{
                  transform: `translate(-50%, -50%) scale(${
                    index === activeIndex - 1 ? 1 : 0.7
                  })`,
                  opacity: index === activeIndex - 1 ? 1 : 0.3,
                  top: `${50 + (index - (activeIndex - 1)) * 10}%`,
                  visibility: showTitles ? "visible" : "hidden",
                  cursor: "pointer",
                }}
                onClick={() => handleCatalogClick(catalog._id)}
              >
                {catalog.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
