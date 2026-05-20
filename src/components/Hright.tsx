import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, User, Code2, Briefcase, Monitor, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  icon: React.ReactNode;
  label: string;
  hash: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: "Home", hash: "#Home" },
  { icon: <User size={20} />, label: "About", hash: "#About" },
  { icon: <Briefcase size={20} />, label: "Services", hash: "#Services" },
  { icon: <Code2 size={20} />, label: "Projects", hash: "#Projects" },
  { icon: <Monitor size={20} />, label: "Portfolio", hash: "#Portfolio" },
  { icon: <Mail size={20} />, label: "Contact", hash: "#Contact" },
];

const computeResponsiveValues = (width: number) => {
  if (width < 640) {
    return { radius: 130, arrowX: 170, arrowY: 330, svgSize: 360 };
  } else if (width < 1024) {
    return { radius: 150, arrowX: 240, arrowY: 460, svgSize: 500 };
  }
  return { radius: 180, arrowX: 240, arrowY: 460, svgSize: 500 };
};

const getIconStyles = (index: number, total: number, width: number) => {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const radius = isMobile ? 95 : isTablet ? 135 : 180;
  const spread = isMobile ? 1.70 : isTablet ? 1.65 : 1.25;
  const startAngle = -50;
  const endAngle = 50;

  const angle = startAngle + (index * (endAngle - startAngle)) / (total - 1);
  const rad = (angle * Math.PI) / 180;

  return {
    transform: `translate(
      ${Math.cos(rad) * spread * radius}px,
      ${Math.sin(rad) * spread * radius}px
    )`,
  };
};

const Hright: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowImageRef = useRef<SVGImageElement>(null);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const scrollToSection = (hash: string) => {
    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", hash);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          // FIX: "reset" on leaveBack means the timeline rewinds when
          // the section scrolls out of view — so it replays on re-enter
          // from both top and bottom directions.
          toggleActions: "play none none reset",
        },
      });

      tl.from(profileRef.current, {
        scale: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
      });

      tl.fromTo(
        wheelRef.current,
        { rotate: -90, opacity: 0 },
        { rotate: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=0.4"
      );

      // FIX: Use tl.set() instead of gsap.set() so these initial states
      // are part of the timeline and get reset when ScrollTrigger rewinds.
      // With gsap.set(), the strokeDashoffset stays at 0 after the first
      // play, so subsequent replays have nothing to animate.
      if (arrowPathRef.current) {
        const length = arrowPathRef.current.getTotalLength();
        tl.set(arrowPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          arrowPathRef.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
          "-=1"
        );
      }

      if (arrowImageRef.current) {
        tl.set(arrowImageRef.current, {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
        tl.to(
          arrowImageRef.current,
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { radius, arrowX, arrowY, svgSize } = computeResponsiveValues(windowWidth);
  const cx = svgSize / 2;

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-full overflow-hidden py-12"
    >
      <style>{`
        .height {
          height: 500px;
        }
        @media (max-width: 639px) {
          .height {
            height: 400px;
          }
        }
      `}</style>

      <div className="height relative flex items-center justify-center pr-8 w-[500px]">

        {/* Profile */}
        <div
          ref={profileRef}
          className="relative z-30 w-[70%] md:w-[70%] rounded-full border-8 border-white dark:border-slate-700 shadow-2xl overflow-hidden bg-white dark:bg-slate-800"
        >
          <img
            src="/GreeseGilbertVijay.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="absolute inset-0 flex items-center pr-8 justify-center z-10"
        >
          {/* SVG Arrow */}
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="absolute z-0 pointer-events-none"
          >
            <path
              ref={arrowPathRef}
              d={`M ${cx} ${svgSize * 0.05} A ${radius} ${radius} 0 0 1 ${cx} ${svgSize * 0.95}`}
              stroke="#FDDA0D"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity={0.4}
            />
            <image
              ref={arrowImageRef}
              href="/favicon.png"
              x={arrowX}
              y={arrowY}
              width={25}
              height={25}
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>

          {/* Icons */}
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className="absolute group z-20"
              style={getIconStyles(index, navItems.length, windowWidth)}
              onClick={() => scrollToSection(item.hash)}
            >
              <div className="
                w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12
                bg-white dark:bg-slate-700 rounded-full border border-slate-100 dark:border-slate-600 shadow-lg
                flex items-center justify-center text-slate-600 dark:text-slate-200
                transition-all duration-300
                group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110
                cursor-pointer
              ">
                {item.icon}
              </div>

              <span className="
                absolute top-1/2 -translate-y-1/2
                left-full ml-2
                px-2 py-1 bg-slate-800 dark:bg-slate-600 text-white text-[10px]
                rounded opacity-0 group-hover:opacity-100
                transition-all whitespace-nowrap pointer-events-none z-50
              ">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hright;