import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import HomePage from "./HomePage";
import DIYCartHome from "./Cart/diy";
import ProCartHome from "./Cart/professional";
import CartPage from "./Cart/diy/cartModal"
import Checkout from './Checkout/index'
import { ProfCustomPortal } from "./ProfCustomPortal";

function App() {
  return (
    <Router>
      {/* Header with Navigation */}
      <header className="bg-gray-100 shadow-md p-4 flex gap-6">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/diy" className="text-blue-600 hover:underline">DIY Cart</Link>
        <Link to="/professional" className="text-blue-600 hover:underline">Professional Cart</Link>
        <Link to='/checkout' className="text-blue-600 hover:underline">Checkout</Link>
        <Link to='/profcustomportal' className="text-blue-600 hover:underline">Prof Custom Portal</Link>

      </header>

      <main className="p-6 bg-[#fafafa]">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />

          {/* DIY Cart page */}
          <Route path="/diy" element={<DIYCartHome />} />

          {/* Professional Cart page */}
          <Route path="/professional" element={<ProCartHome />} />

          <Route path="/diy-cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profcustomportal" element={<ProfCustomPortal />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
