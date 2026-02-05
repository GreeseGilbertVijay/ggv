import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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
  { id: 1, src: "/Logos/1.png" },
  { id: 2, src: "/Logos/2.png" },
  { id: 3, src: "/Logos/3.png" },
  { id: 4, src: "/Logos/4.png" },
  { id: 5, src: "/Logos/5.png" },
  { id: 6, src: "/Logos/6.png" },
  { id: 7, src: "/Logos/7.png" },
  { id: 8, src: "/Logos/8.png" },
  { id: 9, src: "/Logos/9.png" },
  { id: 10, src: "/Logos/10.png" },
  { id: 11, src: "/Logos/11.png" },
  { id: 12, src: "/Logos/12.png" },
  { id: 13, src: "/Logos/13.png" },
  { id: 14, src: "/Logos/14.png" },
  { id: 15, src: "/Logos/15.png" },
  { id: 16, src: "/Logos/16.png" },
  { id: 17, src: "/Logos/17.png" },
  { id: 18, src: "/Logos/18.png" },
];

const sliderOne = logos.slice(0, 9);
const sliderTwo = logos.slice(9);

/* ----------------------------------
   Component
----------------------------------- */
const PartnersLogoSlider: React.FC = () => {
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);

  const tween1 = useRef<gsap.core.Tween | null>(null);
  const tween2 = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const slider1 = slider1Ref.current!;
    const slider2 = slider2Ref.current!;

    const width1 = slider1.scrollWidth / 2;
    const width2 = slider2.scrollWidth / 2;

    tween1.current = gsap.fromTo(
      slider1,
      { x: 0 },
      {
        x: -width1,
        duration: 20,
        ease: "linear",
        repeat: -1,
      }
    );

    tween2.current = gsap.fromTo(
      slider2,
      { x: -width2 },
      {
        x: 0,
        duration: 10,
        ease: "linear",
        repeat: -1,
      }
    );

    return () => {
      tween1.current?.kill();
      tween2.current?.kill();
    };
  }, []);

  return (
    <main className="w-full bg-white/50 dark:bg-slate-900 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Trusted Partners
        </h2>
        <p className="text-gray-500 mt-3">
          Companies that trust and work with us
        </p>
      </div>

      {/* Slider 1 */}
      <div
        className="overflow-hidden mb-12"
        onMouseEnter={() => tween1.current?.pause()}
        onMouseLeave={() => tween1.current?.resume()}
      >
        <div
          ref={slider1Ref}
          className="flex w-max gap-16 items-center"
        >
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

      {/* Slider 2 */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => tween2.current?.pause()}
        onMouseLeave={() => tween2.current?.resume()}
      >
        <div
          ref={slider2Ref}
          className="flex w-max gap-16 items-center"
        >
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

export default PartnersLogoSlider;
