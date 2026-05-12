import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { useTest } from "@/store/test";
import { NbInput } from "@/components/NbInput";
import { NbButton } from "@/components/NbButton";
import { useState } from "react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — CS:GO" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useAuth(s => s.current);
  const updateName = useAuth(s => s.updateName);
  const attempts = useTest(s => s.attempts);
  const [name, setName] = useState(user?.name ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;
  const best = attempts.reduce((m, a) => Math.max(m, a.score), 0);
  const avgAcc = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.accuracy, 0) / attempts.length) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black">Profile</h1>
      <div className="nb-card p-6 space-y-4">
        <NbInput label="Name" value={name} onChange={e => setName(e.target.value)} />
        <NbInput label="Email" value={user.email} readOnly />
        <NbInput label="Joined" value={new Date(user.joinedAt).toLocaleDateString()} readOnly />
        <NbButton variant="blue" onClick={() => { updateName(name.trim() || user.name); setSaved(true); setTimeout(() => setSaved(false), 1500); }}>Save changes</NbButton>
        {saved && <div className="text-sm font-bold text-[var(--brand-green)]">Saved.</div>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="nb-card p-4 bg-[var(--brand-yellow)]"><div className="text-3xl font-black">{attempts.length}</div><div className="text-xs font-bold uppercase">Total attempts</div></div>
        <div className="nb-card p-4 bg-[var(--brand-blue)] text-white"><div className="text-3xl font-black">{best}</div><div className="text-xs font-bold uppercase">Best score</div></div>
        <div className="nb-card p-4 bg-[var(--brand-green)] text-white"><div className="text-3xl font-black">{avgAcc}%</div><div className="text-xs font-bold uppercase">Avg accuracy</div></div>
      </div>
    </div>
  );
}
