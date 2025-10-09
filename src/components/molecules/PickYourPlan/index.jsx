import PricingCard from "../../atoms/PricingCard"

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <header className="mb-8 md:mb-12 text-center">
        <h1
          className="text-balance text-2xl md:text-3xl font-bold"
          style={{ color: "var(--brand-blue)" }}
        >
          Select Your DIY Plan
        </h1>
      </header>

      <section
        aria-label="Pricing options"
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
      >
        <PricingCard title="DIY 1 MONTH SUBSCRIPTION" price="$19.99" />
        <PricingCard title="DIY 1 YEAR SUBSCRIPTION" price="$59.99" />
        <PricingCard title="DIY 3 YEAR SUBSCRIPTION" price="$129.99" />
      </section>

      <p
        className="mt-8 text-center text-xs opacity-70"
        style={{ color: "var(--brand-blue)" }}
      >
        *Plans apply to selected vehicle. Entire subscription period billed at
        time of purchase.
      </p>
    </main>
  )
}
