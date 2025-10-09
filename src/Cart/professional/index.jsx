import ProHeader from "../../components/Header/proHeader";
import { ProCartDropdown } from "../../components/organisms/ProCartDropdown/proCartDropdown";
import "../../styles/button.css"

const ProCartHome = ({ fromEU }) => {
  console.log('fromEU', fromEU)
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