export type BusinessArea = 'marketing' | 'sales' | 'logistics' | 'hr' | 'finance' | 'it' | 'general' | 'ecommerce' | 'social_media' | 'content' | 'ux_ui' | 'data_analytics';

export interface SolutionStep {
    step: number;
    title: string;
    description: string;
}

export interface Solution {
    title: string;
    summary: string;
    steps: SolutionStep[];
    isPremium?: boolean;
}

export interface AnalysisResult {
    problemAnalysis: {
        identifiedProblem: string;
        impact: string;
    };
    shortTermSolution: Solution;
    longTermSolution: Solution;
}

export interface GroundedAnswer {
    answer: string;
    sources: { uri: string; title: string; }[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface Example {
    title: string;
    description: string;
    area: BusinessArea;
}

export interface SolutionRecord {
  id: string;
  companyType: string;
  niche: string;
  problemDescription: string;
  businessArea: BusinessArea;
  result: AnalysisResult | GroundedAnswer;
  timestamp: string;
}