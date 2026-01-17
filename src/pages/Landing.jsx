import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import SystemMarker from "../components/ui/SystemMarker";

// Moved outside component - pure function
function getSystemTime() {
  return new Date().toISOString().slice(11, 19);
}

export default function Landing({ onStart }) {
  const [initialized, setInitialized] = useState(false);
  const [systemTime, setSystemTime] = useState(() => getSystemTime());

  useEffect(() => {
    const timer = setTimeout(() => setInitialized(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(getSystemTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* System Header */}
        <div
          className={`
          flex items-center justify-between mb-8 pb-4 border-b border-border
          ${initialized ? "animate-fade-in" : "opacity-0"}
        `}
        >
          <div className="flex items-center gap-4">
            <span className="status-dot active" />
            <span className="text-system">System Online</span>
          </div>
          <SystemMarker label="SYS.TIME" value={systemTime} />
        </div>

        {/* Main Panel */}
        <div
          className={`
          panel p-10
          ${initialized ? "animate-slide-up delay-200" : "opacity-0"}
        `}
        >
          {/* Panel Header */}
          <div className="panel-header">
            <h1 className="font-mono text-sm font-medium tracking-wider text-signal uppercase">
              Decision Evaluation System
            </h1>
          </div>

          {/* Classification Badge */}
          <div
            className={`
            inline-flex items-center gap-2 mb-8 px-3 py-1.5 
            bg-surfaceAlt border border-border
            ${initialized ? "animate-fade-in delay-300" : "opacity-0"}
          `}
          >
            <span className="w-2 h-2 bg-signal/50" />
            <span className="font-mono text-xs tracking-widest text-muted uppercase">
              Classification: Standard Protocol
            </span>
          </div>

          {/* Description */}
          <p
            className={`
            text-sm text-muted leading-relaxed max-w-lg mb-10
            ${initialized ? "animate-fade-in delay-400" : "opacity-0"}
          `}
          >
            This system evaluates behavioral patterns during constrained
            decision-making. All responses are recorded. Evaluation cannot be
            paused, reversed, or repeated. Proceed when ready.
          </p>

          {/* Divider */}
          <div
            className={`
            divider mb-8
            ${initialized ? "animate-reveal-line delay-500" : "w-0"}
          `}
          />

          {/* Protocol Details */}
          <div
            className={`
            grid grid-cols-2 gap-6 mb-10
            ${initialized ? "animate-fade-in delay-600" : "opacity-0"}
          `}
          >
            <div className="space-y-1">
              <span className="text-system opacity-50">Scenarios</span>
              <p className="font-mono text-lg text-fg">02</p>
            </div>
            <div className="space-y-1">
              <span className="text-system opacity-50">Time Constraint</span>
              <p className="font-mono text-lg text-fg">Active</p>
            </div>
            <div className="space-y-1">
              <span className="text-system opacity-50">Retry Allowance</span>
              <p className="font-mono text-lg text-fg">None</p>
            </div>
            <div className="space-y-1">
              <span className="text-system opacity-50">Output</span>
              <p className="font-mono text-lg text-fg">Judgment Profile</p>
            </div>
          </div>

          {/* Warning */}
          <div
            className={`
            flex items-start gap-3 p-4 mb-8
            bg-critical/5 border border-critical/20
            ${initialized ? "animate-fade-in delay-700" : "opacity-0"}
          `}
          >
            <span className="status-dot warning mt-1" />
            <p className="text-xs text-muted leading-relaxed">
              Once initiated, this evaluation cannot be stopped. Your session
              will be permanently locked after completion.
            </p>
          </div>

          {/* Action */}
          <div
            className={initialized ? "animate-fade-in delay-800" : "opacity-0"}
          >
            <Button
              label="Initialize Evaluation"
              onClick={onStart}
              variant="primary"
            />
          </div>
        </div>

        {/* Footer Reference */}
        <div
          className={`
          mt-6 flex items-center justify-between text-system opacity-40
          ${initialized ? "animate-fade-in delay-800" : "opacity-0"}
        `}
        >
          <span>DES.V1.0</span>
          <span>Protocol Active</span>
        </div>
      </div>
    </div>
  );
}
