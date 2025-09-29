const InfoField = ({ label, value, className = "" }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <p className="text-sm text-gray-500 break-words">{value}</p>
        </div>
    )
}

export default InfoField