import { cn } from "../../../shared/utils/utils"

const CheckoutSteps = ({ currentStep, steps }) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="overflow-x-auto">
                <div className="flex items-start justify-center relative min-w-[600px] md:min-w-0 gap-4 md:gap-8 lg:gap-12">
                    {steps.length > 0 && steps.map((step, index) => {
                        const isCompleted = currentStep > step.number || (currentStep === step.number && currentStep === steps.length)
                        const isCurrent = step.number === currentStep
                        const isLineCompleted = currentStep > step.number
                        const showLine = index < steps.length - 1

                        return (
                            <div key={step.number} className="flex flex-col items-center relative flex-1 max-w-[120px]">
                                {showLine && (
                                    <div className="absolute top-6 left-1/2 w-full h-1 bg-gray-300 z-0">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-300 ease-in-out",
                                                isLineCompleted ? "bg-blue-900" : "bg-gray-300",
                                            )}
                                            style={{
                                                width: isLineCompleted ? "100%" : "0%",
                                            }}
                                        />
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 relative z-10",
                                        isCompleted ? "bg-blue-900 text-white" : isCurrent ? "bg-blue-900 text-white" : "bg-white border-2 border-gray-300 text-gray-400",
                                    )}
                                >
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        step.number
                                    )}
                                </div>

                                <span
                                    className={cn(
                                        "mt-3 text-xs font-medium text-center leading-tight cursor-default",
                                        "break-words hyphens-auto",
                                        isCurrent ? "text-blue-900 font-bold" : isCompleted ? "text-gray-700" : "text-gray-400",
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CheckoutSteps