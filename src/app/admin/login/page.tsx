"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login credentials invalid");
      }
      
      // Store mock token in session storage or cookie
      localStorage.setItem("admin_token", data.token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to connect to authentication server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-pe-navy py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-pe-cyan opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-pe-blue opacity-10 rounded-full blur-3xl" />

      <div className="max-w-md w-full space-y-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="text-pe-cyan fill-pe-cyan" size={28} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Admin Console Login</h2>
          <p className="text-white/50 text-sm mt-1.5">Access settings &amp; site customization controls</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-1.5">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-pe-cyan focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-pe-cyan focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-3.5 text-base font-bold transition-all shadow-[0_8px_30px_rgba(41,171,226,0.3)] disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In →"}
          </button>
        </form>
      </div>
    </section>
  );
}
