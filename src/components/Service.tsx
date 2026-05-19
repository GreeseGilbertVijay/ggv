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
    title: "Blog / Landing Pages",
    description:
      "Individual websites to share personal information, blogs, hobbies, portfolios and contact details.",
  },
];

const Service: React.FC = () => {
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full mt-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900
                           border border-gray-200 dark:border-slate-700
                           rounded-2xl p-6
                           hover:shadow-lg transition"
              >
                <Icon className="w-8 h-8 text-[#ffb931] mb-4" />

                <h4
                  ref={(el) => {
                    if (el) headingRefs.current[index] = el;
                  }}
                  className="text-lg font-bold mb-2"
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
  );
};

export default Service;
