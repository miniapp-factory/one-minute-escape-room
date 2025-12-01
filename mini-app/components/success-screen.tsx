"use client";

import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  onNewPuzzle: () => void;
}

export default function SuccessScreen({ onNewPuzzle }: SuccessScreenProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
      <p className="mb-6">You solved the puzzle.</p>
      <Button onClick={onNewPuzzle}>New Puzzle</Button>
    </div>
  );
}
