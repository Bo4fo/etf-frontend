import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "../assets/styles/pages/collections.css";
import { InfinitySpin } from "react-loader-spinner";

const CollectionsPage = () => {
  const navigate = useNavigate();
  const { catalogId } = useParams();
  const { currency, convertPrice, isLoading, currencySymbols } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [filterStock, setFilterStock] = useState("inStock");
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

  const shouldShowClear = () => {
    const isPriceFilterActive =
      filterPriceMin > 0 ||
      (filterPriceMax !== Infinity && filterPriceMax !== 0);

    return filterStock === "outOfStock" || isPriceFilterActive;
  };

  const displayPrice = (priceInGHS) => {
    if (isLoading) return `${currencySymbols[currency]} 0.00`;
    const convertedPrice = convertPrice(priceInGHS, "GHS", currency);
    return `${currencySymbols[currency]} ${convertedPrice.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchProductsByCatalog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE_URL}/products/by-catalog/${catalogId}`
        );

        const products = response.data;
        setProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (catalogId) {
      fetchProductsByCatalog();
    }
  }, [catalogId]);

  // Filter and sort products
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

    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= filterPriceMin && product.price <= filterPriceMax
    );

    updatedProducts.sort((a, b) => {
      if (sortOrder === "dateAsc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "dateDesc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "priceAsc") return a.price - b.price;
      if (sortOrder === "priceDesc") return b.price - a.price;
      if (sortOrder === "alphabeticalAZ") return a.name.localeCompare(b.name);
      if (sortOrder === "alphabeticalZA") return b.name.localeCompare(a.name);
      if (sortOrder === "featured") return 0; // Implement your own logic for "Featured"
      if (sortOrder === "bestSelling") return 0; // Implement your own logic for "Best Selling"
      return 0;
    });

    setFilteredProducts(updatedProducts);
  }, [filterStock, filterPriceMin, filterPriceMax, sortOrder, products]);

  // Handle click outside filter and sort menus
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

  const handleFilterChange = (value, type) => {
    if (type === "stock") {
      setFilterStock(value);
    } else if (type === "priceMin") {
      setFilterPriceMin(Number(value) || 0);
    } else if (type === "priceMax") {
      setFilterPriceMax(Number(value) || Infinity);
    }
  };

  const handleClearFilter = () => {
    setFilterStock("inStock");
    setFilterPriceMin(0);
    setFilterPriceMax(Infinity);
    setIsFilterOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/collections/${catalogId}/products/${productId}`);
  };

  const inStockCount = products.filter(
    (product) =>
      product.stockStatus === "IN_STOCK" || product.stockStatus === "LOW_STOCK"
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stockStatus === "OUT_OF_STOCK"
  ).length;

  const availabilityText =
    filterStock === "inStock" ? `(${inStockCount})` : `(${outOfStockCount})`;

  if (loading) {
    return (
      <div className="loading-animation">
        <InfinitySpin
          visible={true}
          width="200"
          color="#ffffff"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <div className="collection">
      <div className="products">
        {/* Background Video */}
        <div className="video-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source
              src="https://cunningz-ecommerce-item-image-1.s3.eu-north-1.amazonaws.com/Cunningz+Intro+Post+01+w+sound+(1).mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Display "No Products Available" if no products are found or if there's an error */}
        {error || filteredProducts.length === 0 ? (
          <div className="no-products-overlay">
            <h2>No Products Available</h2>
            <p>We're working on adding new items to this collection soon.</p>
            <button onClick={() => navigate("/products")}>
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="all-products">
            <div className="sorting">
              {/* Filter Section */}
              <div className="filters">
                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFilterOpen((prev) => !prev);
                    setIsSortOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  FILTER {isFilterOpen ? "-" : "+"}
                </h4>
                {isFilterOpen && (
                  <div className="filter-options">
                    {shouldShowClear() && (
                      <h4 onClick={handleClearFilter} style={{ font: "12px" }}>
                        Clear
                      </h4>
                    )}

                    <div className="availability-section">
                      <div className="availability-box">
                        <h5>Availability {availabilityText}</h5>
                        <div>
                          <label>
                            <input
                              type="radio"
                              checked={filterStock === "inStock"}
                              onChange={() =>
                                handleFilterChange("inStock", "stock")
                              }
                            />
                            <span className="filter-circle"></span>
                            In Stock
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="radio"
                              checked={filterStock === "outOfStock"}
                              onChange={() =>
                                handleFilterChange("outOfStock", "stock")
                              }
                            />
                            <span className="filter-circle"></span>
                            Out of Stock
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="price-range">
                          <h5>Price</h5>
                          <div className="price-inputs">
                            <div className="price-input">
                              <span>{currencySymbols[currency]}</span>
                              <input
                                type="number"
                                value={filterPriceMin || ""}
                                onChange={(e) =>
                                  handleFilterChange(e.target.value, "priceMin")
                                }
                                placeholder="From"
                              />
                            </div>
                            <div className="price-input">
                              {" "}
                              -<span>{currencySymbols[currency]}</span>
                              <input
                                type="number"
                                value={
                                  filterPriceMax === Infinity
                                    ? ""
                                    : filterPriceMax
                                }
                                onChange={(e) =>
                                  handleFilterChange(e.target.value, "priceMax")
                                }
                                placeholder="To"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Section */}
              <div className="sort">
                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSortOpen((prev) => !prev);
                    setIsFilterOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  SORT {isSortOpen ? "-" : "+"}
                </h4>

                {isSortOpen && (
                  <div
                    className="sort-options"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "featured"}
                          onChange={() => setSortOrder("featured")}
                        />
                        Featured
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "bestSelling"}
                          onChange={() => setSortOrder("bestSelling")}
                        />
                        Best Selling
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "alphabeticalAZ"}
                          onChange={() => setSortOrder("alphabeticalAZ")}
                        />
                        Alphabetically, A-Z
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "alphabeticalZA"}
                          onChange={() => setSortOrder("alphabeticalZA")}
                        />
                        Alphabetically, Z-A
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "priceAsc"}
                          onChange={() => setSortOrder("priceAsc")}
                        />
                        Price: Low to High
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "priceDesc"}
                          onChange={() => setSortOrder("priceDesc")}
                        />
                        Price: High to Low
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "dateAsc"}
                          onChange={() => setSortOrder("dateAsc")}
                        />
                        Date: Oldest First
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          checked={sortOrder === "dateDesc"}
                          onChange={() => setSortOrder("dateDesc")}
                        />
                        Date: Newest First
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <div
                  key={product._id}
                  className={`product-card ${
                    product.stockStatus === "OUT_OF_STOCK" ? "disabled" : ""
                  }`}
                  onClick={() => handleProductClick(product._id)}
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

            {/* View More Button */}
            {visibleProducts < filteredProducts.length && (
              <button className="view-more-btn" onClick={handleViewMore}>
                View More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
