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

    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://jdiscalsote.github.io"
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // mobile/postman
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    }));
    app.options("*", cors());

    app.use(express.json());

    // Initialize Gemini Client
    let ai: GoogleGenAI | null = null;
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const isDummyKey = !apiKey ||
        apiKey === "AQ.Ab8RN6InJ9uTmj2Vd367p2X7ihNK12s158oizHi54WDclRnkiA" ||
        apiKey.startsWith("AQ.") ||
        apiKey.startsWith("YOUR_") ||
        apiKey.includes("placeholder");

    if (apiKey && apiKey !== "undefined" && apiKey !== "null" && apiKey !== "" && !isDummyKey) {
        if (apiKey.startsWith("AQ.")) {
            console.log("Detected AQ. prefixed token (OAuth Access Token). Configuring with Bearer Authorization header.");
            const originalEnvValue = process.env.GEMINI_API_KEY;
            delete process.env.GEMINI_API_KEY;
            try {
                ai = new GoogleGenAI({
                    apiKey: "",
                    httpOptions: {
                        headers: {
                            'User-Agent': 'aistudio-build',
                            'Authorization': `Bearer ${apiKey}`,
                        },
                    },
                });
            } finally {
                if (originalEnvValue) {
                    process.env.GEMINI_API_KEY = originalEnvValue;
                }
            }
        } else {
            ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                    headers: {
                        'User-Agent': 'aistudio-build',
                    },
                },
            });
        }
        console.log("JN AI Assistant initialized successfully with a defined GEMINI_API_KEY.");
    } else {
        console.log("GEMINI_API_KEY is not defined or is blank, or is a placeholder/invalid token. Utilizing rich local fallback expert assistant.");
    }

    function getOfflineResponse(message: string): string {
        const query = message.toLowerCase();

        // Founder / NJ / Noly / Background / Developer
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
            return `### Meet our Founder & Chief Engineer 👨‍💻
Our founder, architect, and lead engineer is **JND**, a Senior Full-Stack Software Developer & Systems Analyst with **over 5+ years of professional experience** in digital engineering.

He specializes in building secure, high-concurrency systems and custom corporate architectures.

**Key Career Milestones:**
*   **Enterprise-Grade Experience**: Engineered critical business platforms for prominent industry giants, including **New San Jose Builders Inc.**, **Accenture**, **Federal Land Inc.**, and **HRD Singapore**.
*   **Proven Track Record**: Successfully designed and delivered **12+ custom software systems** running in production, ranging from automated bid comparisons to live asset dashboards.
*   **Expert Solutions**: Oversees every single technical asset delivered under the **JN Digital Solutions** brand to ensure beautiful, robust, and safe execution.

Do you have a project in mind? NJ will personally consult with you to design and build an optimized system for your enterprise!`;
        }

        // Web Apps / Enterprise Systems
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
            return `### Premium Enterprise Web Applications (SaaS) 📊
We design and develop custom, highly scalable internal systems to automate your company's processes, eliminate bottlenecks, and secure data storage.

**Some of our specialized platforms include:**
1.  **Centralized Procurement Suites**: Track inter-departmental budget requests, manage supplier bid matrices, execute structured approval flows, and auto-generate purchase orders.
2.  **Human Resource Information Systems (HRIS)**: Full personnel profiles, automated tax computations, dynamic leave counters, and automatic payslip distribution.
3.  **Real-Time Stock & Warehouse Managers**: Live tracking across multiple locations, instant low-inventory warnings, serial tracking, and automated barcode tags.
4.  **Service Desk & SLA Tickers**: Direct ticket routing, automatic timers, priority flags, and dynamic performance feedback charts.

We utilize a robust stack including **ASP.NET Core**, **React**, and secure **SQL Server** databases to guarantee flawless enterprise performance. Let's build your perfect workflow portal!`;
        }

        // Website Development
        if (
            query.includes("website") ||
            query.includes("web design") ||
            query.includes("landing page") ||
            query.includes("e-commerce") ||
            query.includes("storefront") ||
            query.includes("cms")
        ) {
            return `### High-Converting Websites & E-Commerce Storefronts 🌐
Get a stunning online presence designed specifically to build credibility, attract organic traffic, and convert visitors into loyal customers.

**Our Core Offerings:**
*   **Bespoke Landing Pages**: Laser-focused single-screen layouts engineered for high lead extraction and seamless modern user interactions.
*   **Premium Corporate Websites**: High-impact modern layouts featuring beautiful typography, response metrics, visual maps, and structured service showcases.
*   **Tailored E-Commerce Systems**: Complete product variations (sizing, color, style), interactive shopping carts, simple checkout triggers, and automated notification receipts.
*   **Friendly CMS Panels**: Effortlessly update photos, texts, or catalog listings through an intuitive dashboard without touching a single line of software code.

Every website we deploy features premium mobile-responsiveness, high SEO audit scores, and super-fast load speeds.`;
        }

        // Mobile App / Flutter
        if (
            query.includes("mobile") ||
            query.includes("app dev") ||
            query.includes("ios") ||
            query.includes("android") ||
            query.includes("flutter") ||
            query.includes("phone")
        ) {
            return `### Custom Mobile Application Development 📱
We build highly optimized mobile applications for both **iOS** and **Android** that operate beautifully both online and offline.

**Key Technical Advantages:**
*   **Single-Codebase Efficiency**: We use Google's cutting-edge **Flutter** framework. This allows us to deploy to both Apple iOS and Android App stores simultaneously—**saving you up to 50% in development costs** and timelines!
*   **Offline Data Synchronizers**: Allow your delivery dispatchers or roaming sales agents to log notes or check files even while disconnected. Our engine automatically syncs records once a signal is restored.
*   **Modern Workflows**: Quick smartphone camera uploads, biometrics (Face ID/Fingerprint), live push notifications, and map tracking integration.

Let's discuss and layout your custom mobile application roadmap!`;
        }

        // POS
        if (
            query.includes("pos") ||
            query.includes("point of sale") ||
            query.includes("cashier") ||
            query.includes("receipt") ||
            query.includes("terminal") ||
            query.includes("checkout")
        ) {
            return `### Automated Cashier & Point of Sale (POS) Systems 🧾
Optimize your restaurant, checkout lanes, or retail counters with our highly optimized software designed for speed and clarity.

**Standard Capabilities Integrated:**
*   **High-Speed Checkouts**: Streamlined cashiers' workspace featuring click-to-cart, barcodes, active discount codes, and quick payment inputs.
*   **Thermal Roll Compatibility**: Standard layout scripts designed to output beautiful, crisp receipts directly to 58mm or 80mm thermal receipt printers.
*   **Live Store ledger & Inventory**: Automated stock decrements at checkout, low inventory visual markers, and simplified batch stock adjustment panels.
*   **Sales Insights & Reports**: Interactive telemetry dashboards highlighting best-performing sales agents, hourly transaction rates, and printable CSV/PDF export journals.

We make your physical point of check-out extremely efficient and reliable.`;
        }

        // Printing & Graphics
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
            return `### High-Impact Graphic Design & Premium Printing 🎨
We help elevate your company's physical branding with premium, custom-created print visuals and high-precision physical deliverables.

**Our Core Printing & Creative Range:**
*   **Tarpaulin Advertisements**: Vibrant, highly weather-resistant vinyl prints designed to attract massive attention during store openings, seasonal promos, or birthday bashes.
*   **Bespoke Executive Business Cards**: Double-sided premium paper stocks featuring modern layouts, soft-touch laminates, and elegant logos.
*   **Brochures, Folders & Posters**: Perfectly colored handouts that describe your enterprise values and pricing packages in cohesive brand palettes.
*   **Total Logo & style Identity Packages**: Establish a gorgeous corporate style guide with professional custom typography, primary color codes, and print assets.

We combine gorgeous vector layouts with high-precision print production to make your physical branding look spectacular.`;
        }

        // Technology Stack / Languages
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
            return `### Enterprise-Grade Engineering & Technology Stack ⚙️
At **JN Digital Solutions**, we strictly avoid experimental patterns, opting instead to construct systems using battle-tested enterprise technologies:

*   **Backend Application Servers**: **C# / ASP.NET Core** and Node.js. Outperforms other options with stellar multi-threading, security, and enterprise database bindings.
*   **Dynamic Client Interfaces**: **React / Vite** paired with Tailwind CSS for web apps, and **ASP.NET Blazor (MudBlazor)** for fast, unified dashboard panels.
*   **High-Performance Mobile Systems**: **Flutter** (Dart) for flawless native performance on both Android and iOS devices.
*   **Relational Database Engine**: **Microsoft SQL Server**, **PostgreSQL**, and **MySQL**. Configured with strict schema relationships, daily automated backups, and encrypted fields.

Our stack ensures that the applications you purchase today remain fast, structured, and easy to maintain over years of growth.`;
        }

        // Contact / Quote / Price / Hire / Reach
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
            return `### Let's Build Your Digital Future Together! 🚀
Ready to acquire a high-performance system or premium branding print collaterals? We make booking a simple, friendly process!

**How to Proceed:**
1.  **Submit our Inquiry Form**: Simply scroll down to the **Contact Section** at the bottom of our web layout. Input your full name, business email, active contact number, and a brief explanation of your custom needs.
2.  **Locate Our Office**: You can view our map location at the bottom of the landing page, rendering exactly where we are based to plan visits.
3.  **Inquire Here**: Ask us direct questions in this chat to learn more about your system specifications.

We offer detailed, itemized estimates tailored strictly to your specific budget and technological milestones. Reach out to NJ today and let's get started!`;
        }

        // General Services Summary
        if (query.includes("service") || query.includes("offer") || query.includes("what do you do") || query.includes("help me")) {
            return `### Custom Software & Graphic Designs Offered 💼
At **JN Digital Solutions**, we turn manual business operations into high-efficiency automated digital workflows. Here are our main services:

*   **Website Development** 🌐: Landing pages, speed-optimized corporate profiles, and e-commerce carts with custom administrative controllers.
*   **Web Applications (SaaS/ERP)** 📊: Custom internal software systems like **centralized Procurement flows**, **HR portals**, and **warehouse calculators**.
*   **Mobile App Development** 📱: High-fidelity native applications for iOS and Android powered by **Flutter** with full offline storage capabilities.
*   **POS Terminal Systems** 🧾: Tailored cashier desks with thermal print receipt scripts, inventory ledger tracking, and instant barcoding.
*   **Graphic Design & High-Def Printing** 🎨: Tarpaulin print layouts, executive business cards, folded flyers, and cohesive style guidelines.

Let us know which service we can outline for you, or scroll to the bottom of the page to submit a project request!`;
        }

        // General catch-all Response
        return `### Greetings from JN Digital Solutions! 👋
Thank you for reaching out to us. I am here to share expert information regarding our digital products and printing.

Your query: *"${message}"*

To best assist you, let me know which area you would like to explore:
*   **Website Development & Storefronts** 🌐
*   **Enterprise SaaS web apps (Procurement, HR, Inventory)** 📊
*   **Mobile App Solutions (Flutter)** 📱
*   **Point of Sale (POS) cashier systems** 🧾
*   **High-Quality Printing & Graphics** 🎨
*   **Founder NJ's full background & tech stack** 👨‍💻
*   **Requesting a price quotation** 🚀

*Quick Tip*: You can quickly submit details regarding your venture by scrolling down directly to the **Contact Section** at the bottom of this page!`;
    }

    // API Route for AI Project Estimate & Architecture Recommendation
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

            if (!ai) {
                return res.json(defaultOfflineResponse);
            }

            const systemInstruction = `You are the Expert Technical Architect & Lead Estimator of JN Digital Solutions. Your job is to analyze client project descriptions and provide an accurate development timeline, cost range (in PHP currency), recommended modern tech stack, a bulleted list of 5 key module scopes, and a formatted markdown Technical Specification Draft.

Return your response strictly in JSON format as defined by the given structure. Ensure the Markdown specs look incredibly professional and tailored directly to their input notes. Use standard PHP (Philippine Pesos) rate estimates. Let estimates be reasonable (e.g. Simple Landing Page: ₱15k-25k, Web Portal/SaaS: ₱45k-95k, Custom POS: ₱35k-75k).`;

            const prompt = `Analyze this project:
Service Type: ${serviceType || "Custom System / Web Suite"}
Project Description: "${description}"

Generate estimate details. Make the technicalSpecsDraft a detailed, elegant Markdown spec sheet.`;

            try {
                const response = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
                    contents: prompt,
                    config: {
                        systemInstruction,
                        temperature: 0.3,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                estimatedWeeks: { type: Type.INTEGER, description: "Estimated completion time in weeks" },
                                estimatedPriceRange: { type: Type.STRING, description: "Estimated budget range, e.g. '₱45,000 - ₱65,000 PHP'" },
                                suggestedStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Recommended languages/frameworks" },
                                scopeBreakdown: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 key functional scopes to integrate" },
                                technicalSpecsDraft: { type: Type.STRING, description: "Detailed Markdown specification document" }
                            },
                            required: ["estimatedWeeks", "estimatedPriceRange", "suggestedStack", "scopeBreakdown", "technicalSpecsDraft"]
                        }
                    }
                });

                const resultText = response.text || "";
                const parsed = JSON.parse(resultText.trim());
                return res.json(parsed);
            } catch (geminiErr: any) {
                console.info("Gemini lookup completed or utilizing local calculated specs draft fallback.", geminiErr?.message || geminiErr);
                return res.json(defaultOfflineResponse);
            }
        } catch (outerErr: any) {
            console.error("error in /api/estimate", outerErr);
            return res.status(500).json({ error: outerErr.message || "Failed to analyze estimate parameters." });
        }
    });

    // API Route for AI Brand Planner, slogans & colors
    app.post("/api/brand-planner", async (req, res) => {
        try {
            const { description, industry } = req.body;
            if (!description) {
                return res.status(400).json({ error: "Brand context or concept description is required." });
            }

            const defaultOfflineResponse = {
                slogans: [
                    "Crafted to Perfection",
                    "Next-Gen Digital Elevation",
                    "The Future of Seamless Growth",
                    "Simplicity Meets Power"
                ],
                brandColors: [
                    { name: "Cosmic Midnight", hex: "#0F172A", tailwindClass: "bg-slate-900 text-white" },
                    { name: "SaaS Electric Blue", hex: "#3B82F6", tailwindClass: "bg-indigo-600 text-white" },
                    { name: "Cyber Accent Teal", hex: "#14B8A6", tailwindClass: "bg-teal-500 text-slate-950" },
                    { name: "Soft Linen Light", hex: "#F8FAFC", tailwindClass: "bg-slate-105 text-slate-800" }
                ],
                googleFontPairing: "Space Grotesk (Headers) + Inter (Body)",
                vibeDescription: "A powerful, innovative digital aesthetic leveraging high-contrast corporate blues, crisp slate greys, and bold, tech-forward geometric typography pairings."
            };

            if (!ai) {
                return res.json(defaultOfflineResponse);
            }

            const systemInstruction = `You are the Lead Creative Director & Graphic Brand Architect at JN Digital Solutions. Your job is to generate beautiful, professional branding packages containing creative slogans, tailored brand color palettes with hex codes and suitable tailwind styles, recommended modern Google Fonts combinations, and a rich, expert aesthetic vibe statement.

Return your response strictly in the specified JSON schema format. Colors should be curated to look premium, modern, cohesive, and have great visual contrast. Avoid standard red/blue/green defaults; suggest refined slate, warm ivory, soft teal, rich amber, and indigo variations.`;

            const prompt = `Generate branding options for:
Industry Sector: ${industry || "Digital Service/Retail"}
Idea context: "${description}"`;

            try {
                const response = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
                    contents: prompt,
                    config: {
                        systemInstruction,
                        temperature: 0.7,
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                slogans: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 custom unique branding slogans/taglines" },
                                brandColors: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING, description: "Descriptive name, e.g. 'Volcanic Carbon'" },
                                            hex: { type: Type.STRING, description: "Hexadecimal color code with #" },
                                            tailwindClass: { type: Type.STRING, description: "Equivalent standard Tailwind color class, e.g. 'bg-slate-900 text-white'" }
                                        },
                                        required: ["name", "hex", "tailwindClass"]
                                    },
                                    description: "4 highly coordinated brand colors"
                                },
                                googleFontPairing: { type: Type.STRING, description: "Exact matching Google Font combination (Header + Body)" },
                                vibeDescription: { type: Type.STRING, description: "A summary explaining the design logic, character, and visual energy of this brand identity" }
                            },
                            required: ["slogans", "brandColors", "googleFontPairing", "vibeDescription"]
                        }
                    }
                });

                const resultText = response.text || "";
                const parsed = JSON.parse(resultText.trim());
                return res.json(parsed);
            } catch (geminiErr: any) {
                console.info("Gemini branding lookup completed or utilizing local creative assets fallback.", geminiErr?.message || geminiErr);
                return res.json(defaultOfflineResponse);
            }
        } catch (outerErr: any) {
            console.error("error in /api/brand-planner", outerErr);
            return res.status(500).json({ error: outerErr.message || "Failed to plan brand combinations." });
        }
    });

    // API Route for AI DB Schema Architect / Entity Relationship Planner
    app.post("/api/db-schema", async (req, res) => {
        try {
            const { description, dbType } = req.body;
            if (!description) {
                return res.status(400).json({ error: "System explanation or database context is required." });
            }

            const targetDB = dbType || "Microsoft SQL Server";

            const defaultOfflineResponse = {
                tables: [
                    {
                        name: "Users",
                        description: "Main registry for system authentication parameters and user status.",
                        columns: [
                            { name: "UserID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique surrogate index representing each employee or client." },
                            { name: "Email", type: "VARCHAR(150)", constraints: "UNIQUE, NOT NULL", description: "Email used for logging into active portals." },
                            { name: "PasswordHash", type: "VARCHAR(256)", constraints: "NOT NULL", description: "Salted security hash of password." },
                            { name: "CreatedAt", type: targetDB.includes("SQL Server") ? "DATETIME" : "TIMESTAMP", constraints: targetDB.includes("SQL Server") ? "DEFAULT GETDATE()" : "DEFAULT CURRENT_TIMESTAMP", description: "System timestamp record creation." }
                        ]
                    },
                    {
                        name: "AuditLogs",
                        description: "Persistent ledger tracking all sensitive system modifications.",
                        columns: [
                            { name: "LogID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique catalog number for tracing events." },
                            { name: "UserID", type: "INT", constraints: "FOREIGN KEY, NOT NULL", description: "The actor who triggered this specific command." },
                            { name: "ActionDesc", type: "VARCHAR(500)", constraints: "NOT NULL", description: "Contextual narrative of modification details." },
                            { name: "IPAddress", type: "VARCHAR(45)", constraints: "NOT NULL", description: "Network IP from which request originated." }
                        ]
                    }
                ],
                relationships: [
                    {
                        fromTable: "AuditLogs",
                        fromColumn: "UserID",
                        toTable: "Users",
                        toColumn: "UserID",
                        type: "Many-to-One"
                    }
                ],
                sqlScript: `-- SQL ANSI SCHEMA PROPOSAL (${targetDB}) --\n-- Designed by JN Digital Solutions AI Architect --\n\nCREATE TABLE Users (\n    UserID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    Email VARCHAR(150) UNIQUE NOT NULL,\n    PasswordHash VARCHAR(256) NOT NULL,\n    CreatedAt ${targetDB.includes("SQL Server") ? "DATETIME DEFAULT GETDATE()" : "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"}\n);\n\nCREATE TABLE AuditLogs (\n    LogID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    UserID INT NOT NULL,\n    ActionDesc VARCHAR(500) NOT NULL,\n    IPAddress VARCHAR(45) NOT NULL,\n    FOREIGN KEY (UserID) REFERENCES Users(UserID)\n);\n\nCREATE INDEX IX_AuditLogs_UserID ON AuditLogs(UserID);\n`,
                architecturalExplanation: `### Database Architecture Concept\n- **Database Normalization**: Structured into 3rd Normal Form (3NF) to guarantee zero transaction redundancy.\n- **Foreign Key Enforcement**: Ensures database relational cascading integrity across audits.\n- **Performance Indexing**: Configured with explicit secondary Indexes on frequent search bounds to keep dashboard loads extremely fast.`
            };

            let customFallbackResponse = { ...defaultOfflineResponse };
            const descLower = description.toLowerCase();
            if (descLower.includes("patient") || descLower.includes("booking") || descLower.includes("clinic") || descLower.includes("doctor") || descLower.includes("dentist")) {
                customFallbackResponse = {
                    tables: [
                        {
                            name: "Patients",
                            description: "Profiles and contact records of patients visiting the clinic.",
                            columns: [
                                { name: "PatientID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique sequence identifying patients." },
                                { name: "FirstName", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Patient's given first name." },
                                { name: "LastName", type: "VARCHAR(100)", constraints: "NOT NULL", description: "Patient's family name." },
                                { name: "PhoneNumber", type: "VARCHAR(20)", constraints: "NOT NULL", description: "Direct active phone contact." }
                            ]
                        },
                        {
                            name: "Appointments",
                            description: "Scheduled slots and notes log regarding dentist appointments.",
                            columns: [
                                { name: "AppointmentID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique number cataloging the event." },
                                { name: "PatientID", type: "INT", constraints: "FOREIGN KEY, NOT NULL", description: "Patient who booked the respective slot." },
                                { name: "ScheduleTime", type: targetDB.includes("SQL Server") ? "DATETIME" : "TIMESTAMP", constraints: "NOT NULL", description: "Planned slot calendar moment." },
                                { name: "Notes", type: targetDB.includes("SQL Server") ? "NVARCHAR(MAX)" : "TEXT", constraints: "NULL", description: "Dentist operational observation notes." }
                            ]
                        }
                    ],
                    relationships: [
                        {
                            fromTable: "Appointments",
                            fromColumn: "PatientID",
                            toTable: "Patients",
                            toColumn: "PatientID",
                            type: "Many-to-One"
                        }
                    ],
                    sqlScript: `-- SQL SCHEMA FOR CLINIC BOOKINGS (${targetDB}) --\n\nCREATE TABLE Patients (\n    PatientID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    FirstName VARCHAR(100) NOT NULL,\n    LastName VARCHAR(100) NOT NULL,\n    PhoneNumber VARCHAR(20) NOT NULL\n);\n\nCREATE TABLE Appointments (\n    AppointmentID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    PatientID INT NOT NULL,\n    ScheduleTime ${targetDB.includes("SQL Server") ? "DATETIME" : "TIMESTAMP"} NOT NULL,\n    Notes ${targetDB.includes("SQL Server") ? "NVARCHAR(MAX)" : "TEXT"} NULL,\n    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)\n);\n\nCREATE INDEX IX_Appointments_Schedule ON Appointments(ScheduleTime);\n`,
                    architecturalExplanation: `### Clinic Database Architecture Plan\n- **Relation Normalization**: Setup separate clinic patients structure from transactions log to maximize speed.\n- **System Keys**: Clean auto-increment indices representing safe surrogate keys.\n- **Query Tuning**: Integrated a clustered index pointer matching Patient appointments times to speed up scheduling calendar loads in ASP.NET dashboards.`
                };
            } else if (descLower.includes("warehouse") || descLower.includes("stock") || descLower.includes("inventory") || descLower.includes("order") || descLower.includes("sale") || descLower.includes("product") || descLower.includes("pos")) {
                customFallbackResponse = {
                    tables: [
                        {
                            name: "Products",
                            description: "Information matrix regarding items and pricing details.",
                            columns: [
                                { name: "ProductID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Unique catalog identification ID." },
                                { name: "SKU", type: "VARCHAR(50)", constraints: "UNIQUE, NOT NULL", description: "Barcode lookup SKU key identifier." },
                                { name: "ProductName", type: "VARCHAR(150)", constraints: "NOT NULL", description: "Display name of items." },
                                { name: "UnitPrice", type: "DECIMAL(18,2)", constraints: "NOT NULL", description: "The base unit monetary rate." }
                            ]
                        },
                        {
                            name: "InventoryLedger",
                            description: "A continuous table tracking inventory movements (additions/sales/transfers).",
                            columns: [
                                { name: "LogID", type: targetDB.includes("SQL Server") ? "INT IDENTITY(1,1)" : "SERIAL", constraints: "PRIMARY KEY, NOT NULL", description: "Surrogate record sequence ID." },
                                { name: "ProductID", type: "INT", constraints: "FOREIGN KEY, NOT NULL", description: "The related product index node." },
                                { name: "Quantity", type: "INT", constraints: "NOT NULL", description: "The net quantity modification (+ or - stock counts)." },
                                { name: "LogTime", type: targetDB.includes("SQL Server") ? "DATETIME" : "TIMESTAMP", constraints: targetDB.includes("SQL Server") ? "DEFAULT GETDATE()" : "DEFAULT CURRENT_TIMESTAMP", description: "Stock change transaction timestamp." }
                            ]
                        }
                    ],
                    relationships: [
                        {
                            fromTable: "InventoryLedger",
                            fromColumn: "ProductID",
                            toTable: "Products",
                            toColumn: "ProductID",
                            type: "Many-to-One"
                        }
                    ],
                    sqlScript: `-- SQL SCHEMA FOR INVENTORY TRACKING (${targetDB}) --\n\nCREATE TABLE Products (\n    ProductID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    SKU VARCHAR(50) UNIQUE NOT NULL,\n    ProductName VARCHAR(150) NOT NULL,\n    UnitPrice DECIMAL(18,2) NOT NULL\n);\n\nCREATE TABLE InventoryLedger (\n    LogID ${targetDB.includes("SQL Server") ? "INT IDENTITY(1,1) PRIMARY KEY" : "SERIAL PRIMARY KEY"},\n    ProductID INT NOT NULL,\n    Quantity INT NOT NULL,\n    LogTime ${targetDB.includes("SQL Server") ? "DATETIME DEFAULT GETDATE()" : "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},\n    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)\n);\n\nCREATE INDEX IX_Products_SKU ON Products(SKU);\n`,
                    architecturalExplanation: `### Warehouse Database Architecture Plan\n- **Inventory Synchronization**: Implements stock change triggers using safe, single-source of truth tables.\n- **Transaction Safety**: Configured indexed SKU column keys to support microsecond barcode scan operations.\n- **Normalization Bounds**: Fully separated base product descriptors from daily ledger rows to prevent tables locks.`
                };
            }

            if (!ai) {
                return res.json(customFallbackResponse);
            }

            const systemInstruction = `You are the Lead Database Architect and Master System Analyst at JN Digital Solutions. Your role is to design professional, highly normalized, robust database schemas tailored to user system requirements.
      You MUST return your response strictly in the requested JSON structure. Color, layout, data structures, and the SQL script should be highly optimized, utilizing indices, primary/foreign key mappings, appropriate schemas, and types for the requested target database system (${targetDB}).`;

            const prompt = `Design a fully normalized database schema for the following requirement:
      Database Type: ${targetDB}
      System Description: "${description}"
      Ensure that the tables, column types, constraints, ER relationships, sqlScript, and design explanation are ultra-professional, and match standard C# / ASP.NET or database best practices.`;

            try {
                const response = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
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
                                sqlScript: { type: Type.STRING, description: "Fully complete, formatted SQL script containing CREATE TABLE statements, foreign keys, and indexes for " + targetDB },
                                architecturalExplanation: { type: Type.STRING, description: "Professional database specification and optimization explanation in Markdown" }
                            },
                            required: ["tables", "relationships", "sqlScript", "architecturalExplanation"]
                        }
                    }
                });

                const resultText = response.text || "";
                const parsed = JSON.parse(resultText.trim());
                return res.json(parsed);
            } catch (geminiErr: any) {
                console.info("Gemini database blueprint planner completed or utilizing local custom schema fallback.", geminiErr?.message || geminiErr);
                return res.json(customFallbackResponse);
            }
        } catch (outerErr: any) {
            console.error("error in /api/db-schema", outerErr);
            return res.status(500).json({ error: outerErr.message || "Failed to draft database schema." });
        }
    });

    // API Route for Chatbot
    app.post("/api/chat", async (req, res) => {
        try {
            const { message, history } = req.body;

            if (!message) {
                return res.status(400).json({ error: "Message is required" });
            }

            // If the API environment key is unconfigured or null, return our high quality custom helper directly.
            if (!ai) {
                return res.json({ text: getOfflineResponse(message) });
            }

            // Context prompt to teach the assistant all the details to ensure accurate Q&A
            const systemInstruction = `You are the official AI Assistant for JN Digital Solutions (founded by NJ/Noly, a top Full-Stack Engineer and System Analyst with 7+ years of experience and over 12 enterprise applications built).

Your purpose is to welcome clients, answer standard questions about JN Digital Solutions services, and be warm, professional, informative, and precise.

Here is the exact layout of JN Digital Solutions:
1. Website Development:
   - Built for speed, responsiveness, and SEO.
   - Types: landing pages, company websites, e-commerce, custom CMS solutions.
2. Web Application Development (Enterprise Systems):
   - Scalable custom internal platforms.
   - Specializations: Human Resource (HR) Systems, Procurement Systems, ERP Modules, Ticketing & Service Desk Systems, Inventory Systems.
3. Mobile Application Development:
   - High-performance iOS and Android applications via Flutter.
   - Advanced features like biometric logins and AI capabilities.
4. Point of Sale (POS):
   - Tailored for retail and food service sales counters.
   - Core Features: Inventory tracking, automatic receipt generation, sales telemetry, and barcode scanning.
5. Graphic Design & High-Quality Printing:
   - High-impact graphic branding elements.
   - Deliverables: Tarpaulin printing, premium double-sided business cards, flyers, posters, and uniform company styles.

Founder Background & Technologies:
- JND has worked with premier entities like New San Jose Builders Inc., Accenture, Federal Land Inc., and HRD Singapore.
- Systems built: Centralized Procurement Platforms with approval chain workflows, Cloud reservation dashboards, AI face shift trackers, Blazor support hubs, etc.
- Primary Stack: C# / ASP.NET Core, SQL Server, REST API gateways, Blazor/MudBlazor, Flutter, React, and Tailwind CSS.

Assistant Persona and tone:
- Super warm, professional, highly informative, and representing elite developer execution.
- Maintain readable, elegant spacing. Use Markdown bullet spots easily.
- Guide users to the contact/quote inquiries area at the bottom of the page for project bookings.
- NEVER fabricate service ranges outside these described modules.`;

            // Transform history to contents array for @google/genai generateContent API
            const contentsList: any[] = [];
            if (history && Array.isArray(history)) {
                for (const turn of history) {
                    contentsList.push({
                        role: turn.role === "user" ? "user" : "model",
                        parts: [{ text: turn.content }],
                    });
                }
            }

            contentsList.push({
                role: "user",
                parts: [{ text: message }],
            });

            try {
                const response = await ai.models.generateContent({
                    model: "gemini-3.5-flash",
                    contents: contentsList,
                    config: {
                        systemInstruction,
                        temperature: 0.7,
                    },
                });

                return res.json({ text: response.text || "Hello! How can I represent JN Digital Solutions for you today?" });
            } catch (geminiErr: any) {
                console.info("Gemini chat processor completed or utilizing local expert content fallback.", geminiErr?.message || geminiErr);
                // Fall back gracefully to local expert engine instead of throwing error 500!
                return res.json({ text: getOfflineResponse(message) });
            }
        } catch (err: any) {
            console.error("Express /api/chat error:", err);
            // Even if outer fails, return fallback rather than raw HTML error page!
            try {
                const fallbackText = getOfflineResponse(req.body.message || "");
                return res.json({ text: fallbackText });
            } catch {
                return res.status(500).json({ error: err.message || "Something went wrong during Gemini inference." });
            }
        }
    });

    // Hot module replacement & static routing management
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

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Express server is listening on port ${PORT}`);
    });
}

startServer();
