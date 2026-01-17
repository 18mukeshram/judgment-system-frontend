import { useState } from "react";
import Landing from "../pages/Landing";
import Scenario from "../pages/Scenario";
import Judgment from "../pages/Judgment";
import { useDecisionStore } from "../store/decisionStore";
import Background from "../components/ui/Background";

export default function App() {
  const [page, setPage] = useState("landing");
  const [judgmentResult, setJudgmentResult] = useState([]);

  const scenarioIndex = useDecisionStore((state) => state.scenarioIndex);
  const lockedOut = useDecisionStore((state) => state.scenarioIndex >= 2);

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">
      <Background />
      {/* Landing (unlocked) */}
      {page === "landing" && !lockedOut && (
        <Landing onStart={() => setPage("scenario")} />
      )}

      {/* Landing (locked) */}
      {page === "landing" && lockedOut && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <p className="text-muted text-sm">
            This session has already been evaluated.
          </p>
        </div>
      )}

      {/* Scenario */}
      {page === "scenario" && (
        <Scenario
          key={scenarioIndex} // ✅ forces remount per scenario
          onComplete={(result, isFinal) => {
            setJudgmentResult((prev) => [...prev, result]);

            if (isFinal) setPage("judgment");
          }}
        />
      )}

      {/* Judgment */}
      {page === "judgment" && <Judgment result={judgmentResult} />}
    </div>
  );
}
