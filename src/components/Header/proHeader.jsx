import { useState, useEffect } from "react"
import { Button } from "../../shared/ui/Buttons/Button"
import { ProCartDropdown } from "../organisms/ProCartDropdown/ProCartDropdown"
import { setAutoRenewalDate, setCartItems } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

export default function ProHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Initialize default cart on first render if empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      dispatch(
        setCartItems([
          { id: "mobile", name: "Mobile", type: "mobile", price: 39.0, accessPoints: 1, },
          { id: "basic-diagnostics", name: "Basic Diagnostics", type: "diagnostics", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Mobile" },
          { id: "repair", name: "Repair", type: "repair", price: 179.0, accessPoints: 1 },
          { id: "community", name: "Community", type: "community", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
          { id: "estimator", name: "Estimator", type: "estimator", price: 0.0, accessPoints: 1, isIncluded: true, includedWith: "Repair" },
        ])
      );
    } else {
      const needsBase = (cartItems || []).some(it => it.basePrice === undefined);
      if (needsBase) {
        const withBase = (cartItems || []).map(it => ({ ...it, basePrice: it.basePrice ?? it.price ?? 0 }));
        dispatch(setCartItems(withBase));
      }
    }
    dispatch(setAutoRenewalDate("09/09/2026"));

  }, []);

  const groupedProducts = (cartItems || []).reduce((acc, item) => {
    if (item.isIncluded && item.includedWith) {
      const key = item.includedWith.toLowerCase();
      if (!acc[key]) acc[key] = true;
    } else {
      const key = item.name.toLowerCase();
      if (!acc[key]) acc[key] = true;
    }
    return acc;
  }, {});

  const productCount = Object.keys(groupedProducts).length;

  return (
    <header className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ALLDATA Professional</h1>

        <Button
          onClick={() => setIsCartOpen(true)}
          variant="ghost"
          size="sm"
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          {/* Cart Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {/* Cart Badge */}

          {
            productCount > 0 &&
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {productCount}
            </span>
          }

        </Button>
      </div>

      {/* Fullscreen Drawer Modal */}
      <ProCartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
