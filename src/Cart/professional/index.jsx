import ProHeader from "../../components/Header/proHeader";
import { ProCartDropdown } from "../../components/organisms/ProCartDropdown/ProCartDropdown";
import "../../styles/button.css"

const ProCartHome = ({ fromEU }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProHeader />
      <main className="container">
        <ProCartDropdown variant="fullpage" fromEU={fromEU} />
      </main>
    </div>
  );
}

export default ProCartHome