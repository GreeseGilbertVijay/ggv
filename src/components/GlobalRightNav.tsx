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
  const endImageRef = useRef<HTMLImageElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);


  const [activeSection, setActiveSection] = useState("Home");

  // Scroll section detection
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    navItems.forEach((item) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${item.id}`,
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

  // MAIN ANIMATION CONTROLLER
  useEffect(() => {
    if (!navRef.current) return;

    timelineRef.current?.kill();

    // HOME → HIDE NAV
    if (activeSection === "Home") {
      gsap.to(navRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
      return;
    }

    // SHOW NAV
    gsap.set(navRef.current, {
      opacity: 1,
      pointerEvents: "auto",
    });

    // RESET STATES
    gsap.set(iconsRef.current, { y: -40, opacity: 0 });
    
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
    
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    }
    
    if (endImageRef.current) {
      gsap.set(endImageRef.current, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
      });
    }

    
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // ICONS → SLIDE FROM TOP
    tl.to(iconsRef.current, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.45,
      ease: "power3.out",
    })

    tl.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .to(
      endImageRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "-=0.15"
    );
  }, [activeSection]);

  return (
    <div
      ref={navRef}
      className="
        fixed right-6 top-1/2 -translate-y-1/2
        z-50 w-[70px]
        flex justify-center items-center
        opacity-0
      "
    >
      <div className="relative w-full h-[600px] flex justify-center items-center">
        {/* Vertical Line */}
        <svg
  width="40"
  height="70vh"
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
    href="/favicon.png"
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
                  w-8 h-8 sm:w-8 sm:h-8 lg:w-11 lg:h-11
                  bg-white dark:bg-slate-700 rounded-full border border-slate-100 dark:border-slate-600 shadow-lg
                  flex items-center justify-center text-slate-600 dark:text-slate-200
                  transition-all duration-300
                  group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110
                  cursor-pointer
                  ${isActive
                    ? "bg-yellow-400 dark:bg-yellow-400 scale-110"
                    : "hover:bg-blue-600 hover:text-white hover:scale-110"}
                `}
                
              >
                {item.icon}
              </div>

              <span
                className="
                  absolute right-full top-1/2 -translate-y-1/2
                  px-2 py-1 text-[10px]
                  bg-slate-800 text-white rounded
                  opacity-0 group-hover:opacity-100
                  whitespace-nowrap
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
