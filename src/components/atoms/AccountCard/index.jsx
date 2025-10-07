const AccountCard = ({ title, children, className = "" }) => {
    return (
        <div
            className={`w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-100 ${className}`}
        >
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 tracking-wide uppercase">{title}</h2>
            <div className="space-y-4 sm:space-y-6">{children}</div>
        </div>
    )
}

export default AccountCard
