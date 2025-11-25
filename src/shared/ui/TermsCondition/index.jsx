import { translations } from "../../translations"

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
                {translations?.agree_to}{" "}
                <a href={termsUrl} className="text-primary hover:underline font-medium">
                    {translations?.terms_condition}
                </a>{" "}
                {translations?.opt_in_receive_email} {translations?.respect_privacy} {translations?.learn_more}
                <a href={privacyUrl} className="text-primary hover:underline font-medium">
                    {translations?.privacy_policy}.
                </a>
            </label>
        </div>
    )
}

export default TermsConditions