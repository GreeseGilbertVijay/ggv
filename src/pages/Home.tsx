import React from "react";
import Hleft from "../components/Hleft";
import Hright from "../components/Hright";
import { useTheme } from "../context/ThemeContext";

const Portfolio: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="relative text-black dark:text-white border-t border-gray-200 dark:border-slate-700 transition-colors bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          theme === "dark"
            ? `url('${import.meta.env.BASE_URL}ggv-portfolio-bg-black.jpg')`
            : `url('${import.meta.env.BASE_URL}ggv-portfolio-bg-white.jpg')`,
      }}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-black/60"
            : "bg-white/60"
        }`}
      />

      <div className="relative z-10 min-h-[80vh] max-w-7xl mx-auto pt-4">
        <section className="w-full grid md:grid-cols-1 lg:grid-cols-2 p-[3%]">
          <Hleft />
          <Hright />
        </section>
      </div>
    </div>
  );
};

export default Portfolio;