import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { HospitalCorridor } from './components/HospitalCorridor';
import { WizardPanda } from './components/WizardPanda';
import { EnvelopeStage } from './components/EnvelopeStage';
import { ChoiceControls } from './components/ChoiceControls';
import { LetterScroll } from './components/LetterScroll';
import { soundEngine } from './utils/soundEngine';
import type { PandaExpression, StoryPhase } from './types/story';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  const [phase, setPhase] = useState<StoryPhase>('HOSPITAL_INTRO');
  const [ignoreAttempts, setIgnoreAttempts] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [storyRunId, setStoryRunId] = useState(0);

  // Automatic cinematic pacing through Scene 1 -> Scene 2 -> Scene 3 dialogue
  useEffect(() => {
    if (phase === 'HOSPITAL_INTRO') {
      const delay = reducedMotion ? 900 : 2100;
      const timer = window.setTimeout(() => {
        setPhase('PANDA_APPROACH');
      }, delay);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'PANDA_APPROACH') {
      const walkDuration = reducedMotion ? 850 : 3300;
      const footstepInterval = !reducedMotion
        ? window.setInterval(() => {
            soundEngine.playFootstep();
          }, 370)
        : null;

      const timer = window.setTimeout(() => {
        soundEngine.playChime();
        setPhase('DELIVERY_DIALOGUE');
      }, walkDuration);

      return () => {
        window.clearTimeout(timer);
        if (footstepInterval !== null) window.clearInterval(footstepInterval);
      };
    }

    if (phase === 'UNSEALING') {
      soundEngine.playSealCrack();
      const chimeTimer = window.setTimeout(() => {
        soundEngine.playUnfurlArpeggio();
      }, reducedMotion ? 180 : 720);

      const finishTimer = window.setTimeout(() => {
        setPhase('LETTER_SCROLL');
      }, reducedMotion ? 950 : 2700);

      return () => {
        window.clearTimeout(chimeTimer);
        window.clearTimeout(finishTimer);
      };
    }

    return undefined;
  }, [phase, reducedMotion, storyRunId]);

  const pandaExpression: PandaExpression = useMemo(() => {
    if (phase !== 'CHOICE_PROMPT') return 'serious';
    if (ignoreAttempts >= 5) return 'deadpan';
    if (ignoreAttempts >= 3) return 'baffled';
    if (ignoreAttempts === 2) return 'confused';
    if (ignoreAttempts === 1) return 'surprised';
    return 'serious';
  }, [ignoreAttempts, phase]);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
      if (next) {
        soundEngine.playChime();
      }
      return next;
    });
  }, []);

  const handleReplay = useCallback(() => {
    setIgnoreAttempts(0);
    setPhase('HOSPITAL_INTRO');
    setStoryRunId((id) => id + 1);
  }, []);

  const handleReceiveLetter = useCallback(() => {
    soundEngine.playPaperRustle();
    setPhase('CHOICE_PROMPT');
  }, []);

  const handleOpenLetter = useCallback(() => {
    setPhase('UNSEALING');
  }, []);

  return (
    <div
      key={storyRunId}
      className={`relative w-full overflow-x-hidden bg-[#18141C] text-[#F5EAD2] ${
        phase === 'LETTER_SCROLL' ? 'min-h-dvh' : 'h-dvh overflow-y-hidden'
      }`}
    >
      {/* Illustrated Hogwarts-Inspired Medical Ward Corridor */}
      <HospitalCorridor phase={phase} reducedMotion={reducedMotion} />

      {/* Minimal Top Utility Bar (< 8% mobile viewport height, compact controls) */}
      <header
        className={`${
          phase === 'LETTER_SCROLL' ? 'absolute' : 'fixed'
        } inset-x-0 top-0 z-40 flex h-13 items-center justify-between px-3 sm:px-6 pointer-events-none`}
      >
        <span
          className="truncate max-w-[62vw] text-sm sm:text-base font-semibold tracking-wide text-[#F3E6CA]/85 drop-shadow-[0_2px_6px_rgba(12,8,14,0.8)]"
          style={{ fontFamily: 'var(--font-serif-wizard)' }}
        >
          A Special Delivery for Dr. Panda
        </span>
      </header>

      <div className="fixed top-0 right-0 z-50 flex h-13 items-center gap-1.5 px-3 sm:px-6 pointer-events-auto">
        <button
          type="button"
          onClick={handleToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundEnabled ? 'Mute sound' : 'Sound on'}
          className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg border border-[#F3E6CA]/20 bg-[#241C28]/70 text-[#F3E6CA] backdrop-blur-sm transition-colors hover:bg-[#322738]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
        >
          {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5 opacity-75" />}
        </button>

        {phase !== 'HOSPITAL_INTRO' && (
          <button
            type="button"
            onClick={handleReplay}
            aria-label="Replay story from the beginning"
            title="Replay story"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg border border-[#F3E6CA]/20 bg-[#241C28]/70 text-[#F3E6CA] backdrop-blur-sm transition-colors hover:bg-[#322738]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Interactive Stage */}
      <main className="relative z-10 h-full w-full">
        {/* SCENE 1: Gentle Opening Title Overlay inside the Medical Ward */}
        <AnimatePresence>
          {phase === 'HOSPITAL_INTRO' && (
            <motion.div
              key="scene1-intro"
              className="flex h-full w-full flex-col items-center justify-end pb-12 sm:pb-16 px-5 text-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="max-w-md rounded-xl border border-[#C89B3C]/35 bg-[#201924]/72 px-6 py-4 backdrop-blur-sm shadow-[0_12px_30px_rgba(12,8,14,0.5)]">
                <h1
                  className="text-2xl sm:text-3xl font-bold tracking-wide text-[#F5EAD2] text-balance"
                  style={{ fontFamily: 'var(--font-serif-wizard)' }}
                >
                  A Special Delivery for Dr. Panda
                </h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 2: Wizard Panda Enters & Walks Down the Corridor */}
        <AnimatePresence>
          {phase === 'PANDA_APPROACH' && (
            <motion.div
              key="scene2-walk"
              className="flex h-full w-full items-center justify-center pt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="w-[210px] sm:w-[270px] aspect-[280/320]"
                initial={
                  reducedMotion
                    ? { opacity: 0, scale: 0.85, y: 12 }
                    : { opacity: 0.15, scale: 0.24, y: -62 }
                }
                animate={
                  reducedMotion
                    ? { opacity: 1, scale: 0.92, y: 18 }
                    : { opacity: 1, scale: 0.92, y: 24 }
                }
                transition={{
                  duration: reducedMotion ? 0.6 : 3.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <WizardPanda
                  expression="serious"
                  isWalking={true}
                  holdingEnvelope={true}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 3: First-Person Delivery Dialogue + Tap to Receive */}
        <AnimatePresence>
          {phase === 'DELIVERY_DIALOGUE' && (
            <motion.section
              key="scene3-delivery"
              aria-label="Wizard panda delivery"
              className="flex h-dvh w-full flex-col items-center justify-between pt-14 pb-7 sm:pb-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Speech Bubble Above Panda */}
              <motion.div
                className="relative mt-2 sm:mt-4 w-full max-w-[350px] sm:max-w-[440px]"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative rounded-2xl border-[3px] border-[#241B17] bg-[#FBF3E2] px-5 py-4 sm:px-7 sm:py-5 text-center shadow-[0_12px_28px_rgba(12,8,14,0.45)]">
                  <p
                    className="text-[19px] sm:text-[22px] font-semibold leading-snug text-[#241B17] text-balance"
                    style={{ fontFamily: 'var(--font-serif-wizard)' }}
                  >
                    &ldquo;Excuse me! I have a letter for you from one Roonil Wazlib.&rdquo;
                  </p>
                  {/* Storybook Speech Tail */}
                  <div
                    className="absolute -bottom-[15px] left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                  >
                    <svg width="28" height="16" viewBox="0 0 28 16">
                      <polygon points="2,0 26,0 14,14" fill="#FBF3E2" />
                      <polyline
                        points="2,0 14,14 26,0"
                        fill="none"
                        stroke="#241B17"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Close-Up First-Person Panda Holding Letter Out */}
              <motion.button
                type="button"
                onClick={handleReceiveLetter}
                aria-label="Receive envelope from the wizard panda"
                className="group relative flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C89B3C] rounded-3xl"
                initial={reducedMotion ? { opacity: 0 } : { scale: 0.94, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="h-[clamp(210px,36dvh,310px)] aspect-[280/320] transition-transform duration-200 group-hover:scale-[1.02]">
                  <WizardPanda
                    expression="serious"
                    isWalking={false}
                    holdingEnvelope={true}
                    lookingUp={true}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </motion.button>

              {/* Thumb-Zone Tap Prompt */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="flex flex-col items-center gap-2"
              >
                <button
                  type="button"
                  onClick={handleReceiveLetter}
                  className="min-h-[48px] cursor-pointer rounded-xl border-2 border-[#241B17] bg-[#C89B3C] px-7 py-3 text-base sm:text-lg font-bold tracking-[0.08em] text-[#241B17] shadow-[0_6px_0_#241B17,0_12px_22px_rgba(12,8,14,0.45)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#D8AD4C] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4DFAC] whitespace-nowrap shrink-0"
                  style={{ fontFamily: 'var(--font-serif-wizard)' }}
                >
                  Take the Letter
                </button>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SCENE 4: Handed-Over Envelope + OPEN or Evasive IGNORE */}
        <AnimatePresence>
          {phase === 'CHOICE_PROMPT' && (
            <motion.section
              key="scene4-choice"
              aria-label="Open or ignore the letter"
              className="flex h-dvh w-full flex-col items-center justify-between pt-12 pb-2 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Panda Watching & Reacting with Increasingly Confused Expressions */}
              <div className="mt-1 flex shrink-0 items-center justify-center">
                <div className="h-[clamp(142px,23dvh,220px)] aspect-[280/320]">
                  <WizardPanda
                    expression={pandaExpression}
                    isWalking={false}
                    holdingEnvelope={false}
                    lookingUp={true}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>

              {/* Handed-Over Envelope Centered Clearly */}
              <div className="my-1 shrink-0">
                <EnvelopeStage phase={phase} reducedMotion={reducedMotion} />
              </div>

              {/* Bounded Interactive Choice Arena */}
              <ChoiceControls
                attemptCount={ignoreAttempts}
                onAttemptEscape={setIgnoreAttempts}
                onOpen={handleOpenLetter}
                reducedMotion={reducedMotion}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* SCENE 5: Zoom, Wax Seal Breaking, Golden Particles & Scroll Unrolling */}
        <AnimatePresence>
          {phase === 'UNSEALING' && (
            <motion.section
              key="scene5-unsealing"
              aria-label="Breaking wax seal and opening letter"
              className="flex h-dvh w-full items-center justify-center px-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <EnvelopeStage phase={phase} reducedMotion={reducedMotion} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* SCENE 6: Blank Scrollable Parchment Letter Screen */}
        <AnimatePresence>
          {phase === 'LETTER_SCROLL' && (
            <motion.section
              key="scene6-letter"
              aria-label="Letter reading screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <LetterScroll reducedMotion={reducedMotion} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
