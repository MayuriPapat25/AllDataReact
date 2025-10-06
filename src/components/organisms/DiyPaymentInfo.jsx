import { useState } from "react";
import { Trash2 } from "lucide-react";

const PaymentInformation = () => {
  const [cards, setCards] = useState([
    { id: "1", lastFour: "4448", isPrimary: true },
    { id: "2", lastFour: "1111", isPrimary: false },
  ]);
  const [selectedCardId, setSelectedCardId] = useState("1");

  const handleRemove = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
  };

  return (
    <div className="w-full mx-auto p-8">
      <h2 className="!text-lg font-bold mb-2 text-foreground">MY PAYMENT INFORMATION</h2>
      <p className="text-muted-foreground mb-8">Card Information is added during the checkout process</p>

      <table className="w-full">
        <thead>
          <tr className=" border-b-2 border-b-gray-400">
            <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1 w-[10%]">Primary</th>
            <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1 w-[35%]">Card Information</th>
            <th className="text-left text-sm font-medium text-muted-foreground py-4 px-1">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              {/* Radio Button */}
              <td className="py-6">
                <div className="flex items-center">
                  <button
                    onClick={() => handleSelectCard(card.id)}
                    className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center"
                    aria-label={`Select card ending in ${card.lastFour}`}
                  >
                    {selectedCardId === card.id && <div className="w-3 h-3 rounded-full bg-blue-900" />}
                  </button>
                </div>
              </td>

              {/* Card Information */}
              <td className="py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1434CB] text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
                  <span className="text-sm text-muted-foreground tracking-wide">VISA ENDING IN {card.lastFour}</span>
                </div>
              </td>

              {/* Remove Button */}
              <td className="py-6">
                {selectedCardId !== card.id && (
                  <button
                    onClick={() => handleRemove(card.id)}
                    className="flex items-center gap-2 text-[#5B4FE9] hover:text-[#4A3FD8] transition-colors rounded px-2 py-1"
                    aria-label={`Remove card ending in ${card.lastFour}`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">REMOVE</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentInformation;