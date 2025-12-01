"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PuzzleProps {
  onAnswer: (answer: string) => void;
}

export default function Puzzle({ onAnswer }: PuzzleProps) {
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");

  const handleSubmit = () => {
    const trimmed = answer.trim();
    if (trimmed === "") return;
    const correct = trimmed.toLowerCase() === "echo";
    if (correct) {
      onAnswer(trimmed);
    } else {
      setHint("It repeats what you say.");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Riddle</h2>
      <p className="mb-4">
        I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What
        am I?
      </p>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {hint && <p className="mt-2 text-muted-foreground">{hint}</p>}
    </div>
  );
}
