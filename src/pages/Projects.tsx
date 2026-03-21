import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

/* ----------------------------------
   Types
----------------------------------- */
type Logo = {
  id: number;
  src: string;
};

/* ----------------------------------
   Logo Data
----------------------------------- */
const logos: Logo[] = [
  { id: 1, src: "dist/Logos/1.png" },
  { id: 2, src: "dist/Logos/2.png" },
  { id: 3, src: "dist/Logos/3.png" },
  { id: 4, src: "dist/Logos/4.png" },
  { id: 5, src: "dist/Logos/5.png" },
  { id: 6, src: "dist/Logos/6.png" },
  { id: 7, src: "dist/Logos/7.png" },
  { id: 8, src: "dist/Logos/8.png" },
  { id: 9, src: "dist/Logos/9.png" },
  { id: 10, src: "dist/Logos/10.png" },
  { id: 11, src: "dist/Logos/11.png" },
  { id: 12, src: "dist/Logos/12.png" },
  { id: 13, src: "dist/Logos/13.png" },
  { id: 14, src: "dist/Logos/14.png" },
  { id: 15, src: "dist/Logos/15.png" },
  { id: 16, src: "dist/Logos/16.png" },
  { id: 17, src: "dist/Logos/17.png" },
  { id: 18, src: "dist/Logos/18.png" },
  { id: 19, src: "dist/Logos/19.png" },
  { id: 20, src: "dist/Logos/20.png" },
];

const sliderOne = logos.slice(0, 10);
const sliderTwo = logos.slice(10);

/* ----------------------------------
   Component
----------------------------------- */
const Projects: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);

  const tween1 = useRef<gsap.core.Tween | null>(null);
  const tween2 = useRef<gsap.core.Tween | null>(null);

  const { t } = useLanguage();

  /* ── Scramble heading animation ── */
  useEffect(() => {
    if (!titleRef.current) return;

    const mainTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    const blinkTl = gsap.timeline({ repeat: -1 });

    gsap.set("#partners-accent-icon", { scale: 0.6 });
    gsap.set("#partners-scramble-label", { opacity: 1 });

    blinkTl
      .to("#partners-cursor-bar", { opacity: 0, duration: 0.5 })
      .to("#partners-cursor-bar", { opacity: 1, duration: 0.5 });

    mainTl
      .to("#partners-underline-bar", { width: 50, duration: 0.8 })
      .to(
        "#partners-accent-icon",
        { opacity: 1, scale: 1, duration: 0.4 },
        "-=0.2"
      )
      .to("#partners-scramble-label", {
        scrambleText: {
          text: t("projects.title"),
          chars: "upperCase",
          speed: 0.3,
        },
        duration: 1.8,
      })
      .add(blinkTl);

    return () => {
      mainTl.kill();
      blinkTl.kill();
    };
  }, [t]);

  /* ── Slider animations ── */
  useLayoutEffect(() => {
    const slider1 = slider1Ref.current!;
    const slider2 = slider2Ref.current!;

    const width1 = slider1.scrollWidth / 2;
    const width2 = slider2.scrollWidth / 2;

    tween1.current = gsap.fromTo(
      slider1,
      { x: 0 },
      { x: -width1, duration: 20, ease: "linear", repeat: -1 }
    );

    tween2.current = gsap.fromTo(
      slider2,
      { x: -width2 },
      { x: 0, duration: 10, ease: "linear", repeat: -1 }
    );

    return () => {
      tween1.current?.kill();
      tween2.current?.kill();
    };
  }, []);

  return (
    <main className="w-full bg-white/50 dark:bg-slate-900 py-20">

      {/* ── Heading ── */}
      <div className="text-center mb-14 flex flex-col items-center">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-6xl font-black text-black dark:text-amber-400 flex items-center justify-center gap-0"
        >
          {/* Animated underline bar */}
          <span
            id="partners-underline-bar"
            className="block h-[3px] bg-[#ffb931] dark:bg-amber-400 w-0"
          />

          {/* Accent icon */}
          <img
            id="partners-accent-icon"
            src="dist/favicon.png"
            alt="Partners icon"
            className="w-5 h-5 opacity-0 mr-4"
          />

          {/* Scramble text */}
          <span id="partners-scramble-label" />

          {/* Blinking cursor */}
          <span
            id="partners-cursor-bar"
            className="inline-block w-[2px] h-[1em] bg-black dark:bg-yellow-500"
          />
        </h2>

        <p className="text-gray-500 dark:text-slate-400 mt-8">
          {t("projects.subtitle")}
        </p>
      </div>

      {/* ── Slider 1 (left → right pause on hover) ── */}
      <div
        className="overflow-hidden mb-12"
        onMouseEnter={() => tween1.current?.pause()}
        onMouseLeave={() => tween1.current?.resume()}
      >
        <div ref={slider1Ref} className="flex w-max gap-16 items-center">
          {[...sliderOne, ...sliderOne].map((logo, index) => (
            <img
              key={`s1-${index}`}
              src={logo.src}
              alt={`Partner ${logo.id}`}
              className="h-16 w-auto object-contain hover:grayscale transition duration-300"
            />
          ))}
        </div>
      </div>

      {/* ── Slider 2 (right → left pause on hover) ── */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => tween2.current?.pause()}
        onMouseLeave={() => tween2.current?.resume()}
      >
        <div ref={slider2Ref} className="flex w-max gap-16 items-center">
          {[...sliderTwo, ...sliderTwo].map((logo, index) => (
            <img
              key={`s2-${index}`}
              src={logo.src}
              alt={`Partner ${logo.id}`}
              className="h-16 w-auto object-contain hover:grayscale transition duration-300"
            />
          ))}
        </div>
      </div>

    </main>
  );
};

export default Projects;