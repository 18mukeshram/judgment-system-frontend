import Button from "../components/ui/Button";

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-surface border border-border p-10 space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Decision Evaluation System
        </h1>

        <p className="text-sm text-muted leading-relaxed">
          This system evaluates how decisions are made under constraint.
          Outcomes are recorded. Explanations are not provided.
        </p>

        <Button label="Initialize Evaluation" onClick={onStart} />
      </div>
    </div>
  );
}
