import { useState } from "react";
import Landing from "../pages/Landing";
import Scenario from "../pages/Scenario";
import Judgment from "../pages/Judgment";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">
      {page === "landing" && <Landing onStart={() => setPage("scenario")} />}
      {page === "scenario" && (
        <Scenario onComplete={() => setPage("judgment")} />
      )}
      {page === "judgment" && <Judgment />}
    </div>
  );
}
