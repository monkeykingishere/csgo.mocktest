import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { NbButton } from "@/components/NbButton";
import { NbInput } from "@/components/NbInput";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — CS:GO" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const reset = useAuth(s => s.resetPassword);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = reset(email, pwd);
    setMsg({ ok: r.ok, text: r.ok ? "Password updated. You can now login." : (r.error ?? "Reset failed") });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <form onSubmit={onSubmit} className="nb-card w-full max-w-md p-6 space-y-4">
          <h1 className="text-3xl font-black">Reset password</h1>
          <p className="text-sm text-muted-foreground font-medium">Enter your email and a new password.</p>
          <NbInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <NbInput label="New password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} required />
          {msg && <div className={`nb-border px-3 py-2 text-sm font-bold ${msg.ok ? "bg-[var(--brand-green)] text-white" : "bg-[var(--brand-red)] text-white"}`}>{msg.text}</div>}
          <NbButton type="submit" variant="orange" className="w-full" size="lg">Reset password</NbButton>
          <p className="text-sm text-center font-medium"><Link to="/login" className="font-black underline">Back to login</Link></p>
        </form>
      </main>
    </div>
  );
}
