import React from "react";
import Pleft from "../components/Pleft";
import Pright from "../components/Pright";

const Portfolio: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white border-t border-gray-200 dark:border-slate-700 transition-colors">
    <div className="min-h-screen max-w-7xl mx-auto pt-4">
      <section className="w-full grid md:grid-cols-1 lg:grid-cols-2 p-[3%]">
        <Pleft />
        <Pright />
      </section>
      </div>
    </div>
  );
};

export default Portfolio;
