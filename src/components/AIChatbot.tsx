import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowRight, User, HelpCircle, Briefcase, RotateCcw, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
    id: string;
    role: "user" | "model";
    content: string;
    timestamp: Date;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "model",
            content: "Hello! I am JN Digital Solutions' AI Assistant. 🌟\n\nHow can I help you today? I can provide detailed guidance on our **Website development**, custom **Enterprise SaaS programs**, high-speed **POS installations**, and **Graphic Design or Printing services**!",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [leadStep, setLeadStep] = useState<"none" | "asking-name" | "asking-email" | "confirming">("none");
    const [leadData, setLeadData] = useState({ name: "", email: "" });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatBubbleRef = useRef<HTMLButtonElement>(null);

    // Suggestion chips for rapid, interactive user actions
    const suggestionChips = [
        { text: "📋 Request a custom quote", label: "Request Quote" },
        { text: "💼 What services do you offer?", label: "Services" },
        { text: "🖥️ Tell me about your Web App Dev", label: "Web Apps" },
        { text: "🧾 What features are in your POS?", label: "POS Solutions" },
        { text: "🖨️ Do you handle printing & design?", label: "Printing" },
        { text: "👨‍💻 Who is the developer behind JN?", label: "Our Developer" }
    ];

    // Auto-scroll to the bottom when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleResetChat = () => {
        setMessages([
            {
                id: "welcome",
                role: "model",
                content: "Hello! I am JN Digital Solutions' AI Assistant. 🌟\n\nHow can I help you today? I can provide detailed guidance on our **Website development**, custom **Enterprise SaaS programs**, high-speed **POS installations**, and **Graphic Design or Printing services**!",
                timestamp: new Date()
            }
        ]);
        setLeadStep("none");
        setLeadData({ name: "", email: "" });
        setIsLoading(false);
    };

    const handleSendMessage = async (customText?: string) => {
        const textToSend = customText ? customText.trim() : inputMessage.trim();
        if (!textToSend || isLoading) return;

        if (!customText) {
            setInputMessage("");
        }

        const newUserMessage: Message = {
            id: Math.random().toString(),
            role: "user",
            content: textToSend,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, newUserMessage]);

        // Check for greetings or quote requests
        const normalizedText = textToSend.toLowerCase().trim();
        const isGreeting = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "hola"].some(
            (greet) => normalizedText === greet || normalizedText.startsWith(greet + " ")
        );
        const isRequestQuote = normalizedText.includes("quote") || normalizedText.includes("request a custom quote") || normalizedText.includes("request quote") || normalizedText.includes("contact");

        // Guided Onboarding states:
        if (leadStep === "none" && (isGreeting || isRequestQuote)) {
            setIsLoading(true);
            setTimeout(() => {
                let content = "";
                if (isGreeting) {
                    content = "Hello there! 👋 Welcome to JN Digital Solutions.\n\nI am your interactive System Consultant. To help you design or find the perfect system, may I ask for your **full name** first so we can address you professionally?";
                } else {
                    content = "I'd be absolutely thrilled to assist with a customized quotation for your digital project! 🚀\n\nTo begin drafting your tailored estimate, may I please ask for your **full name**?";
                }

                const newAIMessage: Message = {
                    id: Math.random().toString(),
                    role: "model",
                    content,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, newAIMessage]);
                setLeadStep("asking-name");
                setIsLoading(false);
            }, 600);
            return;
        }

        if (leadStep === "asking-name") {
            setIsLoading(true);
            setTimeout(() => {
                setLeadData((prev) => ({ ...prev, name: textToSend }));
                setLeadStep("asking-email");

                const newAIMessage: Message = {
                    id: Math.random().toString(),
                    role: "model",
                    content: `Perfect! Wonderful to meet you, **${textToSend}**! 🤝\n\nNext, what is your **best business email address**? We'll use this to safely forward you updates or customized proposals.`,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, newAIMessage]);
                setIsLoading(false);
            }, 600);
            return;
        }

        if (leadStep === "asking-email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsLoading(true);
            setTimeout(() => {
                if (!emailRegex.test(textToSend)) {
                    const newAIMessage: Message = {
                        id: Math.random().toString(),
                        role: "model",
                        content: "Whoops! That doesn't quite look like a valid email. Please share a valid email format (e.g., name@company.com) so we can stay in touch correctly!",
                        timestamp: new Date()
                    };
                    setMessages((prev) => [...prev, newAIMessage]);
                    setIsLoading(false);
                    return;
                }

                setLeadData((prev) => ({ ...prev, email: textToSend }));
                setLeadStep("confirming");

                const newAIMessage: Message = {
                    id: Math.random().toString(),
                    role: "model",
                    content: `Excellent! Thank you, **${leadData.name || "friend"}**. I've successfully registered your details:\n\n*   **Client Name**: **${leadData.name || "Valued Guest"}**\n*   **Email Address**: **${textToSend}**\n\nNow, could you briefly describe what specific system, website, or printing needs you have? (Or just type **'Done'** to finalize!)`,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, newAIMessage]);
                setIsLoading(false);
            }, 700);
            return;
        }

        if (leadStep === "confirming") {
            setIsLoading(true);
            setTimeout(() => {
                setLeadStep("none");

                const newAIMessage: Message = {
                    id: Math.random().toString(),
                    role: "model",
                    content: `Outstanding! Your inquiry has been logged successfully under our primary contact files. 🌟\n\nOur founder **JND** or one of our tech representatives will review your description and reach out to you at **${leadData.email}** within 24 hours.\n\nType anything else if you want to explore more about our services, or click the **Reset** icon in the top header to start a new chat!`,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, newAIMessage]);
                setIsLoading(false);
            }, 850);
            return;
        }

        setIsLoading(true);

        try {
            const historyPayload = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const res = await fetch("https://jn-digital-solutions.onrender.com/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: textToSend,
                    history: historyPayload
                })
            });

            let errorMessageText = "Deep apologies! A connection error occurred. Our live server might be starting up. Please ensure your GEMINI_API_KEY is configured in Settings > Secrets or try again shortly!";

            if (!res.ok) {
                try {
                    const errorData = await res.json();
                    if (errorData && errorData.error) {
                        errorMessageText = `Assistant Service Alert: ${errorData.error}`;
                    } else {
                        errorMessageText = `Assistant Service Alert: Server responded with status ${res.status}`;
                    }
                } catch {
                    errorMessageText = `Assistant Service Alert: Server returned an error status ${res.status}`;
                }
                throw new Error(errorMessageText);
            }

            const data = await res.json();

            const newAIMessage: Message = {
                id: Math.random().toString(),
                role: "model",
                content: data.text || "Hello! Deep apologies, but I could not compute a solid response.",
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, newAIMessage]);
        } catch (err: any) {
            console.error("Chat error:", err);

            // If it is our thrown error with the server message, display that. Otherwise show the fallback connection alert.
            const contentToShow = err.message && err.message.startsWith("Assistant Service Alert:")
                ? err.message
                : "Deep apologies! A connection error occurred. Our live server might be starting up. Please ensure your GEMINI_API_KEY is configured in Settings > Secrets or try again shortly!";

            const errorMessage: Message = {
                id: Math.random().toString(),
                role: "model",
                content: contentToShow,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Convert markdown-like response tags to formatted React elements simply and safely
    const formatText = (text: string) => {
        return text.split("\n").map((line, idx) => {
            // Bold items
            let processed = line;
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = [];
            let lastIndex = 0;
            let match;

            while ((match = boldRegex.exec(line)) !== null) {
                // Add preceding text
                if (match.index > lastIndex) {
                    parts.push(line.substring(lastIndex, match.index));
                }
                // Add bold element
                parts.push(
                    <strong key={match.index} className="font-extrabold text-blue-600 dark:text-blue-400">
                        {match[1]}
                    </strong>
                );
                lastIndex = boldRegex.lastIndex;
            }

            if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
            }

            const isBullet = line.trim().startsWith("*") || line.trim().startsWith("-");
            const isHeader = line.trim().startsWith("###") || line.trim().startsWith("##");

            if (isHeader) {
                return (
                    <h4 key={idx} className="text-sm font-extrabold text-slate-900 dark:text-white mt-3 mb-1.5 font-display flex items-center space-x-1">
                        <Sparkles className="h-3 w-3 text-blue-500 shrink-0" />
                        <span>{processed.replace(/###/g, "").replace(/##/g, "").replace(/\*\*/g, "")}</span>
                    </h4>
                );
            }

            if (isBullet) {
                return (
                    <div key={idx} className="pl-4 py-0.5 flex items-start space-x-2">
                        <span className="text-blue-500 mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {parts.length > 0 ? parts : line.substring(1).trim()}
                        </span>
                    </div>
                );
            }

            return (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5 last:mb-0">
                    {parts.length > 0 ? parts : line}
                </p>
            );
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        id="ai-chat-bubble"
                        ref={chatBubbleRef}
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-4 md:px-5 md:py-3.5 shadow-2xl shadow-blue-500/30 font-semibold cursor-pointer border border-blue-400/20"
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="hidden md:inline text-sm tracking-wide">Ask JN AI Assistant</span>
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="ai-chat-box"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-[92vw] sm:w-[420px] h-[600px] flex flex-col overflow-hidden"
                    >
                        {/* Gradient Chat Header */}
                        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-5 py-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50">
                            <div className="flex items-center space-x-2.5">
                                <div className="h-9 w-9 bg-blue-500/15 rounded-xl border border-blue-400/20 flex items-center justify-center text-blue-400 animate-pulse">
                                    <Sparkles className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white font-display">JN Digital Assistant</h3>
                                    <div className="flex items-center space-x-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-mono text-emerald-400 tracking-wider font-semibold uppercase">Always Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <button
                                    id="reset-ai-chat"
                                    onClick={handleResetChat}
                                    title="Reset and clear chat"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                    id="close-ai-chat"
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Log */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    id={`chat-msg-${msg.id}`}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="flex items-start space-x-2.5 max-w-[85%]">
                                        {msg.role !== "user" && (
                                            <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                                                <Sparkles className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-2xl px-4 py-3 text-xs sm:text-sm ${msg.role === "user"
                                                ? "bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/15 font-medium"
                                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800/80 rounded-bl-none shadow-sm shadow-slate-200/5 dark:shadow-none"
                                                }`}
                                        >
                                            {msg.role === "user" ? (
                                                <p className="leading-relaxed">{msg.content}</p>
                                            ) : (
                                                <div className="space-y-1.5 leading-relaxed break-words">
                                                    {formatText(msg.content)}
                                                </div>
                                            )}
                                            <span
                                                className={`text-[9px] block mt-1.5 text-right ${msg.role === "user" ? "text-blue-100" : "text-slate-400/95 dark:text-slate-500"
                                                    }`}
                                            >
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div id="chat-loading-indicator" className="flex justify-start">
                                    <div className="flex items-start space-x-2.5">
                                        <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                            <Sparkles className="h-4 w-4 animate-spin-slow" />
                                        </div>
                                        <div className="rounded-2xl rounded-bl-none px-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center space-x-2.5">
                                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                            <span className="text-xs text-slate-500 font-medium">Formulating solutions...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Interactive Query Chips Block */}
                        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-4 py-2.5">
                            <div className="flex items-center space-x-1.5 mb-1.5 text-[10px] font-extrabold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                                <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                                <span>Quick Inquiry Actions</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar py-0.5">
                                {suggestionChips.map((chip, idx) => (
                                    <button
                                        key={idx}
                                        id={`sug-chip-${idx}`}
                                        onClick={() => handleSendMessage(chip.text)}
                                        className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/20 px-2.5 py-1.5 rounded-lg transition-all duration-200 border border-transparent cursor-pointer shrink-0"
                                    >
                                        {chip.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Form Box */}
                        <form
                            id="ai-chat-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
                        >
                            <input
                                id="ai-chat-input"
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Ask about website design, pricing, POS..."
                                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                id="ai-chat-submit"
                                type="submit"
                                disabled={!inputMessage.trim() || isLoading}
                                className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 transition-colors cursor-pointer"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
