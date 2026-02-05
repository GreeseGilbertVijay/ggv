import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLanguage } from "../context/LanguageContext";


gsap.registerPlugin(ScrollTrigger);

const AboutLeft: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const splitRef = useRef<SplitType | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Image animation
    gsap.fromTo(
      cardsRef.current.map(card => card.querySelector("img")),
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);
  
  useEffect(() => {
    if (!headingRef.current) return;

    // Split the heading into words
    splitRef.current = new SplitType(headingRef.current, {
      types: "words",
      wordClass: "word",
    });

    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 80%", // when heading is near top of viewport
      onEnter: () => {
        if (!splitRef.current) return;

        // Reset words to scale 0 before animation
        gsap.set(splitRef.current.words, { scale: 0 });

        // Animate words scaling up
        gsap.to(splitRef.current.words, {
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
      },
      onEnterBack: () => {
        // Trigger animation again when scrolling back up
        if (!splitRef.current) return;
        gsap.set(splitRef.current.words, { scale: 0 });
        gsap.to(splitRef.current.words, {
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        });
      },
    });

    // Cleanup
    return () => {
      trigger.kill();
      splitRef.current?.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full"
    >
      <h3 ref={headingRef} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">
      {t("about.Whatido")}
      </h3>

      {/* Card 1 */}
      <div
          ref={(el) => {
            if (el) cardsRef.current[0] = el;
          }}
        className="flex mt-12 items-center gap-6"
      >
        <div className="w-[30%]">
          <img src="wordpress.png" alt="WordPress" className="w-full rounded-full" />
        </div>
        <div className="w-[60%]">
          <h2 className="text-xl font-semibold uppercase">WordPress</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Custom themes, plugins, performance optimization and SEO-friendly builds.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div
          ref={(el) => {
            if (el) cardsRef.current[1] = el;
          }}
        
        className="flex mt-8 items-center gap-6"
      >
        <div className="w-[30%]">
          <img src="React.png" alt="React" className="w-full rounded-full" />
        </div>
        <div className="w-[60%]">
          <h2 className="text-xl font-semibold uppercase">React + Vite</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Fast SPAs with clean architecture and smooth UI/UX.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div
         ref={(el) => {
          if (el) cardsRef.current[2] = el;
        }}
        className="flex mt-8 items-center gap-6"
      >
        <div className="w-[30%]">
          <img src="Next.png" alt="Next.js" className="w-full rounded-full" />
        </div>
        <div className="w-[60%]">
          <h2 className="text-xl font-semibold uppercase">Next.js</h2>
          <p className="text-gray-500 dark:text-gray-300">
            SEO-optimized, scalable apps with server rendering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutLeft;
