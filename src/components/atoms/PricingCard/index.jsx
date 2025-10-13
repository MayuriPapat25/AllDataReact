import { cn } from "../../../../utils/utils"

export function PricingCard({ title, price, note = "ONE TIME PAYMENT", className }) {
  return (
    <article
      className={cn(
        "group relative border border-gray-200 bg-card transition-colors duration-200 shadow-lg bg-white",
        "outline-none",
        className
      )}
      tabIndex={0}
      aria-label={title}
      style={{ color: "var(--brand-blue)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ backgroundColor: "var(--color-secondary)" }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-all duration-200",
          "border-0 group-hover:border-[4px] group-focus-visible:border-[4px]"
        )}
        style={{ borderColor: "var(--color-secondary)" }}
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-8 text-center">
        <div
          className="pointer-events-none border border-white group-hover:border-secondary transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 p-4"
          aria-hidden="true"
        >
          <p className="text-base font-medium uppercase text-gray-600">
            {title}
          </p>
          <h3 className="mt-4 h2 md:text-5xl font-bold text-primary" aria-label={`Price ${price}`}>
            {price}
          </h3>
          <p className="mt-6 text-xs font-medium tracking-wider text-primary">{note}</p>
        </div>
      </div>
    </article>
  )
}

export default PricingCard
