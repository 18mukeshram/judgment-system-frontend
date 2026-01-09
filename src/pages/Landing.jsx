import Button from "../components/ui/Button";

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          This system evaluates how you decide under constraints.
        </h1>

        <p className="text-muted text-sm">
          There are no correct answers. Only consequences.
        </p>

        <Button label="Start" onClick={onStart} />
      </div>
    </div>
  );
}
