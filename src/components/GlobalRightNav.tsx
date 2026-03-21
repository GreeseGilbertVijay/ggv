import React, { useEffect, useRef, useState } from "react";
import { Home, User, Code2, Briefcase, Monitor, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  hash: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", id: "Home", hash: "#Home" },
  { icon: <User size={20} />, label: "About", id: "About", hash: "#About" },
  { icon: <Briefcase size={20} />, label: "Services", id: "Services", hash: "#Services" },
  { icon: <Code2 size={20} />, label: "Projects", id: "Projects", hash: "#Projects" },
  { icon: <Monitor size={20} />, label: "Portfolio", id: "Portfolio", hash: "#Portfolio" },
  { icon: <Mail size={20} />, label: "Contact", id: "Contact", hash: "#Contact" },
];

const scrollToSection = (id: string, hash: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", hash);
  }
};

// ─── FIX 1: Removed hardcoded top offset. Icons are now evenly spaced
// relative to the nav container height using flex/absolute centering.
const getIconStyles = (index: number, total: number) => {
  const spacing = 56;
  const totalHeight = (total - 1) * spacing;
  const offsetFromCenter = -totalHeight / 2 + index * spacing;
  return {
    top: `calc(50% + ${offsetFromCenter}px)`,
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
};

// ─── Portfolio Section ────────────────────────────────────────────────────────

const portfolioItems = [
  {
    id: 1,
    title: "Brand Identity System",
    category: "Branding",
    year: "2024",
    tags: ["Figma", "Illustrator"],
    color: "#FDDA0D",
    description: "Complete visual identity for a fintech startup — logomark, type system, and motion guidelines.",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Web Design",
    year: "2024",
    tags: ["React", "Tailwind", "Shopify"],
    color: "#60a5fa",
    description: "High-converting storefront with custom product configurator and animated checkout flow.",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    category: "UI/UX",
    year: "2023",
    tags: ["Figma", "Protopie"],
    color: "#34d399",
    description: "0→1 product design for a neobank targeting Gen Z. 4.8★ App Store rating at launch.",
  },
  {
    id: 4,
    title: "Data Dashboard",
    category: "Web App",
    year: "2023",
    tags: ["Next.js", "D3.js", "Prisma"],
    color: "#f472b6",
    description: "Real-time analytics suite with 30+ chart types, dark mode, and team collaboration.",
  },
  {
    id: 5,
    title: "Motion Design System",
    category: "Animation",
    year: "2024",
    tags: ["GSAP", "Lottie", "After Effects"],
    color: "#a78bfa",
    description: "Unified animation library with 200+ tokens and React component bindings.",
  },
  {
    id: 6,
    title: "SaaS Landing Page",
    category: "Web Design",
    year: "2024",
    tags: ["Astro", "GSAP", "Figma"],
    color: "#fb923c",
    description: "Award-winning landing page with scroll-driven storytelling and 3D hero section.",
  },
];

export const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards staggered reveal
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="Portfolio"
      ref={sectionRef}
      className="relative min-h-screen bg-slate-950 py-28 px-6 overflow-hidden"
    >
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow blob */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-yellow-400/5 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <p className="text-yellow-400 text-xs font-mono tracking-[0.3em] uppercase mb-4">
            — Selected Work
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Port
              <span className="text-yellow-400">folio</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              A curated selection of projects spanning brand, product, and
              engineering — built to last.
            </p>
          </div>
          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-yellow-400/40 via-slate-600 to-transparent" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6 cursor-pointer overflow-hidden transition-all duration-300"
              style={{
                boxShadow:
                  hovered === item.id
                    ? `0 0 0 1px ${item.color}55, 0 20px 60px ${item.color}18`
                    : "none",
                borderColor: hovered === item.id ? `${item.color}44` : undefined,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-t-2xl"
                style={{ backgroundColor: item.color }}
              />

              {/* Category + Year */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: `${item.color}18`,
                    color: item.color,
                  }}
                >
                  {item.category}
                </span>
                <span className="text-slate-600 text-xs font-mono">{item.year}</span>
              </div>

              {/* Placeholder visual */}
              <div
                className="w-full h-36 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: `${item.color}0d` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${item.color}22 0%, transparent 70%)`,
                  }}
                />
                <Monitor
                  size={40}
                  style={{ color: `${item.color}55` }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-4 group-hover:text-slate-400 transition-colors">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-slate-500 border border-slate-800 rounded-full px-2 py-0.5 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow on hover */}
              <div
                className="absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ backgroundColor: item.color }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex items-center justify-center">
          <button
            className="group flex items-center gap-3 border border-slate-700 text-slate-300 hover:border-yellow-400 hover:text-yellow-400 rounded-full px-8 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300"
            onClick={() => scrollToSection("Contact", "#Contact")}
          >
            Start a Project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── Fixed GlobalRightNav ─────────────────────────────────────────────────────

const GlobalRightNav: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  // FIX 2: Initialize array with correct length so GSAP always has targets
  const iconsRef = useRef<Array<HTMLDivElement | null>>(
    new Array(navItems.length).fill(null)
  );
  const lineRef = useRef<SVGLineElement | null>(null);
  const endDotRef = useRef<SVGCircleElement | null>(null); // FIX 3: replaced broken image with SVG circle
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedIn = useRef(false);

  const [activeSection, setActiveSection] = useState("Home");

  // Scroll section detection
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    navItems.forEach((item) => {
      const targetElement = document.getElementById(item.id);
      if (!targetElement) return;

      const trigger = ScrollTrigger.create({
        trigger: targetElement,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Hide/show nav based on active section
  useEffect(() => {
    if (!navRef.current) return;

    if (activeSection === "Home") {
      gsap.to(navRef.current, {
        opacity: 0,
        x: 30,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
      });
      hasAnimatedIn.current = false;
      return;
    }

    if (!hasAnimatedIn.current) {
      hasAnimatedIn.current = true;

      gsap.set(navRef.current, { opacity: 1, x: 0, pointerEvents: "auto" });

      // FIX 4: Filter out nulls before passing to GSAP
      const validIcons = iconsRef.current.filter(Boolean);
      gsap.set(validIcons, { y: -30, opacity: 0 });

      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      if (endDotRef.current) {
        gsap.set(endDotRef.current, { opacity: 0, scale: 0, transformOrigin: "center center" });
      }

      timelineRef.current?.kill();
      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.to(validIcons, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.45,
        ease: "power3.out",
      });

      tl.to(
        lineRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.to(
        endDotRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.15"
      );
    } else {
      gsap.to(navRef.current, {
        opacity: 1,
        x: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeSection]);

  // FIX 5: SVG line Y2 capped to viewBox height (500), not 800
  const LINE_Y1 = 40;
  const LINE_Y2 = 460;

  return (
    <div
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[70px] flex justify-center items-center opacity-0"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative w-full h-[560px] flex justify-center items-center">
        {/* Vertical Line — FIX 5: viewBox & line coords are consistent */}
        <svg
          width="40"
          height="560"
          viewBox="0 0 40 560"
          className="absolute pointer-events-none"
        >
          <line
            ref={lineRef}
            x1="20"
            y1={LINE_Y1}
            x2="20"
            y2={LINE_Y2}
            stroke="#FDDA0D"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* FIX 3: replaced broken <image> with a proper SVG circle dot */}
          <circle
            ref={endDotRef}
            cx="20"
            cy={LINE_Y2}
            r="6"
            fill="#FDDA0D"
          />
        </svg>

        {/* Icons — FIX 1: centered spacing relative to container */}
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.label}
              ref={(el) => {
                iconsRef.current[index] = el;
              }}
              className="absolute group"
              style={getIconStyles(index, navItems.length)}
              onClick={() => scrollToSection(item.id, item.hash)}
            >
              <div
                className={`
                  flex items-center justify-center rounded-full border shadow-lg
                  cursor-pointer select-none
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "w-10 h-10 bg-yellow-400 text-slate-900 border-yellow-300 shadow-yellow-200/60 dark:shadow-yellow-400/30"
                      : "w-8 h-8 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border-slate-100 dark:border-slate-600 hover:bg-blue-600 hover:text-white hover:scale-110"
                  }
                `}
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, {
                      size: isActive ? 20 : 16,
                    })
                  : item.icon}
              </div>

              {/* Tooltip */}
              <span
                className="
                  absolute right-full top-1/2 -translate-y-1/2 mr-2
                  px-2 py-1 text-[10px]
                  bg-slate-800 text-white rounded
                  opacity-0 group-hover:opacity-100
                  whitespace-nowrap
                  transition-opacity duration-200
                  pointer-events-none
                "
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalRightNav;
