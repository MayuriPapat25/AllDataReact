import { InputWithButton } from "../../../shared/ui/InputField/InputWithButton" // updated path

export function PromoCodeSection({ onApplyPromo }) {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">LABEL</label>
      <InputWithButton
        placeholder="PLACEHOLDER"
        buttonText="PROMO_CODE BUTTON"
        onSubmit={onApplyPromo}
      />
    </div>
  )
}
