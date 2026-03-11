import React from "react";
import Hleft from "../components/Hleft";
import Hright from "../components/Hright";

const Portfolio: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white border-t border-gray-200 dark:border-slate-700 transition-colors">
    <div className="min-h-[80vh] max-w-7xl mx-auto pt-4">
      <section className="w-full grid md:grid-cols-1 lg:grid-cols-2 p-[3%]">
        <Hleft />
        <Hright />
      </section>
      </div>
    </div>
  );
};

export default Portfolio;
