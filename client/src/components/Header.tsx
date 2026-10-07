import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, LogIn, LayoutDashboard } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "خدمات الصيانة", href: "#maintenance" },
  { label: "الأكسسوارات", href: "#accessories" },
  { label: "خدمات أخرى", href: "#other-services" },
  { label: "المدونة", href: "#blog" },
];

export default function Header() {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.storeNameAr} className="h-9 w-9 rounded-lg object-cover" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-lg font-extrabold text-accent-foreground">
              T
            </div>
          )}
          <span className="text-lg font-bold">{settings.storeNameAr}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLight((v) => !v)}
            aria-label="تبديل الوضع الداكن"
            className="rounded-lg border border-surface-border p-2 text-muted transition hover:border-accent hover:text-accent"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <Link
              to="/admin"
              className="hidden items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover sm:flex"
            >
              <LayoutDashboard size={16} />
              لوحة التحكم
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-lg border border-surface-border px-3 py-2 text-sm font-semibold transition hover:border-accent hover:text-accent sm:flex"
            >
              <LogIn size={16} />
              تسجيل الدخول
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-surface-border p-2 md:hidden"
            aria-label="القائمة"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-surface-border bg-surface px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              to={user ? "/admin" : "/login"}
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground"
            >
              {user ? "لوحة التحكم" : "تسجيل الدخول"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
