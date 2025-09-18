"use client"

import { InputWithButton } from "../../../components/atoms/InputField/InputWithButton" // updated path
import { CART_TEXT } from "@/constants/text"

export function PromoCodeSection({ onApplyPromo }) {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{CART_TEXT.PROMO_CODE.LABEL}</label>
      <InputWithButton
        placeholder={CART_TEXT.PROMO_CODE.PLACEHOLDER}
        buttonText={CART_TEXT.PROMO_CODE.BUTTON}
        onSubmit={onApplyPromo}
      />
    </div>
  )
}
