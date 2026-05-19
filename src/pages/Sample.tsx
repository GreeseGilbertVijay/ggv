import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeadersSection: React.FC = () => {
  const headersRef = useRef<HTMLHeadingElement[]>([]);

  // Function to add refs dynamically
  const addToRefs = (el: HTMLHeadingElement) => {
    if (el && !headersRef.current.includes(el)) {
      headersRef.current.push(el);
    }
  };

  useEffect(() => {
    headersRef.current.forEach((heading, index) => {
      if (!heading) return;

      const split = new SplitType(heading, {
        types: "lines,words,chars",
        lineClass: "line",
        wordClass: "word",
        charClass: "char",
      });

      // ScrollTrigger animation: replay when heading enters viewport
      ScrollTrigger.create({
        trigger: heading,
        start: "top 80%", // trigger when heading is near top
        onEnter: () => {
          switch (index) {
            case 0: // Fun Facts - chars fade in upward
            case 6: // Who Are You - same style
              gsap.fromTo(
                split.chars,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }
              );
              break;

            case 1: // Know More - words scale
            case 7: // DO That? - same style
              gsap.fromTo(
                split.words,
                { scale: 0 },
                { scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
              );
              break;

            case 2: // Hike All - lines slide from left
            case 8: // Why I'm - same style
              gsap.fromTo(
                split.lines,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power2.out" }
              );
              break;

            case 3: // Where Go - chars rotate
              gsap.fromTo(
                split.chars,
                { opacity: 0, rotation: -180, y: 20 },
                { opacity: 1, rotation: 0, y: 0, duration: 1, stagger: 0.05, ease: "elastic.out(1,0.5)" }
              );
              break;

            case 4: // i'M hERE - words bounce
              gsap.fromTo(
                split.words,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "bounce.out" }
              );
              break;

            case 5: // Hello Hi - lines slide right + bg animate
            case 9: // IM awesome - same
              gsap.fromTo(
                split.lines,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power2.out" }
              );
              gsap.to(heading, {
                backgroundColor: "#ff7f50",
                duration: 1,
                repeat: 1,
                yoyo: true,
                ease: "power1.inOut",
              });
              break;
          }
        },
        onLeaveBack: () => {
          // Optional: reset split elements so animation can replay
          split.revert();
        },
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Original headers */}
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Fun Facts</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Know More</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Hike All</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Where Go</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">i'M hERE</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Hello Hi</h3>

      {/* New headers */}
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Who Are You</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">DO That?</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">Why I'm</h3>
      <h3 ref={addToRefs} className="bg-[#ffb931] text-black font-black text-2xl inline px-8 py-1 rounded-xl">IM awesome</h3>
    </div>
  );
};

export default AnimatedHeadersSection;