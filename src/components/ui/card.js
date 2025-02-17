// src/components/ui/card.js
import React from 'react';

const Card = ({ children }) => {
  return <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>;
};

export default Card;