import React from 'react';
import { motion } from 'motion/react';
import type { StoryPhase } from '../types/story';

interface HospitalCorridorProps {
  phase: StoryPhase;
  reducedMotion: boolean;
}

const MOTES = [
  { id: 1, x: '38%', y: '34%', delay: '0s', size: 4 },
  { id: 2, x: '46%', y: '52%', delay: '1.2s', size: 3 },
  { id: 3, x: '54%', y: '28%', delay: '2.4s', size: 4.5 },
  { id: 4, x: '61%', y: '46%', delay: '0.8s', size: 3 },
  { id: 5, x: '43%', y: '66%', delay: '3.1s', size: 3.5 },
  { id: 6, x: '58%', y: '62%', delay: '1.8s', size: 3 },
  { id: 7, x: '26%', y: '44%', delay: '2.1s', size: 4 },
  { id: 8, x: '74%', y: '40%', delay: '0.5s', size: 4 },
];

export const HospitalCorridor: React.FC<HospitalCorridorProps> = ({
  phase,
  reducedMotion,
}) => {
  const cameraScale =
    phase === 'HOSPITAL_INTRO'
      ? 1
      : phase === 'PANDA_APPROACH'
        ? 1.12
        : phase === 'DELIVERY_DIALOGUE' || phase === 'CHOICE_PROMPT'
          ? 1.18
          : 1.24;

  const isForegroundFocused =
    phase === 'DELIVERY_DIALOGUE' ||
    phase === 'CHOICE_PROMPT' ||
    phase === 'UNSEALING' ||
    phase === 'LETTER_SCROLL';

  const scrimOpacity =
    phase === 'LETTER_SCROLL'
      ? 0.62
      : phase === 'UNSEALING'
        ? 0.48
        : isForegroundFocused
          ? 0.28
          : 0.06;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-center"
        animate={{
          scale: reducedMotion ? 1 : cameraScale,
        }}
        transition={{
          duration: phase === 'PANDA_APPROACH' ? 3.2 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            {/* Hogwarts twilight stone corridor & candlelight palette */}
            <linearGradient id="corridorWallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26202C" />
              <stop offset="48%" stopColor="#352D38" />
              <stop offset="100%" stopColor="#292129" />
            </linearGradient>

            <linearGradient id="moonWindowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B4F78" />
              <stop offset="55%" stopColor="#5D749E" />
              <stop offset="100%" stopColor="#7C8FB0" />
            </linearGradient>

            <linearGradient id="floorPerspectiveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E252B" />
              <stop offset="45%" stopColor="#3B2F32" />
              <stop offset="100%" stopColor="#241C21" />
            </linearGradient>

            <linearGradient id="runnerRugGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5C3B31" />
              <stop offset="50%" stopColor="#6D4638" />
              <stop offset="100%" stopColor="#4F3229" />
            </linearGradient>

            <linearGradient id="oakDoorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#583E30" />
              <stop offset="100%" stopColor="#39261E" />
            </linearGradient>

            <radialGradient id="warmSconceGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4C77B" stopOpacity="0.62" />
              <stop offset="42%" stopColor="#D89246" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#D89246" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="farDoorWarmth" cx="50%" cy="48%" r="52%">
              <stop offset="0%" stopColor="#F2C98A" stopOpacity="0.34" />
              <stop offset="60%" stopColor="#C88A4B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#26202C" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="moonbeamLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9AB0D4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9AB0D4" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="moonbeamRight" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9AB0D4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9AB0D4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base Corridor Stone Backdrop */}
          <rect width="1440" height="900" fill="url(#corridorWallGrad)" />

          {/* Vaulted Stone Ceiling & Perspective Side Walls */}
          <polygon points="0,0 1440,0 910,245 530,245" fill="#211C26" />
          <polygon points="0,0 530,245 530,545 0,740" fill="#2F2733" />
          <polygon points="1440,0 910,245 910,545 1440,740" fill="#2C2430" />

          {/* Perspective Stone Block Joint Lines (Subtle 2D Anime Linework) */}
          <g stroke="#1C161F" strokeWidth="2" opacity="0.55">
            <line x1="0" y1="150" x2="530" y2="295" />
            <line x1="0" y1="320" x2="530" y2="375" />
            <line x1="0" y1="505" x2="530" y2="465" />
            <line x1="1440" y1="150" x2="910" y2="295" />
            <line x1="1440" y1="320" x2="910" y2="375" />
            <line x1="1440" y1="505" x2="910" y2="465" />
          </g>

          {/* Gothic Ceiling Ribbing */}
          <g fill="none" stroke="#423747" strokeWidth="5" strokeLinecap="round">
            <path d="M 160 0 Q 430 140 530 250" />
            <path d="M 1280 0 Q 1010 140 910 250" />
            <path d="M 380 0 Q 540 120 570 250" opacity="0.65" />
            <path d="M 1060 0 Q 900 120 870 250" opacity="0.65" />
          </g>

          {/* Left Desktop-Framing Tall Gothic Lancet Window & Infirmary Alcove */}
          <g>
            {/* Window frame recess */}
            <path
              d="M 135 550 L 135 205 Q 135 110 235 80 Q 335 110 335 205 L 335 550 Z"
              fill="#1E1822"
              stroke="#241B17"
              strokeWidth="4"
            />
            <path
              d="M 155 535 L 155 215 Q 155 132 235 104 Q 315 132 315 215 L 315 535 Z"
              fill="url(#moonWindowGrad)"
              stroke="#241B17"
              strokeWidth="3"
            />
            {/* Crescent Moon & Starry Hogwarts Night Sky inside Window */}
            <circle cx="260" cy="185" r="24" fill="#E8E4D0" opacity="0.9" />
            <circle cx="270" cy="179" r="21" fill="#49608C" />
            <circle cx="195" cy="168" r="2.2" fill="#F5EAD2" opacity="0.85" />
            <circle cx="212" cy="222" r="1.8" fill="#F5EAD2" opacity="0.7" />
            {/* Gothic Window Tracery & Mullions */}
            <g stroke="#241B17" strokeWidth="4" fill="none">
              <line x1="235" y1="104" x2="235" y2="535" />
              <line x1="155" y1="265" x2="315" y2="265" />
              <line x1="155" y1="395" x2="315" y2="395" />
              <path d="M 155 215 Q 195 165 235 215 Q 275 165 315 215" />
              <circle cx="235" cy="148" r="16" />
            </g>
            {/* Soft Moonlight Shaft onto Floor */}
            <polygon points="155,535 315,535 495,770 190,770" fill="url(#moonbeamLeft)" />
          </g>

          {/* Right Desktop-Framing Tall Gothic Lancet Window & Infirmary Bed Screen */}
          <g>
            <path
              d="M 1105 550 L 1105 205 Q 1105 110 1205 80 Q 1305 110 1305 205 L 1305 550 Z"
              fill="#1E1822"
              stroke="#241B17"
              strokeWidth="4"
            />
            <path
              d="M 1125 535 L 1125 215 Q 1125 132 1205 104 Q 1285 132 1285 215 L 1285 535 Z"
              fill="url(#moonWindowGrad)"
              stroke="#241B17"
              strokeWidth="3"
            />
            <circle cx="1175" cy="178" r="2" fill="#F5EAD2" opacity="0.8" />
            <circle cx="1236" cy="210" r="2.5" fill="#F5EAD2" opacity="0.9" />
            <g stroke="#241B17" strokeWidth="4" fill="none">
              <line x1="1205" y1="104" x2="1205" y2="535" />
              <line x1="1125" y1="265" x2="1285" y2="265" />
              <line x1="1125" y1="395" x2="1285" y2="395" />
              <path d="M 1125 215 Q 1165 165 1205 215 Q 1245 165 1285 215" />
              <circle cx="1205" cy="148" r="16" />
            </g>
            <polygon points="1125,535 1285,535 1250,770 945,770" fill="url(#moonbeamRight)" />
          </g>

          {/* Left Desktop Apothecary & Infirmary Cabinet (Cozy Magical Clinic Detail) */}
          <g>
            <rect
              x="25"
              y="475"
              width="145"
              height="255"
              rx="6"
              fill="#443028"
              stroke="#241B17"
              strokeWidth="4"
            />
            <rect x="38" y="492" width="119" height="115" rx="3" fill="#2A2024" stroke="#241B17" strokeWidth="3" />
            {/* Shelves + Potion Vials */}
            <line x1="38" y1="548" x2="157" y2="548" stroke="#5D4235" strokeWidth="5" />
            <rect x="52" y="517" width="16" height="28" rx="4" fill="#89B496" stroke="#241B17" strokeWidth="2.5" />
            <rect x="76" y="510" width="18" height="35" rx="5" fill="#DFAA5B" stroke="#241B17" strokeWidth="2.5" />
            <rect x="102" y="521" width="14" height="24" rx="4" fill="#9E89B8" stroke="#241B17" strokeWidth="2.5" />
            <rect x="124" y="514" width="18" height="31" rx="6" fill="#C9736B" stroke="#241B17" strokeWidth="2.5" />
            {/* Rolled medical linens on lower shelf */}
            <ellipse cx="64" cy="586" rx="14" ry="9" fill="#E9DEC7" stroke="#241B17" strokeWidth="2.5" />
            <ellipse cx="95" cy="586" rx="14" ry="9" fill="#E9DEC7" stroke="#241B17" strokeWidth="2.5" />
            <ellipse cx="126" cy="586" rx="14" ry="9" fill="#E9DEC7" stroke="#241B17" strokeWidth="2.5" />
            {/* Lower wooden drawers */}
            <rect x="42" y="622" width="111" height="40" rx="2" fill="#523A2F" stroke="#241B17" strokeWidth="2.5" />
            <circle cx="97" cy="642" r="4" fill="#C89B3C" stroke="#241B17" strokeWidth="2" />
            <rect x="42" y="670" width="111" height="44" rx="2" fill="#4A342B" stroke="#241B17" strokeWidth="2.5" />
            <circle cx="97" cy="692" r="4" fill="#C89B3C" stroke="#241B17" strokeWidth="2" />
          </g>

          {/* Right Desktop Folded Infirmary Privacy Screen & Side Table */}
          <g>
            {/* Three-panel hinged linen medical screen */}
            <rect x="1240" y="458" width="66" height="245" rx="4" fill="#543A2E" stroke="#241B17" strokeWidth="3.5" />
            <rect x="1248" y="472" width="50" height="205" rx="2" fill="#DDD0B8" stroke="#241B17" strokeWidth="2" />
            <rect x="1306" y="448" width="70" height="258" rx="4" fill="#4B3429" stroke="#241B17" strokeWidth="3.5" />
            <rect x="1314" y="462" width="54" height="218" rx="2" fill="#E5D9C3" stroke="#241B17" strokeWidth="2" />
            <rect x="1376" y="460" width="58" height="242" rx="4" fill="#432E25" stroke="#241B17" strokeWidth="3.5" />
            <rect x="1384" y="474" width="42" height="202" rx="2" fill="#D5C6AB" stroke="#241B17" strokeWidth="2" />
            {/* Small oak bedside stool + potted healing plant */}
            <rect x="1158" y="618" width="84" height="14" rx="3" fill="#5A3F32" stroke="#241B17" strokeWidth="3" />
            <rect x="1170" y="632" width="12" height="72" fill="#463026" stroke="#241B17" strokeWidth="2.5" />
            <rect x="1218" y="632" width="12" height="72" fill="#463026" stroke="#241B17" strokeWidth="2.5" />
            <polygon points="1182,580 1218,580 1212,618 1188,618" fill="#8C5942" stroke="#241B17" strokeWidth="2.5" />
            <path d="M 1200 580 Q 1182 552 1175 562 Q 1190 572 1200 580 Z" fill="#638462" stroke="#241B17" strokeWidth="2" />
            <path d="M 1200 580 Q 1202 544 1214 550 Q 1208 570 1200 580 Z" fill="#73996F" stroke="#241B17" strokeWidth="2" />
            <path d="M 1200 580 Q 1222 560 1226 572 Q 1210 578 1200 580 Z" fill="#5A7959" stroke="#241B17" strokeWidth="2" />
          </g>

          {/* Perspective Flagstone Floor */}
          <polygon points="0,740 530,545 910,545 1440,740 1440,900 0,900" fill="url(#floorPerspectiveGrad)" />

          {/* Flagstone Tile Grid */}
          <g stroke="#1E171D" strokeWidth="2.5" opacity="0.68">
            <line x1="530" y1="545" x2="0" y2="740" />
            <line x1="910" y1="545" x2="1440" y2="740" />
            <line x1="595" y1="545" x2="210" y2="900" />
            <line x1="845" y1="545" x2="1230" y2="900" />
            <line x1="655" y1="545" x2="495" y2="900" />
            <line x1="785" y1="545" x2="945" y2="900" />
            <line x1="465" y1="572" x2="975" y2="572" />
            <line x1="365" y1="612" x2="1075" y2="612" />
            <line x1="230" y1="668" x2="1210" y2="668" />
            <line x1="80" y1="742" x2="1360" y2="742" />
            <line x1="0" y1="832" x2="1440" y2="832" />
          </g>

          {/* Woven Warm Corridor Runner Carpet (Centered for Mobile & Desktop) */}
          <polygon
            points="655,548 785,548 860,900 580,900"
            fill="url(#runnerRugGrad)"
            stroke="#241B17"
            strokeWidth="3"
          />
          <polygon
            points="668,554 772,554 834,900 606,900"
            fill="none"
            stroke="#C89B3C"
            strokeWidth="2.5"
            opacity="0.65"
          />

          {/* Central Corridor Far Back Wall (Always Centered in Mobile Portrait 375px+!) */}
          <rect x="530" y="245" width="380" height="300" fill="#3A313E" stroke="#241B17" strokeWidth="3.5" />
          <ellipse cx="720" cy="400" rx="220" ry="185" fill="url(#farDoorWarmth)" />

          {/* Far Hogwarts Hospital Wing Gothic Stone Archway & Double Oak Doors */}
          <path
            d="M 616 545 L 616 346 Q 616 266 720 245 Q 824 266 824 346 L 824 545 Z"
            fill="#4B404F"
            stroke="#241B17"
            strokeWidth="4"
          />
          <path
            d="M 636 545 L 636 354 Q 636 286 720 268 Q 804 286 804 354 L 804 545 Z"
            fill="url(#oakDoorGrad)"
            stroke="#241B17"
            strokeWidth="3.5"
          />
          {/* Double Door Center Seam, Arched Frosted Transom & Brass Handles */}
          <line x1="720" y1="340" x2="720" y2="545" stroke="#241B17" strokeWidth="3.5" />
          <path
            d="M 642 344 Q 720 278 798 344 Z"
            fill="#8D6C49"
            opacity="0.52"
            stroke="#241B17"
            strokeWidth="2.5"
          />
          {/* Frosted Glass Arched Panes in Ward Doors */}
          <path
            d="M 656 445 L 656 382 Q 678 358 700 382 L 700 445 Z"
            fill="#D4AC6E"
            opacity="0.45"
            stroke="#241B17"
            strokeWidth="2.5"
          />
          <path
            d="M 740 445 L 740 382 Q 762 358 784 382 L 784 445 Z"
            fill="#D4AC6E"
            opacity="0.45"
            stroke="#241B17"
            strokeWidth="2.5"
          />
          <circle cx="704" cy="466" r="5" fill="#C89B3C" stroke="#241B17" strokeWidth="2" />
          <circle cx="736" cy="466" r="5" fill="#C89B3C" stroke="#241B17" strokeWidth="2" />

          {/* Carved Wooden & Brass Lintel Sign Above Ward Doors */}
          <g>
            <rect
              x="616"
              y="206"
              width="208"
              height="34"
              rx="4"
              fill="#3F2B23"
              stroke="#241B17"
              strokeWidth="3"
            />
            <rect
              x="622"
              y="211"
              width="196"
              height="24"
              rx="2"
              fill="none"
              stroke="#C89B3C"
              strokeWidth="1.5"
              opacity="0.75"
            />
            <text
              x="720"
              y="228"
              textAnchor="middle"
              fill="#EFE0BE"
              fontSize="14"
              fontWeight="700"
              letterSpacing="2.2"
              style={{ fontFamily: 'var(--font-serif-wizard)' }}
            >
              HOSPITAL WING
            </text>
          </g>

          {/* Hanging Medical Reception Sign on Left Corridor Pier (Visible on Mobile & Laptop!) */}
          <g>
            {/* Wrought iron bracket */}
            <path d="M 530 288 L 626 288" stroke="#241B17" strokeWidth="4" strokeLinecap="round" />
            <path d="M 530 314 Q 560 288 575 288" fill="none" stroke="#241B17" strokeWidth="3" />
            <circle cx="624" cy="288" r="4" fill="#C89B3C" stroke="#241B17" strokeWidth="2" />
            {/* Chains */}
            <line x1="556" y1="288" x2="556" y2="306" stroke="#241B17" strokeWidth="2.5" />
            <line x1="612" y1="288" x2="612" y2="306" stroke="#241B17" strokeWidth="2.5" />
            {/* Sign board */}
            <rect
              x="542"
              y="305"
              width="86"
              height="44"
              rx="5"
              fill="#4B3328"
              stroke="#241B17"
              strokeWidth="3"
            />
            <rect
              x="547"
              y="310"
              width="76"
              height="34"
              rx="3"
              fill="none"
              stroke="#C89B3C"
              strokeWidth="1.2"
              opacity="0.8"
            />
            <text
              x="585"
              y="325"
              textAnchor="middle"
              fill="#F3E6CA"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="1"
              style={{ fontFamily: 'var(--font-serif-wizard)' }}
            >
              RECEPTION
            </text>
            <text
              x="585"
              y="338"
              textAnchor="middle"
              fill="#D4B26E"
              fontSize="8.5"
              fontWeight="600"
              letterSpacing="0.8"
              style={{ fontFamily: 'var(--font-serif-wizard)' }}
            >
              MATRON DESK
            </text>
          </g>

          {/* Midground Gothic Framing Stone Arch (Frames Mobile Center Beautifully) */}
          <path
            d="M 480 650 L 480 230 Q 480 95 720 65 Q 960 95 960 230 L 960 650 L 925 630 L 925 238 Q 925 126 720 100 Q 515 126 515 238 L 515 630 Z"
            fill="#3B313F"
            stroke="#241B17"
            strokeWidth="4"
          />

          {/* Side Corridor Arched Windows Peeking Within Mobile Safe Bounds */}
          <g>
            {/* Left inner corridor tall narrow window */}
            <path
              d="M 548 450 L 548 390 Q 564 362 580 390 L 580 450 Z"
              fill="#4F6894"
              opacity="0.72"
              stroke="#241B17"
              strokeWidth="2.5"
            />
            <line x1="564" y1="376" x2="564" y2="450" stroke="#241B17" strokeWidth="2" />
            {/* Right inner corridor tall narrow window */}
            <path
              d="M 860 450 L 860 390 Q 876 362 892 390 L 892 450 Z"
              fill="#4F6894"
              opacity="0.72"
              stroke="#241B17"
              strokeWidth="2.5"
            />
            <line x1="876" y1="376" x2="876" y2="450" stroke="#241B17" strokeWidth="2" />
          </g>

          {/* Left & Right Hogwarts Brass Wall Sconces with Warm Controlled Halo */}
          <g>
            {/* Left wall sconce */}
            <circle cx="552" cy="378" r="78" fill="url(#warmSconceGlow)" />
            <path d="M 538 394 L 552 394 L 552 384" fill="none" stroke="#241B17" strokeWidth="4" />
            <rect x="546" y="370" width="12" height="18" rx="2" fill="#EFE4CC" stroke="#241B17" strokeWidth="2" />
            <path
              className="animate-flame"
              d="M 552 354 Q 558 364 552 370 Q 546 364 552 354 Z"
              fill="#F6C86E"
              stroke="#D67C29"
              strokeWidth="1"
            />

            {/* Right wall sconce */}
            <circle cx="888" cy="378" r="78" fill="url(#warmSconceGlow)" />
            <path d="M 902 394 L 888 394 L 888 384" fill="none" stroke="#241B17" strokeWidth="4" />
            <rect x="882" y="370" width="12" height="18" rx="2" fill="#EFE4CC" stroke="#241B17" strokeWidth="2" />
            <path
              className="animate-flame"
              d="M 888 354 Q 894 364 888 370 Q 882 364 888 354 Z"
              fill="#F6C86E"
              stroke="#D67C29"
              strokeWidth="1"
            />

            {/* Outer Desktop Corridor Sconces */}
            <circle cx="442" cy="340" r="95" fill="url(#warmSconceGlow)" />
            <rect x="435" y="330" width="14" height="22" rx="2" fill="#EFE4CC" stroke="#241B17" strokeWidth="2.5" />
            <path
              className="animate-flame"
              d="M 442 311 Q 449 322 442 330 Q 435 322 442 311 Z"
              fill="#F6C86E"
              stroke="#D67C29"
              strokeWidth="1"
            />

            <circle cx="998" cy="340" r="95" fill="url(#warmSconceGlow)" />
            <rect x="991" y="330" width="14" height="22" rx="2" fill="#EFE4CC" stroke="#241B17" strokeWidth="2.5" />
            <path
              className="animate-flame"
              d="M 998 311 Q 1005 322 998 330 Q 991 322 998 311 Z"
              fill="#F6C86E"
              stroke="#D67C29"
              strokeWidth="1"
            />
          </g>

          {/* Enchanted Floating Candles Overhead (Hogwarts Medical Ward Signature!) */}
          <g>
            {/* Central floating candle 1 */}
            <g className="animate-candle-slow">
              <circle cx="628" cy="148" r="46" fill="url(#warmSconceGlow)" />
              <rect x="623" y="152" width="10" height="26" rx="2" fill="#F2E6CD" stroke="#241B17" strokeWidth="2" />
              <path
                className="animate-flame"
                d="M 628 136 Q 633 145 628 152 Q 623 145 628 136 Z"
                fill="#F7CC74"
              />
            </g>

            {/* Central floating candle 2 */}
            <g className="animate-candle-alt">
              <circle cx="812" cy="142" r="46" fill="url(#warmSconceGlow)" />
              <rect x="807" y="146" width="10" height="28" rx="2" fill="#F2E6CD" stroke="#241B17" strokeWidth="2" />
              <path
                className="animate-flame"
                d="M 812 130 Q 817 139 812 146 Q 807 139 812 130 Z"
                fill="#F7CC74"
              />
            </g>

            {/* Central high candle 3 */}
            <g className="animate-candle-slow">
              <circle cx="720" cy="112" r="44" fill="url(#warmSconceGlow)" />
              <rect x="716" y="116" width="8" height="22" rx="2" fill="#F2E6CD" stroke="#241B17" strokeWidth="1.8" />
              <path
                className="animate-flame"
                d="M 720 102 Q 724 109 720 116 Q 716 109 720 102 Z"
                fill="#F7CC74"
              />
            </g>

            {/* Mid-corridor lower floating candles */}
            <g className="animate-candle-alt">
              <circle cx="662" cy="192" r="34" fill="url(#warmSconceGlow)" />
              <rect x="659" y="195" width="7" height="17" rx="1.5" fill="#F2E6CD" stroke="#241B17" strokeWidth="1.6" />
              <path
                className="animate-flame"
                d="M 662.5 184 Q 666 190 662.5 195 Q 659 190 662.5 184 Z"
                fill="#F7CC74"
              />
            </g>

            <g className="animate-candle-slow">
              <circle cx="778" cy="188" r="34" fill="url(#warmSconceGlow)" />
              <rect x="774" y="191" width="7" height="18" rx="1.5" fill="#F2E6CD" stroke="#241B17" strokeWidth="1.6" />
              <path
                className="animate-flame"
                d="M 777.5 180 Q 781 186 777.5 191 Q 774 186 777.5 180 Z"
                fill="#F7CC74"
              />
            </g>

            {/* Flanking laptop floating candles */}
            <g className="animate-candle-alt">
              <circle cx="356" cy="166" r="52" fill="url(#warmSconceGlow)" />
              <rect x="350" y="170" width="12" height="30" rx="2" fill="#F2E6CD" stroke="#241B17" strokeWidth="2" />
              <path
                className="animate-flame"
                d="M 356 152 Q 362 162 356 170 Q 350 162 356 152 Z"
                fill="#F7CC74"
              />
            </g>

            <g className="animate-candle-slow">
              <circle cx="1084" cy="162" r="52" fill="url(#warmSconceGlow)" />
              <rect x="1078" y="166" width="12" height="30" rx="2" fill="#F2E6CD" stroke="#241B17" strokeWidth="2" />
              <path
                className="animate-flame"
                d="M 1084 148 Q 1090 158 1084 166 Q 1078 158 1084 148 Z"
                fill="#F7CC74"
              />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Subtle Floating Magical Dust Motes */}
      {!reducedMotion &&
        MOTES.map((mote) => (
          <span
            key={mote.id}
            className="animate-mote absolute rounded-full bg-[#F2CA74]"
            style={{
              left: mote.x,
              top: mote.y,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDelay: mote.delay,
              opacity: 0,
            }}
          />
        ))}

      {/* Soft Warm Vignette & Scene-Responsive Focus Scrim */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, transparent 32%, rgba(16, 12, 20, 0.56) 100%)',
        }}
      />
      <div
        className="absolute inset-0 bg-[#17121B] transition-opacity duration-700"
        style={{ opacity: scrimOpacity }}
      />
    </div>
  );
};
