import { Project, TechItem, ExperienceItem, CapabilityItem, ProcessStep } from '@/types';

export const PERSONAL_INFO = {
  name: "Anbuchezhiyan",
  title: "Full Stack Developer",
  shortRole: "Full Stack Developer",
  experience: "1+ Years Professional Experience",
  saasContributed: "10+ SaaS Applications",
  saasClosed: "3 SaaS Applications",
  phone: "6374488320",
  email: "chezhiyancdurai@gmail.com",
  location: "India",
  availabilityStatus: "Open to opportunities",
  positioning: "Full Stack Developer focused on building modern web applications, SaaS products, dashboards, backend APIs, integrations, and scalable user experiences.",
  github: "https://github.com", // Editable placeholder
  linkedin: "https://linkedin.com", // Editable placeholder
  quote: "Building useful software, one problem at a time."
};

export const ABOUT_DATA = {
  heading: "From interfaces to backend systems.",
  intro: "I’m Anbuchezhiyan, a Full Stack Developer with 1+ years of professional experience building responsive frontend applications, backend APIs, database-driven systems, and SaaS products.",
  narrative: [
    "I work across the full application stack, translating complex product requirements into robust, scalable, and maintainable software. My focus spans designing sleek, user-centric interfaces to architecting high-performance backend microservices and REST APIs.",
    "Having contributed to over 10+ SaaS applications and fully built and launched 3 SaaS products end-to-end, I have hands-on experience handling real-world production challenges — from database migrations and schema design to complex authentication workflows and third-party API integrations."
  ],
  stats: [
    { label: "Years Experience", value: "1+", note: "Hands-on engineering" },
    { label: "SaaS Contributed", value: "10+", note: "Across diverse domain stacks" },
    { label: "SaaS Apps Shipped", value: "3", note: "Closed & fully delivered solo/lead" },
    { label: "Core Stack Focus", value: "Full Stack", note: "Next.js, FastAPI, PostgreSQL" }
  ],
  coreAreas: [
    "Frontend Engineering & Responsive UI",
    "Backend REST API Development",
    "Database Architecture & Schemas",
    "Authentication & Access Control",
    "SaaS Platform Development",
    "Third-Party Integrations",
    "Performance Optimization",
    "Production Debugging & Problem Solving"
  ]
};

export const TECH_STACK: TechItem[] = [
  // FRONTEND
  {
    name: "TypeScript",
    category: "frontend",
    description: "Building type-safe, scaleable, and maintainable frontend applications with strict contracts.",
    iconName: "Code2",
    featured: true
  },
  {
    name: "React.js",
    category: "frontend",
    description: "Architecting interactive visual components with hook-driven state management.",
    iconName: "Atom",
    featured: true
  },
  {
    name: "Next.js",
    category: "frontend",
    description: "Developing production-ready React applications with modern App Router, SSR, and API capabilities.",
    iconName: "Layers",
    featured: true
  },
  {
    name: "HTML5",
    category: "frontend",
    description: "Structuring clean, semantic, accessible web documents for maximum SEO and standard compliance.",
    iconName: "FileCode",
    featured: false
  },
  {
    name: "CSS3",
    category: "frontend",
    description: "Crafting fluid responsive layouts, flexbox/grid structures, and smooth visual animations.",
    iconName: "Palette",
    featured: false
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    description: "Building utility-first, modern responsive visual interfaces with consistent design tokens.",
    iconName: "Wind",
    featured: true
  },

  // BACKEND
  {
    name: "FastAPI",
    category: "backend",
    description: "Building lightweight, high-performance backend APIs with Python and automatic OpenAPI documentation.",
    iconName: "Zap",
    featured: true
  },
  {
    name: "REST APIs",
    category: "backend",
    description: "Designing structured, predictable, secure HTTP endpoints with standard status codes and payload formats.",
    iconName: "Server",
    featured: true
  },
  {
    name: "Server-side Development",
    category: "backend",
    description: "Writing scalable server logic, background tasks, request validation, and middleware logic.",
    iconName: "Cpu",
    featured: false
  },

  // DATABASE
  {
    name: "Supabase",
    category: "database",
    description: "Building database-driven applications with PostgreSQL, instant REST endpoints, and backend services.",
    iconName: "Database",
    featured: true
  },
  {
    name: "PostgreSQL",
    category: "database",
    description: "Architecting relational schemas, indexed queries, foreign keys, and transactional integrity.",
    iconName: "HardDrive",
    featured: true
  },
  {
    name: "MongoDB",
    category: "database",
    description: "Designing flexible NoSQL document schemas for dynamic SaaS payloads and unstructured collections.",
    iconName: "Box",
    featured: true
  },

  // TOOLS
  {
    name: "Git",
    category: "tools",
    description: "Version control, branching workflows, pull requests, and collaborative code reviews.",
    iconName: "GitBranch",
    featured: true
  },
  {
    name: "GitHub",
    category: "tools",
    description: "Managing code repositories, automated workflows, issue tracking, and software releases.",
    iconName: "Github",
    featured: true
  },
  {
    name: "API Integrations",
    category: "tools",
    description: "Connecting third-party SDKs, payment gateways, webhook receivers, and OAuth services.",
    iconName: "Globe",
    featured: true
  },
  {
    name: "Authentication",
    category: "tools",
    description: "Implementing JWT, OAuth2, session tokens, row-level security (RLS), and RBAC access control.",
    iconName: "Lock",
    featured: true
  },
  {
    name: "Database Design",
    category: "tools",
    description: "Crafting efficient ER diagrams, normalizations, migration scripts, and indexing strategies.",
    iconName: "Workflow",
    featured: false
  },
  {
    name: "Responsive UI",
    category: "tools",
    description: "Optimizing user experience across mobile, tablet, desktop, and multi-monitor layouts.",
    iconName: "Monitor",
    featured: false
  },
  {
    name: "Deployment & Debugging",
    category: "tools",
    description: "Configuring Vercel/cloud hosting, inspecting production runtime logs, and resolving operational edge cases.",
    iconName: "Terminal",
    featured: true
  }
];

export const PROJECTS: Project[] = [
  // REAL DEMO PROJECTS PROVIDED BY USER
  {
    id: "demo-gym",
    title: "Fitness & Gym Platform",
    subtitle: "Real Production Live Demo",
    category: "live",
    concept: "Full-fledged responsive web application built for gym operational workflow and member engagement.",
    description: "A high-performance fitness platform designed for gym owners and members, featuring streamlined schedule management, workout programs, and dynamic landing sections.",
    problem: "Fitness hubs struggle with fragmented tools for showcasing facilities, member orientation, and responsive scheduling access across mobile devices.",
    solution: "Engineered a lightning-fast web application using React and modern CSS architecture to deliver fluid user transitions, mobile-first access, and clear call-to-action flows.",
    stack: ["React.js", "JavaScript", "Tailwind CSS", "Vercel"],
    features: [
      "Mobile-first responsive interface",
      "Interactive membership tier showcase",
      "Dynamic workout schedule grids",
      "Optimized assets and fast initial load time",
      "Contact & trial booking integration"
    ],
    liveUrl: "https://gym-website-smoky-xi.vercel.app/",
    githubUrl: "https://github.com",
    image: "/project-gym.png",
    isPlaceholder: false,
    badge: "LIVE DEMO"
  },
  {
    id: "demo-acme-crm",
    title: "Acme CRM Platform",
    subtitle: "Real Production Live Demo",
    category: "live",
    concept: "Enterprise customer relationship management dashboard interface for tracking sales leads and pipeline status.",
    description: "A sleek, dashboard-driven CRM frontend designed for managing customer pipelines, lead tracking, status analytics, and account workflows.",
    problem: "Sales teams lose track of deal status when interfaces are cluttered with slow, non-responsive legacy controls.",
    solution: "Designed a clean, modern SaaS CRM application with high-density data tables, intuitive status filtering, lead pipeline view, and rapid data navigation.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "REST API", "Vercel"],
    features: [
      "Customer & lead pipeline management",
      "Interactive data tables with status filters",
      "SaaS metric cards & revenue tracking",
      "Responsive sidebar and top navbar navigation",
      "Fast API integration & client state synchronization"
    ],
    liveUrl: "https://acme-crm-frontend.vercel.app/",
    githubUrl: "https://github.com",
    image: "/project-crm.png",
    isPlaceholder: false,
    badge: "LIVE DEMO"
  },
  {
    id: "demo-rms",
    title: "RMS Management Dashboard",
    subtitle: "Real Production Live Demo",
    category: "live",
    concept: "Resource & Restaurant Management System dashboard for monitoring orders, table statuses, and operational metrics.",
    description: "A comprehensive management dashboard interface built to streamline operational logistics, menu inventory, order queues, and administrative insights.",
    problem: "Hospitality and resource-intensive businesses require real-time operational visibility without interface lag or complex desktop setups.",
    solution: "Built a high-productivity dashboard featuring real-time status indicators, metric visualizations, queue monitoring, and quick action controls.",
    stack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Real-time operational dashboard analytics",
      "Order status & queue progression cards",
      "Table & resource inventory monitoring",
      "Role-based control interfaces",
      "Deep dark theme visual layout optimization"
    ],
    liveUrl: "https://rms-frontend-jet-zeta.vercel.app/dashboard",
    githubUrl: "https://github.com",
    image: "/project-rms.png",
    isPlaceholder: false,
    badge: "LIVE DEMO"
  },

  // PLACEHOLDER PROJECTS BASED ON SPECIFICATION
  {
    id: "proj-01-docu",
    title: "SaaS Documentation Platform",
    subtitle: "Concept / Placeholder Entry",
    category: "placeholder",
    concept: "A platform that converts application source code into structured product documentation.",
    description: "Automated documentation generator built for software teams to synchronize repository changes with searchable developer docs.",
    problem: "Engineering teams spend dozens of hours writing documentation that quickly becomes outdated as code evolves.",
    solution: "Automated repository parsing pipeline that analyzes GitHub repos, extracts API specifications, and renders structured documentation trees.",
    stack: ["Next.js", "TypeScript", "Supabase", "GitHub API", "AI Integration"],
    features: [
      "GitHub repository integration & webhook synchronization",
      "Automated repository AST & comment parsing",
      "Interactive documentation tree generator",
      "Multi-version doc management & diff tracking",
      "Full-text fuzzy search across code references"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com",
    isPlaceholder: true,
    badge: "SaaS Concept"
  },
  {
    id: "proj-02-fitness-saas",
    title: "Fitness Management SaaS",
    subtitle: "Concept / Placeholder Entry",
    category: "placeholder",
    concept: "A modern platform for fitness businesses to manage members, subscriptions, trainers and operations.",
    description: "All-in-one SaaS hub enabling gym owners to manage recurring billing, trainer schedules, and member access controls.",
    problem: "Independent gym owners rely on multiple disconnected spreadsheets for payments, scheduling, and client memberships.",
    solution: "Unified multi-tenant dashboard connecting Supabase authentication, PostgreSQL member records, and subscription status triggers.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Secure multi-tenant authentication & access control",
      "Member attendance & subscription cycle tracking",
      "Trainer assignment & class booking schedule",
      "Financial metrics & revenue analytics summary",
      "Responsive layout for mobile tablet usage"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com",
    isPlaceholder: true,
    badge: "SaaS Concept"
  },
  {
    id: "proj-03-dev-analytics",
    title: "Developer Analytics Dashboard",
    subtitle: "Concept / Placeholder Entry",
    category: "placeholder",
    concept: "A dashboard for monitoring application metrics and user activity.",
    description: "Telemetry and request log analytics dashboard engineered to provide backend latency distribution and user session insights.",
    problem: "Developers lack accessible visual telemetry for tracking backend API endpoint latency spikes and error rate distributions.",
    solution: "Built a FastAPI & MongoDB log receiver stream coupled with a high-density React charting dashboard for instant API metrics overview.",
    stack: ["React.js", "TypeScript", "FastAPI", "MongoDB", "Chart.js"],
    features: [
      "Real-time event stream ingestion endpoint",
      "API request latency & status distribution charts",
      "Advanced log search with custom query filters",
      "Custom alert trigger configuration UI",
      "Exportable session and request analytical reports"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com",
    isPlaceholder: true,
    badge: "Full Stack Concept"
  },
  {
    id: "proj-04-api-app",
    title: "API-Driven Web Application",
    subtitle: "Concept / Placeholder Entry",
    category: "placeholder",
    concept: "A production-style application demonstrating frontend/backend architecture.",
    description: "Production boilerplate architecture demonstrating secure token authentication, CRUD resource management, and error fallback patterns.",
    problem: "Generic boilerplate examples lack real-world security practices, proper error propagation, and database transaction handling.",
    solution: "Architected a full-stack template utilizing FastAPI REST endpoints, MongoDB document validation, and Next.js server components.",
    stack: ["Next.js", "TypeScript", "FastAPI", "MongoDB", "REST APIs"],
    features: [
      "Stateless JWT auth with refresh token rotation",
      "Structured REST API contracts with OpenAPI schemas",
      "Robust exception handling & standardized error payloads",
      "Optimistic UI updates with client-side cache",
      "Fully responsive dark theme visual design"
    ],
    liveUrl: "#",
    githubUrl: "https://github.com",
    isPlaceholder: true,
    badge: "API Architecture"
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "[Company / Client / SaaS Team - Editable]",
    period: "2024 — Present (1+ Years)",
    type: "Full-Time",
    location: "Remote / Hybrid",
    description: "Working across frontend and backend development to build and maintain modern web applications, SaaS platforms, dashboards, integrations, and internal systems.",
    responsibilities: [
      "Building responsive interfaces using React.js, Next.js, and TypeScript with modern state management",
      "Developing high-performance backend APIs using FastAPI and RESTful architecture standards",
      "Working with Supabase/PostgreSQL and MongoDB databases to design schemas, write queries, and index data",
      "Implementing authentication, JWT token handling, and role-based access control workflows",
      "Integrating external third-party APIs, webhooks, and cloud services into production pipelines",
      "Debugging production issues, inspecting server logs, and applying rapid hotfixes",
      "Improving application performance, asset bundles, and client render cycles",
      "Collaborating closely on technical product requirements, API specs, and sprint scope",
      "Building reusable UI component libraries and maintainable utility modules",
      "Managing codebase versioning, pull request reviews, and continuous delivery via Git and GitHub"
    ],
    highlights: [
      "Contributed to 10+ SaaS applications across fintech, operational dashboards, and management platforms",
      "Fully architected, built, and delivered 3 SaaS applications end-to-end solo / lead developer",
      "Consistently achieved clean, production-grade type-safe codebase standards"
    ],
    techUsed: ["TypeScript", "React.js", "Next.js", "FastAPI", "Supabase", "PostgreSQL", "MongoDB", "Tailwind CSS", "Git"]
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    title: "Modern Web Applications",
    subtitle: "Frontend Excellence",
    description: "Building fast, responsive, type-safe web applications using Next.js, React, and TypeScript with clean component architecture and polished UX.",
    tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"]
  },
  {
    number: "02",
    title: "SaaS Products",
    subtitle: "End-to-End Delivery",
    description: "Architecting multi-tenant web platforms from initial wireframe to backend API, database schema, user authentication, and deployment.",
    tags: ["Full Stack", "SaaS Architecture", "Multi-tenant", "Workflows"]
  },
  {
    number: "03",
    title: "REST APIs",
    subtitle: "Backend Services",
    description: "Designing lightweight, high-speed backend endpoints with FastAPI and Python, featuring structured JSON schemas and robust error handling.",
    tags: ["FastAPI", "REST", "OpenAPI", "Python"]
  },
  {
    number: "04",
    title: "Admin Dashboards",
    subtitle: "Data & Telemetry",
    description: "Engineering data-dense analytics dashboards with interactive filtering, status tables, key metric cards, and responsive sidebar navigation.",
    tags: ["Data Viz", "Dashboards", "Metrics", "UI Design"]
  },
  {
    number: "05",
    title: "Database-driven Apps",
    subtitle: "Data Persistence",
    description: "Designing relational PostgreSQL schemas on Supabase or document structures in MongoDB, ensuring fast queries and reliable data transactions.",
    tags: ["PostgreSQL", "Supabase", "MongoDB", "Schema Design"]
  },
  {
    number: "06",
    title: "API Integrations",
    subtitle: "External Ecosystems",
    description: "Connecting external SaaS services, payment processors, authentication providers, and third-party webhook event listeners into application workflows.",
    tags: ["Webhooks", "OAuth", "API SDKs", "Integrations"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    subtitle: "Requirements & Scope",
    description: "Deconstruct the product requirement and core user problem. Map user journeys, data expectations, edge cases, and technical boundary conditions.",
    details: [
      "Analyze business goals & user user stories",
      "Identify data models and state boundaries",
      "Define key technical constraints and targets"
    ]
  },
  {
    number: "02",
    title: "Architect",
    subtitle: "System Design",
    description: "Define frontend page routes, component hierarchies, backend REST endpoint contracts, and database schema normalizations before writing code.",
    details: [
      "Structure API contract specs (Request/Response format)",
      "Model database collections & foreign keys",
      "Select optimal rendering strategies (SSR/CSR)"
    ]
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Clean Codebase",
    description: "Develop reusable, strongly typed UI components and backend logic following solid design principles, modular organization, and clear naming.",
    details: [
      "Implement type-safe TypeScript React components",
      "Build FastAPI routes with Pydantic validations",
      "Style responsive UI with utility design tokens"
    ]
  },
  {
    number: "04",
    title: "Integrate",
    subtitle: "Data & Auth Flow",
    description: "Connect frontend client interfaces to backend APIs, setup Supabase/JWT authentication, database queries, and third-party webhook integrations.",
    details: [
      "Connect client fetchers to backend REST endpoints",
      "Implement authentication guards & RLS policies",
      "Handle background sync and error states"
    ]
  },
  {
    number: "05",
    title: "Test",
    subtitle: "Quality & Edge Cases",
    description: "Identify edge cases, network lag fallbacks, form validation errors, responsive breakpoints, and cross-browser visual quirks.",
    details: [
      "Validate form input error feedback",
      "Test responsive layouts across mobile & desktop",
      "Verify status codes and exception handlers"
    ]
  },
  {
    number: "06",
    title: "Ship",
    subtitle: "Deploy & Monitor",
    description: "Deploy production build to Vercel/cloud infrastructure, inspect telemetry logs, verify SSL, and continuously improve performance based on feedback.",
    details: [
      "Deploy with automated CI/CD checks",
      "Monitor runtime errors and response metrics",
      "Iterate based on real user feedback"
    ]
  }
];
