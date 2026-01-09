import { useDecisionStore } from "../store/decisionStore";

export default function Judgment() {
  const { selectedOptions } = useDecisionStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Decision Recorded</h2>

        <p className="text-muted text-sm">
          You selected: {selectedOptions.join(", ")}
        </p>

        <p className="text-sm">
          Judgment will be revealed after all scenarios.
        </p>
      </div>
    </div>
  );
}
