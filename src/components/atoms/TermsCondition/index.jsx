
const TermsConditions = ({
    id = "terms",
    checked,
    onCheckedChange,
    companyName = "ALLDATA",
    termsUrl = "#",
    privacyUrl = "#",
    className = "",
}) => {
    return (
        <div className={`flex items-start space-x-3 py-4 ${className}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="mt-1 h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
            />
            <label htmlFor={id} className="text-gray-600 leading-relaxed cursor-pointer">
                I agree to {companyName}'s{" "}
                <a href={termsUrl} className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                </a>{" "}
                and opt-in to receive emails from {companyName}. We respect your privacy. Learn more about {companyName}'s{" "}
                <a href={privacyUrl} className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                </a>
                .
            </label>
        </div>
    )
}

export default TermsConditions