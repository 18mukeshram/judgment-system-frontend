export default function Button({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-6 py-3
        border border-fg/20
        text-sm tracking-wide
        hover:border-accent hover:text-accent
        transition
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
    >
      {label}
    </button>
  );
}
