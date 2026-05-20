import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import Service from "../components/Service";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });

      const cursorTl = gsap.timeline({ repeat: -1 });

      gsap.set(".services-line-image", { scale: 0.6 });
      gsap.set(".services-text", { opacity: 1 });

      cursorTl
        .to(".services-cursor", { opacity: 0, duration: 0.5 })
        .to(".services-cursor", { opacity: 1, duration: 0.5 });

      tl
        .to(".services-line", {
          width: 50,
          duration: 0.8,
        })
        .to(
          ".services-line-image",
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
          },
          "-=0.2"
        )
        .to(".services-text", {
          scrambleText: {
            text: t("services.services"),
            chars: "upperCase",
            speed: 0.3,
          },
          duration: 1.8,
        })
        .add(cursorTl);

    }, sectionRef); // 🔥 Scoped ONLY to this component

    return () => ctx.revert(); // 🔥 Kills all GSAP & ScrollTriggers safely
  }, [t]);

  return (
    <div
      ref={sectionRef}
      className="bg-white dark:bg-slate-900 text-black dark:text-white transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 pb-12 pt-12">
        <section className="grid lg:grid-cols-2">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-6xl font-black text-black dark:text-amber-400 flex items-center gap-0"
          >
            {/* Animated line */}
            <span className="services-line block h-[3px] bg-[#ffb931] dark:bg-amber-400 w-0" />

            {/* Icon */}
            <img
              src="/favicon.png"
              alt="services icon"
              className="services-line-image w-5 h-5 opacity-0 mr-4"
            />

            {/* Scramble text */}
            <span className="services-text"></span>

            {/* Cursor */}
            <span className="services-cursor inline-block w-[2px] h-[1em] bg-black dark:bg-yellow-500" />
          </h2>
        </section>
        <Service />
      </div>
    </div>
  );
};

export default Services;
