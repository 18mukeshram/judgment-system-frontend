export default function Button({
  label,
  onClick,
  disabled,
  variant = "default",
}) {
  const base = `
    relative group
    px-8 py-3.5
    font-mono text-xs font-medium tracking-[0.2em] uppercase
    border
    transition-all duration-300 ease-out
    focus-visible:outline-none
  `;

  const variants = {
    default: `
      bg-surface border-border text-muted
      hover:border-signal hover:text-signal hover:shadow-glow
      hover:bg-signal/5
      disabled:opacity-30 
      disabled:cursor-not-allowed 
      disabled:hover:border-border 
      disabled:hover:text-muted 
      disabled:hover:shadow-none
      disabled:hover:bg-surface
    `,
    primary: `
      bg-signal/10 border-signal/50 text-signal
      hover:border-signal hover:bg-signal/20 hover:shadow-glow-strong
      disabled:opacity-30 
      disabled:cursor-not-allowed
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {/* Corner Accents */}
      <span
        className="absolute top-0 left-0 w-3 h-3 border-l border-t border-border 
                       group-hover:border-signal/50 transition-colors duration-300"
      />
      <span
        className="absolute top-0 right-0 w-3 h-3 border-r border-t border-border 
                       group-hover:border-signal/50 transition-colors duration-300"
      />
      <span
        className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-border 
                       group-hover:border-signal/50 transition-colors duration-300"
      />
      <span
        className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-border 
                       group-hover:border-signal/50 transition-colors duration-300"
      />

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
