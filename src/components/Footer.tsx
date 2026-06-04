import { Facebook, Linkedin, Github, Mail, Terminal, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const handleScrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", id: "facebook" },
    { icon: Linkedin, href: "https://linkedin.com", id: "linkedin" },
    { icon: Github, href: "https://github.com", id: "github" },
    { icon: Mail, href: "mailto:njdiscalsote25@gmail.com", id: "email" },
  ];

  const quickLinks = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Portfolio", target: "portfolio" },
    { label: "About", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 font-sans block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          {/* Logo & Bio area */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleScrollTo("home")}>
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Terminal className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-tight leading-none">
                  JN Digital Solutions
                </span>
                <span className="text-[9px] font-mono tracking-widest text-blue-400 font-medium uppercase mt-1">
                  Enterprise Software Developer
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm">
              Tailored high-performance web systems, database architectures, Blazor portals, and cross-platform mobile apps engineered to support and scale corporate operations.
            </p>
          </div>

          {/* Quick links header */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((item) => (
                <button
                  key={item.target}
                  id={`footer-link-${item.target}`}
                  onClick={() => handleScrollTo(item.target)}
                  className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social connections block */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono text-white tracking-widest uppercase">
              Social Handlers
            </h4>
            <div className="flex items-center space-x-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.id}
                    id={`footer-social-${social.id}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                    aria-label={`Connect with us on ${social.id}`}
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Separator / Copyright area */}
        <div className="border-t border-slate-800/85 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-medium">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0 text-center sm:text-left">© 2026 JN Digital Solutions. All Rights Reserved.</p>
          <div className="order-1 sm:order-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex justify-center">
            <button
              id="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-1.5 bg-slate-800/90 hover:bg-blue-600 text-slate-300 hover:text-white px-4 py-2 rounded-full border border-slate-700/60 hover:border-blue-500/30 transition-all duration-300 cursor-pointer shadow-sm text-xs"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
