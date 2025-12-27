'use client';

import { useEffect, useRef } from 'react';
import { drawToSVG } from '@/utils/sigilGenerator';

interface MagicCircleProps {
  trigger: number;
  delay?: number;
  id: string;
}

export default function MagicCircle({ delay = 0, id }: MagicCircleProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (svgRef.current) {
        drawToSVG(svgRef.current, id);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [id, delay]);

  return (
    <svg
      ref={svgRef}
      viewBox="-120 -120 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-visible pointer-events-none"
    />
  );
}