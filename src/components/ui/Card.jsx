export default function Card({ children, selected }) {
  return (
    <div
      className={`
        p-4
        bg-surfaceAlt
        border
        ${selected ? "border-signal" : "border-border"}
        hover:border-fg/40
        transition-colors
      `}
    >
      {children}
    </div>
  );
}
