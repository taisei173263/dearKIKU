export const COLORS = {
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
  PURPLE: 'purple',
};

export interface FamilyMember {
  id: string;
  name: string;
  color: string;
  avatar: string;
}

export interface GameResult {
  gameType: 'pattern' | 'logic';
  memberId: string;
  score: number;
  date: string;
  accuracy?: number;
  time?: number;
  difficulty?: string;
}

export interface PatternQuestion {
  id: string;
  question: string;
  targetMemberId: string;
  answerId: string;
  options: {
    id: string;
    text: string;
  }[];
}

export interface LogicPuzzle {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium';
  puzzleData: any;
}

export interface FamilyCompatibility {
  member1Id: string;
  member2Id: string;
  score: number;
  insights: string[];
}