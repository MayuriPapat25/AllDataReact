export function Steps({ currentStep }) {
  const steps = [
    { number: 1, title: "FIND YOUR VEHICLE" },
    { number: 2, title: "PICK YOUR PLAN" },
    { number: 3, title: "PLACE YOUR ORDER" },
  ]

  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                step.number === currentStep
                  ? "bg-primary"
                  : step.number < currentStep
                  ? "bg-green-600"
                  : "bg-gray-400"
              }`}
            >
              {step.number}
            </div>
            <span className="text-xs font-medium mt-2 text-center max-w-16 md:max-w-20 text-primary">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-2 md:w-4 h-px bg-primary mx-0.5 md:mx-1 mt-[-20px]" />
          )}
        </div>
      ))}
    </div>
  )
}
