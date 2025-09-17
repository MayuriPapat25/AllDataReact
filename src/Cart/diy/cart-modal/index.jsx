import { HeaderWithCart } from "../../../components/Header/header-with-cart";
import "./cart-modal.css";

export default function DIYCartHome() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderWithCart />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Welcome to ALLDATA DIY</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional automotive repair information for DIY enthusiasts. Click the cart icon in the header to see the
            cart dropdown in action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Repair Guides</h3>
              <p className="text-muted-foreground">Step-by-step repair procedures for your vehicle</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Wiring Diagrams</h3>
              <p className="text-muted-foreground">Detailed electrical schematics and diagrams</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Technical Bulletins</h3>
              <p className="text-muted-foreground">Latest service bulletins and recalls</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
