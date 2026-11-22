import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../utils/soundEngine';

interface ChoiceControlsProps {
  attemptCount: number;
  onAttemptEscape: (nextCount: number) => void;
  onOpen: () => void;
  reducedMotion: boolean;
}

interface EscapeTransform {
  x: number;
  y: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  duration: number;
}

const MAX_EVASION_ATTEMPTS = 6;

export const ChoiceControls: React.FC<ChoiceControlsProps> = ({
  attemptCount,
  onAttemptEscape,
  onOpen,
  reducedMotion,
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const ignoreBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerTimeRef = useRef<number>(0);
  const initialPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isEscaping, setIsEscaping] = useState(false);
  const [escapePose, setEscapePose] = useState<EscapeTransform>({
    x: 0,
    y: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    duration: 0.25,
  });

  const isResigned = attemptCount >= MAX_EVASION_ATTEMPTS;
  const showNiceTry = attemptCount >= 4 && !isResigned;

  const computeSafePosition = useCallback(
    (nextAttempt: number, forceFinalWidth = false): { x: number; y: number } => {
      const arena = arenaRef.current;
      const openBtn = openBtnRef.current;
      const ignoreBtn = ignoreBtnRef.current;
      if (!arena || !openBtn || !ignoreBtn) {
        return { x: 16, y: 76 };
      }

      const arenaRect = arena.getBoundingClientRect();
      const openRect = openBtn.getBoundingClientRect();
      const btnW = forceFinalWidth
        ? Math.max(ignoreBtn.offsetWidth || 132, 178)
        : Math.max(ignoreBtn.offsetWidth || 124, 128);
      const btnH = Math.max(ignoreBtn.offsetHeight || 48, 48);

      const padX = 12;
      const padY = 10;
      const minX = padX;
      const maxX = Math.max(minX, arenaRect.width - btnW - padX);
      const minY = padY;
      const maxY = Math.max(minY, arenaRect.height - btnH - padY);

      // OPEN button bounding box in arena coordinates + generous safety margin
      const safetyGap = 18;
      const openRelLeft = openRect.left - arenaRect.left - safetyGap;
      const openRelRight = openRect.right - arenaRect.left + safetyGap;
      const openRelTop = openRect.top - arenaRect.top - safetyGap;
      const openRelBottom = openRect.bottom - arenaRect.top + safetyGap;

      const overlapsOpen = (cx: number, cy: number) =>
        cx < openRelRight &&
        cx + btnW > openRelLeft &&
        cy < openRelBottom &&
        cy + btnH > openRelTop;

      const curX = isEscaping
        ? escapePose.x
        : ignoreBtn.getBoundingClientRect().left - arenaRect.left;
      const curY = isEscaping
        ? escapePose.y
        : ignoreBtn.getBoundingClientRect().top - arenaRect.top;

      // Candidate grid + random sampling within visible arena
      const candidates: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 36; i += 1) {
        const rx = minX + Math.random() * Math.max(1, maxX - minX);
        const ry = minY + Math.random() * Math.max(1, maxY - minY);
        candidates.push({ x: rx, y: ry });
      }
      // Deterministic safe fallback positions in lower quadrants & corners
      candidates.push(
        { x: minX, y: maxY },
        { x: maxX, y: maxY },
        { x: (minX + maxX) / 2, y: maxY },
        { x: maxX, y: minY },
        { x: minX, y: minY + 68 },
        { x: maxX, y: minY + 68 }
      );

      // Attempt 1 prefers a clean sideways/downward slide first
      if (nextAttempt === 1) {
        const slideTargetX = curX + btnW < maxX - 30 ? maxX : minX;
        const slideTargetY = Math.min(maxY, Math.max(minY + 64, curY + 56));
        if (!overlapsOpen(slideTargetX, slideTargetY)) {
          return { x: slideTargetX, y: slideTargetY };
        }
      }

      let best = candidates[0];
      let bestScore = -Infinity;

      for (const c of candidates) {
        const clampedX = Math.min(maxX, Math.max(minX, c.x));
        const clampedY = Math.min(maxY, Math.max(minY, c.y));
        if (overlapsOpen(clampedX, clampedY)) continue;

        const dist = Math.hypot(clampedX - curX, clampedY - curY);
        if (dist > bestScore) {
          bestScore = dist;
          best = { x: clampedX, y: clampedY };
        }
      }

      if (overlapsOpen(best.x, best.y)) {
        return {
          x: Math.min(maxX, Math.max(minX, (minX + maxX) / 2)),
          y: maxY,
        };
      }

      return best;
    },
    [escapePose.x, escapePose.y, isEscaping]
  );

  // Clamp position inside arena if viewport resizes
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!isEscaping || !arenaRef.current || !ignoreBtnRef.current) return;
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnW = ignoreBtnRef.current.offsetWidth || 132;
      const btnH = ignoreBtnRef.current.offsetHeight || 48;
      const maxX = Math.max(12, arenaRect.width - btnW - 12);
      const maxY = Math.max(10, arenaRect.height - btnH - 10);

      setEscapePose((prev) => ({
        ...prev,
        x: Math.min(maxX, Math.max(12, prev.x)),
        y: Math.min(maxY, Math.max(10, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isEscaping]);

  // Also ensure resigned button width stays safely inside arena
  useEffect(() => {
    if (!isResigned || !isEscaping || !arenaRef.current || !ignoreBtnRef.current) return;
    const arenaRect = arenaRef.current.getBoundingClientRect();
    const btnW = ignoreBtnRef.current.offsetWidth || 178;
    const btnH = ignoreBtnRef.current.offsetHeight || 48;
    const maxX = Math.max(12, arenaRect.width - btnW - 12);
    const maxY = Math.max(10, arenaRect.height - btnH - 10);

    setEscapePose((prev) => ({
      ...prev,
      x: Math.min(maxX, Math.max(12, prev.x)),
      y: Math.min(maxY, Math.max(10, prev.y)),
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    }));
  }, [isResigned, isEscaping]);

  const triggerDodge = useCallback(() => {
    if (isResigned) return;

    const now = performance.now();
    if (now - lastTriggerTimeRef.current < 160) return;
    lastTriggerTimeRef.current = now;

    if (!isEscaping && arenaRef.current && ignoreBtnRef.current) {
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnRect = ignoreBtnRef.current.getBoundingClientRect();
      initialPosRef.current = {
        x: btnRect.left - arenaRect.left,
        y: btnRect.top - arenaRect.top,
      };
    }

    const nextAttempt = attemptCount + 1;
    const willResign = nextAttempt >= MAX_EVASION_ATTEMPTS;
    const nextPos = computeSafePosition(nextAttempt, willResign);

    soundEngine.playDodge(nextAttempt);
    onAttemptEscape(nextAttempt);
    setIsEscaping(true);

    if (reducedMotion) {
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.12,
      });
      return;
    }

    if (willResign) {
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.25,
      });
      return;
    }

    if (nextAttempt === 1) {
      // 1st attempt: slides away smoothly
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.28,
      });
    } else if (nextAttempt === 2) {
      // 2nd attempt: jumps quickly to another position
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: -6,
        scaleX: 1.04,
        scaleY: 0.96,
        duration: 0.08,
      });
    } else if (nextAttempt === 3) {
      // 3rd attempt: cheeky angled tilt leap
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: 16,
        scaleX: 0.92,
        scaleY: 1.08,
        duration: 0.14,
      });
    } else if (nextAttempt === 4) {
      // 4th attempt: ridiculous 360 cartwheel spin
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: 360,
        scaleX: 1.08,
        scaleY: 0.92,
        duration: 0.22,
      });
    } else {
      // 5th attempt: chaotic reverse spin & squish
      setEscapePose({
        x: nextPos.x,
        y: nextPos.y,
        rotate: -372,
        scaleX: 0.88,
        scaleY: 1.12,
        duration: 0.18,
      });
    }
  }, [attemptCount, computeSafePosition, isEscaping, isResigned, onAttemptEscape, reducedMotion]);

  return (
    <div
      ref={arenaRef}
      className="relative mx-auto flex min-h-[168px] sm:min-h-[196px] w-full max-w-xl flex-col items-center px-3 pt-2 pb-4 select-none"
    >
      {/* Cheeky feedback caption after several evasion attempts */}
      <div className="mb-2 h-6 flex items-center justify-center">
        {showNiceTry && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base italic tracking-wide text-[#E7C67A]"
            style={{ fontFamily: 'var(--font-serif-wizard)' }}
          >
            nice try.
          </motion.p>
        )}
      </div>

      {/* Primary Action Row (OPEN stays anchored & unobstructed) */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <button
          ref={openBtnRef}
          type="button"
          onClick={onOpen}
          className="relative z-20 min-h-[48px] min-w-[122px] sm:min-w-[138px] cursor-pointer rounded-xl border-2 border-[#241B17] bg-[#C89B3C] px-7 py-3 text-base sm:text-lg font-bold tracking-[0.14em] text-[#241B17] shadow-[0_6px_0_#241B17,0_10px_20px_rgba(12,8,14,0.45)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#D8AD4C] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4DFAC] whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-serif-wizard)' }}
        >
          OPEN
        </button>

        {/* Reserve initial width slot when IGNORE floats dynamically so OPEN doesn't jump */}
        {!isEscaping ? (
          <button
            ref={ignoreBtnRef}
            type="button"
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') triggerDodge();
            }}
            onPointerDown={(e) => {
              if (e.pointerType !== 'mouse') {
                e.preventDefault();
                triggerDodge();
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              triggerDodge();
            }}
            className="relative z-10 min-h-[48px] min-w-[122px] sm:min-w-[138px] cursor-pointer rounded-xl border-2 border-[#241B17] bg-[#3E3342] px-6 py-3 text-base sm:text-lg font-bold tracking-[0.12em] text-[#F2E4C8] shadow-[0_6px_0_#241B17,0_10px_20px_rgba(12,8,14,0.4)] transition-colors duration-150 hover:bg-[#4B3E50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7C67A] whitespace-nowrap shrink-0"
            style={{ fontFamily: 'var(--font-serif-wizard)' }}
          >
            IGNORE
          </button>
        ) : (
          <div className="h-[48px] w-[122px] sm:w-[138px]" aria-hidden="true" />
        )}
      </div>

      {/* Dynamically Bounded Escaping IGNORE Button */}
      {isEscaping && (
        <motion.button
          ref={ignoreBtnRef}
          type="button"
          initial={{
            x: initialPosRef.current.x,
            y: initialPosRef.current.y,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
          }}
          animate={{
            x: escapePose.x,
            y: escapePose.y,
            rotate: escapePose.rotate,
            scaleX: escapePose.scaleX,
            scaleY: escapePose.scaleY,
          }}
          transition={{
            duration: escapePose.duration,
            ease: attemptCount === 2 ? 'easeOut' : [0.22, 1, 0.36, 1],
          }}
          onPointerEnter={(e) => {
            if (!isResigned && e.pointerType === 'mouse') {
              triggerDodge();
            }
          }}
          onPointerDown={(e) => {
            if (!isResigned && e.pointerType !== 'mouse') {
              e.preventDefault();
              triggerDodge();
            }
          }}
          onClick={(e) => {
            if (isResigned) {
              onOpen();
              return;
            }
            e.preventDefault();
            triggerDodge();
          }}
          className={`absolute left-0 top-0 z-10 min-h-[48px] cursor-pointer rounded-xl border-2 border-[#241B17] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_5px_0_#241B17,0_10px_18px_rgba(12,8,14,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7C67A] whitespace-nowrap shrink-0 ${
            isResigned
              ? 'bg-[#5A4842] text-[#F5EAD2] tracking-normal hover:bg-[#6A554E]'
              : 'bg-[#3E3342] text-[#F2E4C8] tracking-[0.12em] hover:bg-[#4B3E50]'
          }`}
          style={{ fontFamily: 'var(--font-serif-wizard)' }}
        >
          {isResigned ? 'Fine. Open it. 🙄' : 'IGNORE'}
        </motion.button>
      )}
    </div>
  );
};
