import React from 'react';
import { motion } from 'motion/react';
import { LETTER_CONTENT } from '../data/letter';

interface LetterScrollProps {
  reducedMotion: boolean;
}

const ScrollRoller: React.FC<{ position: 'top' | 'bottom' }> = ({ position }) => (
  <div
    className={`relative z-20 flex w-[106%] -ml-[3%] items-center justify-between ${
      position === 'top' ? '-mb-2' : '-mt-2'
    }`}
    aria-hidden="true"
  >
    {/* Left Brass Finial */}
    <div className="flex items-center">
      <div className="h-4 w-3 rounded-l-full border-2 border-[#241B17] bg-[#C89B3C]" />
      <div className="h-6 w-2.5 rounded-sm border-2 border-[#241B17] bg-[#DFBA62]" />
    </div>

    {/* Turned Oak Wood Scroll Bar */}
    <div className="relative h-5 flex-1 border-y-[2.5px] border-[#241B17] bg-gradient-to-b from-[#7B543D] via-[#5E3E2C] to-[#432B1E] shadow-[0_6px_14px_rgba(14,9,16,0.42)]">
      <div className="absolute inset-x-4 top-[3px] h-[2px] rounded-full bg-[#A87A5A]/45" />
    </div>

    {/* Right Brass Finial */}
    <div className="flex items-center">
      <div className="h-6 w-2.5 rounded-sm border-2 border-[#241B17] bg-[#DFBA62]" />
      <div className="h-4 w-3 rounded-r-full border-2 border-[#241B17] bg-[#C89B3C]" />
    </div>
  </div>
);

export const LetterScroll: React.FC<LetterScrollProps> = ({ reducedMotion }) => {
  const hasAnyContent = Boolean(
    LETTER_CONTENT.dateLabel?.trim() ||
      LETTER_CONTENT.greeting?.trim() ||
      LETTER_CONTENT.paragraphs.some((p) => p.trim().length > 0) ||
      LETTER_CONTENT.signature?.trim() ||
      LETTER_CONTENT.postscript?.trim()
  );

  return (
    <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-start px-4 sm:px-6 pt-16 pb-14">
      <motion.article
        aria-label="Birthday letter parchment scroll"
        className="relative w-full max-w-[660px]"
        initial={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: -18 }
        }
        animate={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: reducedMotion ? 0.35 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ScrollRoller position="top" />

        {/* Vertically Unfolding Parchment Sheet (Expands automatically to fit any letter length) */}
        <div className="relative border-x-[3px] border-[#241B17] bg-[#F4E8CF] px-6 py-9 sm:px-12 sm:py-12 shadow-[0_24px_50px_rgba(12,8,15,0.62)]">
          {/* Controlled Aged Vellum Shading */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, rgba(252, 246, 232, 0.65) 45%, rgba(214, 191, 148, 0.55) 100%)',
            }}
          />

          {/* Subtle Hairline Inner Decorative Frame */}
          <div className="pointer-events-none absolute inset-3 sm:inset-5 border border-[#9E7E57]/35" />

          {/* Subtle Top Panda-Paw & Quill Wax Ornament (Original Motif) */}
          <div className="relative z-10 mb-6 flex items-center justify-center gap-4 text-[#7D5D3B]/75">
            <span className="h-[1px] w-14 sm:w-20 bg-[#9E7E57]/45" />
            <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden="true">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
              <path
                d="M 13.5 21.5 C 13.5 18.5 15.5 17 18 17 C 20.5 17 22.5 18.5 22.5 21.5 C 22.5 23.8 20.5 25 18 25 C 15.5 25 13.5 23.8 13.5 21.5 Z"
                fill="currentColor"
                opacity="0.7"
              />
              <circle cx="12.2" cy="16.5" r="1.8" fill="currentColor" opacity="0.7" />
              <circle cx="15.8" cy="13.8" r="1.9" fill="currentColor" opacity="0.7" />
              <circle cx="20.2" cy="13.8" r="1.9" fill="currentColor" opacity="0.7" />
              <circle cx="23.8" cy="16.5" r="1.8" fill="currentColor" opacity="0.7" />
            </svg>
            <span className="h-[1px] w-14 sm:w-20 bg-[#9E7E57]/45" />
          </div>

          {/* Letter Interior: Completely Blank Until User Edits src/data/letter.ts */}
          <div
            className="relative z-10 mx-auto min-h-[54dvh] max-w-[54ch] text-[#2D1F15] break-words"
            style={{ fontFamily: 'var(--font-cursive-wizard)' }}
          >
            {hasAnyContent ? (
              <div className="space-y-5 text-[22px] sm:text-[25px] leading-[1.82]">
                {LETTER_CONTENT.dateLabel?.trim() && (
                  <p className="text-right text-[19px] sm:text-[21px] text-[#5C442E]">
                    {LETTER_CONTENT.dateLabel}
                  </p>
                )}

                {LETTER_CONTENT.greeting?.trim() && (
                  <p className="text-[25px] sm:text-[28px] font-semibold">
                    {LETTER_CONTENT.greeting}
                  </p>
                )}

                {LETTER_CONTENT.paragraphs
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}

                {LETTER_CONTENT.signature?.trim() && (
                  <p className="pt-4 whitespace-pre-line text-[24px] sm:text-[27px] font-semibold">
                    {LETTER_CONTENT.signature}
                  </p>
                )}

                {LETTER_CONTENT.postscript?.trim() && (
                  <p className="pt-2 text-[20px] sm:text-[22px] text-[#5C442E]">
                    {LETTER_CONTENT.postscript}
                  </p>
                )}
              </div>
            ) : (
              /* Intentionally blank scrollable parchment canvas */
              <div className="min-h-[54dvh] w-full" aria-label="Blank parchment space" />
            )}
          </div>
        </div>

        <ScrollRoller position="bottom" />
      </motion.article>
    </div>
  );
};
