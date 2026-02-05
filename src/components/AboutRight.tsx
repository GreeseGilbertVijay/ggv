import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

type CounterItem = {
  value: number;
  label: string;
};

const counters: CounterItem[] = [
  { value: 3, label: "Years Experience" },
  { value: 50, label: "Projects" },
  { value: 30, label: "Static Websites" },
  { value: 5, label: "Woocommerce Websites" },
  { value: 3, label: "Applications" },
  { value: 4, label: "React / Next Projects" },
];

const AboutRight: React.FC = () => {
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const splitRef = useRef<SplitType | null>(null);
  const { t } = useLanguage();

  
  useEffect(() => {
    numberRefs.current.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: counters[index].value,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: function () {
            el.innerHTML = Math.ceil(Number(el.textContent)) + "+";
          },
        }
      );
    });
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
    <div className="w-full">
      <style>
      {`
        .responsive-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 3rem;
        }

        @media (min-width: 768px) {
          .responsive-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}
    </style>
      <h3 ref={headingRef} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">
      {t("about.Works")}
      </h3>

      {/* Counters Grid */}
      <div className="mt-12 gap-4 responsive-grid">

        {counters.map((item, index) => (
          <div
            key={index}
            className="flex justify-center"
          >
            <div
              className="w-40 h-40 rounded-full  dark:bg-white bg-black text-[#ffb931]
                         flex flex-col items-center justify-center
                         text-center"
            >
              <span
                ref={(el) => {
                  if (el) numberRefs.current[index] = el;
                }}
                className="text-4xl font-bold leading-none"
              >
                0
              </span>
              <span className="text-base mt-2 px-3 dark:text-black text-gray-300">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutRight;
