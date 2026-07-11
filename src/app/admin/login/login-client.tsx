"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Şifre hatalı.");
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070A] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#56D7FF]/20 bg-[#061326] p-8 shadow-[0_0_40px_rgba(61,165,255,0.12)]">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#56D7FF]">Octo Air Admin</p>
        <h1 className="font-heading mt-3 text-2xl font-medium text-[#F2F7FF]">Yönetim Girişi</h1>
        <p className="mt-2 text-sm text-[rgba(242,247,255,0.65)]">
          Haberleri düzenlemek ve görsel yüklemek için giriş yapın.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-left text-[11px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.55)]">
            Admin Şifresi
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#56D7FF]/2 bg-[#05070A] px-4 py-3 text-sm text-[#F2F7FF] outline-none focus:border-[#56D7FF]/5"
              placeholder="••••••••"
              autoFocus
              required
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-[#3DA5FF]/45 bg-[linear-gradient(135deg,#081A33,#123A6B)] px-5 py-3 text-[12px] uppercase tracking-[0.16em] text-[#F2F7FF] disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
