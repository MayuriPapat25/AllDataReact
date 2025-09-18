export default function CartButtons({ onAddMoreVehicles, onCheckout }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button onClick={onAddMoreVehicles} className="flex-1">
        ADD MORE VEHICLES
      </button>
      <button onClick={onCheckout} className="flex-1">
        CHECKOUT
      </button>
    </div>
  )
}
