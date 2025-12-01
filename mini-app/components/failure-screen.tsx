"use client";

import { Button } from "@/components/ui/button";

interface FailureScreenProps {
  onRetry: () => void;
}

export default function FailureScreen({ onRetry }: FailureScreenProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Time's up!</h2>
      <p className="mb-6">Better luck next time.</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}
