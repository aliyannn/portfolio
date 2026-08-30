'use client';

import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only activate cursor spotlight on fine pointer devices (desktop/mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const el = spotlightRef.current;
    if (!el) return;

    let isVisible = false;

    const updateSpotlight = () => {
      if (el) {
        el.style.transform = `translate3d(${targetPos.current.x - 300}px, ${targetPos.current.y - 300}px, 0)`;
        if (!isVisible) {
          el.style.opacity = '1';
          isVisible = true;
        }
      }
      rafId.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateSpotlight);
      }
    };

    const handleMouseLeave = () => {
      if (el) {
        el.style.opacity = '0';
        isVisible = false;
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full z-30 opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background:
          'radial-gradient(circle at center, rgba(6, 182, 212, 0.07) 0%, rgba(139, 92, 246, 0.04) 35%, transparent 70%)',
      }}
    />
  );
};

export default CursorSpotlight;
