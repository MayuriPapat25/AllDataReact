import React from 'react';
const ProductCard = ({ cards = [] }) => {

  function Card({ className = "", onClick, children, ...props }) {
    return (
      <div className={`shadow-lg bg-white ${className}`} onClick={onClick} {...props}>
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
            min-h-[220px]
            flex
            justify-center
            items-center
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
            <h3 className="text-md tracking-wide" style={{ fontWeight: 500 }}>{card.title}</h3>

            {/* Subtitle */}
            {card.subtitle && <p className="text-md text-primary">{card.subtitle}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;