import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Timer from "../components/ui/Timer";
import { useDecisionStore } from "../store/decisionStore";
import { evaluateDecision } from "../scoring/evaluateDecision";

const SCENARIO = {
  id: 1,
  title: "Budget Allocation",
  description:
    "You have ₹10,00,000 to allocate across departments. You must allocate all funds. Time is limited.",
  timeLimit: 90,
  options: [
    { id: "rnd", label: "R&D", risk: 3 },
    { id: "marketing", label: "Marketing", risk: 2 },
    { id: "operations", label: "Operations", risk: 1 },
    { id: "sales", label: "Sales", risk: 2 },
    { id: "support", label: "Support", risk: 1 },
  ],
};

export default function Scenario({ onComplete }) {
  const {
    selectedOptions,
    locked,
    startTime,
    setSelected,
    lockDecision,
    setStartTime,
  } = useDecisionStore();

  const [timeLeft, setTimeLeft] = useState(SCENARIO.timeLimit);

  // Start timer once
  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [startTime, setStartTime]);

  // Countdown logic
  useEffect(() => {
    if (locked) return;

    if (timeLeft <= 0) {
      lockDecision();

      const result = evaluateDecision({
        selectedOptions,
        scenario: SCENARIO,
        startTime,
        endTime: Date.now(),
      });

      onComplete(result);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, locked, lockDecision, onComplete, selectedOptions, startTime]);

  const toggleOption = (id) => {
    if (locked) return;
    setSelected(id);
  };

  const canSubmit = selectedOptions.length > 0 && !locked;

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{SCENARIO.title}</h2>
        <Timer value={timeLeft} />
      </div>

      <p className="text-muted">{SCENARIO.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCENARIO.options.map((opt) => (
          <Card key={opt.id} selected={selectedOptions.includes(opt.id)}>
            <button
              className="w-full text-left"
              onClick={() => toggleOption(opt.id)}
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
            scenario: SCENARIO,
            startTime,
            endTime: Date.now(),
          });

          onComplete(result);
        }}
      />
    </div>
  );
}
