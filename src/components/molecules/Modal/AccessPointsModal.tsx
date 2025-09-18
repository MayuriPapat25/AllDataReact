"use client"

export function AccessPointsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600">What Are Access Points?</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
              ×
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              <strong>
                The number of Access Points determines how many users can access an ALLDATA Product at the same time.
              </strong>
              Adding additional Access Points to select products will increase the monthly or annual subscription
              prices.
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">How Access Points are Used</h3>
              <p className="text-gray-700 leading-relaxed">
                Access Points are required to gain access to ALLDATA Products. Available Access Points are consumed when
                a user opens an ALLDATA product. Once all Access Points are consumed, additional users will be denied
                access to that product until one becomes available. Access Points are automatically released from a user
                after 30 minutes of inactivity. Purchasing additional Access Points increases the availability of access
                to ALLDATA Products and is recommended for larger shops.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
