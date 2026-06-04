import { ServiceItem, ProjectItem, ExperienceItem, TestimonialItem, FaqItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "Create modern responsive websites built for speed, responsiveness, SEO, and user interaction to capture your target audience.",
    badge: "Static & Dynamic Websites",
    features: ["Landing Pages", "Company Websites", "E-Commerce", "CMS Solutions"]
  },
  {
    id: "web-app",
    title: "Web Application Development",
    description: "Develop scalable, feature-rich web business systems and custom internal enterprise SaaS applications customized to your operational flows.",
    badge: "Enterprise Solutions",
    features: ["HR Systems", "Procurement Systems", "ERP Modules", "Ticketing Systems", "Inventory Systems"]
  },
  {
    id: "mobile-dev",
    title: "Mobile Application Development",
    description: "Build robust native and cross-platform mobile apps for iOS and Android with premium user experiences and intelligent workflows.",
    badge: "Flutter Apps",
    features: ["Business Apps", "Employee Apps", "Customer Apps", "AI Features"]
  },
  {
    id: "pos-system",
    title: "Point of Sale (POS)",
    description: "Develop automated and lightning-fast POS solutions for retailers, food services, and high-frequency business sales counters.",
    badge: "Business Automation",
    features: ["Inventory Management", "Sales Tracking", "Reporting Dashboard", "Receipt Printing"]
  },
  {
    id: "design-printing",
    title: "Graphic Design & Printing",
    description: "High-impact visual branding elements and high-quality printed marketing collateral designed to establish deep brand trust.",
    badge: "Creative Services",
    features: ["Tarpaulin Design", "Business Cards", "Flyers", "Posters", "Company Branding"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "project-hr",
    title: "Enterprise HR Management System",
    description: "A centralized, comprehensive human resources suite designed to automate workforce monitoring, performance evaluations, and financial updates.",
    features: ["Employee Management", "Leave Management", "Payroll Integration", "Performance Evaluation"],
    technologies: ["ASP.NET Core", "SQL Server", "Bootstrap"],
    category: "enterprise"
  },
  {
    id: "project-procurement",
    title: "Procurement Management System",
    description: "An internal supply chain and purchasing controller facilitating request submission, strict approvals, and centralized vendor audits.",
    features: ["Purchase Requests", "Approval Workflow", "Vendor Management", "Reporting"],
    technologies: ["ASP.NET Core", "REST API", "SQL Server"],
    category: "enterprise"
  },
  {
    id: "project-ticket",
    title: "Ticketing & Service Desk System",
    description: "A modern support hub implementing real-time ticket triage, Service Level Agreement (SLA) monitors, and performance dashboards.",
    features: ["Issue Tracking", "SLA Monitoring", "Assignment Workflow", "Dashboard Analytics"],
    technologies: ["Blazor", "MudBlazor", "SQL Server"],
    category: "web"
  },
  {
    id: "project-pos",
    title: "Inventory & POS System",
    description: "A lightning-fast cashier operations software synchronized with deep stock trackers, automatic receipt layout, and visual analytics.",
    features: ["Product Management", "Sales Transactions", "Barcode Integration", "Reports"],
    technologies: ["ASP.NET Core", "Bootstrap"],
    category: "pos"
  },
  {
    id: "project-facial",
    title: "AI Facial Recognition Mobile Application",
    description: "A high-security, touchless on-site check-in mobile application designed to detect and log biometric employee shifts with real-time sync.",
    features: ["Facial Recognition", "Attendance Monitoring", "Mobile Capture", "API Integration"],
    technologies: ["Flutter", "AI Services", "REST API"],
    category: "mobile"
  },
  {
    id: "project-reservation",
    title: "Reservation Management System",
    description: "A self-service online reservation dashboard facilitating slots scheduling, automated confirmations, and booking health reports.",
    features: ["Online Booking", "Customer Management", "Reporting Dashboard"],
    technologies: ["ASP.NET Core", "SQL Server"],
    category: "web"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "System Analyst Programmer",
    company: "New San Jose Builders Inc.",
    period: "Jul 2025 - Present",
    highlights: [
      "Enterprise application architecture",
      "HR Systems",
      "Procurement Systems",
      "ERP Solutions",
      "AI-integrated mobile applications"
    ]
  },
  {
    id: "exp-2",
    role: "Package App Development Analyst",
    company: "Accenture",
    period: "Jul 2023 - Feb 2025",
    highlights: [
      "Enterprise application support",
      "Root cause analysis",
      "Automation solutions",
      "Agile delivery"
    ]
  },
  {
    id: "exp-3",
    role: "Multi-Platform Programmer",
    company: "Federal Land Inc.",
    period: "Oct 2021 - Jul 2023",
    highlights: [
      "Enterprise support",
      "Business applications",
      "Reporting solutions",
      "Process optimization"
    ]
  },
  {
    id: "exp-4",
    role: "Junior Software Developer",
    company: "New San Jose Builders Inc.",
    period: "Sep 2020 - Oct 2021",
    highlights: [
      "HR Systems",
      "Performance Management",
      "Multi-layer enterprise applications"
    ]
  },
  {
    id: "exp-5",
    role: "IT Staff / Programmer",
    company: "HRD Singapore PTE LTD.",
    period: "Mar 2019 - Aug 2019",
    highlights: [
      "Reservation System Development",
      "Database Design",
      "System Implementation"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Aparri Dela Cruz",
    role: "Operations Director",
    company: "Apex Supply Logistics",
    content: "The Procurement Management System transformed how we process purchase requests. Approvals that used to take days are now done in minutes. JN Digital Solutions delivered exactly what our team desperately needed.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "test-2",
    name: "Michelle Santos",
    role: "VP of HR & Culture",
    company: "Metro Builders Group",
    content: "The Enterprise HR Management system is spectacular. Tracking employees, checking leaves, and evaluating performances has never been this smooth. JN's architectural depth is truly impressive.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    id: "test-3",
    name: "Dave Henderson",
    role: "General Manager",
    company: "Prime Retail Emporium",
    content: "Our custom POS and inventory system has saved us hundreds of retail friction hours. Transaction speeds are blazingly fast and the live reporting analytics are perfect for our weekly audits.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
];

export const WHY_CHOOSE_ME = [
  {
    title: "Custom Solutions",
    description: "Tailored systems built around your unique business requirements instead of generic off-the-shelf templates.",
    icon: "Sliders"
  },
  {
    title: "Modern Technologies",
    description: "Built using cutting-edge frameworks, robust codebases, and industry best practices for extreme durability.",
    icon: "Cpu"
  },
  {
    title: "Mobile Responsive",
    description: "Meticulously tested layout designs that look stunning and perform perfectly on desktops, tablets, and phones.",
    icon: "Smartphone"
  },
  {
    title: "Reliable Support",
    description: "Responsive support and continuous software monitoring following product launch to ensure 100% operational uptime.",
    icon: "ShieldCheck"
  },
  {
    title: "Fast Development",
    description: "Highly focused agile lifecycle management coupled with iterative delivery cycles for rapid turnaround times.",
    icon: "Zap"
  },
  {
    title: "Enterprise Experience",
    description: "Extensive background building system integrations for major developers, multi-national agencies, and corporate clients.",
    icon: "Briefcase"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-software-types",
    question: "What types of custom software can JN Digital Solutions build?",
    answer: "We specialize in end-to-end custom software including Enterprise HR suites, Procurement portals, modern Point of Sale (POS) tools with barcode/receipt printer integration, inventory ledgers, responsive corporate web ecosystems, and multi-platform mobile applications (iOS & Android).",
    category: "services"
  },
  {
    id: "faq-tech-stacks",
    question: "What tech stacks do you recommend and commonly build with?",
    answer: "For heavy-duty corporate platforms, we highly recommend ASP.NET Core paired with robust SQL Server databases for extreme type-safety & security. For interactive client interfaces, we use React (Vite) and Tailwind CSS. For mobile applications, we leverage Google's cross-platform Flutter framework.",
    category: "technical"
  },
  {
    id: "faq-timeframes",
    question: "How long does a typical custom software project take?",
    answer: "Project timelines depend heavily on feature scope complexity. A high-converting professional web landing page takes about 2 weeks. Comprehensive custom systems or operational dashboards (ERP, HR, inventory suites) typically scale between 4 to 8 weeks, organized into clean itemized milestones.",
    category: "contracts"
  },
  {
    id: "faq-support-service",
    question: "Do you offer support and maintenance after deployment?",
    answer: "Yes, absolutely. Every system built by JN Digital include standard SLA-guaranteed post-launch monitoring, routine security patches, and database optimization updates. We ensure that your business suffers zero operational downtime.",
    category: "general"
  },
  {
    id: "faq-data-migration",
    question: "Can I import existing Excel files or database tables into a new system?",
    answer: "Yes. We build automated uploaders and data processors to safely migrate your legacy spreadsheets, historical accounts, or customer list records into the new secure cloud SQL database, running audit procedures to prevent data duplication.",
    category: "technical"
  },
  {
    id: "faq-request-process",
    question: "What is the process for requesting an estimation and starting a project?",
    answer: "First, submit your system context using our standard form or consult our interactive AI Pilot Consultant. We will evaluate your parameters, draft a professional Technical Specification RFP blueprint, and schedule a consult review. Once milestones are locked, we proceed to interactive wireframes.",
    category: "general"
  }
];