import { useState } from "react";
import { Car, Plus, RotateCcw, ChevronDown, CarFront, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleChangeModal from "../../molecules/VehicleChangeModal/index";
import VehicleChangeLimitModal from "../../molecules/VehicleChangeLimitModal/index";
import RefundRequestModal from "../../molecules/RefundRequestModal/index";
import RefundLimitModal from "../../molecules/RefundLimitModal/index";
import { Button } from "../../atoms/Buttons/Button";
import { useNavigate } from "react-router-dom"

const initialSubscriptions = [
  {
    id: "1",
    vehicle: "2020 Audi A3 Sedan (8VM) L4-2.0L Turbo (CZRA)",
    expiration: "10/30/2025",
    price: "$19.99 / 1 Month",
    inCart: true,
    hasChangedVehicle: false,
    hasRequestedRefund: false,
  },
  {
    id: "2",
    vehicle: "2023 Audi A4 Quattro Sedan 45 (8WC) L4-2.0L Turbo (DPAA) MHEV",
    expiration: "09/29/2026",
    price: "$19.99 / 1 Month",
    inCart: false,
    hasChangedVehicle: false,
    hasRequestedRefund: false,
  },
  {
    id: "3",
    vehicle: "2022 Buick Truck Encore FWD L4-1.4L Turbo VIN M",
    expiration: "09/29/2026",
    price: "$19.99 / 1 Month",
    inCart: false,
    hasChangedVehicle: true,
    hasRequestedRefund: true,
  },
  {
    id: "4",
    vehicle: "2026 Cadillac Truck Escalade IQ AWD ELE-Electric Engine",
    expiration: "09/29/2028",
    price: "$19.99 / 1 Month",
    inCart: false,
    hasChangedVehicle: false,
    hasRequestedRefund: false,
  },
];

const DiySubscriptions = () => {
  const navigate = useNavigate()

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("");
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isRefundLimitModalOpen, setIsRefundLimitModalOpen] = useState(false);

  const handleAddToCart = (id) => {
    setSubscriptions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, inCart: true } : sub)));
  };

  const handleChangeVehicle = (vehicle, subscriptionId) => {
    const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

    if (subscription.hasChangedVehicle) {
      setIsLimitModalOpen(true);
    } else {
      setSelectedVehicle(vehicle);
      setSelectedSubscriptionId(subscriptionId);
      setIsModalOpen(true);
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === subscriptionId
            ? { ...sub, hasChangedVehicle: true }
            : sub
        )
      );
    }
  };

  const handleVehicleChangeComplete = () => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasChangedVehicle: true } : sub)),
    );
    setIsModalOpen(false);
  };

  const handleRefundRequest = (vehicle, subscriptionId) => {
    const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

    if (subscription.hasRequestedRefund) {
      setIsRefundLimitModalOpen(true);
    } else {
      setSelectedVehicle(vehicle);
      setSelectedSubscriptionId(subscriptionId);
      setIsRefundModalOpen(true);
    }
  };

  const handleRefundComplete = () => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === selectedSubscriptionId ? { ...sub, hasRequestedRefund: true } : sub)),
    );
    setIsRefundModalOpen(false);
  };

  const cartCount = subscriptions.filter((sub) => sub.inCart).length;

  const handleViewCart = () => {
    navigate("/diy-cart")
  }
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="!text-lg font-bold mb-2 text-foreground">MANAGE SUBSCRIPTIONS</h2>
        <p className="text-sm text-muted-foreground leading-relaxed text-gray-600">
          Subscription options include: change vehicle, renew vehicle, remove vehicle, or refund request. The
          availability of each option will vary based on the subscription. See{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Subscription Rules
          </a>{" "}
          for more information. For product access, click on any active subscription below.
        </p>
      </div>

      <table className="w-full">
        <thead className="hidden lg:table-header-group lg:bg-muted/50  lg:order-b lg:border-border">
          <tr className="flex flex-col lg:table-row">
            <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
              <div className="flex items-center gap-1">
                Vehicle
                <ChevronDown className="w-4 h-4" />
              </div>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Expiration</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Renew Subscription</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="flex flex-col lg:table-header-group">
          {subscriptions.map((subscription, index) => (
            <tr
              key={subscription.id}
              className={`border-b border-border flex flex-col lg:table-row ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
            >
              <td className="py-4 lg:px-4 lg:w-[45%]">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-normal text-primary">{subscription.vehicle}</span>
                  <button
                    onClick={() => handleChangeVehicle(subscription.vehicle, subscription.id)}
                    className="flex items-center gap-1 text-lg text-primary hover:underline w-fit"
                  >
                    <CarFront className="w-[1.125rem] h-[1.125rem]" />
                    Change Vehicle
                  </button>
                </div>
              </td>
              <td className="py-4 lg:px-4">
                <span className="text-lg font-semibold text-gray-600 text-foreground">{subscription.expiration}</span>
              </td>
              <td className="py-4 lg:px-4">
                <div className="flex flex-col items-start lg:flex-row lg:items-center gap-3">
                  <select
                    name={`subscription-${subscription.id}`}
                    id={`subscription-${subscription.id}`}
                    className="border-2 border-gray-300 h-10 bg-white px-3 py-1.5 text-sm text-foreground w-full lg:w-auto"
                  >
                    <option>{subscription.price}</option>
                  </select>
                  {subscription.inCart ? (
                    <span className="text-sm font-semibold text-foreground px-3 py-1.5">IN CART</span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddToCart(subscription.id)}
                      className="flex items-center gap-1 !text-primary"
                    >
                      <CirclePlus className="w-4 h-4 text-primary" />
                      ADD TO CART
                    </Button>
                  )}
                </div>
              </td>
              <td className="py-4 lg:px-4">
                <button
                  onClick={() => handleRefundRequest(subscription.vehicle, subscription.id)}
                  className="flex items-center gap-1 text-primary text-xs uppercase font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  REFUND
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-3 mt-6">
        {
          cartCount > 0 &&
          <Button
            variant="outline"
            className="btn btn-primary"
            onClick={handleViewCart}
          // className="px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold bg-transparent"
          >
            VIEW CART ({cartCount})
          </Button>
        }

        <Button
          variant="outline"
          className="btn btn-secondary"
        // className="px-6 py-2 border border-border text-foreground hover:bg-muted font-semibold bg-transparent"
        >
          ADD MORE VEHICLES
        </Button>
      </div>

      <VehicleChangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentVehicle={selectedVehicle}
        onComplete={handleVehicleChangeComplete}
      />

      <VehicleChangeLimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
      <RefundRequestModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        vehicleInfo={selectedVehicle}
        onComplete={handleRefundComplete}
      />

      <RefundLimitModal isOpen={isRefundLimitModalOpen} onClose={() => setIsRefundLimitModalOpen(false)} />
    </div>
  );
};

export default DiySubscriptions;
