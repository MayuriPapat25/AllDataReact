const OrderConfirmation = ({ orderNumber, loginUrl = "myalldata.com" }) => {
    return (
        <div className="max-w-2xl mx-auto pb-8">
            <div className="text-sm text-muted-foreground mb-4">ORDER #{orderNumber}</div>

            <h1 className="mb-8">THANK YOU FOR YOUR PURCHASE.</h1>

            <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>Your order has been received! You can login now at: {loginUrl}</p>
                <p>
                    (Note: Continued product access is subject to order confirmation. You will receive an email confirmation in a
                    few business days.)
                </p>
            </div>
        </div>
    )
}

export default OrderConfirmation