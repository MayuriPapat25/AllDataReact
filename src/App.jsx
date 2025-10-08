import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/theme.css"; // Gotham @font-face
import "./styles/global.css";

import HomePage from "./HomePage";
import DIYCartHome from "./Cart/diy";
import ProCartHome from "./Cart/professional/index";
import RepCartHome from "./Cart/rep";
import CartPage from "./Cart/diy/cartModal";
import { ProfCustomPortal } from "./ProfCustomPortal";
import DIYCheckout from "./Checkout/DiyCheckoutFlow/index";
import UsAnonyCheckout from "./Checkout/USAnonyCheckout/index";
import UsAuthCheckout from "./Checkout/UsAuthCheckout";
import EuCheckout from "./Checkout/EuCheckout";
import RepInitiatedCheckout from "./Checkout/RepInitiatedCheckout";
import DIYCustomerAccount from "./DIYCustomerAccount";

function App() {
  return (
    <Router>
      {/* Header with Navigation */}
      <header className="bg-gray-100 shadow-md p-4 flex gap-6">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to='/diycustomeraccount' className="text-blue-600 hover:underline">DIY Customer Account</Link>
        <Link to='/profcustomportal' className="text-blue-600 hover:underline">Prof Custom Portal</Link>
        <Link to="/diy" className="text-blue-600 hover:underline">DIY Cart</Link>
        <Link to="/professional" className="text-blue-600 hover:underline">Professional Cart</Link>
        <Link to="/rep" className="text-blue-600 hover:underline">Rep Initiated Cart</Link>
        <Link to='/diycheckout' className="text-blue-600 hover:underline">DIY CHECKOUT</Link>
        <Link to='/usanonycheckout' className="text-blue-600 hover:underline">US Anony Checkout</Link>
        <Link to='/usauthcheckout' className="text-blue-600 hover:underline">US Auth Checkout</Link>
        <Link to='/eucheckout' className="text-blue-600 hover:underline">EU Checkout</Link>
        <Link to='/repinitiatedcheckout' className="text-blue-600 hover:underline">Rep Initiated Checkout</Link>
      </header>

      <main className="container">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />

          {/* DIY Cart page */}
          <Route path="/diy" element={<DIYCartHome />} />

          {/* Professional Cart page */}
          <Route path="/professional" element={<ProCartHome />} />
          <Route path="/rep" element={<RepCartHome />} />

          <Route path="/diy-cart" element={<CartPage />} />

          <Route path="/profcustomportal" element={<ProfCustomPortal />} />
          <Route path="/diycheckout" element={<DIYCheckout />} />
          <Route path="/usanonycheckout" element={<UsAnonyCheckout />} />
          <Route path="/usauthcheckout" element={<UsAuthCheckout />} />
          <Route path="/eucheckout" element={<EuCheckout />} />
          <Route path="/repinitiatedcheckout" element={<RepInitiatedCheckout />} />
          <Route path="/diycustomeraccount" element={<DIYCustomerAccount />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
