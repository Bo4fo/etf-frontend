import React, { useState, useEffect } from "react";
import "../assets/styles/pages/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL =
    process.env.REACT_APP_BASE_URL || process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners`);
      setBanners(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setIsLoading(false);
    }
  };

  const handleShopNowClick = () => {
    navigate("/products");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (banners.length === 0) {
    return (
      <div className="home" style={{ position: "relative", height: "100vh" }}>
        <div
          style={{
            position: "relative",
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <button className="shop-now-button" onClick={handleShopNowClick}>
            Shop Now{" "}
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home" style={{ display: "flex", flexDirection: "column" }}>
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
          }}
        >
          {banner.fileType === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={banner.fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={banner.fileUrl}
              alt={banner.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* Show Shop Now button only on the first banner */}
          {index === 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1",
              }}
            >
              <button className="shop-now-button" onClick={handleShopNowClick}>
                Shop Now{" "}
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
