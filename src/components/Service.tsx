import React, { useEffect, useRef } from "react";
import { Globe, ShoppingCart, Atom, Layers, PenTool, FileText } from "lucide-react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Static Websites",
    description:
      "The website designed to represent a company or organization, providing information about products, services, locations and contact details.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Online stores where products or services are sold directly to consumers with detailed descriptions, images, prices, and specifications.",
  },
  {
    icon: Atom,
    title: "React Js",
    description:
      "Work with React.js emphasizes a clean and maintainable codebase, reusable components and styles, resulting in highly performant and user-friendly applications.",
  },
  {
    icon: Layers,
    title: "Next Js",
    description:
      "Built dynamic, responsive applications focused on performance and user experience using server-side rendering and optimized static generation.",
  },
  {
    icon: PenTool,
    title: "UI / UX Development",
    description:
      "UI/UX design that works seamlessly on mobile devices, creating a user-friendly experience that looks great and functions smoothly across all screen sizes.",
  },
  {
    icon: FileText,
    title: "Blogs / Landing Pages",
    description:
      "Individual websites to share personal information, blogs, hobbies, portfolios and contact details.",
  },
];

const Service: React.FC = () => {
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headings
      headingRefs.current.forEach((el) => {
        if (!el) return;
        const split = new SplitType(el, { types: "words", wordClass: "word" });

        gsap.fromTo(
          split.words,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // Animate paragraphs
      paragraphRefs.current.forEach((el) => {
        if (!el) return;
        const split = new SplitType(el, { types: "words", wordClass: "word" });

        gsap.fromTo(
          split.words,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // Animate border line on hover using GSAP
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const line = card.querySelector<HTMLElement>(".hover-line");
        if (!line) return;

        // Set initial state — line starts at bottom, 0 height
        gsap.set(line, { height: 0, bottom: 0, top: "auto" });

        const enterAnim = gsap.to(line, {
          height: "80%",
          duration: 0.6,
          ease: "power2.out",
          paused: true,
        });

        const leaveAnim = gsap.to(line, {
          height: 0,
          duration: 0.4,
          ease: "power2.in",
          paused: true,
        });

        card.addEventListener("mouseenter", () => {
          leaveAnim.pause();
          enterAnim.restart();
        });

        card.addEventListener("mouseleave", () => {
          enterAnim.pause();
          leaveAnim.restart();
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Glassmorphism card ── */
        .glass-card {
          /* Light mode glass */
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        /* Dark mode glass */
        .dark .glass-card {
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow:
            0 4px 32px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* ── Hover left border line ── */
        .hover-line {
          position: absolute;
          left: -1px;        /* sits flush on the card's left border */
          bottom: 0;
          width: 2px;
          height: 0;
          background: #ffb931;
          border-radius: 2px;
          pointer-events: none;
        }

        /* Slight glow on the accent line */
        .glass-card:hover .hover-line {
          box-shadow: 0 0 8px rgba(255, 185, 49, 0.6);
        }

        /* Card lift on hover */
        .glass-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-4px);
        }
        .dark .glass-card:hover {
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
        }
        .glass-card:hover {
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
      `}</style>

      <section className="w-full mt-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                  className="glass-card relative rounded-2xl p-6 overflow-hidden"
                >
                  {/* Animated left border line */}
                  <div className="hover-line" />

                  <Icon className="w-8 h-8 text-[#ffb931] mb-4" />

                  <h4
                    ref={(el) => {
                      if (el) headingRefs.current[index] = el;
                    }}
                    className="text-lg font-bold mb-2 text-gray-900 dark:text-white"
                  >
                    {service.title}
                  </h4>

                  <p
                    ref={(el) => {
                      if (el) paragraphRefs.current[index] = el;
                    }}
                    className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;