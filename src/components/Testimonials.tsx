import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 bg-mesh-pattern border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
            Client trust
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Success Stories
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal">
            Read positive experiences from high-level decision makers who partnered with JN Digital Solutions to streamline their business ecosystems.
          </p>
        </div>

        {/* Testimonials Grid loop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              id={`testimonial-${t.id}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              
              {/* Decorative Quotation accent */}
              <div className="absolute top-6 right-8 text-blue-600/10 dark:text-blue-400/10">
                <Quote className="h-10 w-10 rotate-180" />
              </div>

              <div>
                {/* 5-Star indicator row */}
                <div className="flex items-center space-x-1.5 mb-6">
                  {Array.from({ length: t.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text content */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 italic select-none">
                  "{t.content}"
                </p>
              </div>

              {/* Individual Profile footer */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 flex items-center space-x-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover border-2 border-blue-500/10 shrink-0"
                />
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    {t.name}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block leading-tight">
                    {t.role}, <span className="font-semibold text-blue-600 dark:text-blue-400">{t.company}</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
