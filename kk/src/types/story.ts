export type StoryPhase =
  | 'HOSPITAL_INTRO'
  | 'PANDA_APPROACH'
  | 'DELIVERY_DIALOGUE'
  | 'CHOICE_PROMPT'
  | 'UNSEALING'
  | 'LETTER_SCROLL';

export type PandaExpression =
  | 'serious'
  | 'surprised'
  | 'confused'
  | 'baffled'
  | 'deadpan';

export interface LetterData {
  dateLabel?: string;
  greeting?: string;
  paragraphs: string[];
  signature?: string;
  postscript?: string;
}
