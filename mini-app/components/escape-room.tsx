"use client";

import { useState } from "react";
import Timer from "./timer";
import Puzzle from "./puzzle";
import SuccessScreen from "./success-screen";
import FailureScreen from "./failure-screen";

export default function EscapeRoom() {
  const [phase, setPhase] = useState<"puzzle" | "success" | "failure">("puzzle");
  // const [timeUp, setTimeUp] = useState(false);

  const handleAnswer = (answer: string) => {
    const correct = answer.trim().toLowerCase() === "echo";
    if (correct) {
      setPhase("success");
    } else {
      // hint will be shown by Puzzle component
    }
  };

  const handleTimeUp = () => {
    setPhase("failure");
  };

  const reset = () => {
    setPhase("puzzle");
    setTimeUp(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {phase === "puzzle" && (
        <>
          <Timer duration={60} onTimeUp={handleTimeUp} />
          <Puzzle onAnswer={handleAnswer} />
        </>
      )}
      {phase === "success" && <SuccessScreen onNewPuzzle={reset} />}
      {phase === "failure" && <FailureScreen onRetry={reset} />}
    </div>
  );
}
