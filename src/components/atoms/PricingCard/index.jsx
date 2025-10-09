import { cn } from "@/lib/utils"

export function PricingCard({ title, price, note = "ONE TIME PAYMENT", className }) {
  return (
    <article
      className={cn(
        "group relative border bg-card transition-colors duration-200",
        "outline-none",
        className
      )}
      tabIndex={0}
      aria-label={title}
      style={{ color: "var(--brand-blue)" }}
    >
      {/* top 8px accent bar (always visible) */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ backgroundColor: "var(--brand-orange)" }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-all duration-200",
          "border-0 group-hover:border-[4px] group-focus-visible:border-[4px]"
        )}
        style={{ borderColor: "var(--brand-orange)" }}
        aria-hidden="true"
      />

      <div className="relative p-6 md:p-8 text-center">
        <div
          className="pointer-events-none absolute inset-6 md:inset-8 border opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ borderColor: "var(--brand-orange)" }}
          aria-hidden="true"
        />
        <h3 className="text-pretty text-xs font-semibold tracking-widest md:text-sm uppercase">
          {title}
        </h3>
        <p className="mt-4 text-4xl md:text-5xl font-extrabold" aria-label={`Price ${price}`}>
          {price}
        </p>
        <p className="mt-6 text-xs font-medium tracking-wider">{note}</p>
      </div>
    </article>
  )
}

export default PricingCard
