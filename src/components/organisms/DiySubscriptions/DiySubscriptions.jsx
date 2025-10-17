import { useState } from "react";
import { Car, Plus, RotateCcw, ChevronDown, CarFront, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleChangeModal from "../../molecules/VehicleChangeModal/index";
import VehicleChangeLimitModal from "../../molecules/VehicleChangeLimitModal/index";
import RefundRequestModal from "../../molecules/RefundRequestModal/index";
import RefundLimitModal from "../../molecules/RefundLimitModal/index";
import { useNavigate } from "react-router-dom"
import { Button } from "../../../shared/ui/Buttons/Button";

const DiySubscriptions = ({ subscriptions, cartCount, handleAddToCart, handleChangeVehicle, handleVehicleChangeComplete, handleRefundRequest, handleRefundComplete, selectedVehicle, isRefundModalOpen, isRefundLimitModalOpen, isModalOpen, setIsModalOpen, isLimitModalOpen, setIsLimitModalOpen, setIsRefundModalOpen }) => {
  const navigate = useNavigate()

  const handleViewCart = () => {
    navigate("/diy-cart")
  }

  const handleAddMoreVehicle = () => {
    navigate("/findvehicle")
  }
  return (
    <div className="px-20 py-0 my-4">
      <div className="mb-6">
        <h2 className="sub-title">MANAGE SUBSCRIPTIONS</h2>
        <p className=" text-gray-600">
          Subscription options include: change vehicle, renew vehicle, remove vehicle, or refund request. The
          availability of each option will vary based on the subscription. See{" "}
          <a href="#" className="test-primary hover:underline">
            Subscription Rules
          </a>{" "}
          for more information. For product access, click on any active subscription below.
        </p>
      </div>

      <table className="w-full">
        <thead className="hidden lg:table-header-group lg:bg-muted/50  lg:border-b-4 border-gray-300 lg:border-border">
          <tr className="flex flex-col lg:table-row">
            <th className="text-left py-3 px-4 font-normal text-foreground text-[#54565a]">
              <div className="flex items-center gap-1 text-base cursor-pointer">
                Vehicle
                <ChevronDown className="w-4 h-4" />
              </div>
            </th>
            <th className="text-left py-3 px-4 font-normal text-foreground text-[#54565a] text-base cursor-pointer">Expiration</th>
            <th className="text-left py-3 px-4 font-normal text-foreground text-[#54565a] text-base cursor-pointer">Renew Subscription</th>
            <th className="text-left py-3 px-4 font-normal text-foreground text-[#54565a] text-base cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody className="flex flex-col lg:table-header-group">
          {subscriptions.map((subscription, index) => (
            <tr
              key={subscription.id}
              className={`border-b-4 border-gray-300 border-border flex flex-col lg:table-row ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
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
              <td className="py-4 lg:px-4 ml-60">
                <span className="text-lg font-semibold text-gray-600 text-foreground">{subscription.expiration}</span>
              </td>
              <td
                className="border-l-2 border-gray-300 w-1/5 pl-4"
              >
                <div
                  className="flex  "
                >
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
                      onClick={() => handleAddToCart(subscription)}
                      className="flex items-center gap-1 !text-primary"
                    >
                      <CirclePlus className="w-4 h-4 text-primary" />
                      ADD TO CART
                    </Button>
                  )}
                </div>
              </td>
              <td className="py-4">
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
            size='sm'
          // className="px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold bg-transparent"
          >
            VIEW CART ({cartCount})
          </Button>
        }

        <Button
          variant="outline"
          className="btn btn-secondary"
          onClick={handleAddMoreVehicle}
          size='sm'
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
