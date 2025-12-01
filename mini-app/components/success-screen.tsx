"use client";

import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  onNewPuzzle: () => void;
  isFinal?: boolean;
}

export default function SuccessScreen({ onNewPuzzle, isFinal = false }: SuccessScreenProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">{isFinal ? "Congratulations you escape!!" : "Congratulations!"}</h2>
      {!isFinal && <p className="mb-6">You solved the puzzle.</p>}
      <Button onClick={onNewPuzzle}>{isFinal ? "Restart" : "New Puzzle"}</Button>
    </div>
  );
}
