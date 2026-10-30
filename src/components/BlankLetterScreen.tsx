import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

interface BlankLetterScreenProps {
  onReplay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const BlankLetterScreen: React.FC<BlankLetterScreenProps> = ({
  onReplay,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  // Letter content is strictly blank by default as requested.
  // We allow an in-place editor so the user can immediately type or test their personal birthday letter!
  const [letterText, setLetterText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const handleCopy = () => {
    if (letterText) {
      navigator.clipboard.writeText(letterText).then(() => {
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-6 px-3 sm:px-6 bg-[#2B231F] text-stone-200 overflow-y-auto">
      {/* Hogwarts-inspired subtle ambient background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #B45309 0%, #1C1917 75%)',
        }}
      />

      {/* Top Utility Toolbar */}
      <header className="relative z-20 w-full max-w-2xl flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#524136]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600/50 text-xs font-serif text-amber-200 tracking-wide transition-colors cursor-pointer"
            aria-label="Replay magical delivery animation"
          >
            <span>✨</span>
            <span>Replay Delivery</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsEditing(!isEditing);
              soundEffects.playDialogueBlip();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif tracking-wide transition-colors border cursor-pointer ${
              isEditing
                ? 'bg-amber-800/90 text-amber-100 border-amber-600'
                : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border-stone-600/50'
            }`}
            aria-label="Toggle editing birthday letter"
          >
            <span>✒️</span>
            <span>{isEditing ? 'Done Writing' : 'Write / Edit Letter'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 border border-stone-600/50 text-stone-300 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Sound muted' : 'Sound active'}
          >
            {isMuted ? '🔇' : '🔔'}
          </button>

          {/* Reduced Motion Toggle Button */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`px-2.5 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              reducedMotion
                ? 'bg-amber-900/60 text-amber-200 border-amber-500'
                : 'bg-stone-800/80 text-stone-300 border-stone-600/50'
            }`}
            aria-label="Toggle reduced motion"
            title="Toggle reduced motion"
          >
            {reducedMotion ? 'Motion: Off' : 'Motion: On'}
          </button>
        </div>
      </header>

      {/* Scroll Container */}
      <main
        className={`relative z-10 w-full max-w-xl mx-auto my-2 transition-all duration-700 ease-out ${
          reducedMotion ? '' : 'animate-scroll-unroll'
        }`}
      >
        {/* Top Scroll Wooden Roller */}
        <div className="relative h-10 w-[104%] -left-[2%] flex items-center justify-between px-2 bg-gradient-to-r from-[#593922] via-[#855836] to-[#593922] rounded-full shadow-xl border-t border-[#A47148]">
          <div className="w-5 h-7 rounded-md bg-[#D4AF37] border border-[#8C6D23] shadow-inner" />
          <div className="text-center">
            <span
              className="text-[11px] uppercase tracking-widest text-amber-200/90 font-serif font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Special Delivery · Dr. Panda
            </span>
          </div>
          <div className="w-5 h-7 rounded-md bg-[#D4AF37] border border-[#8C6D23] shadow-inner" />
        </div>

        {/* The Unfolded Parchment Surface */}
        <div
          className="relative w-full min-h-[580px] md:min-h-[700px] px-8 sm:px-12 py-10 shadow-2xl border-x-2 border-[#A89173] text-[#29201B]"
          style={{
            background: 'linear-gradient(180deg, #FBF8EE 0%, #F5EED9 40%, #EFE5CC 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(180, 140, 90, 0.2)',
          }}
        >
          {/* Subtle Vintage Parchment Paper Lines & Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(#8E7554 0.6px, transparent 0.6px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Golden filigree header ornament */}
          <div className="flex flex-col items-center justify-center pb-6 mb-8 border-b border-[#D8C7AA]">
            <div className="flex items-center gap-3 text-amber-800/80">
              <span className="text-sm">✦</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8F6A3E] to-transparent" />
              <span className="text-lg">🦉</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8F6A3E] to-transparent" />
              <span className="text-sm">✦</span>
            </div>

            <span
              className="text-xs uppercase tracking-widest text-[#7D5F3A] font-serif font-bold mt-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              By Special Owl & Panda Messenger
            </span>
          </div>

          {/* THE LETTER BODY:
              Completely blank by default as strictly instructed!
              No placeholder sentences, no invented sentimental writing.
              When isEditing is true, user can type directly into the parchment scroll!
          */}
          {isEditing ? (
            <div className="relative z-10 w-full animate-fadeIn">
              <label htmlFor="birthday-letter-input" className="block text-xs font-serif uppercase tracking-wider text-[#7D5F3A] mb-2 font-bold">
                Write Birthday Letter:
              </label>
              <textarea
                id="birthday-letter-input"
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                rows={16}
                placeholder="Type your personal birthday letter here..."
                className="w-full p-4 rounded-lg bg-white/70 border border-[#C5B396] text-[#29201B] font-serif text-base sm:text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8F6A3E]/50 shadow-inner resize-y"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />
              <div className="flex items-center justify-between mt-3 text-xs text-[#7D5F3A]">
                <span>{letterText.length} characters</span>
                {letterText && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="underline hover:text-[#523A1E] cursor-pointer"
                  >
                    {copiedNotification ? 'Copied to clipboard!' : 'Copy letter text'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="relative z-10 min-h-[360px] md:min-h-[460px] flex flex-col justify-start">
              {letterText ? (
                // Display the written personal letter
                <div
                  className="font-serif text-base sm:text-lg md:text-xl text-[#29201B] leading-relaxed whitespace-pre-wrap select-text"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {letterText}
                </div>
              ) : (
                // Clean blank letter state (no placeholder text, as strictly instructed!)
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#9A8468] select-none">
                  {/* Elegant blank parchment watermark */}
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#C5B499] flex items-center justify-center opacity-60 mb-3">
                    <span className="text-2xl">✒️</span>
                  </div>
                  <span
                    className="text-xs uppercase tracking-widest font-serif opacity-75 font-semibold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Blank Letter Parchment
                  </span>
                  <p className="text-xs text-[#9E8B73] mt-1 italic max-w-xs">
                    Ready for your personal birthday message. Tap “Write / Edit Letter” above whenever you wish to add words.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Wax Seal Signature Stamp */}
          <div className="mt-12 pt-6 border-t border-[#D8C7AA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Adorable Mini Wax Panda Stamp */}
              <div className="w-9 h-9 rounded-full bg-[#991B1B] border border-[#680D0D] flex items-center justify-center shadow-md">
                <span className="text-xs">🐾</span>
              </div>
              <div className="text-[11px] font-serif text-[#634E35]">
                <div className="font-bold">SEAL OF DELIVERY</div>
                <div className="text-[10px] text-[#8C7152]">Official Wizard Post</div>
              </div>
            </div>

            <div className="text-right">
              <span
                className="text-xs font-serif italic text-[#634E35]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Roonil Wazlib
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Wooden Roller */}
        <div className="relative h-10 w-[104%] -left-[2%] flex items-center justify-between px-2 bg-gradient-to-r from-[#593922] via-[#855836] to-[#593922] rounded-full shadow-2xl border-b border-[#3D2513]">
          <div className="w-5 h-7 rounded-md bg-[#D4AF37] border border-[#8C6D23] shadow-inner" />
          <div className="w-6 h-6 rounded-full bg-[#D4AF37] border border-[#8C6D23] shadow-md flex items-center justify-center">
            <span className="text-[10px]">✨</span>
          </div>
          <div className="w-5 h-7 rounded-md bg-[#D4AF37] border border-[#8C6D23] shadow-inner" />
        </div>
      </main>
    </div>
  );
};
