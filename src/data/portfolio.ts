/**
 * Single source of truth for all portfolio content.
 * Content comes from the resume (public/resume/Vimal_Selvaraj_Resume.pdf) plus details Vimal
 * supplied directly (scale figures, performance techniques, GitHub projects).
 * Edit this file to update the site — components only render what is defined here.
 */

export const profile = {
  name: 'Vimal Selvaraj',
  firstName: 'Vimal',
  lastName: 'Selvaraj',
  initials: 'VS',
  title: 'Full-Stack Developer',
  stack: ['ReactJS', 'NodeJS', 'PostgreSQL'],
  experience: '5+',
  location: 'India',
  email: 'vimalselvam3@gmail.com',
  // The phone number lives only in the resume PDF — intentionally not shown on the site.
  linkedin: 'https://www.linkedin.com/in/vimal-selvaraj-5b0716251',
  github: 'https://github.com/vimal-selvaraj',
  githubHandle: 'vimal-selvaraj',
  resume: '/resume/Vimal_Selvaraj_Resume.pdf',
  resumeFileName: 'Vimal_Selvaraj_Resume.pdf',
  /** Optional portrait image path; null shows the "VS" monogram in the hero. */
  photo: null as string | null,
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'impact', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  label: 'Full-Stack Engineer | 5+ Years Experience',
  headline: ['I build enterprise', 'workflow platforms.'],
  /** Word in the headline rendered in the accent serif. */
  accentWord: 'workflow',
  altHeadline: 'CRM · Ticketing · AI knowledge retrieval.',
  description:
    'Full-stack developer with 5+ years across React, Node and PostgreSQL — building CRM, ticketing and AI knowledge platforms from interface to database.',
  floatingTech: ['React 18', 'TypeScript', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Redux Toolkit', 'Docker', 'Pinecone'],
  /** The layered architecture described in the resume: UI → API gateway → back-end APIs → database. */
  systemPath: [
    { layer: 'UI', tech: 'React · TypeScript' },
    { layer: 'Gateway', tech: 'Node · Express' },
    { layer: 'Services', tech: 'REST · RBAC · SSO' },
    { layer: 'Data', tech: 'PostgreSQL' },
  ],
  meta: { current: 'Vega Intellisoft', client: 'Saint-Gobain' },
  /** Hero visual: 'orbit' = orbiting tech stack, 'code' = live code editor, 'developer' = illustrated developer. */
  visual: 'orbit' as 'orbit' | 'code' | 'developer',
}

export type HighlightIcon = 'years' | 'fullstack' | 'architecture' | 'workflow' | 'database' | 'ai'

export const about = {
  title: ['From business requirements', 'to maintainable systems.'],
  statement:
    'With 5+ years of experience in software development, I specialize in building scalable enterprise applications and workflow-driven platforms.',
  paragraphs: [
    'My experience spans frontend architecture, backend API development, database optimization, authentication systems, and multi-tenant application design.',
    'I have worked on enterprise CRM platforms, ticketing systems, configurable service catalogs, analytics dashboards, and AI-powered knowledge management solutions — most recently as the main developer of the Service Catalog and Ticketing modules on a platform serving ~50 tenants.',
    'I enjoy solving complex engineering challenges and transforming business requirements into maintainable, high-performance applications.',
  ],
  highlights: [
    { label: '5+ years of experience', icon: 'years' },
    { label: 'Full-stack development', icon: 'fullstack' },
    { label: 'Enterprise application architecture', icon: 'architecture' },
    { label: 'Workflow automation', icon: 'workflow' },
    { label: 'Database optimization', icon: 'database' },
    { label: 'AI-based knowledge retrieval', icon: 'ai' },
  ] satisfies { label: string; icon: HighlightIcon }[],
  previously: ['Rezolve.ai', 'Colan Infotech'],
}

export type SkillGroup = { id: string; title: string; caption: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'Interfaces that scale with the product',
    items: [
      'React 18', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'React Hooks & Custom Hooks', 'React Router',
      'MUI', 'SCSS', 'HTML5 & CSS3', 'Responsive UI', 'Lazy Loading & Code Splitting', 'Form Handling',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    caption: 'APIs, gateways and secure access',
    items: [
      'NodeJS', 'ExpressJS', 'TypeScript', 'REST API Design', 'API Gateway', 'SSO (Okta)', 'JWT',
      'Authentication & Authorization', 'Middleware Development',
    ],
  },
  {
    id: 'database',
    title: 'Database',
    caption: 'Data models built for performance',
    items: [
      'PostgreSQL', 'Stored Functions', 'Sequelize ORM', 'Query Optimization', 'Indexing', 'Data Modeling', 'Pinecone',
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    caption: 'Systems designed to grow',
    items: [
      'RBAC', 'Multi-Tenant Architecture', 'API Design', 'Performance Optimization', 'Reusable Component Architecture',
      'Workflow Systems', 'Event-Driven Architecture', 'AI-Based Knowledge Retrieval',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Delivery',
    caption: 'Shipping reliably, every sprint',
    items: ['Git', 'Docker', 'GitLab CI/CD', 'Azure Service Bus', 'Chrome DevTools', 'Debugging', 'Agile/Scrum'],
  },
]

export type Job = {
  company: string
  companyNote?: string
  role: string
  period: string
  client?: string
  summary: string
  contributions: string[]
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'Vega Intellisoft',
    role: 'Full-Stack Developer',
    period: 'May 2026 – Present',
    client: 'Saint-Gobain',
    summary:
      'Develop and maintain cconnect, Saint-Gobain’s enterprise CRM portal for ~150,000 users across six business units — Glass, CCBU/Fosroc, GNO, Entrance Solutions, DNA Leads and SG Visibility.',
    contributions: [
      'Develop enterprise CRM features across six business units.',
      'Build full-stack features using React 18, TypeScript, and Redux Toolkit.',
      'Develop backend functionality using NodeJS and ExpressJS.',
      'Implement business logic with PostgreSQL stored functions and Sequelize ORM.',
      'Work across the UI, API Gateway, and backend API architecture.',
      'Work with Okta SSO authentication and JWT-based sessions.',
      'Work with URL-level RBAC scoped by business unit and user role.',
      'Work in a Dockerised environment with GitLab CI/CD, Vault, and Consul.',
    ],
    stack: ['React 18', 'TypeScript', 'Redux Toolkit', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Sequelize', 'Okta', 'Docker', 'GitLab CI/CD'],
  },
  {
    company: 'Rezolve.ai',
    companyNote: 'Actionable Science Labs Pvt Ltd',
    role: 'Full-Stack Developer',
    period: 'Feb 2023 – May 2026',
    summary:
      'Main developer of the Service Catalog and Ticketing modules on a multi-tenant workflow platform serving ~50 tenants, in a ~30-person team.',
    contributions: [
      'Main developer of the configurable Service Catalog — the blueprint for the ticketing system.',
      'Main developer of the Ticketing Management module and its configurable workflows.',
      'Implemented RBAC and secure multi-tenant access across ~50 tenants.',
      'Integrated Azure Service Bus for event-driven, real-time workflow updates.',
      'Improved response times by ~30%: indexes, rewritten slow queries, stored functions, caching, pagination and lazy-loaded ticket pages.',
      'Built reusable React components used across Ticketing, Service Catalog, Data Warehouse and Knowledge Management.',
      'Delivered the Knowledge Management Platform in under a month (Outstanding New Joinee Award).',
      'Integrated Pinecone vector database for AI-based knowledge retrieval.',
    ],
    stack: ['ReactJS', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Azure Service Bus', 'Pinecone'],
  },
  {
    company: 'Colan Infotech',
    companyNote: 'Colan Infotech Pvt Ltd',
    role: 'Frontend Developer',
    period: 'Jul 2021 – Dec 2022',
    summary: 'Delivered responsive, production-ready interfaces across multiple client projects.',
    contributions: [
      'Developed responsive UI components.',
      'Worked with ReactJS, HTML, CSS, Bootstrap, and JavaScript.',
      'Converted UI/UX wireframes into production-ready interfaces.',
      'Integrated REST APIs.',
      'Developed reusable components.',
      'Collaborated with backend developers and QA teams.',
    ],
    stack: ['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
  },
]

export type ProjectVisual = 'crm' | 'catalog' | 'ticketing' | 'dashboard' | 'knowledge'

export type FeaturedProject = {
  id: string
  title: string
  subtitle?: string
  category: string
  overview: string
  contributions: string[]
  stack: string[]
  visual: ProjectVisual
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'cconnect',
    title: 'cconnect',
    subtitle: 'Saint-Gobain CRM Platform',
    category: 'Enterprise CRM',
    overview: 'Enterprise CRM for ~150,000 users across six Saint-Gobain business units.',
    contributions: [
      'React 18 and TypeScript interfaces.',
      'Redux Toolkit state management.',
      'NodeJS and ExpressJS API Gateway.',
      'PostgreSQL stored functions.',
      'Okta SSO and JWT authentication.',
      'URL-level RBAC.',
      'Docker and GitLab CI/CD.',
    ],
    stack: ['React 18', 'TypeScript', 'Redux Toolkit', 'MUI', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Okta', 'Docker'],
    visual: 'crm',
  },
  {
    id: 'service-catalog',
    title: 'Service Catalog',
    category: 'Workflow Platform',
    overview: 'Configurable Service Catalog — the blueprint for ticketing workflows. I was the main developer.',
    contributions: [
      'Configurable service templates.',
      'Dynamic form fields.',
      'Workflow configuration.',
      'Catalog item management.',
      'ReactJS frontend.',
      'NodeJS and ExpressJS APIs.',
      'PostgreSQL schema design.',
    ],
    stack: ['ReactJS', 'NodeJS', 'ExpressJS', 'PostgreSQL'],
    visual: 'catalog',
  },
  {
    id: 'ticketing',
    title: 'Ticketing Management System',
    category: 'Enterprise Workflow',
    overview: 'Ticket management with configurable workflows, used across ~50 tenants. I was the main developer.',
    contributions: [
      'Dynamic ticket form rendering.',
      'Configurable templates.',
      'Ticket creation and assignment.',
      'Status transitions.',
      'Workflow closure.',
      'RBAC.',
      'Azure Service Bus integration.',
    ],
    stack: ['ReactJS', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Azure Service Bus'],
    visual: 'ticketing',
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse Dashboard',
    category: 'Analytics',
    overview: 'Analytics dashboard visualizing ticketing data and workflow metrics.',
    contributions: [
      'Interactive data visualizations.',
      'dc.js charts.',
      'Ticket statistics.',
      'Performance insights.',
      'Filtering and drill-down functionality.',
      'ReactJS dashboard components.',
    ],
    stack: ['ReactJS', 'dc.js'],
    visual: 'dashboard',
  },
  {
    id: 'knowledge',
    title: 'Knowledge Management Platform',
    category: 'AI Knowledge Systems',
    overview: 'Knowledge ingestion and retrieval for AI-powered chatbots — delivered in under a month.',
    contributions: [
      'Document ingestion.',
      'Article ingestion.',
      'Document upload interfaces.',
      'Backend processing using NodeJS.',
      'Metadata storage.',
      'Pinecone vector database integration.',
      'AI-based knowledge retrieval.',
    ],
    stack: ['ReactJS', 'NodeJS', 'Pinecone'],
    visual: 'knowledge',
  },
]

/** Client projects delivered at Colan Infotech (2021–2022). */
export type ColanProject = { title: string; category: string; points: string[]; stack: string[] }

export const colanProjects: ColanProject[] = [
  {
    title: 'Contractable',
    category: 'Project Tracking Platform',
    points: ['ReactJS dashboards', 'Project progress tracking', 'Task tracking', 'Timeline views', 'Backend API integration'],
    stack: ['ReactJS'],
  },
  {
    title: 'VirtualStaffPH',
    category: 'Job Search Platform',
    points: ['Job listing interfaces', 'Job search pages', 'Candidate interaction workflows'],
    stack: ['ReactJS'],
  },
  {
    title: 'Asset & Inventory Management',
    category: 'Internal Tooling',
    points: ['Employee asset tracking', 'Inventory management interfaces'],
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'AFL Sports',
    category: 'Sports Scheduling',
    points: ['Tournament schedule management', 'Slot booking interfaces'],
    stack: ['UI Development'],
  },
  {
    title: 'Herbodaya',
    category: 'E-commerce Platform',
    points: ['Product listing', 'Product browsing interfaces'],
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Re-Up Subscription',
    category: 'Courier Subscription Platform',
    points: ['Subscription plan interfaces', 'Payment workflow interfaces'],
    stack: ['UI Development'],
  },
]

export type SideProject = {
  name: string
  title: string
  kind: string
  description: string
  stack: string[]
  url: string
  featured?: boolean
}

/** Personal projects on GitHub (descriptions taken from each repository). */
export const sideProjects: SideProject[] = [
  {
    name: 'Askme',
    title: 'Askme — Open Studio AI',
    kind: 'AI workspace',
    description:
      'A local-first multimodal AI workspace: React chat UI, FastAPI backend, local models through Ollama behind a provider abstraction, a dynamic skills registry, and optional ComfyUI image/video workflows.',
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'Ollama'],
    url: 'https://github.com/vimal-selvaraj/Askme',
    featured: true,
  },
  {
    name: 'netflix-clone',
    title: 'Netflix homepage clone',
    kind: 'Frontend',
    description:
      'Streaming-style homepage with a hero, trending rows, movie cards, previews and search, built on TanStack Start.',
    stack: ['TypeScript', 'React', 'TanStack Router', 'Tailwind CSS', 'Zustand'],
    url: 'https://github.com/vimal-selvaraj/netflix-clone',
  },
  {
    name: 'age-of-war-ui',
    title: 'Age of War UI',
    kind: 'Game UI',
    description:
      'Interface for a battlefield strategy game — battalion and platoon views built from reusable cards and custom inputs.',
    stack: ['React', 'JavaScript', 'CSS'],
    url: 'https://github.com/vimal-selvaraj/age-of-war-ui',
  },
]

/** Each impact story renders its own animated illustration. */
export type ImpactVisual = 'latency' | 'components' | 'catalog' | 'events'

/**
 * Impact stories — what I did and what it changed. Wording stays close to the resume;
 * figures are the resume's approximations, not invented benchmarks.
 */
export type ImpactStory = {
  id: string
  /** Animated count (e.g. 30 → "~30%"); omit for a word-based highlight. */
  count?: { value: number; prefix?: string; suffix: string }
  /** Shown instead of a count, e.g. "Real-time". */
  highlight?: string
  metricLabel: string
  headline: string
  context: string
  did: string[]
  outcome: string
  visual: ImpactVisual
}

export const impactStories: ImpactStory[] = [
  {
    id: 'performance',
    count: { value: 30, prefix: '~', suffix: '%' },
    metricLabel: 'faster response times',
    headline: 'Made the workflow platform faster',
    context: 'Rezolve.ai · ticketing & workflow platform',
    did: [
      'Added indexes and rewrote the slowest PostgreSQL queries.',
      'Moved heavy business logic into stored functions.',
      'Added caching and pagination to the APIs.',
      'Lazy-loaded ticket pages so they render faster.',
    ],
    outcome: 'Response times improved by approximately 30%.',
    visual: 'latency',
  },
  {
    id: 'components',
    count: { value: 5, suffix: '+' },
    metricLabel: 'modules on shared components',
    headline: 'Built a shared component foundation',
    context: 'Rezolve.ai · product modules',
    did: [
      'Designed reusable React components shared across the product.',
      'Adopted in Ticket Management, Service Catalog, Data Warehouse and Knowledge Management.',
    ],
    outcome: 'Used across 5+ modules — faster development and a consistent UI.',
    visual: 'components',
  },
  {
    id: 'catalog',
    highlight: 'Configurable',
    metricLabel: 'workflows, templates & fields',
    headline: 'Put workflow setup in admins’ hands',
    context: 'Rezolve.ai · Service Catalog',
    did: [
      'As main developer, built the configurable Service Catalog — the blueprint for the ticketing system.',
      'Designed the PostgreSQL schema for reusable ticket templates and dynamic fields.',
    ],
    outcome: 'Administrators configure workflows, templates and dynamic fields used across the ticketing platform.',
    visual: 'catalog',
  },
  {
    id: 'events',
    highlight: 'Real-time',
    metricLabel: 'ticket workflow updates',
    headline: 'Made ticket updates event-driven',
    context: 'Rezolve.ai · ticketing system',
    did: [
      'Integrated Azure Service Bus into the ticketing workflow.',
      'Implemented asynchronous workflow updates across ticket status transitions.',
    ],
    outcome: 'Real-time ticket workflow updates through an event-driven architecture, on a platform serving ~50 tenants.',
    visual: 'events',
  },
]

export const award = {
  title: 'Outstanding New Joinee Award',
  org: 'Rezolve.ai',
  detail: 'Recognized for delivering the Knowledge Management application in under a month.',
}

export const education = {
  degree: 'Bachelor of Engineering (B.E.)',
  institution: 'AVC College of Engineering (Anna University)',
  year: '2019',
}

export const learning = {
  intro:
    'Outside of client work, I am exploring where intelligent systems meet solid engineering. These are active learning interests — areas I study and experiment with.',
  topics: [
    { title: 'Generative AI', note: 'Model capabilities and practical application patterns.' },
    { title: 'Retrieval-Augmented Generation', note: 'Grounding answers in trusted knowledge sources.' },
    { title: 'Hugging Face Models', note: 'Open models, embeddings and pipelines.' },
    { title: 'AI Application Development', note: 'Shipping AI features as reliable products.' },
    { title: 'AI-powered Knowledge Systems', note: 'Search and retrieval over organizational knowledge.' },
    { title: 'System Design', note: 'Trade-offs behind resilient distributed systems.' },
    { title: 'Scalable Architecture', note: 'Designing applications that grow gracefully.' },
  ],
}

export const contact = {
  headline: ["Let's Build Something", 'Meaningful.'],
  description: 'Have an interesting idea or an engineering challenge? Let’s connect.',
}
