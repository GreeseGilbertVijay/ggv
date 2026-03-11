"use client";

import { useState, useRef, useEffect } from "react";

type Card = { title: string; tag: string; color: string; image: string };

const TAG_CONFIG: Record<string, { label: string; color: string }> = {
  "Wordpress":   { label: "Wordpresss",     color: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-300" },
  "Shopify":     { label: "Shopify",        color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-400 dark:border-emerald-500/30 dark:bg-emerald-500/10" },
  "App":         { label: "Applications",   color: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400" },
  "React & Next":{ label: "React & Next",   color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
};

const ALL_CARDS: Card[] = [
  { title: "leaf'n Protein",  tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/cakesquare.png" },
  { title: "Samatva Awareness",    tag: "React & Next", color: TAG_CONFIG["App"].color,           
    image: "dist/projects/samatva.png" },
  { title: "CuttingEdge",    tag: "App", color: TAG_CONFIG["App"].color,           
    image: "dist/projects/cuttingedge.jpeg" },
  { title: "NextVant",    tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,  
    image: "dist/projects/nextvant.png" },
  { title: "Velonae",    tag: "Shopify", color: TAG_CONFIG["Shopify"].color,  
    image: "dist/projects/velonae.png" },
  { title: "Zippyy",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/zippyy.png" },
  { title: "adesignz",    tag: "Wordpress",  color: TAG_CONFIG["Wordpress"].color,           
    image: "dist/projects/adesignz.png" },
  { title: "Pranavam",    tag: "Wordpress",  color: TAG_CONFIG["Wordpress"].color,           
    image: "dist/projects/pranavam.png" },
  { title: "CLOUD NINE COTTAGES",    tag: "Wordpress",  color: TAG_CONFIG["Wordpress"].color,           
    image: "dist/projects/cloudninecottages.png" },
  { title: "RENOVAR LABS",    tag: "Wordpress",  color: TAG_CONFIG["Wordpress"].color,           
    image: "dist/projects/renovarlabs.png" },
  { title: "AVIAWIZ",    tag: "Wordpress", color: TAG_CONFIG["React & Next"].color,  
    image: "dist/projects/aviawiz.png" },
  { title: "Cakesquare Chennai",  tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/cakesquare.png" },
  { title: "MagikStar",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/magikstar.png" },
  { title: "A1 Loans",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/a1loans.png" },
  { title: "OneSight",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/onesight.png" },
  { title: "Pranavam",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/pranavam.png" },
  { title: "Pravda",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/pravda.png" },
  { title: "Renovar Labs",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/renovarlabs.png" },
  { title: "Sonali Raman",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/sonaliraman.png" },
  { title: "Sparsa Resorts",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/sparsa.png" },
  { title: "TaxKey",      tag: "Wordpress", color: TAG_CONFIG["Wordpress"].color,      
    image: "dist/projects/taxkey.png" },
  { title: "MatchMyFit",    tag: "App", color: TAG_CONFIG["App"].color,           
    image: "dist/projects/matchmyfit.jpeg" },
  { title: "Soiltec",    tag: "App", color: TAG_CONFIG["App"].color,           
    image: "dist/projects/soiltec.jpeg" },
    { title: "Wonchance",    tag: "Wordpress",  color: TAG_CONFIG["Wordpress"].color,           
    image: "dist/projects/wonchance.png" },
];

// Derive tabs dynamically from tags
const TABS = [
  { id: "all", label: "All", count: ALL_CARDS.length },
  ...Object.entries(TAG_CONFIG).map(([tag, cfg]) => ({
    id: tag,
    label: cfg.label,
    count: ALL_CARDS.filter((c) => c.tag === tag).length,
  })),
];

const PAGE_SIZE = 9;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function PreviewImage({ src, alt, isMobile }: { src: string; alt: string; isMobile: boolean }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [imgHeight, setImgHeight] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posRef = useRef(0);
  const dirRef = useRef<"down" | "up">("down");
  const CONTAINER_H = 144;
  const SPEED = 0.4;

  const handleImgLoad = () => {
    if (imgRef.current)
      setImgHeight(imgRef.current.naturalHeight * (imgRef.current.offsetWidth / imgRef.current.naturalWidth));
  };

  const maxScroll = Math.max(0, imgHeight - CONTAINER_H);

  useEffect(() => {
    if (!isMobile) return;
    const tick = () => {
      if (dirRef.current === "down") {
        posRef.current += SPEED;
        if (posRef.current >= maxScroll) { posRef.current = maxScroll; dirRef.current = "up"; }
      } else {
        posRef.current -= SPEED;
        if (posRef.current <= 0) { posRef.current = 0; dirRef.current = "down"; }
      }
      if (imgRef.current) imgRef.current.style.transform = `translateY(-${posRef.current}px)`;
    };
    intervalRef.current = setInterval(tick, 16);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isMobile, maxScroll]);

  return (
    <div
      className="w-full rounded-lg mb-5 border border-gray-200 dark:border-white/[0.06] overflow-hidden"
      style={{ height: CONTAINER_H }}
      onMouseEnter={() => { if (!isMobile) setIsScrolling(true); }}
      onMouseLeave={() => { if (!isMobile) setIsScrolling(false); }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleImgLoad}
        className="w-full object-cover object-top"
        style={{
          display: "block",
          transition: isMobile ? "none" : isScrolling ? "transform 3s cubic-bezier(0.25,0.46,0.45,0.94)" : "transform 0.6s ease",
          transform: !isMobile ? (isScrolling && maxScroll > 0 ? `translateY(-${maxScroll}px)` : "translateY(0px)") : undefined,
        }}
      />
    </div>
  );
}

// Glow color per tab id
const TAB_GLOW: Record<string, string> = {
  "all":         "rgba(139,92,246,0.35)",
  "Wordpress":   "rgba(139,92,246,0.35)",
  "App":         "rgba(56,189,248,0.35)",
  "Shopify":     "rgba(52,211,153,0.35)",
  "React & Next":"rgba(52,211,153,0.35)",
};

export default function Tabs() {
  const [active, setActive] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isMobile = useIsMobile();

  // Filter cards based on active tab
  const filtered = active === "all" ? ALL_CARDS : ALL_CARDS.filter((c) => c.tag === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  const handleTabChange = (id: string) => {
    setActive(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div>
      {/* Tab Bar */}
      <div className="mb-10 text-gray-700 dark:text-gray-300">
        <div className="relative overflow-x-auto pb-px">
          <div className="relative flex gap-1 border-b border-gray-200 dark:border-white/[0.06] min-w-max sm:min-w-0">
            <span
              className="absolute bottom-0 h-[2px] bg-gradient-to-r from-violet-400 to-sky-400 rounded-full transition-all duration-300 ease-in-out"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium
                    transition-colors duration-200 whitespace-nowrap rounded-t-sm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer
                    ${isActive ? "text-gray-900 dark:text-white" : "text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
                >
                  {tab.label}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5
                    rounded-full text-[10px] font-semibold border transition-colors duration-200
                    ${isActive
                      ? "bg-violet-500/20 text-violet-600 border-violet-500/30 dark:text-violet-300"
                      : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-white/5 dark:text-zinc-500 dark:border-white/10"}`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div>
        <div key={active} className="grid xl:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {visible.map((card, i) => {
            const glowColor = TAB_GLOW[card.tag] ?? "rgba(139,92,246,0.3)";
            return (
              <div
                key={`${active}-${i}`}
                className="group relative rounded-xl border cursor-pointer
                  border-gray-200 bg-gray-50
                  dark:border-white/[0.07] dark:bg-white/[0.03]
                  p-4 sm:p-6
                  hover:border-gray-300 hover:bg-white
                  dark:hover:border-white/[0.14] dark:hover:bg-white/[0.06]
                  transition-all duration-300 card-glow-box"
                style={{
                  /* CSS custom property for the glow color so the stylesheet can use it */
                  ["--glow-color" as string]: glowColor,
                }}
              >
                {/* Radial top glow overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
                />
                <PreviewImage src={card.image} alt={card.title} isMobile={isMobile} />
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium border mb-2 sm:mb-3 ${card.color}`}>
                  {card.tag}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-900 dark:text-zinc-100 dark:group-hover:text-white transition-colors leading-tight">
                  {card.title}
                </h3>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
                border border-gray-200 dark:border-white/[0.1]
                bg-white dark:bg-white/[0.03] text-gray-600 dark:text-zinc-400
                hover:border-violet-400/50 hover:text-violet-600 dark:hover:text-violet-300
                dark:hover:border-violet-500/40 hover:bg-violet-50/50 dark:hover:bg-violet-500/5
                transition-all duration-200 cursor-pointer"
            >
              Show more
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease both; }

        /* Card border glow on hover */
        .card-glow-box {
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .card-glow-box:hover {
          box-shadow:
            0 0 0 1px var(--glow-color),
            0 0 16px 2px var(--glow-color),
            0 4px 24px 0 rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}
