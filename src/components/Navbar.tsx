import React, { useState } from "react";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";

// ── Icon Components ──────────────────────────────────────────────────────────

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ── Resume ────────────────────────────────────────────────────────────────────

const RESUME_URL = `${import.meta.env.BASE_URL}${encodeURIComponent("Greese Gilbert Vijay Resume.pdf")}`;
const RESUME_FILENAME = "Greese Gilbert Vijay Resume.pdf";

// ── Social Links Data ─────────────────────────────────────────────────────────

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/GreeseGilbertVijay",
    icon: <GitHubIcon />,
    color: "hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10 hover:border-slate-500/30",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/greese-vijay-73516a218/",
    icon: <LinkedInIcon />,
    color: "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~014bebe4ca26f93ea9",
    icon: <UpworkIcon />,
    color: "hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/30",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/greesegilbertvijay/",
    icon: <InstagramIcon />,
    color: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/greese.vijay/",
    icon: <FacebookIcon />,
    color: "hover:text-blue-600 hover:bg-blue-600/10 hover:border-blue-600/30",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/91 95665 74232", // 🔁 Replace XXXXXXXXXX with your number
    icon: <WhatsAppIcon />,
    color: "hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/30",
  },
];

// ── Navbar Component ──────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Left: Theme Toggle ── */}
          <div className="flex items-center gap-4">
            <img src="favicon.png" alt="" className="w-8 h-8" />
          </div>




          {/* ── Right: Language Switcher + Hamburger ── */}
          <div className="flex items-center gap-2">

            <div className="max-lg:hidden">
              {/* ── Center: Social Icons (desktop) ── */}
              <div className="flex items-center gap-1 max-xl:hidden">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className={`p-2 rounded-xl text-slate-500 dark:text-slate-400 border border-transparent transition-all duration-200 hover:scale-110 hover:shadow-md backdrop-blur-sm ${link.color}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Download Resume (desktop) */}
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="max-lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-semibold shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Download size={16} />
              Resume
            </a>
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border cursor-pointer border-white/40 dark:border-slate-700/60 shadow-md text-slate-700 dark:text-slate-200 hover:scale-105 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 backdrop-blur-sm"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-slate-600" />
              )}
            </button>
            {/* Language Switcher */}
            <div className="max-lg:hidden cursor-pointer">
              <LanguageSwitcher />
            </div>

            {/* Hamburger — mobile + tablet only */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden p-2.5 rounded-xl cursor-pointer bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-slate-700/60 shadow-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet Dropdown ── */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="px-4 pt-3 pb-5 space-y-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/40">

          {/* Language Switcher on mobile */}
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200/60 dark:bg-slate-700/60" />

          {/* Social Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 text-center">
              Connect with me
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 transition-all duration-200 hover:scale-105 ${link.color}`}
                >
                  {link.icon}
                  <span className="text-[10px] font-medium leading-none">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Download Resume (mobile) */}
          <a
            href={RESUME_URL}
            download={RESUME_FILENAME}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-semibold shadow-md transition-all duration-200"
          >
            <Download size={16} />
            Download Resume
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;