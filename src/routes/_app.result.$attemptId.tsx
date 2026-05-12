import { createFileRoute, Link } from "@tanstack/react-router";
import { useTest } from "@/store/test";
import { NbButton } from "@/components/NbButton";
import { Trophy, Target, Clock, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, PieChart, Pie } from "recharts";

export const Route = createFileRoute("/_app/result/$attemptId")({
  head: () => ({ meta: [{ title: "Result — CS:GO" }] }),
  component: ResultPage,
});

function ResultPage() {
  const { attemptId } = Route.useParams();
  const att = useTest(s => s.attempts.find(a => a.id === attemptId));
  if (!att) return <div className="p-10 font-bold">Result not found.</div>;

  const subjData = Object.entries(att.subjectStats).map(([s, v]) => ({
    name: s.split(" ")[0],
    correct: v.correct,
    incorrect: v.incorrect,
    pct: v.total ? Math.round((v.correct / v.total) * 100) : 0,
  }));

  const accData = [
    { name: "Correct", value: att.correct, color: "#22C55E" },
    { name: "Incorrect", value: att.incorrect, color: "#EF4444" },
    { name: "Unanswered", value: att.unanswered, color: "#A3A3A3" },
  ];

  const rank = Math.max(50, Math.round(2000 - att.percentage * 18));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="nb-card p-6 bg-[var(--brand-yellow)]">
        <div className="text-xs font-black uppercase">{att.testTitle}</div>
        <h1 className="text-4xl md:text-5xl font-black mt-1">Your Score: {att.score} / {att.total}</h1>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
          <span className="nb-border bg-white px-3 py-1">Percentage: {att.percentage.toFixed(1)}%</span>
          <span className="nb-border bg-white px-3 py-1">Accuracy: {att.accuracy.toFixed(1)}%</span>
          <span className="nb-border bg-white px-3 py-1">Est. Rank: ~{rank}</span>
          <span className="nb-border bg-white px-3 py-1 flex items-center gap-1"><Clock size={14} /> {Math.floor(att.timeSpent/60)}m {att.timeSpent%60}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Trophy} v={att.score} l="Score" c="var(--brand-yellow)" black />
        <Stat icon={CheckCircle} v={att.correct} l="Correct" c="var(--brand-green)" />
        <Stat icon={XCircle} v={att.incorrect} l="Incorrect" c="var(--brand-red)" />
        <Stat icon={MinusCircle} v={att.unanswered} l="Unanswered" c="var(--brand-purple)" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="nb-card p-5">
          <h2 className="text-xl font-black mb-3">Subject-wise Score (%)</h2>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={subjData}>
                <XAxis dataKey="name" tick={{ fontWeight: 700, fontSize: 11 }} />
                <YAxis tick={{ fontWeight: 700, fontSize: 11 }} />
                <Tooltip contentStyle={{ border: "3px solid #000", borderRadius: 4, boxShadow: "4px 4px 0 #000", fontWeight: 700 }} />
                <Bar dataKey="pct">
                  {subjData.map((_, i) => (
                    <Cell key={i} fill={["#3B82F6","#22C55E","#F97316","#8B5CF6"][i % 4]} stroke="#000" strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nb-card p-5">
          <h2 className="text-xl font-black mb-3">Accuracy Breakdown</h2>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={accData} dataKey="value" nameKey="name" outerRadius={90} label stroke="#000" strokeWidth={2}>
                  {accData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ border: "3px solid #000", borderRadius: 4, boxShadow: "4px 4px 0 #000", fontWeight: 700 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/analysis/$attemptId" params={{ attemptId: att.id }}><NbButton variant="blue" size="lg">View Detailed Analysis</NbButton></Link>
        <Link to="/test/$testId/instructions" params={{ testId: att.testId }}><NbButton variant="green" size="lg">Retake Test</NbButton></Link>
        <Link to="/dashboard"><NbButton size="lg">Go to Dashboard</NbButton></Link>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, v, l, c, black }: any) {
  return (
    <div className="nb-card p-4" style={{ background: c, color: black ? "#000" : "#fff" }}>
      <Icon size={20} />
      <div className="text-3xl font-black mt-2">{v}</div>
      <div className="text-xs font-bold uppercase">{l}</div>
    </div>
  );
}
