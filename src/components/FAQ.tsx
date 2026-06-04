import React, { useState, useMemo } from "react";
import {
    Search,
    HelpCircle,
    ChevronDown,
    Sparkles,
    Terminal,
    Cpu,
    FileCheck,
    Layers,
    ArrowRight,
    Plus,
    Minus
} from "lucide-react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<"all" | "general" | "services" | "technical" | "contracts">("all");
    const [expandedId, setExpandedId] = useState<string | null>("faq-software-types"); // Expand first by default

    const categories = [
        { id: "all", label: "All Questions" },
        { id: "services", label: "Services & Scope" },
        { id: "technical", label: "Tech Stack & Data" },
        { id: "contracts", label: "Timelines & Cost" },
        { id: "general", label: "Client Support" }
    ] as const;

    const toggleAccordion = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    // Filter FAQS based on search query and category tab selection
    const filteredFaqs = useMemo(() => {
        return FAQS.filter(faq => {
            const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
            const matchesSearch =
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <section id="faq" className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">

            {/* Decorative Blur Orbs */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-400/5 dark:bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto pb-12">
                    <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
                        Common Inquiries
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal">
                        Clear responses regarding our delivery processes, structural technical architectures, milestones, and client service metrics.
                    </p>
                </div>

                {/* Filter Toolbar / Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-10 border-b border-slate-100 dark:border-slate-800/80 mb-10">

                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 cursor-pointer ${selectedCategory === cat.id
                                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 shrink-0">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450 dark:text-slate-500">
                            <Search className="h-4 w-4" />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search specifications or timeline inquiries..."
                            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                        />
                    </div>

                </div>

                {/* Accordion List Row */}
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq, index) => {
                                    const isExpanded = expandedId === faq.id;
                                    return (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.25, delay: index * 0.05 }}
                                            className={`rounded-2xl border transition-all overflow-hidden ${isExpanded
                                                    ? "bg-slate-50/55 dark:bg-slate-900/60 border-blue-500/20 shadow-xs"
                                                    : "bg-white dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50/30 dark:hover:bg-slate-900/20"
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(faq.id)}
                                                className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                                            >
                                                <div className="flex items-start gap-3.5">
                                                    {/* Left icon wrapper */}
                                                    <div className={`p-2 rounded-xl mt-0.5 shrink-0 transition-colors ${isExpanded ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                                                        }`}>
                                                        {faq.category === "technical" && <Cpu className="h-4.5 w-4.5" />}
                                                        {faq.category === "services" && <Layers className="h-4.5 w-4.5" />}
                                                        {faq.category === "contracts" && <FileCheck className="h-4.5 w-4.5" />}
                                                        {faq.category === "general" && <HelpCircle className="h-4.5 w-4.5" />}
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase block mb-1">
                                                            {faq.category} specifications
                                                        </span>
                                                        <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">
                                                            {faq.question}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Expand status indicators */}
                                                <div className={`p-1 rounded-lg border transition-colors shrink-0 mt-1 ${isExpanded ? "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400" : "border-slate-200 dark:border-slate-800 text-slate-400"
                                                    }`}>
                                                    <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                                </div>
                                            </button>

                                            {/* Expandable and animated details body pane (use beautiful layout transition) */}
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.23, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-6 pb-6 pt-1 sm:pl-[70px] pr-8 text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed max-w-3xl">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10"
                            >
                                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center mx-auto text-slate-400 mb-3">
                                    <Search className="h-5 w-5" />
                                </div>
                                <h4 className="text-base font-bold text-slate-850 dark:text-white">
                                    No matching Q&As found
                                </h4>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-normal">
                                    Try adjusting your search criteria or switching filter categories to browse our software development scopes.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                    className="mt-4 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                                >
                                    Reset active filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick FAQ Footer Banner */}
                    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/5 border border-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="h-12 w-12 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 hidden sm:flex">
                                <Sparkles className="h-5 w-5 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-950 dark:text-white">
                                    Still have custom design or pricing queries?
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                    Discuss architecture layers with our AI Consultant or send a form directly to lock in SLA responses under 12 hours.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <a
                                href="#contact"
                                className="px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
                            >
                                <span>Get Instant Quote</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}