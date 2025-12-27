'use client';

import { useState, useRef } from 'react';
import MagicCircle from './MagicCircle';
import Tap from './tap';

interface CircleData {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Landing() {
  const [circles, setCircles] = useState<CircleData[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggered = useRef(false);

  const getResponsiveSize = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 160 : 320;
    }
    return 300;
  };

  const handlePressStart = () => {
    isLongPressTriggered.current = false;
    timerRef.current = setTimeout(() => {
      setCircles([]);
      isLongPressTriggered.current = true;
      if (navigator.vibrate) navigator.vibrate(50);
    }, 3000);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isLongPressTriggered.current) {
      isLongPressTriggered.current = false;
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;
    let hitCircleId: number | null = null;

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      const radius = circle.size / 2;
      const distance = Math.sqrt(
        Math.pow(clickX - circle.x, 2) +
        Math.pow(clickY - circle.y, 2)
      );

      if (distance <= radius) {
        hitCircleId = circle.id;
        break;
      }
    }

    const newCircle: CircleData = {
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      size: getResponsiveSize(),
    };

    setCircles((prev) => {
      if (hitCircleId !== null) {
        return prev.filter((c) => c.id !== hitCircleId);
      }
      return [...prev, newCircle];
    });
  };

  return (
    <div
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={handleTap}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 w-full h-full bg-black overflow-hidden cursor-pointer select-none touch-none m-0 p-0"
    >
      <Tap visible={circles.length === 0} />
      {circles.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            transform: 'translate(-50%, -50%)',
          }}
          className="z-10 pointer-events-none"
        >
          <MagicCircle id={`circle-${c.id}`} trigger={0} />
        </div>
      ))}
    </div>
  );
}