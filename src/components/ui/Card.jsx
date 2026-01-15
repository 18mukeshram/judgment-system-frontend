export default function Card({ children, selected, disabled }) {
  return (
    <div
      className={`
        relative
        p-5
        bg-surfaceAlt
        border
        transition-all duration-300 ease-out
        ${
          selected
            ? "border-signal bg-signal/5 shadow-glow"
            : "border-border hover:border-borderLight hover:bg-surface"
        }
        ${disabled ? "opacity-40 pointer-events-none" : "cursor-pointer"}
      `}
    >
      {/* Corner Markers */}
      <span
        className={`absolute -top-px -left-px w-2.5 h-2.5 border-l border-t transition-colors duration-300
          ${selected ? "border-signal" : "border-muted/30"}`}
      />
      <span
        className={`absolute -top-px -right-px w-2.5 h-2.5 border-r border-t transition-colors duration-300
          ${selected ? "border-signal" : "border-muted/30"}`}
      />
      <span
        className={`absolute -bottom-px -left-px w-2.5 h-2.5 border-l border-b transition-colors duration-300
          ${selected ? "border-signal" : "border-muted/30"}`}
      />
      <span
        className={`absolute -bottom-px -right-px w-2.5 h-2.5 border-r border-b transition-colors duration-300
          ${selected ? "border-signal" : "border-muted/30"}`}
      />

      {/* Lock Indicator */}
      {selected && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-slow" />
          <span className="text-system text-signal">Locked</span>
        </span>
      )}

      {/* Content */}
      <div
        className={`pr-16 ${
          selected ? "text-fg" : "text-muted"
        } transition-colors`}
      >
        {children}
      </div>
    </div>
  );
}
