import RepHeader from "../../components/Header/repHeader";
import { RepCartDropdown } from "../../components/organisms/repCartDropdown"

export default function RepCartHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RepHeader />
      <main className="p-4">
        <RepCartDropdown variant="fullpage" />
      </main>
    </div>
  );
}
