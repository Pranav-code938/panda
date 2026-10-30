export type DeliveryStep =
  | 'HOSPITAL_APPROACH'
  | 'DELIVERY_DIALOGUE'
  | 'CHOICE_INTERACTION'
  | 'OPENING_ENVELOPE'
  | 'BLANK_LETTER';

export type PandaExpression =
  | 'serious'
  | 'surprised'
  | 'confused'
  | 'bemused'
  | 'exasperated';

export interface EvadeState {
  count: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  label: string;
  expression: PandaExpression;
  quip: string | null;
}

export interface Bounds {
  width: number;
  height: number;
}

export function getNextPandaExpression(evadeCount: number): PandaExpression {
  if (evadeCount === 0) return 'serious';
  if (evadeCount === 1) return 'surprised';
  if (evadeCount === 2) return 'confused';
  if (evadeCount === 3) return 'bemused';
  return 'exasperated';
}

export function getIgnoreButtonLabel(evadeCount: number): string {
  if (evadeCount === 0) return 'IGNORE';
  if (evadeCount === 1) return 'IGNORE?';
  if (evadeCount === 2) return 'IGNORE!';
  if (evadeCount >= 3 && evadeCount < 5) return 'nice try.';
  return 'Fine. Open it. 🙄';
}

export function getPandaQuip(evadeCount: number): string | null {
  switch (evadeCount) {
    case 1:
      return '...Wait, did you just try to ignore official post?';
    case 2:
      return 'The Ministry does not approve of this dodging!';
    case 3:
      return 'Dr. Panda postal integrity is at stake here!';
    case 4:
      return 'The button literally has a mind of its own now...';
    case 5:
    default:
      if (evadeCount >= 5) {
        return 'Fine! Even the letter insists you open it!';
      }
      return null;
  }
}

/**
 * Calculates a funny, randomized evasion vector that stays strictly inside
 * viewport boundaries, keeping safely below the envelope and avoiding
 * overlapping the centered OPEN button.
 */
export function calculateEvasionOffset(
  evadeCount: number,
  containerBounds: Bounds = { width: 360, height: 600 },
  seed: number = 0.5
): { x: number; y: number; rotation: number } {
  // Constrain limits within safe boundary margins
  const maxX = Math.min(125, Math.max(65, containerBounds.width * 0.28));

  // Determine direction: alternate left and right quadrants
  const isRightSide = (evadeCount + Math.floor(seed * 10)) % 2 === 0;
  const horizontalFactor = isRightSide ? 1 : -1;

  // Keep a healthy distance from center (OPEN button is at x=0)
  const distanceX = Math.min(maxX, 45 + (evadeCount % 4) * 20);
  const rawX = horizontalFactor * distanceX;

  // Keep Y slightly below the default line (0 to 45px), never upwards where the envelope is!
  const rawY = Math.min(48, Math.max(0, (evadeCount * 12 + seed * 16) % 45));

  // Cap offsets to boundary
  const boundedX = Math.max(-maxX, Math.min(maxX, rawX));
  const boundedY = Math.max(0, Math.min(50, rawY));

  // Increasing absurd playful rotation up to +/- 24 deg
  const rotFactor = (evadeCount % 2 === 0 ? 1 : -1) * Math.min(24, 6 + evadeCount * 4);

  return {
    x: Math.round(boundedX),
    y: Math.round(boundedY),
    rotation: rotFactor,
  };
}

export function processIgnoreAttempt(
  currentCount: number,
  containerBounds: Bounds = { width: 360, height: 600 },
  randomSeed: number = Math.random()
): EvadeState {
  const nextCount = currentCount + 1;
  const offset = calculateEvasionOffset(nextCount, containerBounds, randomSeed);
  const label = getIgnoreButtonLabel(nextCount);
  const expression = getNextPandaExpression(nextCount);
  const quip = getPandaQuip(nextCount);

  return {
    count: nextCount,
    offsetX: offset.x,
    offsetY: offset.y,
    rotation: offset.rotation,
    label,
    expression,
    quip,
  };
}
