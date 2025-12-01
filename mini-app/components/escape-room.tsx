"use client";

import { useState } from "react";
import Timer from "./timer";
import Puzzle from "./puzzle";
import SuccessScreen from "./success-screen";
import FailureScreen from "./failure-screen";

const puzzles = [
  { emojis: ["🟥","🟥","🟥","🟥","🟥","🟥","🟥","🟥","🟦"], correctIndex: 8 },
  { emojis: ["🟩","🟩","🟩","🟩","🟩","🟩","🟩","🟩","🟨"], correctIndex: 8 },
  { emojis: ["🟦","🟦","🟦","🟦","🟦","🟦","🟦","🟦","🟥"], correctIndex: 8 },
  { emojis: ["🟨","🟨","🟨","🟨","🟨","🟨","🟨","🟨","🟩"], correctIndex: 8 },
  { emojis: ["🟪","🟪","🟪","🟪","🟪","🟪","🟪","🟪","🟫"], correctIndex: 8 },
  { emojis: ["🟫","🟫","🟫","🟫","🟫","🟫","🟫","🟫","🟪"], correctIndex: 8 },
  { emojis: ["🟧","🟧","🟧","🟧","🟧","🟧","🟧","🟧","🟪"], correctIndex: 8 },
  { emojis: ["🟪","🟪","🟪","🟪","🟪","🟪","🟪","🟪","🟧"], correctIndex: 8 },
  { emojis: ["🟥","🟥","🟥","🟥","🟥","🟥","🟥","🟥","🟩"], correctIndex: 8 },
  { emojis: ["🟩","🟩","🟩","🟩","🟩","🟩","🟩","🟩","🟥"], correctIndex: 8 },
];

export default function EscapeRoom() {
  const [phase, setPhase] = useState<"puzzle" | "success" | "failure">("puzzle");
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  // const [timeUp, setTimeUp] = useState(false);

  const handleAnswer = (answer: string) => {
    const correct = answer.trim().toLowerCase() === "correct";
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
    setCurrentPuzzleIndex(Math.floor(Math.random() * puzzles.length));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {phase === "puzzle" && (
        <>
          <Timer duration={3} onTimeUp={handleTimeUp} />
          <Puzzle
            emojis={puzzles[currentPuzzleIndex].emojis}
            correctIndex={puzzles[currentPuzzleIndex].correctIndex}
            onAnswer={handleAnswer}
            key={currentPuzzleIndex}
          />
        </>
      )}
      {phase === "success" && <SuccessScreen onNewPuzzle={reset} />}
      {phase === "failure" && <FailureScreen onRetry={reset} />}
    </div>
  );
}
