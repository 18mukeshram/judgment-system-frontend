export default function SystemMarker({
  label,
  value,
  variant = "default",
  className = "",
}) {
  const variants = {
    default: "text-muted border-border",
    active: "text-signal border-signal/30",
    critical: "text-critical border-critical/30",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-system opacity-50">{label}</span>
      <span
        className={`
        px-2 py-0.5 
        font-mono text-xs tracking-wider
        border
        ${variants[variant]}
      `}
      >
        {value}
      </span>
    </div>
  );
}
