import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useToast } from "@/components/toast-provider";

export default function AuthPage({ onAuthSuccess, currentUser }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response =
        mode === "login"
          ? await api.login(form.email, form.password)
          : await api.register(form.name, form.email, form.password, form.role);

      onAuthSuccess(response);
      addToast(mode === "login" ? "Signed in successfully." : "Account created successfully.", "success");
      navigate(response?.user?.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message || "Authentication failed");
      addToast(err.message || "Authentication failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Welcome back</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Sign in to manage your trip plans and saved adventures.
        </h1>
        <p className="text-lg text-muted-foreground">
          Create an account or log in to save your itineraries, access personalized dashboards, and keep your plans in sync.
        </p>
        {currentUser && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700">
            Signed in as <span className="font-semibold">{currentUser.name}</span> ({currentUser.role})
          </div>
        )}
      </div>

      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="mb-6 flex rounded-full border border-border/70 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "register" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                placeholder="Alex Morgan"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength="6"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 pr-10 text-sm outline-none ring-0"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div className="rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
              New accounts are created as regular users by default.
            </div>
          )}

          {error && <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}
