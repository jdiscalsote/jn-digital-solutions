import { useState } from "react";
import { FolderGit2, ArrowUpRight, Box, Smartphone, Server, ShoppingCart, Info } from "lucide-react";
import { PROJECTS } from "../data";
import { motion, AnimatePresence } from "motion/react";

const catIcons = {
  all: FolderGit2,
  web: Server,
  enterprise: Box,
  mobile: Smartphone,
  pos: ShoppingCart,
};

export default function Portfolio() {
  const [filter, setFilter] = useState<"all" | "web" | "enterprise" | "mobile" | "pos">("all");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const categories = [
    { label: "All Works", value: "all" },
    { label: "Enterprise Systems", value: "enterprise" },
    { label: "Web Apps & Blazor", value: "web" },
    { label: "Mobile Apps & Flutter", value: "mobile" },
    { label: "POS & Inventory", value: "pos" },
  ] as const;

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === "all") return true;
    return proj.category === filter;
  });

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portfolio Title section */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
            Case Studies
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Enterprise Application Portfolio
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal">
            A comprehensive look at complex, live-operational software systems delivering custom automations, data-driven diagnostics, and multi-platform experiences.
          </p>
        </div>

        {/* Filter selection controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 pb-12 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const Icon = catIcons[cat.value];
            return (
              <button
                key={cat.value}
                id={`cat-filter-${cat.value}`}
                onClick={() => setFilter(cat.value)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
                  filter === cat.value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 p-6 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-400/30 transition-all cursor-pointer"
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                
                {/* Tech Badges on Header */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400">
                      {project.category} Module
                    </span>
                    <button
                      id={`info-btn-${project.id}`}
                      className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                      aria-label="Toggle details view"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Sub Features Details overlay / bottom info area */}
                <div>
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6 border-t border-slate-200/60 dark:border-slate-700/60 pt-4"
                      >
                        <span className="text-[10px] font-bold font-mono text-slate-400 block mb-2 uppercase">
                          System Features:
                        </span>
                        <ul className="space-y-1.5 mb-2">
                          {project.features.map((feat) => (
                            <li key={feat} className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 block shrink-0" />
                              <span className="font-semibold">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Technology Tags container */}
                  <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium px-2 py-1 rounded-md bg-slate-200/60 dark:bg-slate-900 border border-slate-200/20 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dynamic arrow details on bottom */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-5 w-5 text-blue-500" />
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
