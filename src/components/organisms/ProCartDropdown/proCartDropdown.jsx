import { Button } from "../../atoms/Buttons/Button"
import { Icon } from "../../atoms/Icon/Icon"
import { ProCartContent } from "../ProCartContent/ProCartContent"

export function ProCartDropdown({ isOpen = true, onClose, variant = "dropdown" }) {
  if (variant === "dropdown" && !isOpen) return null

  return (
    <>
      {
        variant === "dropdown" &&
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] md:w-[600px] bg-light-smoky-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between py-4 px-8 border-b">
              <h4 className="text-primary">Cart Subscription Preview</h4>
              <Button
                onClick={onClose}
                variant="ghost"
                aria-label="Close cart"
                className="p-0 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Icon type="close" className="text-xl" />
              </Button>
            </div>
            <div className="py-4 px-8">
              <ProCartContent />
            </div>
          </div>
        </div>
      }
    </>
  )
}
