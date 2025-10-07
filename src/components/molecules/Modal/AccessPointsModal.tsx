import React, { useEffect } from "react"
import { Button } from "../../atoms/Buttons/Button"
import { Icon } from "../../atoms/Icon/Icon"

type AccessPointsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AccessPointsModal({ isOpen, onClose }: AccessPointsModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="access-points-title">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 id="access-points-title" className="h3 text-primary">
              What Are Access Points?
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 cursor-pointer hover:text-gray-600 p-0"
              aria-label="Close modal"
            >
              <Icon type="close" className="text-xl cursor-pointer" />
            </Button>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 space-y-4">
            <strong>
              The number of Access Points determines how many users can access
              an ALLDATA Product at the same time.
            </strong>{" "}
            <p className="text-gray-700 leading-relaxed">
              Adding additional Access Points to select products will increase
              the monthly or annual subscription prices.
            </p>

            <div className="space-y-3">
              <strong className="font-semibold">
                How Access Points are Used
              </strong>
              <p className="text-gray-700 leading-relaxed">
                Access Points are required to gain access to ALLDATA Products.
                Available Access Points are consumed when a user opens an ALLDATA
                product. Once all Access Points are consumed, additional users
                will be denied access to that product until one becomes
                available. Access Points are automatically released from a user
                after 30 minutes of inactivity. Purchasing additional Access
                Points increases the availability of access to ALLDATA Products
                and is recommended for larger shops.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              size="md"
              className="w-full max-w-[300px]"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
