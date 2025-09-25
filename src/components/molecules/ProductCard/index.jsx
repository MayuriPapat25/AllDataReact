import React from 'react';
// import { Card } from "@/components/ui/card";
const ProductCard = ({ cards = [] }) => {

  function Card({ className = "", onClick, children, ...props }) {
    return (
      <div className={`bg-white rounded-xl border shadow-sm ${className}`} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-4xl mx-auto">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`
            p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105
            ${card.isDashed ? "border-dashed border-2 border-gray-300" : "border border-gray-200"}
            bg-white
          `}
          onClick={card.onClick}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon Circle */}
            <div
              className={`
              w-16 h-16 rounded-full flex items-center justify-center text-white
              ${card.iconColor}
              ${card.isDashed ? "text-gray-400" : ""}
            `}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="font-bold text-sm tracking-wide text-gray-900">{card.title}</h3>

            {/* Subtitle */}
            {card.subtitle && <p className="text-sm text-blue-600 font-medium">{card.subtitle}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;