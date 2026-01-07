export default function Card({ children, selected }) {
  return (
    <div
      className={`
        border p-4
        ${selected ? "border-accent" : "border-fg/20"}
        transition
      `}
    >
      {children}
    </div>
  );
}
