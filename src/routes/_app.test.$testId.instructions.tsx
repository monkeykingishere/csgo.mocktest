import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getTest } from "@/data/questions";
import { NbButton } from "@/components/NbButton";
import { useTest } from "@/store/test";
import { useAuth } from "@/store/auth";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_app/test/$testId/instructions")({
  head: () => ({ meta: [{ title: "Instructions — CS:GO" }] }),
  component: Instructions,
});

function Instructions() {
  const { testId } = Route.useParams();
  const test = getTest(testId);
  const navigate = useNavigate();
  const startTest = useTest(s => s.startTest);
  const user = useAuth(s => s.current);
  const [agreed, setAgreed] = useState(false);

  if (!test) return <div className="p-10">Test not found.</div>;

  const start = () => {
    if (!user) return;
    startTest(test.id, user.id);
    navigate({ to: "/test/$testId/attempt", params: { testId: test.id } });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="nb-card p-6">
        <h1 className="text-3xl font-black mb-2">{test.title}</h1>
        <p className="font-medium text-muted-foreground">{test.description}</p>
      </div>

      <div className="nb-card p-6 space-y-4">
        <h2 className="text-xl font-black">Exam Pattern</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
          <Stat label="Questions" value={test.questionIds.length} />
          <Stat label="Duration" value={`${test.durationMin} min`} />
          <Stat label="Total Marks" value={test.questionIds.length * 4} />
          <Stat label="Negative" value="−1" />
        </div>

        <h2 className="text-xl font-black mt-4">Marking Scheme</h2>
        <ul className="list-none space-y-1 font-medium text-sm">
          <li className="nb-border bg-[var(--brand-green)] text-white px-3 py-2 font-bold">+4 for each correct answer</li>
          <li className="nb-border bg-[var(--brand-red)] text-white px-3 py-2 font-bold">−1 for each incorrect answer</li>
          <li className="nb-border bg-white px-3 py-2 font-bold">0 for unanswered</li>
        </ul>

        <h2 className="text-xl font-black mt-4">Navigation Instructions</h2>
        <ul className="list-disc list-inside space-y-1 font-medium text-sm">
          <li>Use <strong>Save & Next</strong> to confirm your answer and move to the next question.</li>
          <li>Use <strong>Mark for Review</strong> to flag questions you want to revisit.</li>
          <li>Use the <strong>Question Palette</strong> on the right to jump to any question.</li>
          <li>Use <strong>Clear Response</strong> to remove your selected answer.</li>
        </ul>

        <h2 className="text-xl font-black mt-4">Keyboard Shortcuts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-bold">
          <Kbd k="A / B / C / D" d="Select option" />
          <Kbd k="N or →" d="Save & Next" />
          <Kbd k="P or ←" d="Previous" />
          <Kbd k="M" d="Mark for review" />
          <Kbd k="C" d="Clear response" />
        </div>

        <div className="nb-border bg-[var(--brand-yellow)] p-3 mt-4 flex gap-2 text-sm font-bold">
          <AlertCircle size={20} /> Once started, the timer can't be paused. The test auto-submits when time ends.
        </div>

        <label className="flex items-start gap-2 mt-4 font-bold cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 nb-border accent-black" />
          I have read and understood all the instructions.
        </label>

        <div className="flex flex-wrap gap-3 mt-2">
          <NbButton variant="green" size="lg" disabled={!agreed} onClick={start}>Start Test</NbButton>
          <Link to="/dashboard"><NbButton variant="default" size="lg">Cancel</NbButton></Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return <div className="nb-border bg-white p-3"><div className="text-2xl font-black">{value}</div><div className="text-xs font-bold uppercase">{label}</div></div>;
}
function Kbd({ k, d }: { k: string; d: string }) {
  return <div className="nb-border bg-white p-2"><div className="font-black">{k}</div><div className="font-medium normal-case text-muted-foreground">{d}</div></div>;
}
