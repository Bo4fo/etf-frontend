import React from "react";

const CartPage = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 100, quantity: 2 },
    { id: 2, name: "Product 2", price: 200, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-700">
              ${item.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">Total: ${total}</p>
      </div>
    </div>
  );
};

export default CartPage;
