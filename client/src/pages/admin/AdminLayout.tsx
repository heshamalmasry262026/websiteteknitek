import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Wrench, Newspaper, Settings as SettingsIcon, LogOut, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "المنتجات", icon: Package },
  { to: "/admin/services", label: "الخدمات", icon: Wrench },
  { to: "/admin/articles", label: "المقالات", icon: Newspaper },
  { to: "/admin/settings", label: "إعدادات المتجر", icon: SettingsIcon },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-l border-surface-border bg-surface p-4 md:block">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-extrabold text-accent-foreground">
            T
          </div>
          <div>
            <p className="text-sm font-bold">لوحة تحكم تكنيتك</p>
            <p className="text-xs text-muted">{user?.username}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? "bg-accent text-accent-foreground font-semibold" : "text-muted hover:bg-background hover:text-white"
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <a
            href="/"
            className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-background hover:text-white"
          >
            <Home size={16} /> عرض الموقع
          </a>
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-background"
          >
            <LogOut size={16} /> تسجيل الخروج
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
