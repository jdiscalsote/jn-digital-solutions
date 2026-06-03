import { Globe, Server, Smartphone, ShoppingCart, Printer, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../data";
import { motion } from "motion/react";

const itemIcons = {
  "web-dev": Globe,
  "web-app": Server,
  "mobile-dev": Smartphone,
  "pos-system": ShoppingCart,
  "design-printing": Printer,
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Header */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3"
          >
            Capabilities
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display"
          >
            Digital Services Designed for Impact
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal"
          >
            Leveraging decades of architectural workflows and modern frameworks to deliver scalable, reliable solutions tailored around your business requirements.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = itemIcons[service.id as keyof typeof itemIcons] || Globe;
            return (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-blue-500/[0.04] transition-all"
              >
                {/* Visual Accent Corner Ribbon */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute top-1 right-[-45px] w-32 h-6 bg-blue-600/10 dark:bg-blue-400/10 border-b border-blue-500/20 rotate-45 flex items-center justify-center">
                    <span className="text-[7px] font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div>
                  {/* Top Icon & Badge block */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-900/40 px-2.5 py-1 rounded-md">
                      {service.badge}
                    </span>
                  </div>

                  {/* Text Details */}
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display mb-3">
                    {service.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Sub Features Bullet list */}
                <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-5 mt-auto">
                  <span className="text-[10px] font-bold tracking-wider font-mono text-slate-400 dark:text-slate-500 uppercase block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
