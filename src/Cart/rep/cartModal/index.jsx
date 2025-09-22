import { ProCartDropdown } from "../../../components/organisms/proCartDropdown"
import { Button } from "../../../components/atoms/Buttons/Button" // import common Button

export default function CartModal({ onClose }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          aria-label="Close cart"
          className="text-gray-500 hover:text-gray-800 p-0"
        >
          ✕
        </Button>
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto">
        <ProCartDropdown isOpen={true} onClose={onClose} variant="dropdown" />
      </div>
    </div>
  )
}
