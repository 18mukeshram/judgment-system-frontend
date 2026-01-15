export default function Button({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-6 py-3 text-sm
        border border-border
        bg-surface
        text-fg
        tracking-wide
        hover:border-signal hover:text-signal
        disabled:opacity-40
        disabled:cursor-not-allowed
        transition-colors
      "
    >
      {label}
    </button>
  );
}
