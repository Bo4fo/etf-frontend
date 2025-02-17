import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/pages/product-details.css";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { InfinitySpin } from "react-loader-spinner";
// import FreeShippingBanner from "../components/common/FreeShippingBanner";
import { FaSearchPlus } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const { addToCart, currency, convertPrice, formatPrice } =
    useContext(CartContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef(null);
  const descriptionRef = useRef(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        if (productData.countInStock === 0) {
          setIsSoldOut(true);
        }
        return axios.get(`${API_BASE_URL}/products`);
      })
      .then((response) => {
        const allProducts = response.data;
        const filteredProducts = allProducts
          .filter((prod) => prod._id !== id)
          .slice(0, 4);
        setRelatedProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (isDescriptionOpen && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isDescriptionOpen]);

  const handleRelatedProductClick = (productId) => {
    setIsNavigating(true);

    const productCard = document.querySelector(
      `.related-product-card[data-id="${productId}"]`
    );
    if (productCard) {
      productCard.classList.add("animate");
    }

    setTimeout(() => {
      navigate(`/products/${productId}`);
      setIsNavigating(false);
    }, 500);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const toggleDescription = () => {
    setIsDescriptionOpen((prev) => !prev);
    setIsShippingInfoOpen(false);
  };

  const toggleShippingInfo = () => {
    setIsShippingInfoOpen((prev) => !prev);
    setIsDescriptionOpen(false);
  };

  const openModal = (image) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  if (error) {
    return (
      <div className="product-not-found">
        <h2>{error}</h2>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  const nextImage = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevImage = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentImageIndex(swiper.activeIndex);
  };

  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding the product to your cart.");
      return;
    }

    if (quantity > product.countInStock) {
      alert("The selected quantity exceeds the available stock.");
      return;
    }

    addToCart(product, quantity, selectedSize);
  };

  return (
    <div className="product-main">
      <div className="product-details-box">
        <div className="product-details-box-wrap">
          <div className="product-details-container">
            {/* Product Images with Zoom Icon */}
            <div className="product-images-scroll">
              {product.imageUrl.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="product-image"
                    onClick={() => openModal(image)}
                  />
                  <div className="zoom-icon" onClick={() => openModal(image)}>
                    <FaSearchPlus />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Enlarged Image */}
            {isModalOpen && (
              <div className="modal-overlay" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="close-button" onClick={closeModal}>
                    &times;
                  </button>
                  {/* Display all images vertically */}
                  {product.imageUrl.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="modal-image"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Carousel */}
            <div className="product-mobile-carousel">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={false}
                pagination={false}
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                className="product-swiper"
              >
                {product.imageUrl.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="image-container">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="swiper-image"
                        onClick={() => openModal(image)}
                      />
                      <div
                        className="zoom-icon"
                        onClick={() => openModal(image)}
                      >
                        <FaSearchPlus />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="carousel-controls">
                <div className="carousel-arrow left-arrow" onClick={prevImage}>
                  &lt;
                </div>
                <div className="carousel-index">
                  {currentImageIndex + 1}/{product.imageUrl.length}
                </div>
                <div className="carousel-arrow right-arrow" onClick={nextImage}>
                  &gt;
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-container">
              <div className="p-info-box">
                <span className="product-title">{product.name}</span>
                <div className="product-prices">
                  {product.oldPrice && (
                    <span className="product-old-price">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="product-new-price">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Product Category */}
              <div className="product-category">
                <span>{product.category}</span>
              </div>

              {/* Size Selection */}
              <div className="product-size">
                <div className="size-label">
                  <span>Size</span>
                </div>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <label
                      key={size}
                      className={`size-option ${size === "S" ? "round" : ""}`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => handleSizeChange(size)}
                        className="size-radio"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="quantity-container">
                <span>Quantity</span>
                <span className="arrow-box">
                  <button
                    onClick={decreaseQuantity}
                    className="quantity-btn"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="quantity-btn"
                    disabled={quantity >= product.countInStock}
                  >
                    +
                  </button>
                </span>
              </div>

              {/* Add to Cart Button */}
              <div className="button-container">
                {product.countInStock === 0 ? (
                  <button className="sold-out-button" disabled>
                    Sold Out
                  </button>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                    title={
                      !selectedSize
                        ? "Please select a size"
                        : quantity > product.countInStock
                        ? "Quantity exceeds available stock"
                        : ""
                    }
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Collapsible Description Section */}
              <div
                className={`product-description ${
                  isDescriptionOpen ? "open" : ""
                }`}
                ref={descriptionRef}
              >
                <h3 onClick={toggleDescription} className="description-toggle">
                  Description {isDescriptionOpen ? "-" : "+"}
                </h3>
                {isDescriptionOpen && (
                  <div className="description-content">
                    {product.description || "No description available."}
                  </div>
                )}
              </div>

              {/* Collapsible Shipping Info Section */}
              <div
                className={`product-shipping-info ${
                  isShippingInfoOpen ? "open" : ""
                }`}
              >
                <h3
                  onClick={toggleShippingInfo}
                  className="shipping-info-toggle"
                >
                  Shipping & Returns {isShippingInfoOpen ? "-" : "+"}
                </h3>
                {isShippingInfoOpen && (
                  <div className="shipping-info-content">
                    <p>
                      THIS PRODUCT HAS LIMITED STOCK. ALL ITEMS ARE EXPECTED TO
                      SHIP BY THE END OF JANUARY.
                    </p>
                    <p>
                      PLEASE NOTE THAT THIS IS AN ESTIMATED TIMEFRAME, AND
                      DELAYS MAY OCCUR DUE TO UNFORESEEN CIRCUMSTANCES.
                    </p>
                    <br />
                    <p>
                      YOU WILL RECEIVE A CONFIRMATION EMAIL WITH TRACKING
                      DETAILS ONCE YOUR ORDER HAS BEEN SHIPPED. THANK YOU FOR
                      YOUR PATIENCE AND SUPPORT!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products-section">
          {/* <FreeShippingBanner /> */}
          <span className="youmay">You May Also Like</span>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="related-product-card"
                data-id={relatedProduct._id}
                onClick={() => handleRelatedProductClick(relatedProduct._id)}
              >
                <img
                  src={relatedProduct.imageUrl[0]}
                  alt={relatedProduct.name}
                  className="related-product-image"
                />
                <div className="product-info">
                  <span>{relatedProduct.name}</span>
                  <span>{formatPrice(relatedProduct.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
