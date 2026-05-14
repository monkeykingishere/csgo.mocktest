import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth";
import { NbButton } from "@/components/NbButton";
import { NbInput } from "@/components/NbInput";
import { Header } from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — CS:GO" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const signup = useAuth(s => s.signup);
  const current = useAuth(s => s.current);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (current) {
      navigate({ to: "/dashboard" });
    }
  }, [current, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = signup(name, email, password);
    if (!r.ok) { setError(r.error ?? "Signup failed"); return; }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <form onSubmit={onSubmit} className="nb-card w-full max-w-md p-6 space-y-4">
          <h1 className="text-3xl font-black">Create account</h1>
          <p className="text-sm text-muted-foreground font-medium">Start your NIMCET grind today.</p>
          <NbInput label="Full name" value={name} onChange={e => setName(e.target.value)} required />
          <NbInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          <div className="relative">
            <NbInput label="Password (min 6)" type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-9 text-black" aria-label="Toggle password visibility">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <div className="nb-border bg-[var(--brand-red)] text-white px-3 py-2 text-sm font-bold">{error}</div>}
          <NbButton type="submit" variant="green" className="w-full" size="lg">Create account</NbButton>
          <p className="text-sm text-center font-medium">Already have an account? <Link to="/login" className="font-black underline">Login</Link></p>
        </form>
      </main>
    </div>
  );
}
