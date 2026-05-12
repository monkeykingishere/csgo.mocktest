import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { useTest } from "@/store/test";
import { NbButton } from "@/components/NbButton";
import { NbInput } from "@/components/NbInput";
import { useState } from "react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — CS:GO" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const user = useAuth(s => s.current);
  const reset = useAuth(s => s.resetPassword);
  const logout = useAuth(s => s.logout);
  const resetAll = useTest(s => s.resetAll);
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  if (!user) return null;

  const changePwd = () => {
    const r = reset(user.email, pwd);
    setMsg(r.ok ? "Password updated." : (r.error ?? "Failed"));
    if (r.ok) setPwd("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black">Settings</h1>

      <div className="nb-card p-6 space-y-3">
        <h2 className="text-xl font-black">Change password</h2>
        <NbInput label="New password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
        <NbButton variant="orange" onClick={changePwd}>Update password</NbButton>
        {msg && <div className="text-sm font-bold">{msg}</div>}
      </div>

      <div className="nb-card p-6 space-y-3">
        <h2 className="text-xl font-black">Reset progress</h2>
        <p className="text-sm font-medium text-muted-foreground">Deletes all your attempts and history. This can't be undone.</p>
        <NbButton variant="red" onClick={() => { if (confirm("Delete all attempts?")) resetAll(); }}>Reset all progress</NbButton>
      </div>

      <div className="nb-card p-6 space-y-3">
        <h2 className="text-xl font-black">Account</h2>
        <NbButton onClick={() => { logout(); navigate({ to: "/" }); }}>Logout</NbButton>
      </div>
    </div>
  );
}
