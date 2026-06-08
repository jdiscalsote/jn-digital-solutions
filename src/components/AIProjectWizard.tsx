import React, { useState } from "react";
import {
    Sparkles,
    Calculator,
    Layers,
    Cpu,
    Copy,
    Check,
    Palette,
    Type,
    Lightbulb,
    RefreshCw,
    Zap,
    Terminal,
    HelpCircle,
    FileText,
    Database,
} from "lucide-react";
import { SERVICES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface EstimateResult {
    estimatedWeeks: number;
    estimatedPriceRange: string;
    suggestedStack: string[];
    scopeBreakdown: string[];
    technicalSpecsDraft: string;
}

interface BrandResult {
    slogans: string[];
    brandColors: Array<{
        name: string;
        hex: string;
        tailwindClass: string;
    }>;
    googleFontPairing: string;
    vibeDescription: string;
}

interface DbTableColumn {
    name: string;
    type: string;
    constraints: string;
    description: string;
}

interface DbTable {
    name: string;
    description: string;
    columns: DbTableColumn[];
}

interface DbRelationship {
    fromTable: string;
    fromColumn: string;
    toTable: string;
    toColumn: string;
    type: string;
}

interface DbResult {
    tables: DbTable[];
    relationships: DbRelationship[];
    sqlScript: string;
    architecturalExplanation: string;
}

export default function AIProjectWizard() {
    const [activeTab, setActiveTab] = useState<"estimator" | "branding" | "database">("estimator");

    // Tab 1: Estimator states
    const [estService, setEstService] = useState("");
    const [estDescription, setEstDescription] = useState("");
    const [estLoading, setEstLoading] = useState(false);
    const [estResult, setEstResult] = useState<EstimateResult | null>(null);
    const [estCopied, setEstCopied] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");

    // Tab 2: Branding States
    const [brandIndustry, setBrandIndustry] = useState("");
    const [brandDescription, setBrandDescription] = useState("");
    const [brandLoading, setBrandLoading] = useState(false);
    const [brandResult, setBrandResult] = useState<BrandResult | null>(null);
    const [colorCopiedCode, setColorCopiedCode] = useState<string | null>(null);

    // Tab 3: Database Designer States
    const [dbType, setDbType] = useState("Microsoft SQL Server");
    const [dbDescription, setDbDescription] = useState("");
    const [dbLoading, setDbLoading] = useState(false);
    const [dbResult, setDbResult] = useState<DbResult | null>(null);
    const [sqlCopied, setSqlCopied] = useState(false);
    const [dbLoadingStep, setDbLoadingStep] = useState("");

    // Tab 1 Handler: Run estimate
    const handleRunEstimate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!estDescription.trim()) return;

        setEstLoading(true);
        setEstResult(null);

        const steps = [
            "Configuring JN Technical Schema...",
            "Analyzing architecture constraints...",
            "Mapping module dependencies...",
            "Calculating PHP dev-cost benchmarks...",
            "Writing Technical Specifications..."
        ];

        let stepIdx = 0;
        setLoadingStep(steps[0]);
        const interval = setInterval(() => {
            stepIdx++;
            if (stepIdx < steps.length) {
                setLoadingStep(steps[stepIdx]);
            }
        }, 900);

        try {
            const res = await fetch("/api/estimate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: estDescription,
                    serviceType: estService
                })
            });

            if (!res.ok) throw new Error("Estimation channel offline");
            const data = await res.json();
            setEstResult(data);
        } catch (err) {
            console.error(err);
            // Fallback
            setEstResult({
                estimatedWeeks: 4,
                estimatedPriceRange: "₱45,000 - ₱75,000 PHP",
                suggestedStack: ["React (Vite)", "ASP.NET Core", "SQL Server", "Tailwind CSS"],
                scopeBreakdown: [
                    "Interactive client portal layouts",
                    "Custom administrative parameters",
                    "Secure database transaction matrices",
                    "Automated receipt printer scripts",
                    "Operational activity journals"
                ],
                technicalSpecsDraft: "### Technical Specs Fallback\n- Base Build: C# ASP.NET Core & React\n- Database: MS SQL Server\n- Timeline: 4 Weeks estimated build"
            });
        } finally {
            clearInterval(interval);
            setEstLoading(false);
        }
    };

    // Tab 2 Handler: Run Branding Planner
    const handleRunBranding = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brandDescription.trim()) return;

        setBrandLoading(true);
        setBrandResult(null);

        try {
            const res = await fetch("/api/brand-planner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: brandDescription,
                    industry: brandIndustry
                })
            });

            if (!res.ok) throw new Error("Branding planner offline");
            const data = await res.json();
            setBrandResult(data);
        } catch (err) {
            console.error(err);
            // Fallback
            setBrandResult({
                slogans: [
                    "Pioneering Seamless Progress",
                    "Engineered to Stand Out",
                    "Bold Identity, Flawless Delivery",
                    "Where Creativity Meets Calculation"
                ],
                brandColors: [
                    { name: "Sleek Charcoal", hex: "#1E293B", tailwindClass: "bg-slate-800 text-white" },
                    { name: "Electric Innovation", hex: "#3B82F6", tailwindClass: "bg-blue-500 text-white" },
                    { name: "Pristine Emerald", hex: "#10B981", tailwindClass: "bg-emerald-500 text-white" },
                    { name: "Vapor Wash Light", hex: "#F1F5F9", tailwindClass: "bg-slate-100 text-slate-800" }
                ],
                googleFontPairing: "Outfit (Headings) + Inter (Body)",
                vibeDescription: "A sharp, corporate-innovative look pairing high-contrast digital elements with sturdy geometry to showcase peak engineering excellence."
            });
        } finally {
            setBrandLoading(false);
        }
    };

    // Tab 3 Handler: Run Database Designer
    const handleRunDbDesigner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dbDescription.trim()) return;

        setDbLoading(true);
        setDbResult(null);

        const steps = [
            "Analyzing business system logic...",
            "Normalizing entity relations (3NF)...",
            "Assigning keys & indexing scopes...",
            "Drafting ANSI SQL script vectors...",
            "Reviewing performance metrics..."
        ];

        let stepIdx = 0;
        setDbLoadingStep(steps[0]);
        const interval = setInterval(() => {
            stepIdx++;
            if (stepIdx < steps.length) {
                setDbLoadingStep(steps[stepIdx]);
            }
        }, 900);

        try {
            const res = await fetch("/api/db-schema", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: dbDescription,
                    dbType: dbType
                })
            });

            if (!res.ok) throw new Error("Database designer channel offline");
            const data = await res.json();
            setDbResult(data);
        } catch (err) {
            console.error(err);
            // Fallback
            setDbResult({
                tables: [
                    {
                        name: "EnterpriseUsers",
                        description: "Stores admin credentials and security roles.",
                        columns: [
                            { name: "UserID", type: dbType.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY", description: "Identity auto-key descriptor." },
                            { name: "Username", type: "VARCHAR(50)", constraints: "UNIQUE, NOT NULL", description: "Unique username." },
                            { name: "PermissionLevel", type: "VARCHAR(20)", constraints: "NOT NULL", description: "Roles mapping." }
                        ]
                    }
                ],
                relationships: [],
                sqlScript: `-- SQL Fallback Script --\nCREATE TABLE EnterpriseUsers (\n  UserID INT PRIMARY KEY IDENTITY(1,1) ON 'Microsoft SQL Server',\n  Username VARCHAR(50) UNIQUE NOT NULL,\n  PermissionLevel VARCHAR(20) NOT NULL\n);`,
                architecturalExplanation: "### Local Offline Mode Architecture Summary\n- Normalized system table mapping to ensure safe parameters configuration.\n- Indexes on Username."
            });
        } finally {
            clearInterval(interval);
            setDbLoading(false);
        }
    };

    const copyToClipboard = (text: string, isEst: boolean = true) => {
        navigator.clipboard.writeText(text);
        if (isEst) {
            setEstCopied(true);
            setTimeout(() => setEstCopied(false), 2000);
        } else {
            setColorCopiedCode(text);
            setTimeout(() => setColorCopiedCode(null), 2000);
        }
    };

    const copySqlToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setSqlCopied(true);
        setTimeout(() => setSqlCopied(false), 2000);
    };

    return (
        <div className="w-full">
            {/* Tab selection widgets */}
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 max-w-xl gap-1">
                <button
                    onClick={() => setActiveTab("estimator")}
                    className={`flex-1 py-3 text-xs sm:text-xs md:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all cursor-pointer ${activeTab === "estimator"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                        }`}
                >
                    <Calculator className="h-4 w-4 shrink-0" />
                    <span>Cost Estimator</span>
                </button>
                <button
                    onClick={() => setActiveTab("branding")}
                    className={`flex-1 py-3 text-xs sm:text-xs md:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all cursor-pointer ${activeTab === "branding"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                        }`}
                >
                    <Palette className="h-4 w-4 shrink-0" />
                    <span>Brand Planner</span>
                </button>
                <button
                    onClick={() => setActiveTab("database")}
                    className={`flex-1 py-3 text-xs sm:text-xs md:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all cursor-pointer ${activeTab === "database"
                        ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                        }`}
                >
                    <Database className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
                    <span>DB Designer</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "estimator" && (
                    <motion.div
                        key="estimator-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Form */}
                        <form onSubmit={handleRunEstimate} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                        Core Platform Model
                                    </label>
                                    <select
                                        value={estService}
                                        onChange={(e) => setEstService(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="">-- Choose target range --</option>
                                        {SERVICES.map((s) => (
                                            <option key={s.id} value={s.title}>
                                                {s.title}
                                            </option>
                                        ))}
                                        <option value="Multi-platform custom app">Custom Corporate ERP Suite</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 flex items-end">
                                    <span className="text-[11px] text-slate-400 leading-relaxed mb-1.5">
                                        💡 Perfect for estimating timelines for custom software scopes instantly.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                    Describe what your system should do *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={estDescription}
                                    onChange={(e) => setEstDescription(e.target.value)}
                                    placeholder="e.g. A dentist booking clinic app where patients select slots and the doctor logs charts and records..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={estLoading}
                                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md cursor-pointer disabled:opacity-75 transition-all"
                            >
                                {estLoading ? (
                                    <div className="flex items-center space-x-2.5">
                                        <RefreshCw className="h-4 w-4 animate-spin text-white" />
                                        <span>{loadingStep || "Consulting AI Architect..."}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                                        <span>Analyze Scope & Generate Quote</span>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Results Presentation */}
                        {estResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                tabIndex={0}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/20 border border-blue-500/10 space-y-6 shadow-sm select-text"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-500/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <Zap className="h-3 w-3 animate-bounce" /> JN AI ARCHITECT ESTIMATE
                                    </span>
                                    <span className="text-slate-400 text-[11px] font-mono">CONFIDENTIAL ANALYSIS</span>
                                </div>

                                {/* Key Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20">
                                        <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">
                                            BUILD TIME ESTIMATE
                                        </span>
                                        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">
                                            {estResult.estimatedWeeks} Complete {estResult.estimatedWeeks === 1 ? "Week" : "Weeks"}
                                        </span>
                                        <span className="text-[11px] text-slate-400 block mt-0.5">Includes setup, testing, and deployment schedules</span>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20">
                                        <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">
                                            INDICATIVE QUOTE BUDGET
                                        </span>
                                        <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                                            {estResult.estimatedPriceRange}
                                        </span>
                                        <span className="text-[11px] text-slate-400 block mt-0.5">Flexible itemized milestones, local currency rate</span>
                                    </div>
                                </div>

                                {/* Suggested Tech Stack */}
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Optimized Development Stack Recommendation:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {estResult.suggestedStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200/50 dark:border-slate-700/50"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Scope Breakdown list */}
                                <div className="space-y-3">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Critical System Scope Key Deliverables:
                                    </span>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                        {estResult.scopeBreakdown.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technical RFP Markdown Document container */}
                                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase flex items-center gap-1.5">
                                            <FileText className="h-4 w-4" /> Technical Specification Blueprint
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(estResult.technicalSpecsDraft, true)}
                                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center gap-1.5 transition-colors"
                                        >
                                            {estCopied ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-500" />
                                                    <span className="text-emerald-500">Copied Spec!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span>Copy markdown</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-900 max-h-60 overflow-y-auto leading-relaxed select-text shadow-inner">
                                        <pre className="whitespace-pre-wrap">{estResult.technicalSpecsDraft}</pre>
                                    </div>
                                    <span className="text-[10px] text-slate-400 block italic leading-normal">
                                        * This is a live AI drafted RFP specification based on your custom input. Present this blueprint to Noly/JND during consult checks to lock in these milestones.
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {activeTab === "branding" && (
                    <motion.div
                        key="branding-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Branding Inputs */}
                        <form onSubmit={handleRunBranding} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                        Industry Domain / Sector
                                    </label>
                                    <select
                                        value={brandIndustry}
                                        onChange={(e) => setBrandIndustry(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="">-- Choose sector --</option>
                                        <option value="Food, Café, or Restaurant">Food, Café, or Restaurant</option>
                                        <option value="E-Commerce & Digital Retail">E-Commerce & Digital Retail</option>
                                        <option value="SaaS & Enterprise Business Systems">SaaS & Enterprise Business Systems</option>
                                        <option value="Medical, Dental & Professional Clinic">Medical, Dental & Clinic</option>
                                        <option value="Real Estate & Architecture">Real Estate & Construction</option>
                                        <option value="Creative Agency & Fashion Portfolio">Creative & Fashion</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 flex items-end">
                                    <span className="text-[11px] text-slate-400 leading-relaxed mb-1.5">
                                        💡 Ideal for designing logo style benchmarks, slogans, and color codes for print or digital assets.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                    Describe your brand identity idea *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={brandDescription}
                                    onChange={(e) => setBrandDescription(e.target.value)}
                                    placeholder="e.g. A modern bakeshop that sells minimalist cakes with organic ingredients, warm colors, rustic vibes..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={brandLoading}
                                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md cursor-pointer disabled:opacity-75 transition-all"
                            >
                                {brandLoading ? (
                                    <div className="flex items-center space-x-2.5">
                                        <RefreshCw className="h-4 w-4 animate-spin text-white" />
                                        <span>Styling brand assets...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Palette className="h-4 w-4 text-amber-200 animate-pulse" />
                                        <span>Plan Brand Identity Blueprint</span>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Branding results container */}
                        {brandResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/20 border border-teal-500/10 space-y-6 shadow-sm select-text"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 font-mono uppercase bg-teal-500/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <Lightbulb className="h-3.5 w-3.5 animate-pulse" /> JN BRAND IDENTITY MATRICES
                                    </span>
                                    <span className="text-slate-400 text-[11px] font-mono">CREATIVE DEVELOPMENT</span>
                                </div>

                                {/* Slogan alternatives row */}
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Custom Slogan & Tagline Recommendations:
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {brandResult.slogans.map((slogan, i) => (
                                            <div
                                                key={i}
                                                onClick={() => copyToClipboard(slogan, true)}
                                                className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl hover:border-teal-500/40 cursor-copy transition-all group flex items-center justify-between"
                                                title="Click to copy slogan"
                                            >
                                                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                                                    "{slogan}"
                                                </span>
                                                <Copy className="h-3 w-3 text-slate-400 group-hover:text-teal-500 transition-colors shrink-0 ml-2" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Coordinated Color Blocks */}
                                <div className="space-y-2.5">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Coordinated Brand Palette Color Swatches:
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {brandResult.brandColors.map((color, i) => (
                                            <div
                                                key={i}
                                                onClick={() => copyToClipboard(color.hex, false)}
                                                className="rounded-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden cursor-copy group shadow-sm hover:-translate-y-0.5 transition-all"
                                                title="Click to copy HEX color"
                                            >
                                                {/* Swatch segment */}
                                                <div
                                                    style={{ backgroundColor: color.hex }}
                                                    className="h-16 w-full relative flex items-end justify-end p-2"
                                                >
                                                    <div className="bg-black/40 backdrop-blur-sm p-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {colorCopiedCode === color.hex ? "COPIED!" : "COPY"}
                                                    </div>
                                                </div>
                                                {/* Info details */}
                                                <div className="p-2.5 bg-white dark:bg-slate-900 text-left">
                                                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 block truncate">
                                                        {color.name}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase mt-0.5">
                                                        {color.hex}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Google Fonts styling */}
                                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/10">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase flex items-center gap-1.5">
                                        <Type className="h-4 w-4" /> Recommended Google Fonts Lock-up
                                    </span>
                                    <p className="text-lg font-extrabold text-slate-950 dark:text-white font-display mt-1">
                                        {brandResult.googleFontPairing}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                        Designed to optimize premium mobile-readability and matching aesthetic energy of posters, brochures, or web layouts.
                                    </p>
                                </div>

                                {/* Aesthetic vibe statement */}
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Aesthetic Vibe Statement & Brand Character:
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800">
                                        {brandResult.vibeDescription}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {activeTab === "database" && (
                    <motion.div
                        key="database-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Database Designer Inputs */}
                        <form onSubmit={handleRunDbDesigner} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                        Target SQL Database Engine
                                    </label>
                                    <select
                                        value={dbType}
                                        onChange={(e) => setDbType(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="Microsoft SQL Server">Microsoft SQL Server</option>
                                        <option value="PostgreSQL">PostgreSQL</option>
                                        <option value="MySQL">MySQL</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 flex items-end">
                                    <span className="text-[11px] text-slate-400 leading-relaxed mb-1.5 font-sans">
                                        💡 Perfect for generating fully-normalized schemas, FK constraints, and deploy-ready SQL scripts.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                    Describe what your database should model *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={dbDescription}
                                    onChange={(e) => setDbDescription(e.target.value)}
                                    placeholder="e.g. A dental clinic scheduling system with patient accounts, doctor availability slots, and service categories..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={dbLoading}
                                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md cursor-pointer disabled:opacity-75 transition-all"
                            >
                                {dbLoading ? (
                                    <div className="flex items-center space-x-2.5">
                                        <RefreshCw className="h-4 w-4 animate-spin text-white" />
                                        <span>{dbLoadingStep || "Analyzing Business Domain Schema..."}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                                        <span>Generate Database Schema & SQL Blueprint</span>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* DB results container */}
                        {dbResult && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/20 border border-indigo-500/10 space-y-6 shadow-sm select-text"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono uppercase bg-indigo-500/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                        <Database className="h-4 w-4 animate-pulse" /> JN DATA SPECIFICATION BLUEPRINT
                                    </span>
                                    <span className="text-slate-400 text-[11px] font-mono">3NF NORMALIZED RELATION MATRIX</span>
                                </div>

                                {/* Coordinated Tables Display */}
                                <div className="space-y-4">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Designed Table Entities ({dbResult.tables?.length || 0}):
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {dbResult.tables?.map((table, tIdx) => (
                                            <div
                                                key={tIdx}
                                                className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 shadow-sm h-full flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono block">
                                                            dbo.{table.name}
                                                        </span>
                                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                                                            {table.columns?.length || 0} columns
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 mt-1 italic block leading-normal line-clamp-2">
                                                        "{table.description}"
                                                    </p>
                                                </div>

                                                {/* Columns Detail List */}
                                                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2.5 space-y-2">
                                                    {table.columns?.map((col, colIdx) => (
                                                        <div key={colIdx} className="text-xs flex items-start justify-between gap-2 border-b border-dashed border-slate-100 dark:border-slate-800/30 pb-1.5 last:border-b-0 last:pb-0">
                                                            <div className="flex flex-col">
                                                                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                                                                    {col.name}
                                                                </span>
                                                                <span className="text-[10px] text-slate-400 block mt-0.5 font-sans leading-normal">
                                                                    {col.description}
                                                                </span>
                                                            </div>
                                                            <div className="text-right flex flex-col items-end shrink-0">
                                                                <span className="font-mono text-[10px] text-violet-600 dark:text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-md">
                                                                    {col.type}
                                                                </span>
                                                                {col.constraints && (
                                                                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-mono mt-0.5 uppercase tracking-wide">
                                                                        {col.constraints}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Relationships section */}
                                {dbResult.relationships && dbResult.relationships.length > 0 && (
                                    <div className="space-y-2.5">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                            Entity-Relationship (PK/FK) Constraints:
                                        </span>
                                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                                            {dbResult.relationships.map((rel, relIdx) => (
                                                <div key={relIdx} className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-white dark:bg-slate-900 px-2 py-1.5 rounded border border-slate-200/50 dark:border-slate-800">
                                                        {rel.fromTable}.{rel.fromColumn}
                                                    </span>
                                                    <span className="text-slate-400">➔ Reference ({rel.type}) ➔</span>
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-white dark:bg-slate-900 px-2 py-1.5 rounded border border-slate-200/50 dark:border-slate-800">
                                                        {rel.toTable}.{rel.toColumn}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Script block area */}
                                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 font-sans">
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase flex items-center gap-1.5">
                                            <Terminal className="h-4 w-4 text-violet-500" /> DDL SQL Deploy Query Blueprint ({dbType})
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copySqlToClipboard(dbResult.sqlScript)}
                                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center gap-1.5 transition-colors"
                                        >
                                            {sqlCopied ? (
                                                <>
                                                    <Check className="h-3 w-3 text-emerald-500" />
                                                    <span className="text-emerald-500 font-sans">Copied SQL!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3" />
                                                    <span className="font-sans">Copy script</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-900 max-h-64 overflow-y-auto leading-relaxed select-text shadow-inner">
                                        <pre className="whitespace-pre-wrap">{dbResult.sqlScript}</pre>
                                    </div>
                                </div>

                                {/* Architectural guidance statement */}
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono uppercase block">
                                        Lead Architect Implementation Commentary:
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800">
                                        {dbResult.architecturalExplanation}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}