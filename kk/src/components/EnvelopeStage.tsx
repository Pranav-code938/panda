import React from 'react';
import { motion } from 'motion/react';
import type { StoryPhase } from '../types/story';

interface EnvelopeStageProps {
  phase: StoryPhase;
  reducedMotion: boolean;
}

const GOLD_PARTICLES = [
  { id: 1, tx: '-68px', ty: '-115px', delay: '0.72s', size: 6 },
  { id: 2, tx: '-42px', ty: '-145px', delay: '0.78s', size: 5 },
  { id: 3, tx: '-16px', ty: '-130px', delay: '0.74s', size: 7 },
  { id: 4, tx: '18px', ty: '-152px', delay: '0.8s', size: 6 },
  { id: 5, tx: '48px', ty: '-128px', delay: '0.76s', size: 5 },
  { id: 6, tx: '76px', ty: '-112px', delay: '0.82s', size: 6.5 },
  { id: 7, tx: '-88px', ty: '-74px', delay: '0.85s', size: 4.5 },
  { id: 8, tx: '88px', ty: '-78px', delay: '0.86s', size: 4.5 },
  { id: 9, tx: '-28px', ty: '-172px', delay: '0.9s', size: 4 },
  { id: 10, tx: '30px', ty: '-168px', delay: '0.92s', size: 4.5 },
  { id: 11, tx: '0px', ty: '-185px', delay: '0.88s', size: 5.5 },
  { id: 12, tx: '-56px', ty: '-95px', delay: '0.96s', size: 4 },
  { id: 13, tx: '58px', ty: '-92px', delay: '0.98s', size: 4 },
];

export const EnvelopeStage: React.FC<EnvelopeStageProps> = ({
  phase,
  reducedMotion,
}) => {
  const isUnsealing = phase === 'UNSEALING';

  return (
    <motion.div
      className="relative mx-auto w-[min(88vw,350px)] sm:w-[400px] md:w-[430px] select-none"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.9 }}
      animate={
        isUnsealing
          ? reducedMotion
            ? { opacity: 1, scale: 1.03 }
            : {
                opacity: 1,
                y: 12,
                scale: [1, 1.14, 1.12],
              }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      transition={{
        duration: isUnsealing ? 0.85 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Golden Magical Particles Released When Seal Breaks */}
      {isUnsealing && !reducedMotion && (
        <div
          className="pointer-events-none absolute left-1/2 top-[54%] z-30 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          {GOLD_PARTICLES.map((p) => (
            <span
              key={p.id}
              className="animate-gold-particle absolute block rounded-full bg-[#F5D276]"
              style={
                {
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: p.delay,
                  opacity: 0,
                  '--tx': p.tx,
                  '--ty': p.ty,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Unrolling Parchment Scroll Emerging Out of Opened Envelope */}
      {isUnsealing && (
        <motion.div
          className="pointer-events-none absolute inset-x-4 sm:inset-x-6 top-6 z-20 origin-top overflow-hidden rounded-md border-2 border-[#241B17] bg-[#F4E8CF] shadow-[0_14px_30px_rgba(14,10,16,0.45)]"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.08, y: 26 }}
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: [0, 1, 1], scaleY: [0.08, 0.48, 1.35], y: [26, -34, -84] }
          }
          transition={{
            delay: reducedMotion ? 0.25 : 1.45,
            duration: reducedMotion ? 0.5 : 1.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="h-44 sm:h-52 w-full bg-gradient-to-b from-[#E7D4AE] via-[#F6EBD4] to-[#E9D7B2]" />
        </motion.div>
      )}

      {/* Main Envelope Body */}
      <div className="relative aspect-[1.52/1] w-full rounded-lg border-[3px] border-[#241B17] bg-[#EFE0C1] shadow-[0_18px_36px_rgba(14,9,16,0.52)]">
        {/* Subtle parchment edge vignette */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[5px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(250, 242, 224, 0.55) 35%, rgba(211, 187, 144, 0.48) 100%)',
          }}
        />

        {/* Inner dark pocket shadow revealed as top flap opens */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[52%] rounded-t-[4px] bg-[#6A523B]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isUnsealing ? 0.85 : 0 }}
          transition={{ delay: isUnsealing ? 0.95 : 0, duration: 0.25 }}
        />

        {/* Bottom & Side Envelope Folds (SVG Crisp 2D Ink Lines) */}
        <svg
          viewBox="0 0 400 264"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Side fold seams */}
          <path
            d="M 4 260 L 166 138 M 396 260 L 234 138"
            stroke="#9E7E57"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.72"
          />
          {/* Bottom inner pocket flap */}
          <path
            d="M 2 262 L 200 124 L 398 262 Z"
            fill="#E7D4AE"
            fillOpacity="0.45"
            stroke="#8B6D47"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {/* Top Triangular Flap (Folds Open in Scene 5!) */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[55%] origin-top"
          animate={
            isUnsealing
              ? reducedMotion
                ? { opacity: 0.25 }
                : { scaleY: [1, 0.05, -0.78] }
              : { scaleY: 1, opacity: 1 }
          }
          transition={{
            delay: isUnsealing ? 1.0 : 0,
            duration: reducedMotion ? 0.4 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <svg
            viewBox="0 0 400 146"
            className="h-full w-full overflow-visible drop-shadow-[0_3px_4px_rgba(36,27,23,0.16)]"
            preserveAspectRatio="none"
          >
            <path
              d="M 2 2 L 398 2 L 200 140 Z"
              fill="#F2E4C8"
              stroke="#241B17"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path
              d="M 12 6 L 388 6 L 200 132 Z"
              fill="none"
              stroke="#B29368"
              strokeWidth="1.2"
              opacity="0.55"
            />
          </svg>
        </motion.div>

        {/* Envelope Addressing Text: TO & FROM */}
        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-3.5 sm:px-6 sm:py-4.5">
          <div className="flex items-start justify-between gap-2 text-[#2E2118]">
            <div className="text-left">
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#6E5338]">
                FROM: ROONIL WAZLIB
              </p>
            </div>
            <div
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded border border-[#9E7E57]/60 bg-[#E8D5B2]/70 text-[#724A30]"
              aria-hidden="true"
            >
              {/* Tiny Magical Owl-Post Feather Motif */}
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M19 4C12 4 7 9 6 17L4 20L7 18C15 17 20 12 19 4Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M6 17L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-auto pb-0.5 text-center">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#6E5338]">
              TO:
            </p>
            <p
              className="text-base sm:text-xl font-bold tracking-[0.14em] text-[#241B17]"
              style={{ fontFamily: 'var(--font-serif-wizard)' }}
            >
              HERMIONE GRANGER
            </p>
          </div>
        </div>

        {/* Red Wax Seal with Tiny Panda Paw (Splits & Breaks in Scene 5!) */}
        <div className="pointer-events-none absolute left-1/2 top-[54%] z-20 -translate-x-1/2 -translate-y-1/2">
          {!isUnsealing ? (
            <div className="h-14 w-14 sm:h-16 sm:w-16">
              <PandaPawWaxSeal />
            </div>
          ) : (
            <div className="relative h-14 w-14 sm:h-16 sm:w-16">
              {/* Left cracked wax seal half */}
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: 'polygon(0 0, 53% 0, 47% 50%, 54% 100%, 0 100%)' }}
                animate={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        x: [0, -2, -16],
                        y: [0, 0, 12],
                        rotate: [0, -3, -24],
                        opacity: [1, 1, 0],
                      }
                }
                transition={{ delay: 0.45, duration: 0.65, ease: 'easeOut' }}
              >
                <PandaPawWaxSeal />
              </motion.div>

              {/* Right cracked wax seal half */}
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: 'polygon(53% 0, 100% 0, 100% 100%, 54% 100%, 47% 50%)' }}
                animate={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        x: [0, 2, 16],
                        y: [0, 0, 14],
                        rotate: [0, 3, 26],
                        opacity: [1, 1, 0],
                      }
                }
                transition={{ delay: 0.45, duration: 0.65, ease: 'easeOut' }}
              >
                <PandaPawWaxSeal />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PandaPawWaxSeal: React.FC = () => (
  <svg
    viewBox="0 0 80 80"
    className="h-full w-full drop-shadow-[0_4px_7px_rgba(28,15,15,0.42)]"
    role="img"
    aria-label="Red wax seal embossed with a tiny panda paw"
  >
    {/* Irregular melted crimson wax puddle silhouette */}
    <path
      d="M 40 6 C 53 5 64 11 70 22 C 76 32 75 47 68 58 C 61 69 49 75 37 74 C 24 73 12 66 8 54 C 4 41 7 25 16 15 C 23 8 31 7 40 6 Z"
      fill="#8E2424"
      stroke="#241B17"
      strokeWidth="2.4"
    />
    {/* Raised outer rim highlight */}
    <circle
      cx="40"
      cy="40"
      r="25"
      fill="#A83232"
      stroke="#6C1919"
      strokeWidth="2.2"
    />
    {/* Recessed wax basin */}
    <circle cx="40" cy="40" r="20.5" fill="#922626" />

    {/* Embossed Tiny Panda Paw Print */}
    <g fill="#C64B4B" stroke="#681818" strokeWidth="1.2">
      {/* Main lower paw cushion */}
      <path d="M 31 46 C 31 40 35 37 40 37 C 45 37 49 40 49 46 C 49 51 45 54 40 54 C 35 54 31 51 31 46 Z" />
      {/* Four cute rounded panda toe beans */}
      <ellipse cx="28" cy="36" rx="3.4" ry="4.4" transform="rotate(-20 28 36)" />
      <ellipse cx="35.5" cy="30.5" rx="3.4" ry="4.6" transform="rotate(-6 35.5 30.5)" />
      <ellipse cx="44.5" cy="30.5" rx="3.4" ry="4.6" transform="rotate(6 44.5 30.5)" />
      <ellipse cx="52" cy="36" rx="3.4" ry="4.4" transform="rotate(20 52 36)" />
    </g>
  </svg>
);
