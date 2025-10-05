"use client";

import { useState } from "react";
import { Car, Plus, RotateCcw, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleChangeModal from "../molecules/VehicleChangeModal";
import VehicleChangeLimitModal from "../molecules/VehicleChangeLimitModal";
import RefundRequestModal from "../molecules/RefundRequestModal";
import RefundLimitModal from "../molecules/RefundLimitModal";
import { Button } from "../atoms/Buttons/Button";

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

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-foreground">MANAGE SUBSCRIPTIONS</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Subscription options include: change vehicle, renew vehicle, remove vehicle, or refund request. The
          availability of each option will vary based on the subscription. See{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Subscription Rules
          </a>{" "}
          for more information. For product access, click on any active subscription below.
        </p>
      </div>

      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
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
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr
              key={subscription.id}
              className={`border-b border-border ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
            >
              <td className="py-4 px-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-blue-700">{subscription.vehicle}</span>
                  <button
                    onClick={() => handleChangeVehicle(subscription.vehicle, subscription.id)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline w-fit"
                  >
                    <Car className="w-3 h-3" />
                    Change Vehicle
                  </button>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-foreground">{subscription.expiration}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <select className="border border-border rounded px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>{subscription.price}</option>
                  </select>
                  {subscription.inCart ? (
                    <span className="text-sm font-semibold text-foreground px-3 py-1.5">IN CART</span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddToCart(subscription.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Plus className="w-4 h-4" />
                      ADD TO CART
                    </Button>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={() => handleRefundRequest(subscription.vehicle, subscription.id)}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
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
        <Link to="/diy">
          <Button
            variant="outline"
            className="px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold bg-transparent"
          >
            VIEW CART ({cartCount})
          </Button>
        </Link>
        <Button
          variant="outline"
          className="px-6 py-2 border border-border text-foreground hover:bg-muted font-semibold bg-transparent"
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
