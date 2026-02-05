import React, { useEffect, useRef } from "react";
import AboutLeft from "../components/AboutLeft";
import AboutRight from "../components/AboutRight";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const About: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!headingRef.current) return;
  
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });
  
    const cursorTl = gsap.timeline({ repeat: -1 });
  
    gsap.set("#about-line-image", { scale: 0.6 });
    gsap.set("#scramble-text-1", { opacity: 1 });
  
    cursorTl
      .to("#scramble-cursor", { opacity: 0, duration: 0.5 })
      .to("#scramble-cursor", { opacity: 1, duration: 0.5 });
  
    tl
      // 1️⃣ Animate line width
      .to("#about-line", {
        width: 50,
        duration: 0.8,
      })
  
      // 2️⃣ Show image at line end
      .to(
        "#about-line-image",
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        },
        "-=0.2"
      )
  
      // 3️⃣ Scramble text
      .to("#scramble-text-1", {
        scrambleText: {
          text: t("about.aboutme"),
          chars: "upperCase",
          speed: 0.3,
        },
        duration: 1.8,
      })
  
      // 4️⃣ Start cursor blinking
      .add(cursorTl);
  
    return () => {
      tl.kill();
      cursorTl.kill();
    };
  }, [t]);
  

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Heading */}
        <section className="grid lg:grid-cols-2">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-6xl font-black text-black dark:text-amber-400 flex items-center gap-0"
        >
          {/* Left animated line */}
          <span
            id="about-line"
            className="block h-[3px] bg-[#ffb931] dark:bg-amber-400 w-0"
          />
        
          {/* Image at line end */}
          <img
            id="about-line-image"
            src="/favicon.png" // change path as needed
            alt="About icon"
            className="w-5 h-5 opacity-0 mr-4"
          />
        
          {/* Scramble text */}
          <span id="scramble-text-1"></span>
        
          {/* Cursor */}
          <span
            id="scramble-cursor"
            className="inline-block w-[2px] h-[1em] bg-black dark:bg-yellow-500"
          />
        </h2>

        </section>
        <p className="mt-12 text-slate-600 text-base dark:text-slate-300">
          {t("about.description")}
        </p>


        <section className="w-full grid mt-12 p-[3%] gap-12 md:grid-cols-1 lg:grid-cols-[35%_55%]">
          <section>
            <AboutLeft />
          </section>
        
          <section>
            <AboutRight />
          </section>
        </section>

      </div>
    </div>
  );
};

export default About;
