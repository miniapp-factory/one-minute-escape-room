"use client";

import { useState } from "react";
import Timer from "./timer";
import Puzzle from "./puzzle";
import SuccessScreen from "./success-screen";
import FailureScreen from "./failure-screen";
import { Button } from "@/components/ui/button";

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
  const [phase, setPhase] = useState<"start" | "puzzle" | "success" | "failure" | "completed">("start");
  const [puzzleCount, setPuzzleCount] = useState(0);
  const [puzzle, setPuzzle] = useState<{ emojis: string[]; correctIndex: number }>({
    emojis: [],
    correctIndex: 0,
  });
  const [gameKey, setGameKey] = useState(0);
  const [puzzleKey, setPuzzleKey] = useState(0);
  // const [timeUp, setTimeUp] = useState(false);

  const handleAnswer = (answer: string) => {
    const correct = answer.trim().toLowerCase() === "correct";
    if (correct) {
      const newCount = puzzleCount + 1;
      setPuzzleCount(newCount);
      if (newCount === 10) {
        setPhase("completed");
      } else {
        setPhase("success");
      }
    } else {
      // hint will be shown by Puzzle component
    }
  };
  const newPuzzle = () => {
      const baseEmoji = "🟥";
      const correctIndex = Math.floor(Math.random() * 9);
      const alternatives = ["🟦", "🟨", "🟩", "🟪", "🟫", "🟧"];
      const oddEmoji = alternatives[Math.floor(Math.random() * alternatives.length)];
      const emojis = Array(9).fill(baseEmoji);
      emojis[correctIndex] = oddEmoji;
      setPuzzle({ emojis, correctIndex });
      setPhase("puzzle");
      setPuzzleKey((prev) => prev + 1);
    };

  const handleTimeUp = () => {
    setPhase("failure");
  };

  const handleGameTimeUp = () => {
    setPhase("failure");
  };

  const startGame = () => {
    setPuzzleCount(0);
    newPuzzle();
  };

  const resetGame = () => {
    setPuzzleCount(0);
    const baseEmoji = "🟥";
    const correctIndex = Math.floor(Math.random() * 9);
    const alternatives = ["🟦", "🟨", "🟩", "🟪", "🟫", "🟧"];
    const oddEmoji = alternatives[Math.floor(Math.random() * alternatives.length)];
    const emojis = Array(9).fill(baseEmoji);
    emojis[correctIndex] = oddEmoji;
    setPuzzle({ emojis, correctIndex });
    setPhase("puzzle");
    setGameKey(1);
    setPuzzleKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {phase === "start" && (
        <div className="flex justify-center">
          <Button onClick={startGame}>Start</Button>
        </div>
      )}
      {phase === "puzzle" && (
        <>
          <Timer key={gameKey} duration={60} onTimeUp={handleGameTimeUp} />
          <Timer key={puzzleKey} duration={6} onTimeUp={handleTimeUp} />
          <Puzzle
            emojis={puzzle.emojis}
            correctIndex={puzzle.correctIndex}
            onAnswer={handleAnswer}
            puzzleNumber={puzzleCount + 1}
            key={puzzleKey}
          />
        </>
      )}
      {phase === "success" && <SuccessScreen onNewPuzzle={newPuzzle} isFinal={false} />}
      {phase === "completed" && <SuccessScreen onNewPuzzle={resetGame} isFinal={true} />}
      {phase === "failure" && <FailureScreen onRetry={resetGame} />}
    </div>
  );
}
