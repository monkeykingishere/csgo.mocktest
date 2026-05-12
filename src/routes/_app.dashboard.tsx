import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { useTest } from "@/store/test";
import { MOCK_TESTS } from "@/data/questions";
import { NbButton } from "@/components/NbButton";
import { Trophy, Target, BarChart3, Award, Play, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CS:GO" }] }),
  component: Dashboard,
});

function Dashboard() {
  const user = useAuth(s => s.current);
  const attempts = useTest(s => s.attempts);
  const userAttempts = attempts.filter(a => true); // already per-user via store

  const best = userAttempts.reduce((m, a) => Math.max(m, a.score), 0);
  const avgScore = userAttempts.length ? Math.round(userAttempts.reduce((s, a) => s + a.score, 0) / userAttempts.length) : 0;
  const avgAccuracy = userAttempts.length ? Math.round(userAttempts.reduce((s, a) => s + a.accuracy, 0) / userAttempts.length) : 0;

  // subject-wise aggregate
  const subjects = ["Mathematics", "Logical Reasoning", "Computer Awareness", "English"] as const;
  const subjStats = subjects.map(sub => {
    let c = 0, t = 0;
    userAttempts.forEach(a => {
      const s = a.subjectStats?.[sub];
      if (s) { c += s.correct; t += s.total; }
    });
    return { sub, pct: t ? Math.round((c / t) * 100) : 0 };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Welcome */}
      <div className="nb-card p-6 bg-[var(--brand-yellow)]">
        <div className="text-xs font-black uppercase tracking-widest mb-1">Welcome back</div>
        <h1 className="text-3xl md:text-4xl font-black">{user?.name} 👋</h1>
        <p className="font-medium mt-1">Pick a test below and let's see what you've got.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Trophy} label="Best Score" value={best} color="var(--brand-yellow)" textBlack />
        <StatCard icon={Award} label="Average Score" value={avgScore} color="var(--brand-blue)" />
        <StatCard icon={Target} label="Avg Accuracy" value={`${avgAccuracy}%`} color="var(--brand-green)" />
        <StatCard icon={BarChart3} label="Attempts" value={userAttempts.length} color="var(--brand-purple)" />
      </div>

      {/* Subject performance */}
      {userAttempts.length > 0 && (
        <div className="nb-card p-6">
          <h2 className="text-2xl font-black mb-4">Subject-wise performance</h2>
          <div className="space-y-3">
            {subjStats.map(s => (
              <div key={s.sub}>
                <div className="flex items-center justify-between mb-1 text-sm font-bold">
                  <span>{s.sub}</span>
                  <span>{s.pct}%</span>
                </div>
                <div className="nb-border bg-white h-5 overflow-hidden">
                  <div className="h-full bg-[var(--brand-blue)]" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tests */}
      <div>
        <h2 className="text-2xl font-black mb-4">Available Mock Tests</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_TESTS.map(t => {
            const tAttempts = userAttempts.filter(a => a.testId === t.id).length;
            return (
              <div key={t.id} className="nb-card p-5 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-black text-lg">{t.title}</div>
                  <span className="nb-border bg-[var(--brand-yellow)] text-xs font-black px-2 py-0.5 uppercase">{t.difficulty}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-4 flex-1">{t.description}</p>
                <div className="grid grid-cols-3 text-xs font-bold uppercase mb-4 gap-2">
                  <div className="nb-border p-2 text-center">{t.questionIds.length}<div className="font-medium normal-case">Questions</div></div>
                  <div className="nb-border p-2 text-center flex flex-col items-center"><span className="flex items-center gap-1"><Clock size={12}/>{t.durationMin}m</span><span className="font-medium normal-case">Time</span></div>
                  <div className="nb-border p-2 text-center">{t.questionIds.length * 4}<div className="font-medium normal-case">Marks</div></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase">Attempts: {tAttempts}</div>
                  <Link to="/test/$testId/instructions" params={{ testId: t.id }}>
                    <NbButton variant="green" size="sm"><Play size={14} className="inline mr-1" />Start</NbButton>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, textBlack }: any) {
  return (
    <div className="nb-card p-4" style={{ background: color, color: textBlack ? "#000" : "#fff" }}>
      <Icon size={20} />
      <div className="text-3xl font-black mt-2">{value}</div>
      <div className="text-xs font-bold uppercase opacity-90">{label}</div>
    </div>
  );
}
