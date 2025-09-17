

export function PriceDisplay({ price, note, className = "" }) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-baseline sm:gap-2 ${className}`}>
            <span className="text-lg md:text-xl font-semibold text-black">{price}</span>
            {note && <span className="text-xs md:text-sm text-gray-400 mt-1 sm:mt-0">{note}</span>}
        </div>
    )
}
