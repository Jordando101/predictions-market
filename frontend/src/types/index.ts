export type Category = 'Politics' | 'Sports' | 'Economics' | 'Tech' | 'Other';
export type PipelineStatus = 'idle' | 'researching' | 'red-teaming' | 'judging' | 'complete' | 'error';
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type RecommendationAction = 'BUY_YES' | 'BUY_NO';
export type RecommendationStatus = 'pending' | 'acted' | 'dismissed';
export type TabName = 'markets' | 'pipeline' | 'queue' | 'settings';

export interface Market {
  id: string;
  title: string;
  ticker: string;
  category: Category;
  marketPrice: number;
  aiProbability: number | null;
  edge: number | null;
  pipelineStatus: PipelineStatus;
  closesAt: string;
  rules: string;
  createdAt: string;
  _mockTargetProbability?: number;
}

export interface Article {
  title: string;
  url: string;
  snippet: string;
  publishedAt: string;
  relevanceScore: number;
}

export interface ResearchOutput {
  articles: Article[];
  bullCase: string;
  bearCase: string;
  summary: string;
}

export interface RedTeamCritique {
  point: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RedTeamOutput {
  critiques: RedTeamCritique[];
  biasFlags: string[];
  alternativeInterpretations: string[];
  overallAssessment: string;
}

export interface JudgeOutput {
  probability: number;
  confidence: ConfidenceLevel;
  reasoning: string;
  calibrationNotes: string;
  keyFactors: string[];
}

export interface PipelineRun {
  marketId: string;
  status: PipelineStatus;
  startedAt: string | null;
  completedAt: string | null;
  research: ResearchOutput | null;
  redTeam: RedTeamOutput | null;
  judge: JudgeOutput | null;
}

export interface ActionRecommendation {
  id: string;
  marketId: string;
  marketTitle: string;
  ticker: string;
  action: RecommendationAction;
  aiProbability: number;
  marketPrice: number;
  edge: number;
  confidence: ConfidenceLevel;
  reasoning: string;
  status: RecommendationStatus;
  createdAt: string;
}
