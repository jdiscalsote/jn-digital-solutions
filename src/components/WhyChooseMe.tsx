import { Sliders, Cpu, Smartphone, ShieldCheck, Zap, Briefcase } from "lucide-react";
import { WHY_CHOOSE_ME } from "../data";
import { motion } from "motion/react";

const itemIcons = {
  Sliders: Sliders,
  Cpu: Cpu,
  Smartphone: Smartphone,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Briefcase: Briefcase,
};

export default function WhyChooseMe() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 bg-mesh-pattern border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
              Value Proposition
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Uncompromising Quality for Exponential Business Growth
            </h3>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
              When business operations depend on software correctness, ready-made solutions fail. My development lifecycle guarantees high-redundancy code, secure APIs, and interfaces designed specifically for maximum daily efficiency.
            </p>
          </div>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_ME.map((item, index) => {
            const IconComponent = itemIcons[item.icon as keyof typeof itemIcons] || Sliders;
            return (
              <motion.div
                key={item.title}
                id={`why-choose-${index}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/85 dark:border-slate-800/85 hover:border-blue-600/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Visual Icon block */}
                <div className="h-11 w-11 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Card description */}
                <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display mb-2.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
