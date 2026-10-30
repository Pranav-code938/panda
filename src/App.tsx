/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DeliveryStep,
  EvadeState,
  processIgnoreAttempt,
} from './logic/deliveryMachine';
import { soundEffects } from './utils/audio';
import { HospitalCorridor } from './components/HospitalCorridor';
import { WizardPanda } from './components/WizardPanda';
import { SpeechBubble } from './components/SpeechBubble';
import { EnvelopeCard } from './components/EnvelopeCard';
import { ChoiceButtons } from './components/ChoiceButtons';
import { BlankLetterScreen } from './components/BlankLetterScreen';

export default function App() {
  const [step, setStep] = useState<DeliveryStep>('HOSPITAL_APPROACH');
  const [evadeState, setEvadeState] = useState<EvadeState>({
    count: 0,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    label: 'IGNORE',
    expression: 'serious',
    quip: null,
  });

  const [isOpeningEnvelope, setIsOpeningEnvelope] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Corridor walking progress for Scene 1 -> Scene 2
  const [walkProgress, setWalkProgress] = useState<number>(0);
  const walkingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check URL query parameters for fast autostart / skip
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('step') === 'letter') {
        setStep('BLANK_LETTER');
      } else if (params.get('step') === 'choice') {
        setStep('CHOICE_INTERACTION');
      }
    }
  }, []);

  // Sync audio toggle with sound utility
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEffects.enabled = !nextMute;
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  // Scene 1 & 2: Panda walks into the hospital corridor towards viewer
  useEffect(() => {
    if (step === 'HOSPITAL_APPROACH') {
      // Gentle bouncing footsteps sound
      let stepCount = 0;
      const interval = setInterval(() => {
        stepCount += 1;
        if (stepCount % 2 === 0) {
          soundEffects.playBounce();
        }
        setWalkProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Transition smoothly into Scene 3: First-Person Delivery
            setTimeout(() => {
              setStep('DELIVERY_DIALOGUE');
              soundEffects.playDialogueBlip();
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 140);

      walkingTimerRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [step]);

  // Transition from Dialogue (Scene 3) to Choice (Scene 4)
  const handleProceedToChoice = useCallback(() => {
    setStep('CHOICE_INTERACTION');
    soundEffects.playDialogueBlip();
  }, []);

  // Handle IGNORE button evasion attempt
  const handleIgnoreAttempt = () => {
    soundEffects.playDodge();
    setEvadeState((prev) => {
      const containerBounds = {
        width: typeof window !== 'undefined' ? window.innerWidth : 360,
        height: typeof window !== 'undefined' ? window.innerHeight : 640,
      };
      return processIgnoreAttempt(prev.count, containerBounds);
    });
  };

  // Handle OPEN button click (Scene 5)
  const handleOpenLetter = () => {
    setIsOpeningEnvelope(true);
    setStep('OPENING_ENVELOPE');
    soundEffects.playSealBreak();

    // After breaking seal and opening flap, transition into Scene 6: Blank Letter Screen
    setTimeout(() => {
      soundEffects.playScrollUnroll();
      setStep('BLANK_LETTER');
      setIsOpeningEnvelope(false);
    }, 1200);
  };

  // Reset entire experience to replay the anime story
  const handleReplay = () => {
    setWalkProgress(0);
    setIsOpeningEnvelope(false);
    setEvadeState({
      count: 0,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
      label: 'IGNORE',
      expression: 'serious',
      quip: null,
    });
    setStep('HOSPITAL_APPROACH');
  };

  // If in Scene 6, show the blank letter reading screen
  if (step === 'BLANK_LETTER') {
    return (
      <BlankLetterScreen
        onReplay={handleReplay}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
      />
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#EAE2D5] flex flex-col items-center justify-center">
      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md backdrop-blur-sm border border-stone-200 transition-colors cursor-pointer text-sm"
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          title={isMuted ? 'Sound muted' : 'Sound active'}
        >
          {isMuted ? '🔇' : '🔔'}
        </button>

        <button
          type="button"
          onClick={() => {
            // Quick skip to delivery dialogue or choice
            if (step === 'HOSPITAL_APPROACH') {
              setStep('DELIVERY_DIALOGUE');
              setWalkProgress(100);
            } else if (step === 'DELIVERY_DIALOGUE') {
              setStep('CHOICE_INTERACTION');
            }
          }}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md backdrop-blur-sm border border-stone-200 text-xs font-serif transition-colors cursor-pointer"
          aria-label="Skip to next step"
        >
          Skip ❯
        </button>
      </div>

      {/* Main Animated Hospital Corridor Frame */}
      <HospitalCorridor cameraZoom={step !== 'HOSPITAL_APPROACH'}>
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-8 sm:pb-12 px-4">
          {/* SCENE 1 & 2: THE WIZARD PANDA WALKING IN CORRIDOR */}
          {step === 'HOSPITAL_APPROACH' && (
            <div
              className="relative flex flex-col items-center transition-all duration-300 ease-out"
              style={{
                transform: `scale(${0.45 + (walkProgress / 100) * 0.55}) translateY(${
                  -220 + (walkProgress / 100) * 190
                }px)`,
                opacity: 0.2 + (walkProgress / 100) * 0.8,
              }}
            >
              <WizardPanda
                expression="serious"
                isWalking={walkProgress < 100}
                showEnvelopeInPaws={true}
              />
              <div className="mt-2 px-3 py-1 bg-stone-900/60 rounded-full backdrop-blur-xs text-[11px] font-serif text-amber-100 tracking-wider">
                Owl Postal Service Emissary
              </div>
            </div>
          )}

          {/* SCENE 3: FIRST-PERSON DELIVERY & SPEECH BUBBLE */}
          {step === 'DELIVERY_DIALOGUE' && (
            <div className="relative z-20 w-full max-w-lg flex flex-col items-center gap-4 animate-fadeIn">
              {/* Dialogue Speech Bubble */}
              <SpeechBubble
                dialogue="Excuse me! I have a letter for you from one Roonil Wazlib."
                quip={null}
              />

              {/* Serious Postal Wizard Panda Standing Proudly, Looking Upwards */}
              <div className="relative mt-2">
                <WizardPanda
                  expression="serious"
                  isWalking={false}
                  scale={1.05}
                  showEnvelopeInPaws={true}
                />
              </div>

              {/* Hand Over Button / Prompt */}
              <button
                type="button"
                onClick={handleProceedToChoice}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#523A28] hover:bg-[#3E2B1D] text-amber-100 font-serif text-sm tracking-wide shadow-lg border border-amber-300/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span>Take Letter from Panda</span>
                <span>✉️</span>
              </button>
            </div>
          )}

          {/* SCENE 4 & 5: CHOICE INTERACTION & ENVELOPE OPENING */}
          {(step === 'CHOICE_INTERACTION' || step === 'OPENING_ENVELOPE') && (
            <div className="relative z-20 w-full max-w-lg flex flex-col items-center gap-2 sm:gap-3 animate-fadeIn pb-4">
              {/* Panda reaction bubble when user tries to dodge */}
              {evadeState.quip && (
                <div className="relative z-30 max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#8B2635]/30 shadow-lg text-center text-xs sm:text-sm font-medium text-[#8B2635] animate-bubble-pop flex items-center justify-center gap-1.5">
                  <span>🐾</span>
                  <span>{evadeState.quip}</span>
                </div>
              )}

              {/* Panda reacting in the background */}
              <div className="relative -mb-4 sm:-mb-6 transform scale-75 sm:scale-80 origin-bottom">
                <WizardPanda
                  expression={evadeState.expression}
                  isWalking={false}
                  showEnvelopeInPaws={false}
                />
              </div>

              {/* Parchment Envelope (First Person View) */}
              <EnvelopeCard
                isOpening={isOpeningEnvelope}
                onClickSeal={handleOpenLetter}
              />

              {/* Interactive OPEN and IGNORE Choice Buttons (Scene 4) */}
              {step === 'CHOICE_INTERACTION' && (
                <div className="w-full mt-1 sm:mt-2">
                  <ChoiceButtons
                    onOpen={handleOpenLetter}
                    onIgnoreAttempt={handleIgnoreAttempt}
                    evadeState={evadeState}
                    disabled={isOpeningEnvelope}
                  />
                </div>
              )}

              {/* Opening prompt hint */}
              {step === 'OPENING_ENVELOPE' && (
                <div className="text-center font-serif text-stone-800 text-sm tracking-widest animate-pulse mt-1">
                  Breaking the Panda Wax Seal... ✨
                </div>
              )}
            </div>
          )}
        </div>
      </HospitalCorridor>
    </div>
  );
}
