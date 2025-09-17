export function AccessPointModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-blue-900">What Are Access Points?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>
              The number of Access Points determines how many users can access an ALLDATA Product at the same time.
            </strong>{" "}
            Adding additional Access Points to select products will increase the monthly or annual subscription prices.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">How Access Points are Used</h3>
            <p className="text-gray-700 leading-relaxed">
              Access Points are required to gain access to ALLDATA Products. Available Access Points are consumed when a
              user opens an ALLDATA product. Once all Access Points are consumed, additional users will be denied access
              to that product until one becomes available. Access Points are automatically released from a user after 30
              minutes of inactivity. Purchasing additional Access Points increases the availability of access to ALLDATA
              Products and is recommended for larger shops.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
