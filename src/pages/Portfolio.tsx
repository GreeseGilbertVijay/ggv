import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import PortfolioTabs from "../components/PortfolioTabs";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const Portfolio: React.FC = () => {
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
  
    gsap.set("#golden-retriever", { scale: 0.6 });
    gsap.set("#persian-cat", { opacity: 1 });
  
    cursorTl
      .to("#hamster", { opacity: 0, duration: 0.5 })
      .to("#hamster", { opacity: 1, duration: 0.5 });
  
    tl
      .to("#beagle", {
        width: 50,
        duration: 0.8,
      })
  
      .to(
        "#golden-retriever",
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        },
        "-=0.2"
      )
  
      .to("#persian-cat", {
        scrambleText: {
          text: t("portfolio.title"),
          chars: "upperCase",
          speed: 0.3,
        },
        duration: 1.8,
      })
  
      .add(cursorTl);
  
    return () => {
      tl.kill();
      cursorTl.kill();
    };
  }, [t]);
  

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 pb-24 sm:pt-2 lg:pt-24">
        <section className="">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-6xl font-black text-black dark:text-amber-400 inline-flex items-center gap-0 w-fit"
        >
          <span
            id="beagle"
            className="block h-[3px] bg-[#ffb931] dark:bg-amber-400 w-0"
          />
        
          <img
            id="golden-retriever"
            src="public/favicon.png"
            alt="About icon"
            className="w-5 h-5 opacity-0 mr-4"
          />
        
          <span id="persian-cat"></span>
        
          <span
            id="hamster"
            className="inline-block w-[2px] h-[1em] bg-black dark:bg-yellow-500"
          />
        </h2>
        </section>
        <section className="p-[3%]">
        <PortfolioTabs/>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;