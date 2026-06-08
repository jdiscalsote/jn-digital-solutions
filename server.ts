import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

async function startServer() {
    const app = express();
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    console.log("Gemini Developer Key Present:", !!process.env.GEMINI_API_KEY);
    console.log("Google Cloud Configuration Details:", {
        GOOGLE_GENAI_USE_VERTEXAI: process.env.GOOGLE_GENAI_USE_VERTEXAI,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS ? "Configured" : "Undefined/Missing",
        GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || "Undefined",
    });

    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://jdiscalsote.github.io"
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    }));

    app.options("*", cors({ origin: allowedOrigins }));
    app.use(express.json());

    // Recoverable on-demand client initialization
    let ai: GoogleGenAI | null = null;

    function getAiClient(): GoogleGenAI | null {
        if (ai) return ai;

        const projectId = process.env.GOOGLE_CLOUD_PROJECT;
        const key = process.env.GEMINI_API_KEY?.trim();

        // Target Path A: Google Cloud Vertex AI Authentication Integration
        if (projectId && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            ai = new GoogleGenAI({
                enterprise: true,
                project: projectId,
                location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1"
            });
            console.log("[AI] Initialized successfully using Vertex AI Service Account Identity Hub!");
            return ai;
        }

        // Target Path B: Standard Google AI Studio Developer API Key Fallback
        if (key && key.length >= 10) {
            ai = new GoogleGenAI({
                apiKey: key,
                httpOptions: {
                    headers: { "User-Agent": "aistudio-build" }
                }
            });
            console.log("[AI] Initialized successfully using Developer API Key profile.");
            return ai;
        }

        console.log("[AI] Environment Warning: No valid API Key or Google Cloud Project configuration discovered.");
        return null;
    }

    // Run verification on startup initialization step
    const activeClientInstance = getAiClient();
    if (!activeClientInstance) {
        console.log("AI Core is currently offline. Utilizing rich local fallback expert assistant for client interfaces.");
    }

    function getOfflineResponse(message: string): string {
        const query = message.toLowerCase();

        if (
            query.includes("founder") ||
            query.includes("developer") ||
            query.includes("nj") ||
            query.includes("noly") ||
            query.includes("who is") ||
            query.includes("background") ||
            query.includes("experience") ||
            query.includes("portfolio") ||
            query.includes("profile") ||
            query.includes("about the owner") ||
            query.includes("about you")
        ) {
            return `### Meet our Founder & Chief Engineer 👨‍💻\nOur founder, architect, and lead engineer is **JND**, a Senior Full-Stack Software Developer & Systems Analyst with **over 5+ years of professional experience** in digital engineering.\n\nHe specializes in building secure, high-concurrency systems and custom corporate architectures.\n\n**Key Career Milestones:**\n* **Enterprise-Grade Experience**: Engineered critical business platforms for prominent industry giants, including **New San Jose Builders Inc.**, **Accenture**, **Federal Land Inc.**, and **HRD Singapore**.\n* **Proven Track Record**: Successfully designed and delivered **12+ custom software systems** running in production, ranging from automated bid comparisons to live asset dashboards.\n* **Expert Solutions**: Oversees every single technical asset delivered under the **JN Digital Solutions** brand to ensure beautiful, robust, and safe execution.\n\nDo you have a project in mind? NJ will personally consult with you to design and build an optimized system for your enterprise!`;
        }

        if (
            query.includes("web app") ||
            query.includes("enterprise") ||
            query.includes("saas") ||
            query.includes("crm") ||
            query.includes("system") ||
            query.includes("procurement") ||
            query.includes("hr ") ||
            query.includes("payroll") ||
            query.includes("inventory") ||
            query.includes("erp") ||
            query.includes("software")
        ) {
            return `### Premium Enterprise Web Applications (SaaS) 📊\nWe design and develop custom, highly scalable internal systems to automate your company's processes, eliminate bottlenecks, and secure data storage.\n\n**Some of our specialized platforms include:**\n1.  **Centralized Procurement Suites**: Track inter-departmental budget requests, manage supplier bid matrices, execute structured approval flows, and auto-generate purchase orders.\n2.  **Human Resource Information Systems (HRIS)**: Full personnel profiles, automated tax computations, dynamic leave counters, and automatic payslip distribution.\n3.  **Real-Time Stock & Warehouse Managers**: Live tracking across multiple locations, instant low-inventory warnings, serial tracking, and automated barcode tags.\n4.  **Service Desk & SLA Tickers**: Direct ticket routing, automatic timers, priority flags, and dynamic performance feedback charts.\n\nWe utilize a robust stack including **ASP.NET Core**, **React**, and secure **SQL Server** databases to guarantee flawless enterprise performance. Let's build your perfect workflow portal!`;
        }

        if (
            query.includes("website") ||
            query.includes("web design") ||
            query.includes("landing page") ||
            query.includes("e-commerce") ||
            query.includes("storefront") ||
            query.includes("cms")
        ) {
            return `### High-Converting Websites & E-Commerce Storefronts 🌐\nGet a stunning online presence designed specifically to build credibility, attract organic traffic, and convert visitors into loyal customers.\n\n**Our Core Offerings:**\n* **Bespoke Landing Pages**: Laser-focused single-screen layouts engineered for high lead extraction and seamless modern user interactions.\n* **Premium Corporate Websites**: High-impact modern layouts featuring beautiful typography, response metrics, visual maps, and structured service showcases.\n* **Tailored E-Commerce Systems**: Complete product variations (sizing, color, style), interactive shopping carts, simple checkout triggers, and automated notification receipts.\n* **Friendly CMS Panels**: Effortlessly update photos, texts, or catalog listings through an intuitive dashboard without touching a single line of software code.\n\nEvery website we deploy features premium mobile-responsiveness, high SEO audit scores, and super-fast load speeds.`;
        }

        if (
            query.includes("mobile") ||
            query.includes("app dev") ||
            query.includes("ios") ||
            query.includes("android") ||
            query.includes("flutter") ||
            query.includes("phone")
        ) {
            return `### Custom Mobile Application Development 📱\nWe build highly optimized mobile applications for both **iOS** and **Android** that operate beautifully both online and offline.\n\n**Key Technical Advantages:**\n* **Single-Codebase Efficiency**: We use Google's cutting-edge **Flutter** framework. This allows us to deploy to both Apple iOS and Android App stores simultaneously—**saving you up to 50% in development costs** and timelines!\n* **Offline Data Synchronizers**: Allow your delivery dispatchers or roaming sales agents to log notes or check files even while disconnected. Our engine automatically syncs records once a signal is restored.\n* **Modern Workflows**: Quick smartphone camera uploads, biometrics (Face ID/Fingerprint), live push notifications, and map tracking integration.\n\nLet's discuss and layout your custom mobile application roadmap!`;
        }

        if (
            query.includes("pos") ||
            query.includes("point of sale") ||
            query.includes("cashier") ||
            query.includes("receipt") ||
            query.includes("terminal") ||
            query.includes("checkout")
        ) {
            return `### Automated Cashier & Point of Sale (POS) Systems 🧾\nOptimize your restaurant, checkout lanes, or retail counters with our highly optimized software designed for speed and clarity.\n\n**Standard Capabilities Integrated:**\n* **High-Speed Checkouts**: Streamlined cashiers' workspace featuring click-to-cart, barcodes, active discount codes, and quick payment inputs.\n* **Thermal Roll Compatibility**: Standard layout scripts designed to output beautiful, crisp receipts directly to 58mm or 80mm thermal receipt printers.\n* **Live Store ledger & Inventory**: Automated stock decrements at checkout, low inventory visual markers, and simplified batch stock adjustment panels.\n* **Sales Insights & Reports**: Interactive telemetry dashboards highlighting best-performing sales agents, hourly transaction rates, and printable CSV/PDF export journals.\n\nWe make your physical point of check-out extremely efficient and reliable.`;
        }

        if (
            query.includes("print") ||
            query.includes("graphic") ||
            query.includes("tarpaulin") ||
            query.includes("business card") ||
            query.includes("design") ||
            query.includes("brochure") ||
            query.includes("logo") ||
            query.includes("flyer")
        ) {
            return `### High-Impact Graphic Design & Premium Printing 🎨\nWe help elevate your company's physical branding with premium, custom-created print visuals and high-precision physical deliverables.\n\n**Our Core Printing & Creative Range:**\n* **Tarpaulin Advertisements**: Vibrant, highly weather-resistant vinyl prints designed to attract massive attention during store openings, seasonal promos, or birthday bashes.\n* **Bespoke Executive Business Cards**: Double-sided premium paper stocks featuring modern layouts, soft-touch laminates, and elegant logos.\n* **Brochures, Folders & Posters**: Perfectly colored handouts that describe your enterprise values and pricing packages in cohesive brand palettes.\n* **Total Logo & style Identity Packages**: Establish a gorgeous corporate style guide with professional custom typography, primary color codes, and print assets.\n\nWe combine gorgeous vector layouts with high-precision print production to make your physical branding look spectacular.`;
        }

        if (
            query.includes("tech") ||
            query.includes("stack") ||
            query.includes("language") ||
            query.includes("database") ||
            query.includes("sql") ||
            query.includes("framework") ||
            query.includes("c#") ||
            query.includes(".net") ||
            query.includes("react")
        ) {
            return `### Enterprise-Grade Engineering & Technology Stack ⚙️\nAt **JN Digital Solutions**, we strictly avoid experimental patterns, opting instead to construct systems using battle-tested enterprise technologies:\n\n* **Backend Application Servers**: **C# / ASP.NET Core** and Node.js. Outperforms other options with stellar multi-threading, security, and enterprise database bindings.\n* **Dynamic Client Interfaces**: **React / Vite** paired with Tailwind CSS for web apps, and **ASP.NET Blazor (MudBlazor)** for fast, unified dashboard panels.\n* **High-Performance Mobile Systems**: **Flutter** (Dart) for flawless native performance on both Android and iOS devices.\n* **Relational Database Engine**: **Microsoft SQL Server**, **PostgreSQL**, and **MySQL**. Configured with strict schema relationships, daily automated backups, and encrypted fields.\n\nOur stack ensures that the applications you purchase today remain fast, structured, and easy to maintain over years of growth.`;
        }

        if (
            query.includes("quote") ||
            query.includes("price") ||
            query.includes("cost") ||
            query.includes("contact") ||
            query.includes("hire") ||
            query.includes("estimate") ||
            query.includes("email") ||
            query.includes("reach") ||
            query.includes("address") ||
            query.includes("location") ||
            query.includes("map") ||
            query.includes("phone")
        ) {
            return `### Let's Build Your Digital Future Together! 🚀\nReady to acquire a high-performance system or premium branding print collaterals? We make booking a simple, friendly process!\n\n**How to Proceed:**\n1.  **Submit our Inquiry Form**: Simply scroll down to the **Contact Section** at the bottom of our web layout. Input your full name, business email, active contact number, and a brief explanation of your custom needs.\n2.  **Locate Our Office**: You can view our map location at the bottom of the landing page, rendering exactly where we are based to plan visits.\n3.  **Inquire Here**: Ask us direct questions in this chat to learn more about your system specifications.\n\nWe offer detailed, itemized estimates tailored strictly to your specific budget and technological milestones. Reach out to NJ today and let's get started!`;
        }

        if (query.includes("service") || query.includes("offer") || query.includes("what do you do") || query.includes("help me")) {
            return `### Custom Software & Graphic Designs Offered 💼\nAt **JN Digital Solutions**, we turn manual business operations into high-efficiency automated digital workflows. Here are our main services:\n\n* **Website Development** 🌐: Landing pages, speed-optimized corporate profiles, and e-commerce carts with custom administrative controllers.\n* **Web Applications (SaaS/ERP)** 📊: Custom internal software systems like **centralized Procurement flows**, **HR portals**, and **warehouse calculators**.\n* **Mobile App Development** 📱: High-fidelity native applications for iOS and Android powered by **Flutter** with full offline storage capabilities.\n* **POS Terminal Systems** 🧾: Tailored cashier desks with thermal print receipt scripts, inventory ledger tracking, and instant barcoding.\n* **Graphic Design & High-Def Printing** 🎨: Tarpaulin print layouts, executive business cards, folded flyers, and cohesive style guidelines.\n\nLet us know which service we can outline for you, or scroll to the bottom of the page to submit a project request!`;
        }

        return `### Greetings from JN Digital Solutions! 👋\nThank you for reaching out to us. I am here to share expert information regarding our digital products and printing.\n\nYour query: *"${message}"*\n\nTo best assist you, let me know which area you would like to explore:\n* **Website Development & Storefronts** 🌐\n* **Enterprise SaaS web apps (Procurement, HR, Inventory)** 📊\n* **Mobile App Solutions (Flutter)** 📱\n* **Point of Sale (POS) cashier systems** 🧾\n* **High-Quality Printing & Graphics** 🎨\n* **Founder NJ's full background & tech stack** 👨‍💻\n* **Requesting a price quotation** 🚀\n\n*Quick Tip*: You can quickly submit details regarding your venture by scrolling down directly to the **Contact Section** at the bottom of this page!`;
    }

    // Standardized generation router built safely over unified SDK initialization context
    async function aiGenerateContent(params: {
        model: string;
        contents: any;
        config?: {
            systemInstruction?: string;
            temperature?: number;
            responseMimeType?: string;
            responseSchema?: any;
        };
    }) {
        const aiClient = getAiClient();
        if (!aiClient) {
            throw new Error("No active Gemini API configuration or Google Cloud credentials found.");
        }

        let formattedContents = params.contents;
        if (typeof formattedContents === "string") {
            formattedContents = [
                {
                    role: "user",
                    parts: [{ text: formattedContents }]
                }
            ];
        } else if (Array.isArray(formattedContents)) {
            formattedContents = formattedContents.map((turn: any) => {
                if (turn?.parts) return turn;
                if (turn?.content) {
                    return {
                        role: turn.role === "user" ? "user" : "model",
                        parts: [{ text: turn.content }]
                    };
                }
                return turn;
            });
        }

        // Auto-repoints internal outdated placeholder names cleanly to valid ones
        const targetedModel = params.model.includes("gemini-3.5") ? "gemini-2.5-flash" : params.model;

        const response = await aiClient.models.generateContent({
            model: targetedModel,
            contents: formattedContents,
            config: params.config ? {
                temperature: params.config.temperature,
                responseMimeType: params.config.responseMimeType,
                responseSchema: params.config.responseSchema,
                systemInstruction: params.config.systemInstruction
            } : undefined
        });

        return response;
    }

    // 1. Text Sandbox Route
    app.post("/api/generate", async (req, res) => {
        try {
            const { prompt } = req.body;
            if (!prompt) {
                return res.status(400).json({ error: "Prompt is required in the request body." });
            }

            const aiClient = getAiClient();
            if (!aiClient) {
                return res.status(500).json({ error: "Gemini client failed to initialize. Check engine configs." });
            }

            const response = await aiClient.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            return res.json({ text: response.text });
        } catch (error: any) {
            console.error("Error calling Gemini API:", error);
            return res.status(500).json({ error: error.message || "An error occurred while generating content." });
        }
    });

    // 2. Project Estimate Endpoint Route
    app.post("/api/estimate", async (req, res) => {
        try {
            const { description, serviceType } = req.body;
            if (!description) {
                return res.status(400).json({ error: "Project description is required." });
            }

            const defaultOfflineResponse = {
                estimatedWeeks: serviceType?.toLowerCase().includes("landing") ? 2 : 5,
                estimatedPriceRange: serviceType?.toLowerCase().includes("landing") ? "₱15,000 - ₱25,000 PHP" : "₱55,000 - ₱85,000 PHP",
                suggestedStack: ["ASP.NET Core", "React (Vite)", "SQL Server", "Tailwind CSS"],
                scopeBreakdown: [
                    "Responsive client-facing interfaces",
                    "Custom administrative dashboard panel",
                    "Automated lead delivery and storage ledger",
                    "Optimized database schema configuration",
                    "Comprehensive search & audit capability"
                ],
                technicalSpecsDraft: `### Technical Specification Proposal\n\n**Prepared for**: Valued Client  \n**Recommended Engine Architecture**: ASP.NET Core & React (Vite)  \n**Description Analyzed**: "${description}"  \n\n#### Suggested Milestones:\n1. **Milestone 1**: UI/UX Wireframes & Database Schema Design (Week 1-2)\n2. **Milestone 2**: Core Backend API Layer Services & Data Tables (Week 3)\n3. **Milestone 3**: Dashboard Integration, Custom Rules & Reporting Tools (Week 4)\n4. **Milestone 4**: Final Deployment, Speed Optimization & SEO Audits (Week 5)`
            };

            if (!getAiClient()) {
                return res.json(defaultOfflineResponse);
            }

            const systemInstruction = `You are the Expert Technical Architect & Lead Estimator of JN Digital Solutions. Your job is to analyze client project descriptions and provide an accurate development timeline, cost range (in PHP currency), recommended modern tech stack, a bulleted list of 5 key module scopes, and a formatted markdown Technical Specification Draft. Return response strictly in JSON format.`;

            const prompt = `Analyze this project:\nService Type: ${serviceType || "Custom System / Web Suite"}\nProject Description: "${description}"`;

            try {
                const response = await aiGenerateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        systemInstruction,
                        temperature: 0.3,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                estimatedWeeks: { type: Type.INTEGER },
                                estimatedPriceRange: { type: Type.STRING },
                                suggestedStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                                scopeBreakdown: { type: Type.ARRAY, items: { type: Type.STRING } },
                                technicalSpecsDraft: { type: Type.STRING }
                            },
                            required: ["estimatedWeeks", "estimatedPriceRange", "suggestedStack", "scopeBreakdown", "technicalSpecsDraft"]
                        }
                    }
                });

                return res.json(JSON.parse((response.text || "").trim()));
            } catch (geminiErr) {
                return res.json(defaultOfflineResponse);
            }
        } catch (outerErr: any) {
            return res.status(500).json({ error: outerErr.message || "Failed to analyze estimate parameters." });
        }
    });

    // 3. Brand Strategy Design Route
    app.post("/api/brand-planner", async (req, res) => {
        try {
            const { description, industry } = req.body;
            if (!description) {
                return res.status(400).json({ error: "Brand context description is required." });
            }

            const defaultOfflineResponse = {
                slogans: ["Crafted to Perfection", "Next-Gen Digital Elevation", "The Future of Seamless Growth", "Simplicity Meets Power"],
                brandColors: [
                    { name: "Cosmic Midnight", hex: "#0F172A", tailwindClass: "bg-slate-900 text-white" },
                    { name: "SaaS Electric Blue", hex: "#3B82F6", tailwindClass: "bg-indigo-600 text-white" },
                    { name: "Cyber Accent Teal", hex: "#14B8A6", tailwindClass: "bg-teal-500 text-slate-950" },
                    { name: "Soft Linen Light", hex: "#F8FAFC", tailwindClass: "bg-slate-100 text-slate-800" }
                ],
                googleFontPairing: "Space Grotesk + Inter",
                vibeDescription: "A powerful, innovative digital aesthetic leveraging high-contrast corporate blues and tech-forward typographic pairings."
            };

            if (!getAiClient()) {
                return res.json(defaultOfflineResponse);
            }

            const systemInstruction = `You are the Lead Creative Director & Graphic Brand Architect at JN Digital Solutions. Your job is to generate beautiful, professional branding packages containing creative slogans, tailored brand color palettes with hex codes, recommended Google Fonts combinations, and an aesthetic statement statement. Return your response strictly in the specified JSON schema format.`;
            const prompt = `Generate branding options for:\nIndustry Sector: ${industry || "Digital Service/Retail"}\nIdea context: "${description}"`;

            try {
                const response = await aiGenerateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        systemInstruction,
                        temperature: 0.7,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                slogans: { type: Type.ARRAY, items: { type: Type.STRING } },
                                brandColors: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING },
                                            hex: { type: Type.STRING },
                                            tailwindClass: { type: Type.STRING }
                                        },
                                        required: ["name", "hex", "tailwindClass"]
                                    }
                                },
                                googleFontPairing: { type: Type.STRING },
                                vibeDescription: { type: Type.STRING }
                            },
                            required: ["slogans", "brandColors", "googleFontPairing", "vibeDescription"]
                        }
                    }
                });

                return res.json(JSON.parse((response.text || "").trim()));
            } catch (geminiErr) {
                return res.json(defaultOfflineResponse);
            }
        } catch (outerErr: any) {
            return res.status(500).json({ error: outerErr.message || "Failed to plan brand combinations." });
        }
    });

    // 4. DB Architectural Blueprint Route
    app.post("/api/db-schema", async (req, res) => {
        try {
            const { description, dbType } = req.body;
            if (!description) {
                return res.status(400).json({ error: "System explanation parameters are required." });
            }

            const targetDB = dbType || "Microsoft SQL Server";
            const defaultOfflineResponse = {
                tables: [
                    {
                        name: "Users",
                        description: "Main registry for system authentication parameters and user status.",
                        columns: [
                            { name: "UserID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique surrogate index representing each worker profile." },
                            { name: "Email", type: "VARCHAR(150)", constraints: "UNIQUE, NOT NULL", description: "Email used for logging into active portals." },
                            { name: "PasswordHash", type: "VARCHAR(256)", constraints: "NOT NULL", description: "Salted security hash of password records." }
                        ]
                    }
                ],
                relationships: [],
                sqlScript: `CREATE TABLE Users (\n    UserID INT IDENTITY(1,1) PRIMARY KEY,\n    Email VARCHAR(150) UNIQUE NOT NULL,\n    PasswordHash VARCHAR(256) NOT NULL\n);`,
                architecturalExplanation: `### Database Architecture Concept\n- **Normalization Bounds**: Structured explicitly into 3rd Normal Form bounds to defend relational logic.`
            };

            if (!getAiClient()) {
                return res.json(defaultOfflineResponse);
            }

            const systemInstruction = `You are the Lead Database Architect and Master System Analyst at JN Digital Solutions. Design professional, highly normalized schemas matching database structures for ${targetDB}. Return your response strictly in the requested JSON structure.`;
            const prompt = `Design a schema for:\nDatabase System: ${targetDB}\nSystem Description: "${description}"`;

            try {
                const response = await aiGenerateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        systemInstruction,
                        temperature: 0.2,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                tables: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING },
                                            description: { type: Type.STRING },
                                            columns: {
                                                type: Type.ARRAY,
                                                items: {
                                                    type: Type.OBJECT,
                                                    properties: {
                                                        name: { type: Type.STRING },
                                                        type: { type: Type.STRING },
                                                        constraints: { type: Type.STRING },
                                                        description: { type: Type.STRING }
                                                    },
                                                    required: ["name", "type", "constraints", "description"]
                                                }
                                            }
                                        },
                                        required: ["name", "description", "columns"]
                                    }
                                },
                                relationships: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            fromTable: { type: Type.STRING },
                                            fromColumn: { type: Type.STRING },
                                            toTable: { type: Type.STRING },
                                            toColumn: { type: Type.STRING },
                                            type: { type: Type.STRING }
                                        },
                                        required: ["fromTable", "fromColumn", "toTable", "toColumn", "type"]
                                    }
                                },
                                sqlScript: { type: Type.STRING },
                                architecturalExplanation: { type: Type.STRING }
                            },
                            required: ["tables", "relationships", "sqlScript", "architecturalExplanation"]
                        }
                    }
                });

                return res.json(JSON.parse((response.text || "").trim()));
            } catch (geminiErr) {
                return res.json(defaultOfflineResponse);
            }
        } catch (outerErr: any) {
            return res.status(500).json({ error: outerErr.message || "Failed to draft database schema." });
        }
    });

    // 5. Intelligent Client Conversational Chatbot Route
    app.post("/api/chat", async (req, res) => {
        try {
            const { message, history } = req.body;
            if (!message) {
                return res.status(400).json({ error: "Message parameter is required" });
            }

            if (!getAiClient()) {
                return res.json({ text: getOfflineResponse(message) });
            }

            const systemInstruction = `You are the official AI Assistant for JN Digital Solutions (founded by NJ, a top Full-Stack Engineer and System Analyst with 5+ years of experience and over 12 enterprise apps built). Welcome clients, answer standard questions about layouts, modules, or pricing items warmly, and act as an elite developer representative. Maintain structured markdown readability.`;

            const contentsList: any[] = [];
            if (history && Array.isArray(history)) {
                for (const turn of history) {
                    contentsList.push({
                        role: turn.role === "user" ? "user" : "model",
                        parts: [{ text: turn.content || turn.parts?.[0]?.text || "" }],
                    });
                }
            }
            contentsList.push({ role: "user", parts: [{ text: message }] });

            try {
                const response = await aiGenerateContent({
                    model: "gemini-2.5-flash",
                    contents: contentsList,
                    config: {
                        systemInstruction,
                        temperature: 0.7,
                    },
                });

                return res.json({ text: response.text || "Hello! How can I help represent JN Digital Solutions for you today?" });
            } catch (geminiErr) {
                return res.json({ text: getOfflineResponse(message) });
            }
        } catch (err: any) {
            return res.json({ text: getOfflineResponse(req.body.message || "") });
        }
    });

    // Front-End Static Delivery Engine Pipeline Handles
    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), "dist");
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    // Unified Server Operational Entry Point Listener Bind (BOUND ONCE)
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Express system dashboard executing smoothly on port ${PORT}`);
    });
}

startServer();