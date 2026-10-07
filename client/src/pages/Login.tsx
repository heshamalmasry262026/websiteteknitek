import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";

export default function Login() {
  const { login } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl2 border border-surface-border bg-surface p-8 shadow-card">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-extrabold text-accent-foreground">
            T
          </div>
          <h1 className="text-xl font-bold">تسجيل الدخول للوحة تحكم {settings.storeNameAr}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">اسم المستخدم</label>
            <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-background px-3 py-2">
              <User size={16} className="text-muted" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-muted">كلمة المرور</label>
            <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-background px-3 py-2">
              <Lock size={16} className="text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-accent-foreground transition hover:bg-accent-hover disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}
