"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds, onTimeUp]);

  return (
    <div className="text-lg font-mono text-center mb-4">
      Time left: {seconds}s
    </div>
  );
}
