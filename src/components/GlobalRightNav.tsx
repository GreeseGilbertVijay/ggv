import React, { useEffect, useRef, useState } from "react";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
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
  { icon: <Code2 size={20} />, label: "Projects", id: "Projects", hash: "#Projects" },
  { icon: <Briefcase size={20} />, label: "Services", id: "Services", hash: "#Services" },
  { icon: <Mail size={20} />, label: "Contact", id: "Contact", hash: "#Contact" },
];

const scrollToSection = (id: string, hash: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", hash);
  }
};

const getIconStyles = (index: number, total: number) => {
  const spacing = 60;
  const startTop = 280 - ((total - 1) * spacing) / 2;
  return {
    top: `${startTop + index * spacing}px`,
    left: "50%",
    transform: "translateX(-50%)",
  };
};

const GlobalRightNav: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
  const lineRef = useRef<SVGLineElement | null>(null);
  const endImageRef = useRef<SVGImageElement | null>(null);
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
      // Hide nav when on Home
      gsap.to(navRef.current, {
        opacity: 0,
        x: 30,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
      });
      // Reset so animation replays when coming back
      hasAnimatedIn.current = false;
      return;
    }

    // First time entering a non-Home section → play full intro animation
    if (!hasAnimatedIn.current) {
      hasAnimatedIn.current = true;

      // Make nav visible but prep elements for animation
      gsap.set(navRef.current, { opacity: 1, x: 0, pointerEvents: "auto" });
      gsap.set(iconsRef.current, { y: -30, opacity: 0 });

      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      if (endImageRef.current) {
        gsap.set(endImageRef.current, { opacity: 0, scale: 0, transformOrigin: "center center" });
      }

      timelineRef.current?.kill();
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Slide icons in from top
      tl.to(iconsRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.45,
        ease: "power3.out",
      });

      // Draw the line
      tl.to(
        lineRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Pop in the end image
      tl.to(
        endImageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.15"
      );
    } else {
      // Already animated in → just ensure it's visible (no replay)
      gsap.to(navRef.current, {
        opacity: 1,
        x: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[70px] flex justify-center items-center opacity-0"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative w-full h-[600px] flex justify-center items-center">
        {/* Vertical Line */}
        <svg
          width="40"
          height="50vh"
          viewBox="0 0 40 500"
          preserveAspectRatio="none"
          className="absolute pointer-events-none"
        >
          <line
            ref={lineRef}
            x1="20"
            y1="50"
            x2="20"
            y2="800"
            stroke="#FDDA0D"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <image
            ref={endImageRef}
            href="dist/favicon.png"
            x="8"
            y="95%"
            width="25"
            height="25"
          />
        </svg>

        {/* Icons */}
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.label}
              ref={(el) => {
                if (el) iconsRef.current[index] = el;
              }}
              className="absolute group"
              style={getIconStyles(index, navItems.length)}
              onClick={() => scrollToSection(item.id, item.hash)}
            >
              <div
                className={`
                  flex items-center justify-center rounded-full border shadow-lg
                  cursor-pointer
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? // Active: large, yellow background
                        "w-12 h-12 bg-yellow-400 dark:bg-yellow-400 text-slate-900 border-yellow-300 scale-110 shadow-yellow-200/60 dark:shadow-yellow-400/30"
                      : // Inactive: smaller, default style
                        "w-8 h-8 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border-slate-100 dark:border-slate-600 hover:bg-blue-600 hover:text-white hover:scale-110"
                  }
                `}
              >
                {/* Render icon with larger size when active */}
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, {
                      size: isActive ? 22 : 18,
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
