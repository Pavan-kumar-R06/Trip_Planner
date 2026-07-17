import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Compass, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/planner", label: "Trip Planner" },
  { href: "/calculator", label: "Budget Calculator" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];

export function Navbar({ currentUser, onLogout }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const links = currentUser?.role === "admin"
    ? [{ href: "/", label: "Home" }, { href: "/destinations", label: "Destinations" }, { href: "/admin", label: "Manage Destination" }]
    : baseLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Trip<span className="text-primary">Wise</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm font-medium text-foreground"
              >
                <span>{currentUser.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-border/70 bg-background p-2 shadow-lg">
                  {currentUser.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    >
                      Admin panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      onLogout();
                      setProfileOpen(false);
                    }}
                    className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/planner"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Plan a Trip
          </Link>
        </div>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {currentUser ? (
              <>
                {currentUser.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
                  >
                    Admin panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
