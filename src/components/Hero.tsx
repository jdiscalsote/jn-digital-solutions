import { useState, useEffect } from "react";
import { ArrowRight, Code, Database, Sparkles, Smartphone, ChevronRight, Check } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"cs" | "dart" | "sql">("cs");
  const [typedLine, setTypedLine] = useState("");
  const [liveUsers, setLiveUsers] = useState(1480);

  // Live user counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const techBadges = [
    { name: "ASP.NET Core", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
    { name: "Blazor", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
    { name: "MudBlazor", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
    { name: "Flutter", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
    { name: "SQL Server", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
    { name: "Bootstrap", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
    { name: "REST API", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
    { name: "AI Integration", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  ];

  const codeSnippets = {
    cs: `// SolutionService.cs - ASP.NET Core API Backend
[HttpPost("calculate-payroll")]
[Authorize(Roles = "Manager,HRAdmin")]
public async Task<IActionResult> ProcessPayroll([FromBody] PayrollRequest req) {
    var result = await _payrollProcessor.CalculateAsync(req.EmployeeId, req.DaysWorked);
    if (!result.Success) return BadRequest(result.ErrorMessage);
    
    await _db.PayrollRecords.AddAsync(result.Record);
    await _db.SaveChangesAsync();
    return Ok(new { Status = "Processed", GrandTotal = result.NetSalary });
}`,
    dart: `// main.dart - Flutter Cross-Platform App
import 'package:flutter/material.dart';
import 'package:ai_face_core/ai_face_core.dart';

Future<void> triggerBiometricVerification() async {
  final userFace = await ImagePicker().captureFace();
  final verification = await AIFaceDetector.verifyEmployee(
    image: userFace,
    targetApiKey: "JN_DIGITAL_AUTH_SECURE"
  );
  if (verification.isMatched) {
    navigateHome(employeeId: verification.matchedUser);
  }
}`,
    sql: `-- SalesReporting.sql - High performance POS Aggregation
SELECT 
    p.Category,
    COUNT(s.Id) AS TotalTransactions,
    SUM(s.NetTotal) AS TotalRevenue,
    SUM(s.DiscountAmt) AS PromotionalLoss
FROM POS_Transactions s
INNER JOIN Products p ON s.ProductId = p.Id
WHERE s.TransactionDate >= DATEADD(day, -30, GETDATE())
GROUP BY p.Category
ORDER BY TotalRevenue DESC;`,
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 bg-mesh-pattern overflow-hidden"
    >
      {/* Visual background flares */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-600/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content block */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-blue-500/10"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Enterprise-Grade Architecture</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1]">
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Modern Digital Solutions
                </span>{" "}
                for Businesses & Professionals
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                Custom Websites, Mobile Applications, POS Systems, Enterprise Solutions, and Creative Branding Services
                designed to help businesses grow and succeed.
              </p>
            </motion.div>

            {/* Floating Tech Badge list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 max-w-2xl"
            >
              {techBadges.map((badge, idx) => (
                <motion.span
                  key={badge.name}
                  whileHover={{ scale: 1.05 }}
                  className={`text-xs font-mono font-medium px-3 py-1.5 rounded-lg border cursor-default ${badge.color}`}
                >
                  {badge.name}
                </motion.span>
              ))}
            </motion.div>

            {/* Action buttons CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="hero-btn-portfolio"
                onClick={() => handleScrollTo("portfolio")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 cursor-pointer transition-all hover:translate-y-[-1px] active:translate-y-0"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                id="hero-btn-contact"
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Simple stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-6 border-t border-slate-200 dark:border-slate-800/80 pt-6"
            >
              <div>
                <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                  100%
                </span>
                <p className="text-xs text-slate-500 font-medium">Uptime Guarantee</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                  {liveUsers}
                </span>
                <p className="text-xs text-slate-500 font-medium">Synchronized Endpoints</p>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Interactive mockup block */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-300 font-mono text-[11px] leading-relaxed overflow-hidden"
            >
              {/* Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                  <span className="w-3 h-3 rounded-full bg-green-500 block" />
                </div>
                <div className="text-slate-500 text-xs font-sans font-medium">jn-development-workspace</div>
                <div className="w-12 h-1" />
              </div>

              {/* Window Tabs */}
              <div className="flex border-b border-slate-800/80 bg-slate-900/60 font-sans text-xs">
                <button
                  id="tab-cs"
                  onClick={() => setActiveTab("cs")}
                  className={`flex items-center space-x-1 px-4 py-2 border-r border-slate-800 cursor-pointer transition-colors ${
                    activeTab === "cs"
                      ? "bg-slate-950 text-white border-t-2 border-blue-500 px-4 py-[7px]"
                      : "text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Code className="h-3.5 w-3.5 text-purple-400" />
                  <span>Payroll.cs</span>
                </button>
                <button
                  id="tab-dart"
                  onClick={() => setActiveTab("dart")}
                  className={`flex items-center space-x-1 px-4 py-2 border-r border-slate-800 cursor-pointer transition-colors ${
                    activeTab === "dart"
                      ? "bg-slate-950 text-white border-t-2 border-blue-500 px-4 py-[7px]"
                      : "text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5 text-sky-400" />
                  <span>FaceAuth.dart</span>
                </button>
                <button
                  id="tab-sql"
                  onClick={() => setActiveTab("sql")}
                  className={`flex items-center space-x-1 px-4 py-2 cursor-pointer transition-colors ${
                    activeTab === "sql"
                      ? "bg-slate-950 text-white border-t-2 border-blue-500 px-4 py-[7px]"
                      : "text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Database className="h-3.5 w-3.5 text-red-400" />
                  <span>POSReport.sql</span>
                </button>
              </div>

              {/* Code Panel Display */}
              <div className="p-4 bg-slate-950 h-80 overflow-y-auto no-scrollbar font-mono leading-relaxed select-none">
                <pre key={activeTab} className="text-slate-400 whitespace-pre-wrap">
                  {codeSnippets[activeTab]}
                </pre>
              </div>

              {/* Bottom Quick-Log panel */}
              <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 text-[10px] text-slate-500 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Build Success. Server listening at host: 0.0.0.0</span>
                </div>
                <div className="font-semibold text-blue-400">FPS: 60</div>
              </div>
            </motion.div>

            {/* Superposition floating live transaction panel */}
            <motion.div
              drag
              dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
              className="absolute -bottom-6 -right-6 md:-right-8 bg-blue-600 text-white p-4 rounded-xl shadow-xl flex flex-col space-y-1 w-44 pointer-events-auto cursor-grab active:cursor-grabbing border border-blue-400/20"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-wider font-mono font-medium opacity-80 uppercase">
                  ACTIVE DB
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-xl font-bold tracking-tight font-display">$8,419.50</span>
              <span className="text-[9px] font-medium opacity-80">Accumulated daily POS sales</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
