import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { SERVICES } from "../data";
import { motion, AnimatePresence } from "motion/react";
import AIProjectWizard from "./AIProjectWizard";

interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterested: string;
  message: string;
}

export default function Contact() {
  const [contactMode, setContactMode] = useState<"standard" | "ai">("standard");
  const [formData, setFormData] = useState<ContactFormState>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceInterested: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormState | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate database write / trigger submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSubmittedData({ ...formData });

      // Clear fields
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        serviceInterested: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Contact Header */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 font-mono uppercase bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 rounded-full inline-block mb-3">
            Service request
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Start Your Project
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-4 font-normal">
            Take the first step towards a bespoke digital platform. Submit your requirements and receive a detailed system proposal from our programmers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Info & SLA parameters */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 space-y-6">
              <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                Talk directly with the Developer
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                Connect directly for initial scope consultancy, existing framework troubleshooting, architectural audit sessions, and printing inquiries.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:njdiscalsote25@gmail.com"
                  className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 -mx-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase leading-none mb-1">
                      EMAIL ME
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">njdiscalsote25@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 p-2 -mx-2 rounded-xl">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase leading-none mb-1">
                      CALL DIRECT
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">+63 945 882 1221</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 p-2 -mx-2 rounded-xl">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase leading-none mb-1">
                      RESPONSE SLA
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">Proposal draft in &lt;12 Hours</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 p-2 -mx-2 rounded-xl">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase leading-none mb-1">
                      LOCATION
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">Manila, Philippines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust assurances */}
            <div className="p-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] flex items-start space-x-3.5">
              <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Strict NDA Protection
                </span>
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 leading-relaxed">
                  All shared concepts, commercial operational details, and backend specs remain fully protected under standardized digital agreements.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Interactive Form */}
          <div className="lg:col-span-7">

            {/* Main switcher pills */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl mb-6 max-w-xs">
              <button
                type="button"
                onClick={() => setContactMode("standard")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${contactMode === "standard"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-slate-300"
                  }`}
              >
                <span>📋 Inquiry Form</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMode("ai")}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${contactMode === "ai"
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-slate-300"
                  }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                <span>Interact with AI</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {contactMode === "ai" ? (
                <motion.div
                  key="ai-wizard-view"
                  className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 shadow-sm relative"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6">
                    <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-500" /> AI Consultation Pilot
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Instantly estimate project budgets, draft structured RFPs, design creative brand identities, slogans, and typographic visual stylesheets dynamically!
                    </p>
                  </div>
                  <AIProjectWizard />
                </motion.div>
              ) : (
                <motion.div
                  key="standard-form-view"
                  className="w-full"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/50 shadow-sm relative">
                    <AnimatePresence mode="wait">
                      {!success ? (
                        <motion.form
                          key="form-inquiry"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                          className="space-y-5"
                        >

                          {/* Rows */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label htmlFor="fullName" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g. Maria Santos"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                Email Address *
                              </label>
                              <input
                                type="type"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g. maria@company.com"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label htmlFor="phone" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g. +63 912 345 6789"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label htmlFor="companyName" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g. Apex Logistics INC"
                              />
                            </div>
                          </div>

                          {/* Integrated service option selection dropdown */}
                          <div className="space-y-1.5">
                            <label htmlFor="serviceInterested" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                              Service Interested In *
                            </label>
                            <select
                              id="serviceInterested"
                              name="serviceInterested"
                              required
                              value={formData.serviceInterested}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                              <option value="">-- Please select a service --</option>
                              {SERVICES.map((s) => (
                                <option key={s.id} value={s.title}>
                                  {s.title} ({s.badge})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Message */}
                          <div className="space-y-1.5">
                            <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono uppercase">
                              Message / Scope details *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              required
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                              placeholder="Please describe your features, operational requirements, or design specifications..."
                            />
                          </div>

                          {/* Button */}
                          <button
                            type="submit"
                            id="contact-submit-btn"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/35 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                          >
                            {loading ? (
                              <div className="flex items-center space-x-2">
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Validating Credentials...</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span>Send Inquiry</span>
                                <Send className="h-4 w-4" />
                              </div>
                            )}
                          </button>

                        </motion.form>
                      ) : (
                        <motion.div
                          key="success-receipt"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-6 text-center space-y-6"
                        >
                          <div className="h-16 w-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                            <CheckCircle className="h-8 w-8" />
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                              Inquiry Received!
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
                              Your submission has been securely captured by the JN Digital portal. Standard SLA response indicators show draft dispatch within 12 hours.
                            </p>
                          </div>

                          {/* Submitted details diagnostic card */}
                          <div className="text-left bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl max-w-md mx-auto font-mono text-[11px] leading-relaxed select-text">
                            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3 mb-3">
                              <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 animate-pulse" /> SYSTEM RECEIPT
                              </span>
                              <span className="text-slate-400">ID: JN-{(Math.random() * 1000).toFixed(0)}</span>
                            </div>
                            <div className="space-y-1">
                              <p><span className="text-slate-400 font-medium">NAME:</span> {submittedData?.fullName}</p>
                              <p><span className="text-slate-400 font-medium">EMAIL:</span> {submittedData?.email}</p>
                              <p><span className="text-slate-400 font-medium">PHONE:</span> {submittedData?.phone}</p>
                              {submittedData?.companyName && <p><span className="text-slate-400 font-medium">COMPANY:</span> {submittedData?.companyName}</p>}
                              <p><span className="text-slate-400 font-medium">INTEREST:</span> {submittedData?.serviceInterested}</p>
                              <p className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-1.5 mt-1.5 text-slate-500 dark:text-slate-400 italic">
                                "{(submittedData?.message || "").slice(0, 100)}..."
                              </p>
                            </div>
                          </div>

                          <button
                            id="reset-form-btn"
                            onClick={() => setSuccess(false)}
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
                          >
                            Submit another inquiry
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
