import { Button } from "./Button"

export default function CartButtons({ onAddMoreVehicles, onCheckout }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button
        onClick={onAddMoreVehicles}
        variant="secondary"
        size="md"
        className="flex-1"
      >
        ADD MORE VEHICLES
      </Button>
      <Button
        onClick={onCheckout}
        variant="primary"
        size="md"
        className="flex-1"
      >
        CHECKOUT
      </Button>
    </div>
  )
}
