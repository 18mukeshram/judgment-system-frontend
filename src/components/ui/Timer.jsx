export default function Timer({ value }) {
  const critical = value <= 10;

  return (
    <div
      className={`
        font-mono text-xs tracking-widest
        ${critical ? "text-signal" : "text-muted"}
      `}
    >
      T–{value}s
    </div>
  );
}
