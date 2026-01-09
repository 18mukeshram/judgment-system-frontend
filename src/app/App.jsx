import { useState } from "react";
import Landing from "../pages/Landing";
import Scenario from "../pages/Scenario";
import Judgment from "../pages/Judgment";
import { useDecisionStore } from "../store/decisionStore";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The App component is the main entry point for the application.
 * It renders one of three pages based on the current page state.
 * The pages are:
 * - Landing: The initial page that prompts the user to start the scenario.
 * - Scenario: The page where the user is presented with a scenario and must make a decision.
 * - Judgment: The page where the user's decision is evaluated and the outcome is presented.
 */
/*******  4c3ae009-2cdc-4add-b4b6-ba2089b4ddbf  *******/ export default function App() {
  const [page, setPage] = useState("landing");
  const [judgmentResult, setJudgmentResult] = useState([]);

  const scenarioIndex = useDecisionStore((state) => state.scenarioIndex);

  return (
    <div className="min-h-screen bg-bg text-fg font-sans">
      {page === "landing" && <Landing onStart={() => setPage("scenario")} />}

      {page === "scenario" && (
        <Scenario
          key={scenarioIndex} // ✅ forces remount per scenario
          onComplete={(result, isFinal) => {
            setJudgmentResult((prev) => (prev ? [...prev, result] : [result]));

            if (isFinal) setPage("judgment");
          }}
        />
      )}

      {page === "judgment" && <Judgment result={judgmentResult} />}
    </div>
  );
}
