"use client";

import { useEffect, useState } from "react";

interface GiftAnimationProps {
  giftName: string;
  giftIcon?: string;
  senderName: string;
  quantity: number;
  onComplete?: () => void;
}

export function GiftAnimation({
  giftName,
  giftIcon = "🎁",
  senderName,
  quantity,
  onComplete,
}: GiftAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
      <div className="animate-bounce text-center">
        <span className="text-7xl">{giftIcon}</span>
        <p className="mt-2 text-xl font-bold text-white drop-shadow-lg">
          {senderName} sent {quantity > 1 ? `${quantity}x` : ""} {giftName}!
        </p>
      </div>
    </div>
  );
}
