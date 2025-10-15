import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/theme.css"; // Gotham @font-face
import "./styles/global.css";

import HomePage from "./HomePage";
import ProCartHome from "./Cart/professional/index";
import RepCartHome from "./Cart/RepCart/index";
import DiyCartPage from "./Cart/diy/diyCartModal";
import { ProfCustomPortal } from "./ProfCustomPortal";
import DIYCheckout from "./Checkout/DiyCheckoutFlow/index";
import UsAnonyCheckout from "./Checkout/USAnonyCheckout/index";
import UsAuthCheckout from "./Checkout/UsAuthCheckout";
import EuCheckout from "./Checkout/EuCheckout";
import RepInitiatedCheckout from "./Checkout/RepInitiatedCheckout";
import DIYCustomerAccount from "./DIYCustomerAccount";
import DIYCartFlow from "./Cart/diy/DiyCartFlow";

function App() {
  return (
    <Router>
      {/* Header with Navigation */}
      <header className="bg-gray-100 shadow-md p-4 flex gap-6">
        <Link to="/" className="test-primary hover:underline">Home</Link>
        <Link to='/diycustomeraccount' className="test-primary hover:underline">DIY Customer Account</Link>
        <Link to="/rep" className="test-primary hover:underline">Rep Initiated Cart</Link>
        <Link to="/professional" className="test-primary hover:underline">Professional Cart</Link>
        <Link to="/euprofessional" className="test-primary hover:underline">EU Professional Cart</Link>

        <Link to='/profcustomportal' className="test-primary hover:underline">Prof Custom Portal</Link>
        {/* <Link to="/diy" className="test-primary hover:underline">DIY Cart</Link> */}
        <Link to='/diycheckout' className="test-primary hover:underline">DIY CHECKOUT</Link>
        <Link to='/usanonycheckout' className="test-primary hover:underline">US Anony Checkout</Link>
        <Link to='/usauthcheckout' className="test-primary hover:underline">US Auth Checkout</Link>
        <Link to='/eucheckout' className="test-primary hover:underline">EU Checkout</Link>
        <Link to='/repinitiatedcheckout' className="test-primary hover:underline">Rep Initiated Checkout</Link>
        <Link to='/findvehicle' className="test-primary hover:underline">Find Vehicle</Link>
      </header>

      <main className="container">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/diycustomeraccount" element={<DIYCustomerAccount />} />
          <Route path="/rep" element={<RepCartHome />} />
          <Route path="/professional" element={<ProCartHome fromEU={false} />} />
          <Route path="/euprofessional" element={<ProCartHome fromEU={true} />} />

          <Route path="/diy-cart" element={<DiyCartPage />} />
          <Route path="/profcustomportal" element={<ProfCustomPortal />} />
          {/* <Route path="/diy" element={<DIYCartHome />} /> */}
          <Route path="/diycheckout" element={<DIYCheckout />} />
          <Route path="/usanonycheckout" element={<UsAnonyCheckout />} />
          <Route path="/usauthcheckout" element={<UsAuthCheckout />} />
          <Route path="/eucheckout" element={<EuCheckout />} />
          <Route path="/repinitiatedcheckout" element={<RepInitiatedCheckout />} />
          <Route path="/findvehicle" element={<DIYCartFlow />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
