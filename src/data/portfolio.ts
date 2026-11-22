/**
 * Single source of truth for all portfolio content.
 * Everything here is taken from the resume (public/resume/Vimal_Selvaraj_Resume.pdf).
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
  phone: '+91 9600408017',
  phoneHref: 'tel:+919600408017',
  linkedin: 'https://www.linkedin.com/in/vimal-selvaraj-5b0716251',
  resume: '/resume/Vimal_Selvaraj_Resume.pdf',
  resumeFileName: 'Vimal_Selvaraj_Resume.pdf',
  /** Replace with an image path (e.g. '/profile.jpg') to show a real photo. */
  photo: null as string | null,
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  label: 'Full-Stack Engineer | 5+ Years Experience',
  headline: ['Engineering Scalable', 'Digital Experiences.'],
  altHeadline: 'From Interfaces to Enterprise Systems.',
  description:
    'I build scalable enterprise applications by combining modern frontend engineering, robust backend architecture, and efficient data systems.',
  floatingTech: ['React 18', 'TypeScript', 'NodeJS', 'ExpressJS', 'PostgreSQL', 'Redux Toolkit', 'Docker', 'Pinecone'],
}

export const about = {
  paragraphs: [
    'With 5+ years of experience in software development, I specialize in building scalable enterprise applications and workflow-driven platforms.',
    'My experience spans frontend architecture, backend API development, database optimization, authentication systems, and multi-tenant application design.',
    'I have worked on enterprise CRM platforms, ticketing systems, configurable service catalogs, analytics dashboards, and AI-powered knowledge management solutions.',
    'I enjoy solving complex engineering challenges and transforming business requirements into maintainable, high-performance applications.',
  ],
  highlights: [
    '5+ years of experience',
    'Full-stack development',
    'Enterprise application architecture',
    'Workflow automation',
    'Database optimization',
    'AI-based knowledge retrieval',
  ],
}

export type SkillGroup = { id: string; title: string; caption: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'Interfaces that scale with the product',
    items: [
      'ReactJS', 'React 18', 'Redux', 'Redux Toolkit', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'SCSS',
      'Bootstrap', 'MUI', 'React Hooks', 'Custom Hooks', 'React Router', 'Axios', 'Responsive UI', 'Lazy Loading',
      'Code Splitting', 'Debouncing',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    caption: 'APIs, gateways and secure access',
    items: [
      'NodeJS', 'ExpressJS', 'TypeScript', 'REST API Development', 'API Integration', 'API Gateway', 'SSO', 'JWT',
      'Authentication', 'Authorization', 'Middleware Development',
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
      'Develop and maintain cconnect, an enterprise CRM portal serving multiple Saint-Gobain business units.',
    contributions: [
      'Develop enterprise CRM features across multiple business units.',
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
    summary: 'Developed enterprise workflow applications and multiple product modules.',
    contributions: [
      'Built configurable Service Catalog systems.',
      'Developed ticketing management modules.',
      'Implemented RBAC and secure multi-tenant access.',
      'Integrated Azure Service Bus for event-driven workflow updates.',
      'Optimized PostgreSQL queries and API performance — ~30% faster response times.',
      'Developed reusable React components used across multiple modules.',
      'Built the Knowledge Management Platform.',
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
    overview: 'Enterprise CRM platform serving multiple Saint-Gobain business units.',
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
    overview: 'Configurable Service Catalog platform acting as the blueprint for ticketing workflows.',
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
    overview: 'Enterprise ticket management platform supporting configurable ticket workflows.',
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
    overview: 'Knowledge ingestion and retrieval platform for AI-powered chatbot experiences.',
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

export type SecondaryProject = { title: string; category: string; points: string[]; stack: string[] }

export const secondaryProjects: SecondaryProject[] = [
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

export type Achievement = {
  value: number
  prefix?: string
  suffix: string
  label: string
  detail: string
}

export const achievements: Achievement[] = [
  { value: 5, suffix: '+', label: 'Years of experience', detail: 'Building enterprise web applications end to end.' },
  { value: 30, prefix: '~', suffix: '%', label: 'Faster API & DB response', detail: 'PostgreSQL query and API performance optimization.' },
  { value: 40, prefix: '~', suffix: '%', label: 'Faster ticket page loads', detail: 'Ticket system performance improvements.' },
  { value: 5, suffix: '+', label: 'Modules on shared components', detail: 'Reusable React components adopted across modules.' },
]

export const award = {
  title: 'Outstanding New Joinee Award',
  org: 'Rezolve.ai',
  detail: 'Recognized for delivering the Knowledge Management application within a short timeframe.',
}

export const education = {
  degree: 'Bachelor of Engineering (B.E.)',
  institution: 'Anna University',
  year: '2019',
}

export const learning = {
  intro:
    'Outside of client work, I am exploring where intelligent systems meet solid engineering. These are active learning interests — areas I study and experiment with.',
  topics: [
    { title: 'Generative AI', note: 'Model capabilities and practical application patterns.' },
    { title: 'Retrieval-Augmented Generation', note: 'Grounding answers in trusted knowledge sources.' },
    { title: 'Agentic AI', note: 'Tool-using systems that plan and act.' },
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
