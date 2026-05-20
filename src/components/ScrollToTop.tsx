import React, { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? scrollTop / docHeight : 0;

    setProgress(pct);
    setVisible(scrollTop > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-6 z-50
        w-12 h-12
        flex items-center justify-center
        rounded-full
        transition-all duration-500 ease-out
        bg-white dark:bg-slate-800
        text-slate-800 dark:text-amber-400
        shadow-md dark:shadow-slate-900/60
        hover:scale-110
        cursor-pointer
        focus:outline-none
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        {/* Track ring */}
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        {/* Progress ring */}
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.1s linear" }}
          className="stroke-amber-400 dark:stroke-amber-400"
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp size={18} strokeWidth={2.5} className="relative z-10" />
    </button>
  );
};

export default ScrollToTop;
