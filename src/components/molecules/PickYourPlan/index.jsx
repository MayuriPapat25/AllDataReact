"use client";
import { useState } from "react";
import { Dropdown } from "../../../shared/ui/Dropdown/Dropdown";
import PricingCard from "../../../shared/ui/PricingCard"

export default function PickYourPlan({ onContinue }) {
  const [region, setRegion] = useState("usa");

  const regionOptions = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "eu", label: "European Union" },
  ];

  // Called when user clicks on a plan card
  const handleSelectPlan = () => {
    if (onContinue) {
      onContinue(); // pass selected plan + region upward
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 md:py-16">
      <header className="mb-8 md:mb-12 text-center">
        <h1
          className="h2 text-balance mb-8"
          style={{ color: "var(--brand-blue)" }}
        >
          PICK YOUR PLAN
        </h1>

        <div className="w-80 mx-auto pb-10">
          <Dropdown
            label="Region"
            value={region}
            onValueChange={setRegion}
            options={regionOptions}
          />
        </div>

        <p className="text-gray-600">
          <strong>
            2024 Audi A4 Quattro Allroad 45 (8WJ) L4-2.0L Turbo (DPAA) MHEV
          </strong>
        </p>
      </header>

      <section
        aria-label="Pricing options"
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mb-2.5 "
      >
        <PricingCard
          title="DIY 1 MONTH SUBSCRIPTION"
          price="$19.99"
          onClick={() => handleSelectPlan()}
        />
        <PricingCard
          title="DIY 1 YEAR SUBSCRIPTION"
          price="$59.99"
          onClick={() => handleSelectPlan()}
        />
        <PricingCard
          title="DIY 3 YEAR SUBSCRIPTION"
          price="$129.99"
          onClick={() => handleSelectPlan()}
        />
      </section>

      <p className="mb-5 text-center font-medium text-sm opacity-70">
        *Plans apply to selected vehicle. Entire subscription period billed at
        time of purchase. Promo Codes may be applied during the checkout
        process.
      </p>
    </main>
  );
}
