import React, { useContext, useState, useEffect } from "react";
import "../assets/styles/pages/products.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const NewArrivals = () => {
  const navigate = useNavigate();
  const { currency, convertPrice, isLoading, currencySymbols } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [filterStock, setFilterStock] = useState("inStock");
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

  const displayPrice = (priceInGHS) => {
    if (isLoading) return `${currencySymbols[currency]} 0.00`;
    const convertedPrice = convertPrice(priceInGHS, "GHS", currency);
    return `${currencySymbols[currency]} ${convertedPrice.toFixed(2)}`;
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (filterStock === "inStock") {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.stockStatus === "IN_STOCK" ||
          product.stockStatus === "LOW_STOCK"
      );
    } else if (filterStock === "outOfStock") {
      updatedProducts = updatedProducts.filter(
        (product) => product.stockStatus === "OUT_OF_STOCK"
      );
    }

    // Always sort by newest first for New Arrivals
    updatedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFilteredProducts(updatedProducts);
  }, [filterStock, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filters") && !event.target.closest(".sort")) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleViewMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const handleFilterChange = (value) => {
    setFilterStock(value);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-box">
      <div className="products">
        <div className="all-products">
          <div className="sorting">
            <div className="filters">
              <h4
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
              >
                Filter {isFilterOpen ? "-" : "+"}
              </h4>
              {isFilterOpen && (
                <div className="filter-options">
                  <div>
                    <label>
                      <input
                        type="radio"
                        checked={filterStock === "all"}
                        onChange={() => handleFilterChange("all")}
                      />
                      All
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        checked={filterStock === "inStock"}
                        onChange={() => handleFilterChange("inStock")}
                      />
                      In Stock
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        checked={filterStock === "outOfStock"}
                        onChange={() => handleFilterChange("outOfStock")}
                      />
                      Sold Out
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product._id}
                className={`product-card ${
                  product.stockStatus === "OUT_OF_STOCK" ? "disabled" : ""
                }`}
                onClick={() =>
                  product.stockStatus !== "OUT_OF_STOCK" &&
                  handleProductClick(product._id)
                }
                style={{
                  cursor:
                    product.stockStatus === "OUT_OF_STOCK"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <div className="product-image-container">
                  <img src={product.imageUrl[0]} alt={product.name} />
                  {product.stockStatus === "OUT_OF_STOCK" && (
                    <div className="sold-out-overlay">Sold Out</div>
                  )}
                </div>
                <div className="product-info">
                  <h6>{product.name}</h6>
                  <h6>{displayPrice(product.price)}</h6>
                </div>
              </div>
            ))}
          </div>

          {visibleProducts < filteredProducts.length && (
            <button className="view-more-btn" onClick={handleViewMore}>
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
