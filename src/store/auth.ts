import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

interface AuthState {
  users: User[];
  current: User | null;
  remember: boolean;
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string, remember: boolean) => { ok: boolean; error?: string };
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => { ok: boolean; error?: string };
  updateName: (name: string) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      current: null,
      remember: false,
      signup: (name, email, password) => {
        const e = email.trim().toLowerCase();
        if (!name.trim() || !e || password.length < 6) {
          return { ok: false, error: "All fields required, password ≥ 6 chars." };
        }
        if (get().users.some(u => u.email === e)) {
          return { ok: false, error: "Email already registered." };
        }
        const user: User = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: e,
          password,
          joinedAt: new Date().toISOString(),
        };
        set({ users: [...get().users, user], current: user });
        return { ok: true };
      },
      login: (email, password, remember) => {
        const e = email.trim().toLowerCase();
        const user = get().users.find(u => u.email === e && u.password === password);
        if (!user) return { ok: false, error: "Invalid email or password." };
        set({ current: user, remember });
        return { ok: true };
      },
      logout: () => set({ current: null }),
      resetPassword: (email, newPassword) => {
        const e = email.trim().toLowerCase();
        const users = get().users;
        const idx = users.findIndex(u => u.email === e);
        if (idx === -1) return { ok: false, error: "No account with that email." };
        if (newPassword.length < 6) return { ok: false, error: "Password must be ≥ 6 chars." };
        const next = [...users];
        next[idx] = { ...next[idx], password: newPassword };
        set({ users: next });
        return { ok: true };
      },
      updateName: (name) => {
        const cur = get().current;
        if (!cur) return;
        const updated = { ...cur, name };
        set({
          current: updated,
          users: get().users.map(u => u.id === cur.id ? updated : u),
        });
      },
    }),
    { name: "csgo-auth" },
  ),
);
