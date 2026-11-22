import React from 'react';
import { motion } from 'motion/react';
import type { PandaExpression } from '../types/story';

interface WizardPandaProps {
  expression?: PandaExpression;
  isWalking?: boolean;
  holdingEnvelope?: boolean;
  lookingUp?: boolean;
  reducedMotion?: boolean;
  className?: string;
}

export const WizardPanda: React.FC<WizardPandaProps> = ({
  expression = 'serious',
  isWalking = false,
  holdingEnvelope = true,
  lookingUp = false,
  reducedMotion = false,
  className = '',
}) => {
  const walkActive = isWalking && !reducedMotion;

  const renderReactionMark = () => {
    if (expression === 'serious') return null;

    if (expression === 'surprised') {
      return (
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22 }}
        >
          <text
            x="220"
            y="72"
            fill="#F3E5C2"
            stroke="#241B17"
            strokeWidth="3.5"
            paintOrder="stroke"
            fontSize="30"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-serif-wizard)' }}
          >
            ?
          </text>
        </motion.g>
      );
    }

    if (expression === 'confused') {
      return (
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, rotate: -10, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 6, scale: 1 }}
          transition={{ duration: 0.22 }}
        >
          <text
            x="216"
            y="68"
            fill="#E7BE66"
            stroke="#241B17"
            strokeWidth="3.5"
            paintOrder="stroke"
            fontSize="32"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-serif-wizard)' }}
          >
            ?!
          </text>
        </motion.g>
      );
    }

    if (expression === 'baffled') {
      return (
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Chibi sweat drop */}
          <path
            d="M 192 94 Q 198 106 192 112 Q 186 106 192 94 Z"
            fill="#A6CFE6"
            stroke="#241B17"
            strokeWidth="2.2"
          />
          <text
            x="212"
            y="64"
            fill="#E7BE66"
            stroke="#241B17"
            strokeWidth="3.5"
            paintOrder="stroke"
            fontSize="28"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-serif-wizard)' }}
          >
            ???
          </text>
        </motion.g>
      );
    }

    if (expression === 'deadpan') {
      return (
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Anime exasperation puff */}
          <path
            d="M 210 88 Q 222 82 224 91 Q 230 96 220 100"
            fill="none"
            stroke="#E5D9C3"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="226" y1="84" x2="233" y2="80" stroke="#E5D9C3" strokeWidth="2.2" strokeLinecap="round" />
        </motion.g>
      );
    }

    return null;
  };

  const renderEyesAndMouth = () => {
    const pupilShiftY = lookingUp ? -2.2 : 0;

    if (expression === 'deadpan') {
      return (
        <g>
          {/* Left half-lidded unimpressed anime eye */}
          <path d="M 99 116 L 122 116" stroke="#241B17" strokeWidth="3.6" strokeLinecap="round" />
          <path
            d="M 103 116 A 7 6 0 0 0 118 116 Z"
            fill="#1D1716"
          />
          <circle cx="107" cy="118.5" r="1.4" fill="#FFFFFF" />

          {/* Right half-lidded unimpressed anime eye */}
          <path d="M 158 116 L 181 116" stroke="#241B17" strokeWidth="3.6" strokeLinecap="round" />
          <path
            d="M 162 116 A 7 6 0 0 0 177 116 Z"
            fill="#1D1716"
          />
          <circle cx="166" cy="118.5" r="1.4" fill="#FFFFFF" />

          {/* Flat mouth */}
          <line x1="133" y1="142" x2="147" y2="142" stroke="#241B17" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      );
    }

    if (expression === 'baffled') {
      return (
        <g>
          {/* Baffled wide anime eyes with tilted worried brows */}
          <path d="M 97 104 Q 110 98 122 104" fill="none" stroke="#FAF2E4" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 158 102 Q 170 95 183 103" fill="none" stroke="#FAF2E4" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="111" cy={117 + pupilShiftY} r="9" fill="#FFFFFF" stroke="#241B17" strokeWidth="2" />
          <circle cx="111" cy={117 + pupilShiftY} r="3.4" fill="#1E1715" />

          <circle cx="169" cy={117 + pupilShiftY} r="9" fill="#FFFFFF" stroke="#241B17" strokeWidth="2" />
          <circle cx="169" cy={117 + pupilShiftY} r="3.4" fill="#1E1715" />

          {/* Wobbly puzzled mouth */}
          <path
            d="M 131 141 Q 135 137 140 141 Q 145 145 149 141"
            fill="none"
            stroke="#241B17"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (expression === 'confused') {
      return (
        <g>
          {/* Asymmetric confused anime brows */}
          <path d="M 99 104 L 122 107" stroke="#FAF2E4" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 159 102 Q 170 96 181 102" fill="none" stroke="#FAF2E4" strokeWidth="2.4" strokeLinecap="round" />

          {/* Slightly squint left eye, wide right eye */}
          <ellipse cx="111" cy={117 + pupilShiftY} rx="6.5" ry="5" fill="#151110" />
          <circle cx="109" cy={115 + pupilShiftY} r="2.2" fill="#FFFFFF" />

          <ellipse cx="169" cy={116 + pupilShiftY} rx="7.2" ry="8.2" fill="#151110" />
          <circle cx="166.5" cy={113 + pupilShiftY} r="2.8" fill="#FFFFFF" />
          <circle cx="171.5" cy={119 + pupilShiftY} r="1.4" fill="#FFFFFF" />

          {/* Small crooked mouth */}
          <path
            d="M 134 142 Q 140 139 146 143"
            fill="none"
            stroke="#241B17"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (expression === 'surprised') {
      return (
        <g>
          <path d="M 101 102 Q 111 97 121 102" fill="none" stroke="#FAF2E4" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 159 102 Q 169 97 179 102" fill="none" stroke="#FAF2E4" strokeWidth="2.4" strokeLinecap="round" />

          <ellipse cx="111" cy={116 + pupilShiftY} rx="7.6" ry="8.8" fill="#151110" />
          <circle cx="108.5" cy={112.5 + pupilShiftY} r="3" fill="#FFFFFF" />
          <circle cx="113.5" cy={119.5 + pupilShiftY} r="1.5" fill="#FFFFFF" />

          <ellipse cx="169" cy={116 + pupilShiftY} rx="7.6" ry="8.8" fill="#151110" />
          <circle cx="166.5" cy={112.5 + pupilShiftY} r="3" fill="#FFFFFF" />
          <circle cx="171.5" cy={119.5 + pupilShiftY} r="1.5" fill="#FFFFFF" />

          {/* Tiny surprised 'o' mouth */}
          <ellipse cx="140" cy="142" rx="4" ry="4.5" fill="#C9736B" stroke="#241B17" strokeWidth="2.3" />
        </g>
      );
    }

    // Default: 'serious' earnest postal courier expression
    return (
      <g>
        {/* Tiny determined courier brows inside eye patches */}
        <path d="M 102 105 L 121 108" stroke="#F8F0DF" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        <path d="M 178 105 L 159 108" stroke="#F8F0DF" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />

        {/* Big shiny chibi anime eyes */}
        <ellipse cx="111" cy={117 + pupilShiftY} rx="6.8" ry="7.8" fill="#141010" />
        <circle cx="108.5" cy={113.8 + pupilShiftY} r="2.7" fill="#FFFFFF" />
        <circle cx="113" cy={120 + pupilShiftY} r="1.3" fill="#FFFFFF" />

        <ellipse cx="169" cy={117 + pupilShiftY} rx="6.8" ry="7.8" fill="#141010" />
        <circle cx="166.5" cy={113.8 + pupilShiftY} r="2.7" fill="#FFFFFF" />
        <circle cx="171" cy={120 + pupilShiftY} r="1.3" fill="#FFFFFF" />

        {/* Earnest tidy anime mouth */}
        <path
          d="M 133 139 Q 136.5 143 140 139 Q 143.5 143 147 139"
          fill="none"
          stroke="#241B17"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    );
  };

  return (
    <motion.div
      className={`select-none ${className}`}
      animate={
        walkActive
          ? {
              y: [0, -7, 0, -7, 0],
              rotate: [-1.4, 1.4, -1.4],
            }
          : reducedMotion
            ? { y: 0, rotate: 0 }
            : {
                y: [0, -2.5, 0],
                rotate:
                  expression === 'confused'
                    ? -3
                    : expression === 'baffled'
                      ? [0, -2, 2, 0]
                      : 0,
              }
      }
      transition={
        walkActive
          ? {
              duration: 0.72,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : expression === 'baffled' && !reducedMotion
            ? { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
            : {
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
      }
    >
      <svg
        viewBox="0 0 280 320"
        className="h-full w-full overflow-visible drop-shadow-[0_12px_18px_rgba(16,11,18,0.45)]"
        role="img"
        aria-label="Cute chibi wizard panda wearing a pointed wizard hat, black robe, Hufflepuff striped scarf, and magical postal satchel"
      >
        {/* Ground Shadow */}
        <ellipse cx="140" cy="296" rx="56" ry="12" fill="rgba(16, 11, 18, 0.42)" />

        {/* Tiny Stubby Panda Feet (Animated during walk!) */}
        <motion.g
          animate={
            walkActive
              ? { y: [0, -7, 0, 2, 0] }
              : { y: 0 }
          }
          transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="116" cy="282" rx="17" ry="11" fill="#2A2525" stroke="#241B17" strokeWidth="3.5" />
          <ellipse cx="116" cy="285" rx="7" ry="4" fill="#463E3D" />
        </motion.g>

        <motion.g
          animate={
            walkActive
              ? { y: [2, 0, -7, 0, 2] }
              : { y: 0 }
          }
          transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="164" cy="282" rx="17" ry="11" fill="#2A2525" stroke="#241B17" strokeWidth="3.5" />
          <ellipse cx="164" cy="285" rx="7" ry="4" fill="#463E3D" />
        </motion.g>

        {/* Chibi Body: Tailored Black Wizard Robe */}
        <g>
          <path
            d="M 96 178 Q 84 234 86 276 Q 140 286 194 276 Q 196 234 184 178 Z"
            fill="#241F26"
            stroke="#241B17"
            strokeWidth="3.6"
            strokeLinejoin="round"
          />
          {/* Controlled cel shading fold on robe */}
          <path
            d="M 102 184 Q 95 232 98 272 Q 112 275 120 275 Q 114 230 116 184 Z"
            fill="#332C36"
            opacity="0.7"
          />
          {/* Robe center front fold */}
          <line x1="140" y1="194" x2="140" y2="278" stroke="#18131A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Subtle brass robe clasp peeking below scarf */}
          <circle cx="140" cy="206" r="3.5" fill="#C89B3C" stroke="#241B17" strokeWidth="1.6" />
        </g>

        {/* Magical Postal Delivery Bag (Crossbody Leather Satchel) */}
        <g>
          {/* Strap crossing from right shoulder to left hip */}
          <path
            d="M 104 176 Q 145 212 188 230"
            fill="none"
            stroke="#8A573B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 104 176 Q 145 212 188 230"
            fill="none"
            stroke="#241B17"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />

          <motion.g
            style={{ originX: '188px', originY: '216px' }}
            animate={
              walkActive
                ? { rotate: [-4, 5, -4] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Parchment corner peeking out of satchel */}
            <polygon
              points="182,208 206,202 212,222 186,226"
              fill="#F3E5C8"
              stroke="#241B17"
              strokeWidth="2.4"
            />
            {/* Leather bag body */}
            <rect
              x="174"
              y="214"
              width="44"
              height="36"
              rx="8"
              fill="#8D5B3E"
              stroke="#241B17"
              strokeWidth="3.2"
            />
            {/* Bag flap */}
            <path
              d="M 174 218 Q 196 242 218 218 L 218 214 L 174 214 Z"
              fill="#A36B4B"
              stroke="#241B17"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Tiny brass satchel buckle */}
            <rect
              x="191"
              y="227"
              width="10"
              height="9"
              rx="2"
              fill="#C89B3C"
              stroke="#241B17"
              strokeWidth="2"
            />
          </motion.g>
        </g>

        {/* Hufflepuff-Inspired Wizard Scarf (Badger-Gold & Charcoal Stripes!) */}
        <g>
          {/* Trailing hanging scarf tail on viewer's left */}
          <motion.g
            style={{ originX: '115px', originY: '185px' }}
            animate={
              walkActive
                ? { rotate: [3, -5, 3] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M 102 182 L 128 184 L 124 238 L 98 235 Z"
              fill="#C89B3C"
              stroke="#241B17"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Charcoal horizontal stripes on scarf tail */}
            <polygon points="101,196 127,198 126,208 100,206" fill="#2A2625" />
            <polygon points="99,218 125,220 124,230 98,228" fill="#2A2625" />
            {/* Tiny scarf fringe tassels */}
            <line x1="101" y1="236" x2="100" y2="245" stroke="#241B17" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="108" y1="237" x2="107" y2="246" stroke="#241B17" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="115" y1="237" x2="114" y2="246" stroke="#241B17" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="122" y1="238" x2="121" y2="246" stroke="#241B17" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>

          {/* Main scarf collar wrap */}
          <path
            d="M 90 168 Q 140 184 190 168 Q 194 185 186 194 Q 140 206 94 194 Q 86 185 90 168 Z"
            fill="#C89B3C"
            stroke="#241B17"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Charcoal Hufflepuff stripes around collar */}
          <path
            d="M 106 173 L 118 175 L 116 197 L 104 195 Z"
            fill="#2A2625"
          />
          <path
            d="M 134 177 L 146 177 L 146 199 L 134 199 Z"
            fill="#2A2625"
          />
          <path
            d="M 162 175 L 174 173 L 176 195 L 164 197 Z"
            fill="#2A2625"
          />
          {/* Re-stroke scarf collar outer border cleanly over stripes */}
          <path
            d="M 90 168 Q 140 184 190 168 Q 194 185 186 194 Q 140 206 94 194 Q 86 185 90 168 Z"
            fill="none"
            stroke="#241B17"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </g>

        {/* Paws & Held Envelope (Consistent across Scenes 2-4) */}
        {holdingEnvelope ? (
          <g>
            {/* Left & Right Robe Sleeves reaching forward */}
            <path
              d="M 92 192 Q 78 214 96 228 L 112 216 Q 106 202 104 192 Z"
              fill="#241F26"
              stroke="#241B17"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M 188 192 Q 202 214 184 228 L 168 216 Q 174 202 176 192 Z"
              fill="#241F26"
              stroke="#241B17"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />

            {/* Cream Parchment Envelope Held in Paws */}
            <g>
              <rect
                x="108"
                y="206"
                width="64"
                height="44"
                rx="4"
                fill="#F2E3C6"
                stroke="#241B17"
                strokeWidth="3"
              />
              <path
                d="M 109 208 L 140 230 L 171 208"
                fill="none"
                stroke="#8A6C49"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Tiny red wax seal dot */}
              <circle cx="140" cy="230" r="6" fill="#9A2D2D" stroke="#241B17" strokeWidth="1.8" />
            </g>

            {/* Cute Round Black Panda Paws gripping sides of envelope */}
            <ellipse cx="106" cy="226" rx="12" ry="10" fill="#2A2525" stroke="#241B17" strokeWidth="3" />
            <ellipse cx="174" cy="226" rx="12" ry="10" fill="#2A2525" stroke="#241B17" strokeWidth="3" />
          </g>
        ) : (
          <g>
            {/* Free paws clasped politely / gently reacting after handing over envelope */}
            <path
              d="M 94 192 Q 82 216 104 224 L 116 212 Z"
              fill="#241F26"
              stroke="#241B17"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M 186 192 Q 198 216 176 224 L 164 212 Z"
              fill="#241F26"
              stroke="#241B17"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <ellipse cx="116" cy="221" rx="11" ry="9" fill="#2A2525" stroke="#241B17" strokeWidth="3" />
            <ellipse cx="164" cy="221" rx="11" ry="9" fill="#2A2525" stroke="#241B17" strokeWidth="3" />
          </g>
        )}

        {/* Oversized Chibi Panda Head + Ears + Pointed Wizard Hat */}
        <motion.g
          style={{ originX: '140px', originY: '150px' }}
          animate={
            lookingUp && !reducedMotion
              ? { y: -2 }
              : { y: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          {/* Round Fuzzy Black Panda Ears (Consistent Silhouette) */}
          <circle cx="88" cy="70" r="22" fill="#2A2525" stroke="#241B17" strokeWidth="3.8" />
          <circle cx="89" cy="71" r="10" fill="#463E3E" />

          <circle cx="192" cy="70" r="22" fill="#2A2525" stroke="#241B17" strokeWidth="3.8" />
          <circle cx="191" cy="71" r="10" fill="#463E3E" />

          {/* Chibi Panda Head Shape (Soft Squircle-Oval) */}
          <path
            d="M 74 118 C 74 78 102 62 140 62 C 178 62 206 78 206 118 C 206 156 178 173 140 173 C 102 173 74 156 74 118 Z"
            fill="#FBF7EE"
            stroke="#241B17"
            strokeWidth="3.8"
          />

          {/* Controlled Warm Cel Shading on Bottom/Side of Face */}
          <path
            d="M 80 132 C 88 158 112 169 140 169 C 168 169 192 158 200 132 C 188 152 166 160 140 160 C 114 160 92 152 80 132 Z"
            fill="#EAE0CB"
          />

          {/* Cute Rosy Anime Cheek Blush */}
          <ellipse cx="94" cy="136" rx="10" ry="5.5" fill="#E9A29A" opacity="0.72" />
          <ellipse cx="186" cy="136" rx="10" ry="5.5" fill="#E9A29A" opacity="0.72" />

          {/* Classic Tilted Panda Eye Patches */}
          <ellipse
            cx="111"
            cy="115"
            rx="19"
            ry="23"
            transform="rotate(-14 111 115)"
            fill="#2B2626"
          />
          <ellipse
            cx="169"
            cy="115"
            rx="19"
            ry="23"
            transform="rotate(14 169 115)"
            fill="#2B2626"
          />

          {/* Expressive Anime Eyes + Mouth */}
          {renderEyesAndMouth()}

          {/* Cute Button Panda Nose */}
          <ellipse cx="140" cy="129" rx="7" ry="4.6" fill="#241B17" />
          <ellipse cx="138" cy="127.6" rx="2.2" ry="1.1" fill="#5A4D49" />

          {/* Pointed Wizard Hat (Sitting Snugly Between Ears!) */}
          <g>
            {/* Hat Brim */}
            <path
              d="M 74 74 Q 140 52 206 74 Q 140 84 74 74 Z"
              fill="#2B242E"
              stroke="#241B17"
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {/* Conical Wizard Crown with Slight Storybook Crooked Tip */}
            <path
              d="M 96 67 Q 108 32 136 14 Q 152 4 168 14 Q 153 26 164 42 Q 174 56 184 67 Q 140 60 96 67 Z"
              fill="#2B242E"
              stroke="#241B17"
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {/* Controlled Hat Fold Highlight */}
            <path
              d="M 106 62 Q 118 35 138 20 Q 129 41 124 62 Z"
              fill="#3E3443"
              opacity="0.75"
            />
            {/* Hat Crease Line */}
            <path
              d="M 124 44 Q 142 40 156 46"
              fill="none"
              stroke="#1A151C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Muted Hufflepuff Gold Hatband & Tiny Brass Buckle */}
            <path
              d="M 98 63 Q 140 56 182 63 L 184 68 Q 140 61 96 68 Z"
              fill="#C89B3C"
              stroke="#241B17"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <rect
              x="134"
              y="56.5"
              width="12"
              height="9.5"
              rx="1.8"
              fill="#DFB95E"
              stroke="#241B17"
              strokeWidth="2"
            />
          </g>

          {/* Animated Confusion / Reaction Indicators */}
          {renderReactionMark()}
        </motion.g>
      </svg>
    </motion.div>
  );
};
