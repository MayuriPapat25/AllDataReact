import { useSelector, useDispatch } from "react-redux";
import {
  setCartItems,
  updateCartItem,
  removeCartItem,
  setPaymentFrequency,
  setSubscriptionTerm,
  setPromoCode,
  setAutoRenewalDate,
  resetCart
} from "../../../store/store";

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RadioButton } from "../../../shared/ui/RadioButton/RadioButton"
import { ProductName } from "../../../shared/ui/TextIcon/ProductName"
import { CounterDropdown } from "../../../shared/ui/Dropdown/CounterDropdown"
import { PriceText } from "../../../shared/ui/Price/PriceText"
import { InputWithButton } from "../../../shared/ui/InputField/InputWithButton"
import { Message } from "../../../shared/ui/Message/Message"
import { DeleteIcon, MessageIcon } from "../../../shared/ui/Icon/Icon"
import { LinkButton } from "../../../shared/ui/links/linkButton"
import { Dropdown } from "../../../shared/ui/Dropdown/Dropdown"
import { AccessPointsModal } from "../../molecules/Modal/AccessPointsModal"
import repairIcon from "../../../assets/images/repair_color.png"
import { Button } from "../../../shared/ui/Buttons/Button"
import { addMonthsAndFormat, getTestId } from '../../../shared/utils/utils'
import { translations } from '../../../shared/translations'
import FullPageSpinner from "../../../shared/ui/FullPageSpinner";

export function ProCartContent({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const testBase = "pro-cart";

  const {
    cartItems,
    paymentFrequency,
    subscriptionTerm,
    promoCode,
    autoRenewalDate
  } = useSelector((state) => state.cart);

  const [showAccessPointsModal, setShowAccessPointsModal] = useState(false)
  const [showMaxLimitMessage, setShowMaxLimitMessage] = useState(false)
  const [showFrequencyWarning, setShowFrequencyWarning] = useState(false)
  const [error, setError] = useState("")
  const [value, setValue] = useState("")
  const [promoSuccess, setPromoSuccess] = useState("")
  const [isUpdatingAccessPoints, setIsUpdatingAccessPoints] = useState(false)
  const isPromoApplied = !!promoCode;
  const hasPendingPromoInput = !!value && !promoCode;


  useEffect(() => {
    if (!promoCode) {
      setError("");
      setPromoSuccess("");
      setValue("");
    }
  }, [promoCode]);

  const subscriptionSubtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const discount = promoCode ? +(subscriptionSubtotal * 0.10).toFixed(2) : 0;
  const totalMonthly = subscriptionSubtotal - discount;
  const totalDueToday = totalMonthly;

  const handleAccessPointChange = (itemId, newValue) => {
    setIsUpdatingAccessPoints(true);

    const parentItem = (cartItems || []).find(it => it.id === itemId);
    const parentName = parentItem?.name ?? null;
    const parentNameLower = parentName ? parentName.toLowerCase() : null;

    const updatedItems = (cartItems || []).map(item => {
      if (item.id === itemId) {
        return { ...item, accessPoints: newValue };
      }

      if (
        item.isIncluded &&
        item.includedWith &&
        parentNameLower &&
        item.includedWith.toLowerCase() === parentNameLower
      ) {
        return { ...item, accessPoints: newValue };
      }

      return item;
    });

    dispatch(setCartItems(updatedItems));

    setTimeout(() => {
      setIsUpdatingAccessPoints(false);
    }, 600);
  }

  const handleRemoveItem = (itemId) => {
    const parentItem = (cartItems || []).find(it => it.id === itemId);
    const parentNameLower = parentItem?.name ? parentItem.name.toLowerCase() : null;

    const filtered = (cartItems || []).filter(item => {
      if (item.id === itemId) return false;

      if (
        item.isIncluded &&
        item.includedWith &&
        parentNameLower &&
        item.includedWith.toLowerCase() === parentNameLower
      ) {
        return false;
      }

      return true;
    });

    dispatch(setCartItems(filtered));
  };

  const handlePaymentFrequencyChange = (value) => {
    dispatch(setPaymentFrequency(value));
    // compute new prices from basePrice (assumed monthly)
    const updated = (cartItems || []).map(it => {
      const base = (it.basePrice ?? it.price ?? 0); // fallback if basePrice missing
      let newPrice = base;
      if (value === "ANNUALLY") {
        newPrice = +(base * 12).toFixed(2); // annual = monthly * 12 (adjust if you want discounts)
      } else {
        newPrice = +base.toFixed(2); // monthly -> basePrice
      }
      return { ...it, price: newPrice, basePrice: base };
    });

    // persist updated cart items
    dispatch(setCartItems(updated));
    // show the requested warning message
    setShowFrequencyWarning(true);
  }

  const handleSubscriptionTermChange = (value) => {
    const matched = value.match(/(\d+)/);
    const months = matched ? parseInt(matched[1], 10) : 12; // default 12

    // persist the selected subscription term to the Redux store
    dispatch(setSubscriptionTerm(value));

    // compute & persist renewal date
    const newRenewal = addMonthsAndFormat(months);
    dispatch(setAutoRenewalDate(newRenewal));

  }

  const handleCheckout = () => {
    navigate('/usanonycheckout')
  }

  // Called when user clicks Apply (or presses Enter)
  const handleApplyPromo = () => {
    if (promoCode) return;

    const trimmed = (value || "").trim();
    if (!trimmed) return;

    if (trimmed.toUpperCase() === "REPAIR10") {
      // Valid promocode — save to store (adjust if your real logic differs)
      dispatch(setPromoCode("REPAIR10"))
      setValue("")
      setError("")
      setPromoSuccess("One promo code allowed per product. To apply a new discount, remove the current one.");
    } else {
      // When Apply is clicked and the code is wrong — show the message requested
      setError("Promo code name invalid")
      setPromoSuccess("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleApplyPromo()
    }
  }

  const handlePromoCodeField = (val) => {
    if (promoCode) return;

    setValue(val || "");
    setError("");
    setPromoSuccess("");
  }

  const handleRemovePromo = () => {
    dispatch(setPromoCode(null));
  }

  const handleRemoveAddedProducts = () => {
    // clear cart in store so header badge shows 0 immediately
    // use resetCart if your reducer supports it; fallback to setCartItems([])
    if (typeof dispatch === "function") {
      // prefer resetCart if available
      try {
        dispatch(resetCart());
      } catch (e) {
        dispatch(setCartItems([]));
      }
    }
    onClose();
  }

  return (
    <div data-testid={getTestId(testBase, "container")}>
      {isUpdatingAccessPoints && <FullPageSpinner />}

      {showFrequencyWarning && (
        <Message type="error" className="mb-3" data-testid={getTestId(testBase, ["message", "error", "frequency"])}>
          Your Total Due has been updated. Please review your cart before continuing with purchase.
        </Message>
      )}

      {/* Payment Frequency */}
      <div className="mb-4 bg-white py-6 px-10 shadow-lg" data-testid={getTestId(testBase, "payment-frequency")}>
        <div className="flex items-center justify-between">
          <label className="text-md text-black" data-testid={getTestId(testBase, "label-payment-frequency")}>
            {translations?.payment_frequency}
          </label>
          <div className="flex gap-6">
            <RadioButton
              data-testid={getTestId(testBase, "radio-monthly")}
              name="paymentFrequency"
              value={"MONTHLY"}
              checked={paymentFrequency === "MONTHLY"}
              onChange={handlePaymentFrequencyChange}
              label={translations?.monthly}
              className="accent-[#f75e00] text-sm text-black"
            />
            <RadioButton
              data-testid={getTestId(testBase, "radio-annually")}
              name="paymentFrequency"
              value="ANNUALLY"
              checked={paymentFrequency === "ANNUALLY"}
              onChange={handlePaymentFrequencyChange}
              label={translations?.annually}
              className="accent-[#f75e00] text-sm text-black"
            />
          </div>
        </div>
      </div>

      {/* Access Points Info */}
      <div className="mb-4 flex justify-end" data-testid={getTestId(testBase, "access-points-info")}>
        <LinkButton
          data-testid={getTestId(testBase, "link-access-points")}
          onClick={() => setShowAccessPointsModal(true)}
          className="flex items-center text-xs"
        >
          <MessageIcon type="info" className="mr-1" data-testid={getTestId(testBase, "message-icon-info")} />
          {translations?.what_access_points}
        </LinkButton>
      </div>

      {showMaxLimitMessage && (
        <Message type="error" className="mb-3" data-testid={getTestId(testBase, ["message", "error"])}>
          {translations?.purchase_more_than_acccess_point_contact}
        </Message>
      )}

      {/* Cart Items */}
      <div className="mb-6 shadow-lg bg-white" data-testid={getTestId(testBase, "cartItems")}>
        {(cartItems || []).map((item, index) => {
          return (
            <div
              key={item.id}
              data-testid={getTestId(testBase, `item-${item.id}`)}
              className={`py-6 px-10 mb-1 ${index !== cartItems.length - 1 ? "border-b border-light-smoky-white" : ""}`}
            >
              {/* Desktop */}
              <div className="hidden sm:grid items-center gap-4" style={{ gridTemplateColumns: "1fr 144px 1fr 48px" }}>
                <div className="flex items-center gap-3 text-md">
                  <img
                    src={repairIcon}
                    alt="Repair Color"
                    className="w-[40px]"
                    data-testid={getTestId(testBase, 'repair-icon')}
                  />
                  <ProductName
                    name={item.name}
                    data-testid={getTestId(testBase, `item-${item.id}`)}
                  />
                </div>
                <div className="text-center">
                  <CounterDropdown
                    data-testid={getTestId(testBase, `pro-cart-item-${item.id}-counter`)}
                    value={item.accessPoints}
                    onChange={(value) => handleAccessPointChange(item.id, value)}
                    className="flex-col"
                    showLabel={true}
                    disabled={item.price <= 0} // 🔹 disable if price <= 0
                    onMaxLimitReached={setShowMaxLimitMessage}
                  />
                </div>
                <div className="text-right">
                  <div className="font-normal" data-testid={getTestId(testBase, `pro-cart-item-${item.id}-price`)}>
                    ${item.price?.toFixed(2) ?? "0.00"}
                  </div>
                  <div className="text-sm text-gray-600" data-testid={getTestId(testBase, `${item.isIncluded ? `${translations?.included_with} ${item.includedWith}` : translations?.monthly}`)}>
                    {item.isIncluded ? `${translations?.included_with} ${item.includedWith}` : translations?.monthly}
                  </div>
                </div>
                <div className="flex justify-end" data-testid={getTestId(testBase, 'delete-icon-wrapper')}>
                  {item.price > 0 && (
                    <DeleteIcon
                      data-testid={getTestId(testBase, `item-${item.id}-delete`)}
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-primary hover:text-error cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {/* Mobile */}
              <div className="sm:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={repairIcon} alt="Repair Color" className="w-[30px]" data-testid={getTestId(testBase, 'repair-icon')} />
                    <ProductName
                      name={item.name}
                      data-testid={getTestId(testBase, `item-${item.name}`)}
                    />
                  </div>
                  {item.price > 0 && (
                    <DeleteIcon
                      data-testid={getTestId(testBase, `item-${item.id}-delete`)}
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-error cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <CounterDropdown
                    data-testid={getTestId(testBase, `item-${item.id}-counter`)}
                    value={item.accessPoints}
                    onChange={(value) => handleAccessPointChange(item.id, value)}
                    className="flex-col"
                    showLabel={true}
                    disabled={item.price <= 0} // 🔹 disable if price <= 0
                  />
                  <div className="text-right">
                    <div className="font-normal" data-testid={getTestId(testBase, `item-${item.price}`)}>
                      ${item.price?.toFixed(2) ?? "0.00"}
                    </div>
                    <div className="text-sm text-gray-500 font-light"
                      data-testid={getTestId(testBase, `price-label-${item.isIncluded ? "included" : translations?.monthly}`)}
                    >
                      {item.isIncluded ? `${translations?.included_with} ${item.includedWith}` : translations?.monthly}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Remove Products */}
      <div className="mb-6 flex justify-end" data-testid={getTestId(testBase, 'remove-products')}>
        <LinkButton
          size="sm"
          className="text-xs"
          onClick={handleRemoveAddedProducts}
          data-testid={getTestId(testBase, 'link-remove')}
        >
          {translations?.remove_added_products}
        </LinkButton>
      </div>

      {/* Pricing Summary */}
      <div className="mb-6 shadow-lg bg-white" data-testid={getTestId(testBase, translations?.pricing_summary)} >
        <div className="space-y-2">
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText
                amount={subscriptionSubtotal}
                label={translations?.subscription_subtotal}
                data-testid={getTestId(testBase, translations?.price_subtotal)}
              />
            </div>
          </div>
          {promoCode && (
            <div className="border-b-2 border-light-smoky-white">
              <div className="py-6 px-10 mb-1 flex items-center justify-between">
                {/* Left: Discount + code */}
                <div>
                  <div className="text-md text-black">
                    {translations?.bundle_discount || "Discount"}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 uppercase tracking-wide">
                    {promoCode}
                  </div>
                </div>

                {/* Right: amount + delete icon */}
                <div className="flex items-center gap-4">
                  <div
                    className="text-md text-black"
                    data-testid={getTestId(testBase, translations?.price_discount)}
                  >
                    -${discount.toFixed(2)}
                  </div>
                  <DeleteIcon
                    className="text-primary hover:text-error cursor-pointer"
                    data-testid={getTestId(testBase, "promo-delete")}
                    onClick={handleRemovePromo}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText
                amount={totalMonthly}
                label={translations?.total_monthly}
                data-testid={getTestId(testBase, translations?.price_monthly)}
              />
            </div>
          </div>
          <div className="border-b-2 border-light-smoky-white">
            <div className="py-6 px-10 mb-1">
              <PriceText
                amount={totalDueToday}
                label={translations?.total_due}
                isTotal
                data-testid={getTestId(testBase, translations?.price_total)}
              />
              <p className="text-gray-600 text-right mt-1" data-testid={getTestId(testBase, 'label-tax-note')}>
                {translations?.taxes_not_included}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div
        className={`mb-6 shadow-lg bg-white ${hasPendingPromoInput ? "border-2 border-error" : ""
          }`}
        data-testid={getTestId(testBase, 'promo')}
      >
        <div className="py-6 px-10 flex items-center justify-between">
          <span
            className="text-md text-black whitespace-nowrap mr-4"
            data-testid={getTestId(testBase, 'label-promo-code')}
          >
            {translations?.add_promo_code}
          </span>
          <InputWithButton
            data-testid={getTestId(testBase, 'input-promo')}
            placeholder={translations?.enter_code}
            buttonText={translations?.apply}
            value={value}
            onSubmit={handleApplyPromo}
            handlePromoCodeField={handlePromoCodeField}
            handleKeyDown={handleKeyDown}
            disabled={isPromoApplied}
          />
        </div>
        {/* pending message while typing */}

      </div>
      {hasPendingPromoInput && !error && !promoSuccess && (
        <p
          className="pb-4 text-sm text-error"
          data-testid={getTestId(testBase, "promo-pending")}
        >
          Clear or Apply Promo Code before continuing.
        </p>
      )}

      {/* invalid code / success messages */}
      {error && (
        <p
          className="pb-4 text-sm text-error"
          data-testid={getTestId(testBase, "error")}
        >
          {error}
        </p>
      )}
      {promoSuccess && (
        <span
          className="text-sm text-error pb-6 block"
          data-testid={getTestId(testBase, 'promo-success')}
        >
          {promoSuccess}
        </span>
      )}
      {/* Subscription Term */}
      <div className="mb-4 shadow-lg bg-white" data-testid={getTestId(testBase, 'subscription-term')}>
        <div className="flex items-center justify-between border-b-2 border-light-smoky-white py-6 px-10 w-full mb-1">
          <label className="text-md text-black" data-testid={getTestId(testBase, 'label-subscription-term')}>{translations?.subscription_term}</label>
          <Dropdown
            data-testid={getTestId(testBase, 'dropdown-term')}
            value={subscriptionTerm}
            onValueChange={handleSubscriptionTermChange}
            options={[
              { value: "12 Months", label: "12 Months" },
              { value: "24 Months", label: "24 Months" },
              { value: "36Months", label: "36Months" },
            ]}
            className="max-w-[300px] ml-auto mx-0 mr-0"
          />
        </div>
        <div className="flex items-center justify-between py-6 px-10 w-full">
          <label className="text-black text-md whitespace-nowrap" data-testid={getTestId(testBase, 'renewal-date')}>
            {translations?.auto_renewal_date}:
          </label>
          <div className="text-md ml-4 text-blck text-right" data-testid={getTestId(testBase, 'auto-renewal-date')}>
            {autoRenewalDate}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-3">
        <p className="text-gray-600 mb-6" data-testid={getTestId(testBase, 'promotional-rate')}>
          *{translations?.promotional_rate} {translations?.all_rates_sales_tax} {translations?.tax_apply_checkout}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2" data-testid="pro-cart-actions">
        <Button
          variant="outline"
          className="btn-full cursor-pointer btn btn-primary"
          onClick={handleCheckout}
          data-testid={getTestId(testBase, 'btn-checkout')}
        >
          {translations?.checkout}
        </Button>
        <LinkButton
          variant="ghost"
          className="w-full text-center"
          data-testid={getTestId(testBase, 'btn-continue')}
        >
          {translations?.continue_shopping}
        </LinkButton>
      </div>

      {/* Access Points Modal */}
      <AccessPointsModal
        isOpen={showAccessPointsModal}
        onClose={() => setShowAccessPointsModal(false)}
        data-testid={getTestId(testBase, 'access-modal')}
      />
    </div>
  )
}