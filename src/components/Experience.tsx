import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "../data";
import { motion } from "motion/react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-950 bg-mesh-pattern border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Header */}
        <div className="text-center max-w-3xl mx-auto pb-20">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
            Career Chronicle
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Professional Experience
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal">
            Proven track record of designing, deploying, and supporting enterprise applications across premier high-rise property developers, multinational consultancies, and construction conglomerates.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central backbone timeline string */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2" />

          {/* Timeline Cards loop */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  id={`experience-item-${exp.id}`}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Node Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 transform -translate-x-1/2 top-6 z-15 shadow" />

                  {/* Spacer or Left padding content block */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Card Block */}
                  <div className="w-full md:w-1/2 px-4 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-blue-500/20 transition-all"
                    >
                      {/* Period Badge */}
                      <div className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-mono text-[10px] sm:text-xs font-bold uppercase mb-3 px-2.5 py-1 rounded-md bg-blue-500/5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Role & Company Header */}
                      <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 mb-4 flex items-center space-x-1.5">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <span>{exp.company}</span>
                      </p>

                      {/* Performance Highlights Bullets block */}
                      <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        <span className="text-[9px] font-bold font-mono text-slate-400 block uppercase mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-2">
                          {exp.highlights.map((hlt) => (
                            <li key={hlt} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span className="font-semibold leading-relaxed">{hlt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
