import { Award, Briefcase, ChevronRight, User, Cpu, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const skills = [
    { name: "ASP.NET Core", level: 95 },
    { name: "C#", level: 95 },
    { name: "Blazor", level: 90 },
    { name: "MudBlazor", level: 90 },
    { name: "Flutter", level: 85 },
    { name: "SQL Server", level: 92 },
    { name: "REST APIs", level: 95 },
    { name: "Bootstrap", level: 90 },
    { name: "JavaScript", level: 90 },
    { name: "Entity Framework", level: 92 },
    { name: "Azure", level: 80 },
    { name: "Git", level: 95 },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content block */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
            Profile details
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            About JN Digital Solutions
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio Card block */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 space-y-6 relative overflow-hidden"
            >
              {/* Radial gradient backing accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider font-mono text-slate-400 dark:text-slate-500 uppercase">
                    System Analyst Programmer
                  </h4>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Full-Stack Engineer
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                I am a Software Developer and System Analyst with extensive experience in designing, developing, and maintaining enterprise-grade business applications.
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                My expertise spans web development, mobile applications, ERP systems, procurement platforms, HR solutions, POS systems, and AI-powered technologies. I focus on building scalable, secure, and user-friendly solutions that solve real business challenges.
              </p>

              {/* Bottom stats indicators inside panel */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-700/60 pt-6">
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 font-display">
                    7+
                  </span>
                  <p className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                    Years Active
                  </p>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 font-display">
                    12+
                  </span>
                  <p className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                    Corp systems
                  </p>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 font-display">
                    99.9%
                  </span>
                  <p className="text-[10px] font-bold font-mono text-slate-400 uppercase">
                    Code Quality
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Certifications Quick callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/10 flex items-center space-x-4"
            >
              <div className="h-10 w-10 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-lg shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Enterprise-grade execution
                </span>
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                  Agile Delivery, secure API gateways, and complete local failover architectures.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Metrics / Technical Skill meters block */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Cpu className="h-4.5 w-4.5 text-blue-500" />
                <span className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Technical Core Competency
                </span>
              </div>

              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold font-mono">
                      <span className="text-slate-700 dark:text-slate-200">{skill.name}</span>
                      <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
                    </div>
                    {/* Visual Meter Bar */}
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.04 }}
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
