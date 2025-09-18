export const CART_TEXT = {
  PROMO_CODE: {
    LABEL: "Add Promo Code",
    PLACEHOLDER: "ENTER CODE",
    BUTTON: "APPLY",
  },
  PAYMENT_FREQUENCY: {
    MONTHLY: "MONTHLY",
    ANNUALLY: "ANNUALLY",
  },
  ACCESS_POINTS: {
    LINK: "What are Access Points?",
    MODAL_TITLE: "What Are Access Points?",
    DESCRIPTION:
      "The number of Access Points determines how many users can access an ALLDATA Product at the same time. Adding additional Access Points to select products will increase the monthly or annual subscription prices.",
    HOW_USED_TITLE: "How Access Points are Used",
    HOW_USED_DESCRIPTION:
      "Access Points are required to gain access to ALLDATA Products. Available Access Points are consumed when a user opens an ALLDATA product. Once all Access Points are consumed, additional users will be denied access to that product until one becomes available. Access Points are automatically released from a user after 30 minutes of inactivity. Purchasing additional Access Points increases the availability of access to ALLDATA Products and is recommended for larger shops.",
    CLOSE_BUTTON: "CLOSE",
  },
  BUTTONS: {
    CHECKOUT: "CHECKOUT",
    CONTINUE_SHOPPING: "Continue Shopping",
    REMOVE_PRODUCTS: "Remove Added Products",
  },
  SUBSCRIPTION: {
    TITLE: "Cart Subscription Preview",
    WARNING: "Your Total Due has been updated. Please review your cart before continuing with purchase.",
    SUBTOTAL: "Subscription Subtotal",
    BUNDLE_DISCOUNT: "Bundle Discount",
    TOTAL_MONTHLY: "Total Monthly",
    TOTAL_DUE: "Total Due:",
    TAXES_NOT_INCLUDED: "Taxes Not Included",
    SUBSCRIPTION_TERM: "Subscription Term",
    AUTO_RENEWAL: "Auto Renewal Date",
    PROMOTIONAL_NOTE: "*Promotional rate. All rates subject to applicable sales taxes. Taxes applied at check out.",
  },
} as const
