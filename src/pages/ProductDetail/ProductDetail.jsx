import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "https://via.placeholder.com/150",
    description: "This is a detailed description of Product 1.",
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700">${product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
