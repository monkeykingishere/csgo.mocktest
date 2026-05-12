import { createFileRoute, Link } from "@tanstack/react-router";
import { useTest } from "@/store/test";
import { NbButton } from "@/components/NbButton";

export const Route = createFileRoute("/_app/history")({
  head: () => ({ meta: [{ title: "Test History — CS:GO" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const attempts = useTest(s => s.attempts);
  const del = useTest(s => s.deleteAttempt);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black">Test History</h1>
      {attempts.length === 0 ? (
        <div className="nb-card p-8 text-center">
          <div className="font-bold mb-3">No attempts yet.</div>
          <Link to="/dashboard"><NbButton variant="green">Take your first test</NbButton></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map(a => (
            <div key={a.id} className="nb-card p-4 flex flex-wrap items-center gap-4 justify-between">
              <div>
                <div className="font-black">{a.testTitle}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{new Date(a.submittedAt).toLocaleString()}</div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="nb-border bg-[var(--brand-yellow)] px-2 py-1">Score {a.score}/{a.total}</span>
                <span className="nb-border bg-[var(--brand-blue)] text-white px-2 py-1">{a.percentage.toFixed(1)}%</span>
                <span className="nb-border bg-[var(--brand-green)] text-white px-2 py-1">Acc {a.accuracy.toFixed(0)}%</span>
                <span className="nb-border bg-white px-2 py-1">{Math.floor(a.timeSpent/60)}m</span>
              </div>
              <div className="flex gap-2">
                <Link to="/result/$attemptId" params={{ attemptId: a.id }}><NbButton size="sm" variant="blue">Result</NbButton></Link>
                <Link to="/analysis/$attemptId" params={{ attemptId: a.id }}><NbButton size="sm">Analysis</NbButton></Link>
                <Link to="/test/$testId/instructions" params={{ testId: a.testId }}><NbButton size="sm" variant="green">Retake</NbButton></Link>
                <NbButton size="sm" variant="red" onClick={() => del(a.id)}>Delete</NbButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
