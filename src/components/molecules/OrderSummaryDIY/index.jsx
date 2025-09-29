import OrderSummaryCardDIY from "../OrderSummaryCardDIY"

const OrderSummaryDIY = () => {
    return (
        <div className="max-w-2xl mx-auto bg-[#f5f5f5]  p-6">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide text-black">Order Summary</h2>
            <OrderSummaryCardDIY />
            <div className="space-y-2">
                {/* <TitleValue title="Subtotal:" value="$19.99" /> */}
                <div className="flex justify-between items-center mt-1">
                    <span className="text-foreground font-light">Subtotal:</span>
                    <span className="text-muted-foreground font-light">
                        $19.99
                    </span>
                </div>
                {/* <TitleValue title="Sales Tax:" value="$1.77" /> */}
                <div className="flex justify-between items-center mt-1">
                    <span className="text-foreground font-light">Sales Tax:</span>
                    <span className="text-muted-foreground font-light">
                        $1.77
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 mt-1">
                    <span className="text-blue-600 font-bold text-xl">Total:</span>
                    <span className="text-blue-600 font-bold text-xl">$21.76</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryDIY
