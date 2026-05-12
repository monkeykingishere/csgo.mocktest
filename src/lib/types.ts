export type Subject = "Mathematics" | "Logical Reasoning" | "Computer Awareness" | "English";

export interface Question {
  id: number;
  subject: Subject;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export type QuestionStatus =
  | "not-visited"
  | "not-answered"
  | "answered"
  | "marked"
  | "answered-marked";

export interface Attempt {
  id: string;
  testId: string;
  testTitle: string;
  answers: Record<number, number | null>;
  questionStates: Record<number, QuestionStatus>;
  score: number;
  total: number;
  percentage: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  timeSpent: number;
  subjectStats: Record<Subject, { correct: number; incorrect: number; unanswered: number; total: number }>;
  submittedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  joinedAt: string;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  questionIds: number[];
  durationMin: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed";
}
