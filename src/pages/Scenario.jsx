import { useEffect, useState } from "react";
import { SCENARIOS } from "../scenarios/scenarios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Timer from "../components/ui/Timer";
import { useDecisionStore } from "../store/decisionStore";
import { evaluateDecision } from "../scoring/evaluateDecision";

export default function Scenario({ onComplete }) {
  const {
    scenarioIndex,
    selectedOptions,
    locked,
    startTime,
    startScenario,
    setSelected,
    lockDecision,
  } = useDecisionStore();

  const scenario = SCENARIOS[scenarioIndex];

  // ✅ Initialized ONCE per mount (no reset effect)
  const [timeLeft, setTimeLeft] = useState(scenario.timeLimit);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // ✅ Start scenario once per mount
  useEffect(() => {
    startScenario();
  }, [startScenario]);

  // ⏱ Countdown timer
  useEffect(() => {
    if (locked || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, locked]);

  // ⛔ Auto-submit on timeout
  useEffect(() => {
    if (!locked && timeLeft === 0) {
      lockDecision();

      const result = evaluateDecision({
        selectedOptions,
        scenario,
        startTime,
        endTime: Date.now(),
      });

      onComplete(result, scenarioIndex + 1 >= SCENARIOS.length);
    }
  }, [
    timeLeft,
    locked,
    lockDecision,
    selectedOptions,
    scenario,
    startTime,
    onComplete,
    scenarioIndex,
  ]);

  const canSubmit = selectedOptions.length > 0 && !locked;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-5xl bg-surface border border-border p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-tight">
            {scenario.title}
          </h2>
          <Timer value={timeLeft} />
        </div>

        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          {scenario.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.options.map((opt) => (
            <Card key={opt.id} selected={selectedOptions.includes(opt.id)}>
              <button
                className="w-full text-left"
                onClick={() => setSelected(opt.id)}
                disabled={locked}
              >
                {opt.label}
              </button>
            </Card>
          ))}
        </div>

        <Button
          label="Submit Decision"
          disabled={!canSubmit}
          onClick={() => {
            lockDecision();

            const result = evaluateDecision({
              selectedOptions,
              scenario,
              startTime,
              endTime: Date.now(),
            });

            onComplete(result, scenarioIndex + 1 >= SCENARIOS.length);
          }}
        />
      </div>
    </div>
  );
}
