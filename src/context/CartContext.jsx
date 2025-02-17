import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const currencySymbols = {
  GHS: "₵",
  USD: "$",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    return storedCurrency || "GHS";
  });
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_EXCHANGE_RATE_API}`
        );
        // console.error("Error fetching exchange rates:", process.env.REACT_APP_EXCHANGE_RATE_API);
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        // console.error("Error fetching exchange rates:", error);
        setExchangeRates({
          GHS: 1,
          USD: 0.085,
          EUR: 0.079,
          GBP: 0.072,
          NGN: 71.5,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 86400000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const { timestamp, items } = JSON.parse(cartData);
      const now = new Date().getTime();
      const expiryTime = 24 * 60 * 60 * 1000;

      if (now - timestamp < expiryTime) {
        setCartItems(items);
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const cartData = {
        timestamp: new Date().getTime(),
        items: cartItems,
      };
      localStorage.setItem("cart", JSON.stringify(cartData));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  useEffect(() => {
    if (orderNote) {
      localStorage.setItem("orderNote", orderNote);
    } else {
      localStorage.removeItem("orderNote");
    }
  }, [orderNote]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (!price || !exchangeRates || !fromCurrency || !toCurrency) return 0;

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return 0;

    if (fromCurrency === toCurrency) return numericPrice;

    const inGHS = numericPrice * (1 / exchangeRates[fromCurrency]);
    return inGHS * exchangeRates[toCurrency];
  };

  const formatPrice = (price, fromCurrency = "GHS") => {
    if (isLoading || !exchangeRates) return `${currencySymbols[currency]} 0.00`;

    const converted = convertPrice(price, fromCurrency, currency);
    return `${currencySymbols[currency]} ${Number(converted).toFixed(2)}`;
  };

  const calculateSubtotal = () => {
    if (!cartItems.length || !exchangeRates) return "0.00";

    const total = cartItems.reduce((sum, item) => {
      const priceInCurrentCurrency = convertPrice(item.price, "GHS", currency);
      return sum + priceInCurrentCurrency * item.quantity;
    }, 0);

    return total.toFixed(2);
  };

  // Add to cart (keeping original price in GHS)
  const addToCart = (product, quantity = 1, selectedSize = "") => {
    if (!product || (!product.id && !product._id) || !product.price) {
      console.error("Invalid product object:", product);
      return;
    }

    // Check if the product is in stock
    if (product.countInStock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    // Check f only 1 item is availablee in stock
    if (product.countInStock === 1) {
      const existingItem = cartItems.find(
        (item) =>
          item.id === (product.id || product._id) && item.size !== selectedSize
      );

      if (existingItem) {
        alert("Only 1 item is available in stock.");
        return;
      }
    }

    if (quantity > product.countInStock) {
      alert(`Only ${product.countInStock} items are available in stock.`);
      return;
    }

    const productId = product.id || product._id;
    let priceInGHS = product.price;

    if (product.currency && product.currency !== "GHS") {
      priceInGHS = convertPrice(product.price, product.currency, "GHS");
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productId && item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        const updatedQuantity =
          prevItems[existingItemIndex].quantity + quantity;

        if (updatedQuantity > product.countInStock) {
          alert(`Only ${product.countInStock} items are available in stock.`);
          return prevItems;
        }

        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: updatedQuantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          price: priceInGHS,
          quantity,
          size: selectedSize,
        },
      ];
    });

    setIsCartOpen(true);
  };
  const removeFromCart = (id, size, product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id || item.size !== size)
    );

    if (product) {
      product.countInStock += 1;
    }
  };

  const updateQuantity = (id, newQuantity, product) => {
    if (newQuantity < 1) return;

    if (product && newQuantity > product.countInStock) {
      alert(`Only ${product.countInStock} items are available in stock.`);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const getCartDataForOrder = () => {
    return {
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        currency: "GHS",
      })),
      totalAmount: calculateSubtotal(),
      currency: currency,
      orderNote: orderNote,
    };
  };

  const clearOrderNote = () => {
    setOrderNote("");
    localStorage.removeItem("orderNote");
  };

  const clearCart = () => {
    setCartItems([]);
    setOrderNote("");
    localStorage.removeItem("cart");
    localStorage.removeItem("orderNote");
  };

  const totalPrice = calculateSubtotal();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        toggleCart,
        totalPrice,
        currency,
        setCurrency: handleCurrencyChange,
        convertPrice,
        isLoading,
        formatPrice,
        getCartDataForOrder,
        currencySymbols,
        orderNote,
        setOrderNote,
        clearOrderNote,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
