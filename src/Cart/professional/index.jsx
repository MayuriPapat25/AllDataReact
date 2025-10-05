import ProHeader from "../../components/Header/proHeader";
import { ProCartDropdown } from "../../components/organisms/ProCartDropdown/proCartDropdown";
import "../../styles/button.css"

const ProCartHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProHeader />
      <main className="p-4">
        <ProCartDropdown variant="fullpage" />
      </main>
    </div>
  );
}

export default ProCartHome