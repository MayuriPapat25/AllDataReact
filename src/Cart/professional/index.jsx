import ProHeader from "../../components/Header/proHeader";
import { ProCartDropdown } from "../../components/organisms/proCartDropdown";
import "../../styles/button.css"

export default function ProCartHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProHeader />
      <main className="p-4">
        <ProCartDropdown variant="fullpage" />
      </main>
    </div>
  );
}
