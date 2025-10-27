import { PriceDisplay } from "../../../shared/ui/PriceDisplay"
import { ProductInfo } from "../../../shared/ui/ProductInfo"


export function SubscriptionCard({
    title,
    description,
    accessDuration,
    price,
    priceNote = "one time charge",
    className = "",
}) {
    return (
        <div className={`w-full max-w-md mx-auto bg-gray-50 border-gray-200 shadow-lg bg-white ${className}`}>
            <div className="p-6 space-y-4">
                <ProductInfo title={title} description={description} />
                <ProductInfo description={accessDuration} />
                <PriceDisplay price={price} note={priceNote} />
            </div>
        </div>
    )
}
