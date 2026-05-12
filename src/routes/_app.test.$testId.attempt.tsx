import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTest } from "@/store/test";
import { getQuestion, getTest } from "@/data/questions";
import { NbButton } from "@/components/NbButton";
import { Modal } from "@/components/Modal";
import { Clock, Save, AlertTriangle } from "lucide-react";
import type { QuestionStatus } from "@/lib/types";

export const Route = createFileRoute("/_app/test/$testId/attempt")({
  head: () => ({ meta: [{ title: "Test in Progress — CS:GO" }] }),
  component: Attempt,
});

const STATE_COLORS: Record<QuestionStatus, string> = {
  "not-visited": "bg-white text-black",
  "not-answered": "bg-[var(--brand-red)] text-white",
  "answered": "bg-[var(--brand-green)] text-white",
  "marked": "bg-[var(--brand-purple)] text-white",
  "answered-marked": "bg-[var(--brand-blue)] text-white",
};
const STATE_LABEL: Record<QuestionStatus, string> = {
  "not-visited": "Not Visited",
  "not-answered": "Not Answered",
  "answered": "Answered",
  "marked": "Marked for Review",
  "answered-marked": "Answered & Marked",
};

function fmt(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function Attempt() {
  const { testId } = Route.useParams();
  const navigate = useNavigate();
  const active = useTest(s => s.active);
  const setAnswer = useTest(s => s.setAnswer);
  const setIndex = useTest(s => s.setIndex);
  const saveAndNext = useTest(s => s.saveAndNext);
  const markAndNext = useTest(s => s.markAndNext);
  const clearResponse = useTest(s => s.clearResponse);
  const submit = useTest(s => s.submit);
  const test = getTest(testId);
  const [now, setNow] = useState(Date.now());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Flash auto-save indicator
  useEffect(() => {
    setSavedFlash(true);
    const id = setTimeout(() => setSavedFlash(false), 800);
    return () => clearTimeout(id);
  }, [active?.answers, active?.states, active?.currentIndex]);

  const remaining = active ? Math.max(0, Math.floor((active.endsAt - now) / 1000)) : 0;

  // Auto-submit on time up
  useEffect(() => {
    if (active && remaining <= 0) {
      const att = submit();
      if (att) navigate({ to: "/result/$attemptId", params: { attemptId: att.id } });
    }
  }, [remaining, active]);

  // Redirect if no active session
  useEffect(() => {
    if (!active || active.testId !== testId) {
      navigate({ to: "/test/$testId/instructions", params: { testId } });
    }
  }, [active, testId]);

  const currentQid = active && test ? test.questionIds[active.currentIndex] : null;
  const q = currentQid ? getQuestion(currentQid) : null;

  // Keyboard shortcuts
  useEffect(() => {
    if (!active || !q) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
      if (["a","b","c","d"].includes(e.key.toLowerCase())) {
        const idx = ["a","b","c","d"].indexOf(e.key.toLowerCase());
        if (idx < q.options.length) setAnswer(q.id, idx);
      } else if (e.key === "n" || e.key === "ArrowRight") { saveAndNext(); }
      else if (e.key === "p" || e.key === "ArrowLeft") {
        if (active.currentIndex > 0) setIndex(active.currentIndex - 1);
      } else if (e.key === "m") { markAndNext(); }
      else if (e.key === "c") { clearResponse(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, q]);

  const counts = useMemo(() => {
    if (!active || !test) return { answered: 0, notAnswered: 0, marked: 0, notVisited: 0, answeredMarked: 0 };
    const c = { answered: 0, notAnswered: 0, marked: 0, notVisited: 0, answeredMarked: 0 };
    for (const qid of test.questionIds) {
      const s = active.states[qid];
      if (s === "answered") c.answered++;
      else if (s === "marked") c.marked++;
      else if (s === "answered-marked") c.answeredMarked++;
      else if (s === "not-answered") c.notAnswered++;
      else c.notVisited++;
    }
    return c;
  }, [active, test]);

  if (!active || !test || !q) return <div className="p-10">Loading…</div>;

  const handleSubmit = () => {
    const att = submit();
    if (att) navigate({ to: "/result/$attemptId", params: { attemptId: att.id } });
  };

  const timerColor = remaining < 5 * 60 ? "bg-[var(--brand-red)] text-white animate-pulse" :
                     remaining < 15 * 60 ? "bg-[var(--brand-orange)] text-white" :
                     "bg-[var(--brand-yellow)] text-black";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="nb-border border-x-0 border-t-0 bg-black text-white p-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="font-black text-sm md:text-base truncate">{test.title}</div>
        <div className="flex items-center gap-2">
          <div className={`nb-border ${savedFlash ? "bg-[var(--brand-green)]" : "bg-white"} text-black px-2 py-1 text-xs font-black flex items-center gap-1 transition-colors`}>
            <Save size={12} /> {savedFlash ? "Saved" : "Auto-save"}
          </div>
          <div className={`nb-border px-3 py-1.5 font-black text-sm flex items-center gap-1 ${timerColor}`}>
            <Clock size={14} /> {fmt(remaining)}
          </div>
          <NbButton variant="red" size="sm" onClick={() => setConfirmOpen(true)}>Submit</NbButton>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 grid lg:grid-cols-[1fr_320px] gap-4 p-4">
        {/* Question panel */}
        <div className="nb-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-black">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">{q.subject}</div>
              <div className="font-black text-xl">Question {active.currentIndex + 1} of {test.questionIds.length}</div>
            </div>
            <div className="nb-border bg-[var(--brand-yellow)] px-2 py-1 text-xs font-black uppercase">{q.difficulty}</div>
          </div>

          <div className="text-base md:text-lg font-semibold leading-relaxed mb-5 whitespace-pre-wrap">
            {q.question}
          </div>

          <div className="space-y-3 flex-1">
            {q.options.map((opt, i) => {
              const selected = active.answers[q.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswer(q.id, selected ? null : i)}
                  className={`nb-interactive w-full text-left p-3 flex items-center gap-3 font-semibold ${selected ? "bg-[var(--brand-blue)] text-white" : "bg-white"}`}
                >
                  <span className={`nb-border w-8 h-8 flex items-center justify-center font-black ${selected ? "bg-white text-black" : "bg-black text-white"}`}>{String.fromCharCode(65+i)}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="mt-5 pt-4 border-t-4 border-black flex flex-wrap gap-2 justify-between">
            <div className="flex flex-wrap gap-2">
              <NbButton variant="default" size="sm" onClick={() => active.currentIndex > 0 && setIndex(active.currentIndex - 1)} disabled={active.currentIndex === 0}>Previous</NbButton>
              <NbButton variant="default" size="sm" onClick={clearResponse}>Clear Response</NbButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <NbButton variant="purple" size="sm" onClick={markAndNext}>Mark & Next</NbButton>
              <NbButton variant="green" size="sm" onClick={saveAndNext}>Save & Next</NbButton>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div className="nb-card p-4 self-start">
          <div className="font-black text-sm uppercase mb-3">Question Palette</div>
          <div className="grid grid-cols-6 gap-1.5 max-h-[420px] overflow-auto pr-1">
            {test.questionIds.map((qid, i) => {
              const st = active.states[qid] ?? "not-visited";
              const isCurrent = i === active.currentIndex;
              return (
                <button
                  key={qid}
                  onClick={() => setIndex(i)}
                  className={`nb-border ${STATE_COLORS[st]} aspect-square text-xs font-black flex items-center justify-center transition-transform ${isCurrent ? "ring-4 ring-[var(--brand-yellow)] ring-offset-2 ring-offset-white" : "hover:translate-x-0.5 hover:translate-y-0.5"}`}
                  aria-label={`Go to question ${i+1}, ${STATE_LABEL[st]}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1.5 text-xs font-bold">
            {(["answered","not-answered","marked","answered-marked","not-visited"] as QuestionStatus[]).map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`nb-border w-5 h-5 ${STATE_COLORS[s]}`} />
                <span>{STATE_LABEL[s]} ({s === "answered" ? counts.answered : s === "not-answered" ? counts.notAnswered : s === "marked" ? counts.marked : s === "answered-marked" ? counts.answeredMarked : counts.notVisited})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit Test?">
        <div className="grid grid-cols-2 gap-2 text-sm font-bold mb-4">
          <Box label="Answered" v={counts.answered + counts.answeredMarked} color="var(--brand-green)" white />
          <Box label="Unanswered" v={counts.notAnswered + counts.notVisited} color="var(--brand-red)" white />
          <Box label="Marked" v={counts.marked + counts.answeredMarked} color="var(--brand-purple)" white />
          <Box label="Time spent" v={fmt(test.durationMin*60 - remaining)} color="var(--brand-yellow)" />
        </div>
        {(counts.notAnswered + counts.notVisited) > 0 && (
          <div className="nb-border bg-[var(--brand-orange)] text-white p-2 mb-3 text-sm font-bold flex gap-2">
            <AlertTriangle size={18} /> {counts.notAnswered + counts.notVisited} questions are still unanswered.
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <NbButton variant="default" onClick={() => setConfirmOpen(false)}>Cancel</NbButton>
          <NbButton variant="red" onClick={handleSubmit}>Final Submit</NbButton>
        </div>
      </Modal>
    </div>
  );
}

function Box({ label, v, color, white }: { label: string; v: any; color: string; white?: boolean }) {
  return (
    <div className="nb-border p-2" style={{ background: color, color: white ? "#fff" : "#000" }}>
      <div className="text-xl font-black">{v}</div>
      <div className="text-[10px] uppercase font-bold opacity-90">{label}</div>
    </div>
  );
}
