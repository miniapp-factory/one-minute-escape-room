"use client";

import { useState, useEffect } from "react";

interface PuzzleProps {
  onAnswer: (answer: string) => void;
  emojis: string[];
  correctIndex: number;
  puzzleNumber: number;
}

export default function Puzzle({ onAnswer, emojis, correctIndex, puzzleNumber }: PuzzleProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState("");

  useEffect(() => {
    setSelected(null);
    setHint("");
  }, [emojis]);

  const handleClick = (index: number) => {
    setSelected(index);
    if (index === correctIndex) {
      onAnswer("correct");
    } else {
      setHint("Try again");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Find the different card</h2>
      <h3 className="text-lg font-medium mb-2">Puzzle {puzzleNumber}</h3>
      <p className="mb-4">Tap the card that is different from the others within 6 seconds.</p>
      <div className="grid grid-cols-3 gap-2">
        {emojis.map((emoji, idx) => (
          <button
            key={idx}
            className="p-4 text-4xl rounded-lg border hover:bg-gray-100"
            onClick={() => handleClick(idx)}
          >
            {emoji}
          </button>
        ))}
      </div>
      {hint && <p className="mt-2 text-muted-foreground">{hint}</p>}
    </div>
  );
}
