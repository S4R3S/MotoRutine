import { Link, useLocation } from "@tanstack/react-router";
import {
  Car,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vehicles", label: "Vehículos", icon: Car },
  { to: "/jobs", label: "Trabajos", icon: Wrench },
  { to: "/maintenance", label: "Mantenimiento", icon: ClipboardList },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.brand_link"
          >
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm text-foreground tracking-tight">
              MotoTrack
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navegación principal"
          >
            {navItems.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase().replace(/[áéíóú]/g, (c) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] ?? c)}_link`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-smooth ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-2 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile_${label.toLowerCase().replace(/[áéíóú]/g, (c) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] ?? c)}_link`}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-smooth ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>MotoTrack — Registro de Mantenimiento de Vehículos</span>
          <span>
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth"
            >
              Built with caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
