import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/AnimatedText.css";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Home: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const { theme } = useTheme();
  const { t, tArray } = useLanguage();
  const strokeColor = theme === "dark" ? "#f1f5f9" : "#1e293b";
  const roles = tArray("home.roles");

  useEffect(() => {
    const animateRole = () => {
      if (!textContainerRef.current) return;

      // Split text into spans
      const text = roles[currentRole];
      textContainerRef.current.innerHTML = ""; // Clear previous
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // non-breaking space for space
        span.style.display = "inline-block";
        span.style.color = "transparent";
        span.style.webkitTextStroke = `1px ${strokeColor}`;
        span.style.textShadow = "0px 0px 0px #000";
        textContainerRef.current!.appendChild(span);
      });
      

      const letters = textContainerRef.current.querySelectorAll("span");

      // Animate each letter
      gsap.fromTo(
        letters,
        { opacity: 0, y: 50},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            // After a short delay, fade out the whole text
            gsap.to(letters, {
              opacity: 0,
              y: -20,
              duration: 0.8,
              ease: "power1.in",
              delay: 1,
              onComplete: () => {
                setCurrentRole((prev) => (prev + 1) % roles.length);
              },
            });
          },
        }
      );
    };

    animateRole();
  }, [currentRole, strokeColor]);

  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <h3 className="text-xl lg:text-3xl md:text-4xl text-[#ffb931] dark:text-amber-400 font-black">
          {t("home.hiThere")}
        </h3>
        <hr className="w-[15%] h-[5px] bg-[#ffb931] dark:bg-amber-400 border-0 mt-1 ml-[-12px]" />
        <h1>
          <span className="uppercase flex flex-col sm:flex-row items-start sm:items-center gap-2 leading-tight mt-4">
            <span className="text-xl sm:text-2xl font-bold text-[#ffb931] dark:text-amber-400">
              {t("home.im")}
            </span>
            <span className="text-2xl sm:text-5xl font-bold leading-normal text-transparent animate-textFill">
              {t("home.name")}
            </span>
          </span>
        </h1>

        <div ref={textContainerRef} className="text-2xl lg:text-4xl md:text-3xl font-bold text-slate-800 dark:text-slate-100"></div>
        <h4 className="p-2 mt-4 block bg-black dark:bg-slate-700 text-[#ffb931] dark:text-amber-400 font-bold rounded-sm">
          {t("home.ready")}
        </h4>
        <p className="mt-12 text-base text-slate-600 dark:text-slate-300">
          {t("home.description")}
        </p>

        <button className="group cursor-pointer mt-6 relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-gradient-to-r from-[#ffb931] to-[#f3d074] dark:from-amber-500 dark:to-amber-400 py-1 pl-6 pr-14 font-medium text-black hover:text-white overflow-hidden transition-colors">
          <span className="z-10 pr-2">{t("home.moreAboutMe")}</span>
          <div className="absolute right-1 h-12 w-12 rounded-full bg-yellow-800 dark:bg-amber-600 transition-all duration-500 ease-out group-hover:w-[calc(100%-8px)]" />
          <div className="absolute right-4 z-10 flex h-12 items-center">
            <ArrowRight className="h-5 w-5 text-neutral-50 transition-transform duration-300 ease-in-out group-hover:-rotate-45" />
          </div>
        </button>
      </div>
    </>
  );
};

export default Home;
