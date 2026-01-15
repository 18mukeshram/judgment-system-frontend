export default function Timer({ value, total }) {
  const critical = value <= 10;
  const urgent = value <= 5;

  const percentage = total ? (value / total) * 100 : null;

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Label */}
      <span className="text-system">Remaining</span>

      {/* Display */}
      <div
        className={`
          relative
          px-5 py-2.5
          bg-bg
          border
          font-mono text-lg font-semibold tracking-widest
          transition-all duration-300
          ${
            urgent
              ? "border-critical text-critical shadow-glow-critical animate-pulse-critical"
              : critical
              ? "border-signal text-signal shadow-glow animate-pulse-slow"
              : "border-border text-fg"
          }
        `}
      >
        {/* Corner Markers */}
        <span
          className={`absolute -top-px -left-px w-2 h-2 border-l border-t transition-colors
          ${
            urgent
              ? "border-critical"
              : critical
              ? "border-signal"
              : "border-muted/30"
          }`}
        />
        <span
          className={`absolute -top-px -right-px w-2 h-2 border-r border-t transition-colors
          ${
            urgent
              ? "border-critical"
              : critical
              ? "border-signal"
              : "border-muted/30"
          }`}
        />
        <span
          className={`absolute -bottom-px -left-px w-2 h-2 border-l border-b transition-colors
          ${
            urgent
              ? "border-critical"
              : critical
              ? "border-signal"
              : "border-muted/30"
          }`}
        />
        <span
          className={`absolute -bottom-px -right-px w-2 h-2 border-r border-b transition-colors
          ${
            urgent
              ? "border-critical"
              : critical
              ? "border-signal"
              : "border-muted/30"
          }`}
        />
        {/* Value */}
        T−{String(value).padStart(2, "0")}
      </div>

      {/* Progress Bar */}
      {percentage !== null && (
        <div className="w-full h-0.5 bg-border overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear
              ${
                urgent ? "bg-critical" : critical ? "bg-signal" : "bg-muted/50"
              }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
