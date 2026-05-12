import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Attempt, QuestionStatus, Subject } from "@/lib/types";
import { getQuestion, getTest } from "@/data/questions";

interface ActiveSession {
  testId: string;
  userId: string;
  startedAt: number;
  endsAt: number;
  currentIndex: number;
  answers: Record<number, number | null>;
  states: Record<number, QuestionStatus>;
}

interface TestState {
  active: ActiveSession | null;
  attempts: Attempt[];
  startTest: (testId: string, userId: string) => void;
  setAnswer: (qid: number, opt: number | null) => void;
  setState: (qid: number, st: QuestionStatus) => void;
  setIndex: (idx: number) => void;
  saveAndNext: () => void;
  markAndNext: () => void;
  clearResponse: () => void;
  submit: () => Attempt | null;
  abandon: () => void;
  deleteAttempt: (id: string) => void;
  resetAll: () => void;
}

export const useTest = create<TestState>()(
  persist(
    (set, get) => ({
      active: null,
      attempts: [],
      startTest: (testId, userId) => {
        const test = getTest(testId);
        if (!test) return;
        const states: Record<number, QuestionStatus> = {};
        const answers: Record<number, number | null> = {};
        test.questionIds.forEach((qid, i) => {
          states[qid] = i === 0 ? "not-answered" : "not-visited";
          answers[qid] = null;
        });
        const now = Date.now();
        set({
          active: {
            testId,
            userId,
            startedAt: now,
            endsAt: now + test.durationMin * 60 * 1000,
            currentIndex: 0,
            answers,
            states,
          },
        });
      },
      setAnswer: (qid, opt) => {
        const a = get().active; if (!a) return;
        const answers = { ...a.answers, [qid]: opt };
        const prev = a.states[qid];
        let next: QuestionStatus = prev;
        if (opt === null) {
          next = prev === "answered-marked" || prev === "marked" ? "marked" : "not-answered";
        } else {
          next = prev === "marked" || prev === "answered-marked" ? "answered-marked" : "answered";
        }
        set({ active: { ...a, answers, states: { ...a.states, [qid]: next } } });
      },
      setState: (qid, st) => {
        const a = get().active; if (!a) return;
        set({ active: { ...a, states: { ...a.states, [qid]: st } } });
      },
      setIndex: (idx) => {
        const a = get().active; if (!a) return;
        const test = getTest(a.testId); if (!test) return;
        const qid = test.questionIds[idx];
        const cur = a.states[qid];
        const states = cur === "not-visited" ? { ...a.states, [qid]: "not-answered" as QuestionStatus } : a.states;
        set({ active: { ...a, currentIndex: idx, states } });
      },
      saveAndNext: () => {
        const a = get().active; if (!a) return;
        const test = getTest(a.testId); if (!test) return;
        const idx = Math.min(a.currentIndex + 1, test.questionIds.length - 1);
        get().setIndex(idx);
      },
      markAndNext: () => {
        const a = get().active; if (!a) return;
        const test = getTest(a.testId); if (!test) return;
        const qid = test.questionIds[a.currentIndex];
        const ans = a.answers[qid];
        const newSt: QuestionStatus = ans !== null ? "answered-marked" : "marked";
        set({ active: { ...a, states: { ...a.states, [qid]: newSt } } });
        get().saveAndNext();
      },
      clearResponse: () => {
        const a = get().active; if (!a) return;
        const test = getTest(a.testId); if (!test) return;
        const qid = test.questionIds[a.currentIndex];
        get().setAnswer(qid, null);
      },
      submit: () => {
        const a = get().active; if (!a) return null;
        const test = getTest(a.testId); if (!test) return null;
        let correct = 0, incorrect = 0, unanswered = 0;
        const subjectStats: Record<Subject, { correct: number; incorrect: number; unanswered: number; total: number }> = {
          "Mathematics": { correct: 0, incorrect: 0, unanswered: 0, total: 0 },
          "Logical Reasoning": { correct: 0, incorrect: 0, unanswered: 0, total: 0 },
          "Computer Awareness": { correct: 0, incorrect: 0, unanswered: 0, total: 0 },
          "English": { correct: 0, incorrect: 0, unanswered: 0, total: 0 },
        };
        for (const qid of test.questionIds) {
          const q = getQuestion(qid); if (!q) continue;
          subjectStats[q.subject].total += 1;
          const ans = a.answers[qid];
          if (ans === null || ans === undefined) {
            unanswered += 1;
            subjectStats[q.subject].unanswered += 1;
          } else if (ans === q.correctAnswer) {
            correct += 1;
            subjectStats[q.subject].correct += 1;
          } else {
            incorrect += 1;
            subjectStats[q.subject].incorrect += 1;
          }
        }
        const total = test.questionIds.length * 4;
        const score = correct * 4 - incorrect * 1;
        const attempted = correct + incorrect;
        const accuracy = attempted ? (correct / attempted) * 100 : 0;
        const percentage = (score / total) * 100;
        const timeSpent = Math.floor((Date.now() - a.startedAt) / 1000);
        const attempt: Attempt = {
          id: crypto.randomUUID(),
          testId: a.testId,
          testTitle: test.title,
          answers: a.answers,
          questionStates: a.states,
          score,
          total,
          percentage,
          accuracy,
          correct,
          incorrect,
          unanswered,
          timeSpent,
          subjectStats,
          submittedAt: new Date().toISOString(),
        };
        set({ active: null, attempts: [attempt, ...get().attempts] });
        return attempt;
      },
      abandon: () => set({ active: null }),
      deleteAttempt: (id) => set({ attempts: get().attempts.filter(a => a.id !== id) }),
      resetAll: () => set({ active: null, attempts: [] }),
    }),
    { name: "csgo-test" },
  ),
);
