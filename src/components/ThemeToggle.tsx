import { useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeToggleProps = {
  compact?: boolean;
  className?: string;
};

const STORAGE_KEY = "healthease-theme";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    return;
  }
  root.removeAttribute("data-theme");
}

function resolveInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ compact = false, className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = resolveInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [ready, theme]);

  const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
  const label = useMemo(() => (theme === "dark" ? "Light Mode" : "Dark Mode"), [theme]);
  const iconClass = theme === "dark" ? "fa-sun" : "fa-moon";

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full border border-soft bg-surface px-3 py-2 text-xs font-semibold text-secondary transition hover:bg-blue-100 sm:text-sm ${className}`}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Ubah tema ke ${label}`}
      title={`Ubah tema ke ${label}`}
    >
      <i className={`fas ${iconClass} text-blue-600`} aria-hidden="true" />
      {!compact ? <span>{label}</span> : null}
    </button>
  );
}
