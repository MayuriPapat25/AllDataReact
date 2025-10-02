import React from 'react';
// import { Card } from "@/components/ui/card";
const ProductCard = ({ cards = [] }) => {

  function Card({ className = "", onClick, children, ...props }) {
    return (
      <div className={`bg-white shadow-sm ${className}`} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 px-0 py-6 max-w-4xl mx-0">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`
            p-6 cursor-pointer ${card.isDashed ? "border-dashed border-2" : ""}
            bg-white
          `}
          onClick={card.onClick}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon Circle */}
            <div
              className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${card.iconColor}
              ${card.isDashed ? "text-gray-400" : ""}
            `}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="font-bold text-sm tracking-wide text-gray-900">{card.title}</h3>

            {/* Subtitle */}
            {card.subtitle && <p className="text-sm text-primary font-medium">{card.subtitle}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;