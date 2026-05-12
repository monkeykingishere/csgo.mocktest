import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTest } from "@/store/test";
import { getQuestion, getTest } from "@/data/questions";
import { NbButton } from "@/components/NbButton";

export const Route = createFileRoute("/_app/analysis/$attemptId")({
  head: () => ({ meta: [{ title: "Analysis — CS:GO" }] }),
  component: AnalysisPage,
});

type Filter = "all" | "correct" | "incorrect" | "unanswered" | "reviewed";

function AnalysisPage() {
  const { attemptId } = Route.useParams();
  const att = useTest(s => s.attempts.find(a => a.id === attemptId));
  const [filter, setFilter] = useState<Filter>("all");
  if (!att) return <div className="p-10 font-bold">Attempt not found.</div>;
  const test = getTest(att.testId);
  if (!test) return <div className="p-10">Test removed.</div>;

  const items = test.questionIds.map((qid, i) => {
    const q = getQuestion(qid)!;
    const ans = att.answers[qid];
    const status = ans === null || ans === undefined ? "unanswered" : ans === q.correctAnswer ? "correct" : "incorrect";
    const reviewed = att.questionStates[qid]?.includes("marked");
    return { i, q, ans, status, reviewed };
  });

  const filtered = items.filter(it => {
    if (filter === "all") return true;
    if (filter === "reviewed") return it.reviewed;
    return it.status === filter;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div className="nb-card p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase">Detailed Analysis</div>
          <h1 className="text-2xl font-black">{att.testTitle}</h1>
        </div>
        <Link to="/result/$attemptId" params={{ attemptId: att.id }}><NbButton size="sm">Back to Result</NbButton></Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all","correct","incorrect","unanswered","reviewed"] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`nb-interactive px-3 py-1.5 text-sm font-bold uppercase ${filter === f ? "bg-black text-white" : "bg-white"}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(it => {
          const badge = it.status === "correct" ? "bg-[var(--brand-green)] text-white" :
                        it.status === "incorrect" ? "bg-[var(--brand-red)] text-white" :
                        "bg-[var(--brand-purple)] text-white";
          const marks = it.status === "correct" ? "+4" : it.status === "incorrect" ? "−1" : "0";
          return (
            <div key={it.i} className="nb-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="font-black">Q{it.i + 1}. <span className="text-xs uppercase ml-2 font-bold text-muted-foreground">{it.q.subject}</span></div>
                <div className="flex gap-2">
                  <span className={`nb-border px-2 py-0.5 text-xs font-black uppercase ${badge}`}>{it.status}</span>
                  <span className="nb-border bg-[var(--brand-yellow)] px-2 py-0.5 text-xs font-black">{marks}</span>
                </div>
              </div>
              <div className="font-semibold mb-3">{it.q.question}</div>
              <div className="grid gap-2">
                {it.q.options.map((o, i) => {
                  const isCorrect = i === it.q.correctAnswer;
                  const isUser = i === it.ans;
                  return (
                    <div key={i} className={`nb-border p-2 font-semibold flex items-center gap-2 ${isCorrect ? "bg-[var(--brand-green)] text-white" : isUser ? "bg-[var(--brand-red)] text-white" : "bg-white"}`}>
                      <span className="nb-border bg-black text-white w-7 h-7 flex items-center justify-center text-xs font-black">{String.fromCharCode(65+i)}</span>
                      <span>{o}</span>
                      {isCorrect && <span className="ml-auto text-xs font-black uppercase">Correct</span>}
                      {isUser && !isCorrect && <span className="ml-auto text-xs font-black uppercase">Your answer</span>}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 nb-border bg-[var(--brand-yellow)] p-3 text-sm font-medium">
                <strong className="block mb-1 uppercase text-xs font-black">Explanation</strong>
                {it.q.explanation}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="nb-card p-8 text-center font-bold">No questions match this filter.</div>}
      </div>
    </div>
  );
}
