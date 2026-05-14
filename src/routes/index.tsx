import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NbButton } from "@/components/NbButton";
import { useAuth } from "@/store/auth";
import { Trophy, Clock, BarChart3, BookOpen, ShieldCheck, Zap, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CS:GO — Ace Exams with Realistic Mock Tests" },
      { name: "description", content: "Practice NIMCET-style mock tests with timer, detailed analytics, and explanation for every question." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const current = useAuth(s => s.current);
  const ctaLink = current ? "/dashboard" : "/signup";
  const ctaText = current ? "Go to Dashboard" : "Start Mock Test";
  const bottomText = current ? "Continue to dashboard" : "Create your free account";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block nb-border bg-[var(--brand-yellow)] px-3 py-1 text-xs font-black uppercase mb-5">
              NIMCET 2026 • Mock Tests
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
              Ace Exams with <span className="bg-[var(--brand-yellow)] nb-border px-2 inline-block">Realistic</span> Mock Tests.
            </h1>
            <p className="mt-6 text-lg font-medium text-muted-foreground max-w-xl">
              Full-length 120-question mocks. Timer, palette, mark-for-review — exactly like exam day.
              Plus deep analytics so every attempt makes you sharper.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ctaLink}><NbButton variant="blue" size="lg">{ctaText}</NbButton></Link>
              <a href="#features"><NbButton variant="default" size="lg">View Features</NbButton></a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-bold uppercase tracking-wide">
              <div>📚 12 Mock Tests</div>
              <div>⚡ 140+ Questions</div>
              <div>📊 Subject Analytics</div>
            </div>
          </div>
          <div className="relative">
            <div className="nb-card p-6 bg-white">
              <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-black">
                <div className="font-black text-lg">NIMCET Full Mock #1</div>
                <div className="nb-border bg-[var(--brand-red)] text-white px-2 py-1 text-xs font-black">01:48:22</div>
              </div>
              <div className="font-bold mb-3">Q15. ∫₀^π sin x dx = ?</div>
              <div className="space-y-2">
                {["0", "1", "2", "π"].map((o, i) => (
                  <div key={i} className={`nb-border p-2 font-semibold ${i === 2 ? "bg-[var(--brand-green)] text-white" : "bg-white"}`}>
                    {String.fromCharCode(65+i)}. {o}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1 mt-5">
                {Array.from({ length: 30 }).map((_, i) => {
                  const c = i < 8 ? "bg-[var(--brand-green)]" : i < 12 ? "bg-[var(--brand-purple)]" : i < 18 ? "bg-[var(--brand-red)]" : "bg-white";
                  return <div key={i} className={`nb-border ${c} h-6 text-[10px] font-black flex items-center justify-center ${i < 18 ? "text-white" : "text-black"}`}>{i+1}</div>;
                })}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 nb-border bg-[var(--brand-yellow)] px-3 py-2 font-black rotate-3 nb-shadow-sm">LIVE PREVIEW</div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-black mb-10">Everything you need. Nothing you don't.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { i: Clock, t: "Real Exam Timer", d: "Persistent countdown that survives refresh, with warnings at 15 & 5 mins.", c: "var(--brand-yellow)" },
              { i: BookOpen, t: "Question Palette", d: "All 5 question states colour-coded — exactly like the official NTA UI.", c: "var(--brand-blue)" },
              { i: BarChart3, t: "Deep Analytics", d: "Subject-wise score, accuracy charts, and rank estimate after every test.", c: "var(--brand-green)" },
              { i: Trophy, t: "Test History", d: "Track every attempt. Compare scores. Watch yourself improve.", c: "var(--brand-orange)" },
              { i: ShieldCheck, t: "Auto-Save", d: "Never lose a single answer — your progress is saved instantly to your device.", c: "var(--brand-purple)" },
              { i: Zap, t: "Detailed Solutions", d: "Every question has a clear explanation so you actually learn from mistakes.", c: "var(--brand-red)" },
            ].map((f) => (
              <div key={f.t} className="nb-card p-6">
                <div className="nb-border inline-flex items-center justify-center w-12 h-12 mb-4" style={{ background: f.c, color: f.c === "var(--brand-yellow)" ? "#000" : "#fff" }}>
                  <f.i size={22} />
                </div>
                <div className="text-xl font-black mb-1">{f.t}</div>
                <p className="text-sm font-medium text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY NIMCET */}
        {/* <section className="bg-black text-white nb-border border-x-0 my-12">
          <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Why NIMCET?</h2>
              <p className="text-lg opacity-90 mb-4">
                NIMCET is the gateway to MCA at NITs — Trichy, Warangal, Allahabad, Bhopal, Surathkal, Raipur, Jamshedpur and more. The exam is competitive, fast, and unforgiving.
              </p>
              <ul className="space-y-2 font-semibold">
                <li>• 120 questions in 120 minutes — speed matters.</li>
                <li>• Negative marking — accuracy matters more.</li>
                <li>• 4 sections — balance matters most.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "120", l: "Questions" }, { n: "480", l: "Max Marks" },
                { n: "−1", l: "Negative" }, { n: "120", l: "Minutes" },
              ].map(s => (
                <div key={s.l} className="nb-border bg-[var(--brand-yellow)] text-black p-6 text-center">
                  <div className="text-5xl font-black">{s.n}</div>
                  <div className="font-bold uppercase text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-black mb-10">What aspirants say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Riya S.", r: "AIR 142, NIT Trichy", q: "The mock interface felt identical to the real exam. I walked in already used to the timer." },
              { n: "Arjun M.", r: "AIR 238, NIT Warangal", q: "Subject-wise analytics showed me where I was bleeding marks. Fixed in two weeks." },
              { n: "Pooja K.", r: "AIR 401, NIT Bhopal", q: "Negative marking simulation saved me. I learned when to skip." },
            ].map(t => (
              <div key={t.n} className="nb-card p-6">
                <Quote className="text-[var(--brand-blue)] mb-3" />
                <p className="font-medium mb-4">"{t.q}"</p>
                <div className="font-black">{t.n}</div>
                <div className="text-sm text-muted-foreground font-semibold">{t.r}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="nb-card bg-[var(--brand-yellow)] p-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-3">Stop reading. Start solving.</h2>
            <p className="font-medium mb-6">Sign up free. Take your first mock in under 60 seconds.</p>
            <Link to={ctaLink}><NbButton variant="blue" size="lg">{bottomText}</NbButton></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
