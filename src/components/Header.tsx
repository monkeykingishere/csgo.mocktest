import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { NbButton } from "./NbButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { current, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const navLinks = (current
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/history", label: "History" },
        { to: "/profile", label: "Profile" },
        { to: "/settings", label: "Settings" },
      ]
    : [{ to: "/", label: "Home" }]) as const;

  return (
    <header className="sticky top-0 z-40 nb-border border-x-0 border-t-0 bg-[var(--brand-yellow)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="nb-border bg-black px-2 py-1 text-white font-black tracking-tighter">CS</div>
          <div className="text-xl font-black tracking-tight">:GO</div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="nb-interactive bg-white px-3 py-1.5 text-sm font-bold uppercase">
              {l.label}
            </Link>
          ))}
          {current ? (
            <NbButton variant="red" size="sm" onClick={handleLogout}>Logout</NbButton>
          ) : (
            <>
              <Link to="/login" className="nb-interactive bg-white px-3 py-1.5 text-sm font-bold uppercase">Login</Link>
              <Link to="/signup" className="nb-interactive bg-[var(--brand-blue)] text-white px-3 py-1.5 text-sm font-bold uppercase">Sign Up</Link>
            </>
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden nb-interactive bg-white p-2" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t-4 border-black bg-white p-4 space-y-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block nb-interactive bg-[var(--brand-yellow)] px-3 py-2 text-sm font-bold uppercase">
              {l.label}
            </Link>
          ))}
          {current ? (
            <NbButton variant="red" className="w-full" onClick={() => { setOpen(false); handleLogout(); }}>Logout</NbButton>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block nb-interactive bg-white px-3 py-2 text-sm font-bold uppercase">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="block nb-interactive bg-[var(--brand-blue)] text-white px-3 py-2 text-sm font-bold uppercase">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
