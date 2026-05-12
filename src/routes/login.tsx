import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { NbButton } from "@/components/NbButton";
import { NbInput } from "@/components/NbInput";
import { Header } from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — CS:GO" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth(s => s.login);
  const current = useAuth(s => s.current);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  if (current && typeof window !== "undefined") {
    queueMicrotask(() => navigate({ to: "/dashboard" }));
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(email, password, remember);
    if (!r.ok) { setError(r.error ?? "Login failed"); return; }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <form onSubmit={onSubmit} className="nb-card w-full max-w-md p-6 space-y-4">
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="text-sm text-muted-foreground font-medium">Login to continue your prep.</p>
          <NbInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          <div className="relative">
            <NbInput label="Password" type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-9 text-black" aria-label="Toggle password visibility">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-bold text-sm">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 nb-border accent-black" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm font-bold underline">Forgot?</Link>
          </div>
          {error && <div className="nb-border bg-[var(--brand-red)] text-white px-3 py-2 text-sm font-bold">{error}</div>}
          <NbButton type="submit" variant="blue" className="w-full" size="lg">Login</NbButton>
          <p className="text-sm text-center font-medium">No account? <Link to="/signup" className="font-black underline">Sign up</Link></p>
        </form>
      </main>
    </div>
  );
}
