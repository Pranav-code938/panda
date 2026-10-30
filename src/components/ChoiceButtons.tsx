import React, { useRef } from 'react';
import { EvadeState } from '../logic/deliveryMachine';

interface ChoiceButtonsProps {
  onOpen: () => void;
  onIgnoreAttempt: () => void;
  evadeState: EvadeState;
  disabled?: boolean;
}

export const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  onOpen,
  onIgnoreAttempt,
  evadeState,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIgnoreInteraction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (evadeState.label.includes('Fine.')) {
      // User tapped "Fine. Open it. 🙄" - let it fulfill its fate and open!
      onOpen();
      return;
    }

    onIgnoreAttempt();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto min-h-[96px] flex items-center justify-center gap-6 px-4 py-2 select-none"
    >
      {/* OPEN BUTTON - Always accessible, centered, never obstructed */}
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        aria-label="Open letter from Roonil Wazlib"
        className="relative z-20 group px-8 py-3.5 rounded-xl font-serif font-bold text-base md:text-lg tracking-wider text-amber-50 uppercase cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-900/30 border border-amber-400/40"
        style={{
          background: 'linear-gradient(180deg, #991B1B 0%, #7F1D1D 100%)',
          boxShadow: '0 8px 20px -4px rgba(127, 29, 29, 0.5), inset 0 1px 2px rgba(254, 240, 138, 0.4)',
          fontFamily: "'Cinzel', serif",
        }}
      >
        <span className="flex items-center gap-2">
          <span>✨</span>
          <span>OPEN</span>
          <span>✨</span>
        </span>
      </button>

      {/* IGNORE BUTTON - Hilarious dodging rascal */}
      <div
        className="relative z-10 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate(${evadeState.offsetX}px, ${evadeState.offsetY}px) rotate(${evadeState.rotation}deg)`,
        }}
      >
        <button
          type="button"
          onClick={handleIgnoreInteraction}
          onMouseEnter={handleIgnoreInteraction}
          onTouchStart={handleIgnoreInteraction}
          disabled={disabled}
          aria-label={`Ignore letter: ${evadeState.label}`}
          className={`px-6 py-3.5 rounded-xl font-serif font-semibold text-sm md:text-base tracking-wider transition-all duration-200 cursor-pointer shadow-md border ${
            evadeState.count > 0 ? 'animate-wiggle' : ''
          } ${
            evadeState.label.includes('Fine')
              ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
              : 'bg-stone-200/90 hover:bg-stone-300/90 text-stone-700 border-stone-300'
          }`}
          style={{
            fontFamily: "'Cinzel', serif",
          }}
        >
          <span className="whitespace-nowrap">{evadeState.label}</span>
        </button>
      </div>
    </div>
  );
};
