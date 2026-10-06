import type { ProjectData, ExperienceData, SkillNode } from '../types/journey';
import everestTutoringImg from '../assets/everest-tutoring.png';
import everestBookingImg from '../assets/everest-booking.png';
import invetaaImg from '../assets/invetaa-trading.png';
import heroImg from '../assets/hero.png';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'everest-tutoring',
    title: 'Everest Tutoring',
    tagline: 'Multi-Tenant EdTech & Booking Ecosystem',
    category: 'Full Stack & Distributed System',
    image: everestTutoringImg || everestBookingImg,
    problem:
      'Fragmented scheduling, disparate payment gateways, and lack of real-time student-tutor synchronization leading to 35% scheduling conflicts and delayed booking confirmations.',
    solution:
      'Engineered an event-driven multi-tenant SaaS booking platform with sub-second slot locking, automated time-zone normalization, and instant video classroom provisioning.',
    architecture:
      'FastAPI microservices communicating via Redis Pub/Sub, PostgreSQL with row-level tenant security, SQLAlchemy async ORM, and React 19 frontend.',
    technologies: ['FastAPI', 'Python', 'React 19', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
    features: [
      'Zero-conflict atomic slot booking engine with distributed Redis locks',
      'Multi-currency payment gateway integrations (Stripe, Razorpay)',
      'Real-time automated notification engine with WebSocket event push',
      'Automated tutor payout calculation and analytics dashboards'
    ],
    contribution:
      'Architected backend microservices from scratch, modeled PostgreSQL schemas, built atomic booking concurrency controls, and implemented responsive React client modules.',
    result:
      'Achieved 99.98% booking accuracy, reduced scheduling latency to under 120ms, and scaled to handle 10,000+ monthly active booking sessions.',
    liveUrl: 'https://everesttutoring.com',
  },
  {
    id: 'investaa',
    title: 'Investaa Trading Platform',
    tagline: 'Low-Latency Algorithmic Execution OMS',
    category: 'FinTech & Real-Time Trading',
    image: invetaaImg,
    problem:
      'High order placement latency and slippage during volatile market opens, accompanied by unpredictable websocket tick disconnections across broker APIs.',
    solution:
      'Developed a high-throughput Order Management System (OMS) connecting directly to Fyers API with resilient WebSocket streaming and automated risk sanity filters.',
    architecture:
      'Asynchronous Python event loop, Redis time-series tick cache, FastAPI microservice cluster, WebSocket full-duplex client feed, and Next.js trading cockpit.',
    technologies: ['Python', 'FastAPI', 'Fyers API', 'WebSockets', 'Redis', 'Next.js', 'Pandas', 'NumPy'],
    features: [
      'Sub-50ms order routing with pre-trade risk validations and stop-loss guards',
      'Live market depth tick streamer processing 1,500+ ticks/sec',
      'Multi-account copy trading engine with slippage mitigation heuristics',
      'Automated historical bar aggregation and performance metrics logging'
    ],
    contribution:
      'Engineered the core order dispatch queue, integrated Fyers v3 REST and WebSocket feeds, developed paper-trading simulation engine, and built reactive trading UI.',
    result:
      'Reduced average order latency from 450ms down to 42ms with zero missed stop-loss triggers across 50,000+ simulated and live execution cycles.',
    githubUrl: 'https://github.com/Aiswaryababu3',
  },
  {
    id: 'ai-question-generation',
    title: 'AI Question Generation Engine',
    tagline: 'Autonomous Curriculum-Aligned GenAI Assessment Pipeline',
    category: 'Artificial Intelligence & NLP',
    image: everestBookingImg || heroImg,
    problem:
      'Manual examination authoring requires weeks of educator effort, often yielding repetitive questions with hallucinated answers and inconsistent Bloom\'s taxonomy levels.',
    solution:
      'Constructed a reliable GenAI pipeline leveraging GPT-4o with structured JSON schema outputs, multi-stage fact verification, and programmatic rubric evaluation.',
    architecture:
      'FastAPI orchestration layer, LangChain / LlamaIndex retrieval over academic syllabi, ChromaDB vector storage, and Pydantic validation guards.',
    technologies: ['Python', 'FastAPI', 'OpenAI GPT-4o', 'LangChain', 'ChromaDB', 'Pydantic', 'React'],
    features: [
      'Targeted Bloom\'s Taxonomy generation (Recall, Analysis, Synthesis)',
      'Automated distractor rationale verification for multiple-choice questions',
      'LaTeX mathematical equation rendering and programmatic code evaluation',
      'Syllabus PDF parsing and semantic chunking with embedding deduplication'
    ],
    contribution:
      'Designed prompting hierarchies, engineered strict JSON-schema response validation, built async worker pools for bulk exam generation, and integrated frontend test-taking mode.',
    result:
      'Compressed exam paper creation time from 14 days to under 4 minutes with 98.4% educator acceptance rating across 5,000+ generated assessment items.',
  },
  {
    id: 'trading-backtest-system',
    title: 'Trading & Backtesting System',
    tagline: 'High-Performance Quantitative Strategy Engine',
    category: 'Quantitative Finance & Backtesting',
    image: heroImg || invetaaImg,
    problem:
      'Overfitting and look-ahead bias in visual strategy builders, coupled with prohibitively slow iteration speeds when simulating multi-year tick-level data.',
    solution:
      'Constructed an event-driven backtesting engine utilizing vectorized NumPy calculations and tick-by-tick simulation with realistic commissions, slippage, and market impact.',
    architecture:
      'FastAPI calculation workers, Cython/NumPy computational core, Celery asynchronous job distribution, and interactive charting visualizer.',
    technologies: ['Python', 'FastAPI', 'NumPy', 'Pandas', 'Celery', 'Docker', 'TradingView Lightweight Charts'],
    features: [
      'Vectorized and event-driven backtesting modes with tick-level granularity',
      'Comprehensive risk metrics: Sharpe Ratio, Sortino Ratio, Maximum Drawdown, Profit Factor',
      'Walk-forward optimization and Monte Carlo robustness stress tests',
      'Instant interactive trade execution replay on candlestick charts'
    ],
    contribution:
      'Authored the mathematical backtesting engine, built Celery task workers for distributed parameter sweeps, and designed interactive equity curve analytics charts.',
    result:
      'Accelerated backtest simulations by 18x compared to standard Python loops, processing 5 years of 1-minute historical data in under 2.8 seconds.',
    githubUrl: 'https://github.com/Aiswaryababu3',
  },
];

export const EXPERIENCES_DATA: ExperienceData[] = [
  {
    year: '2026 — Present',
    role: 'Senior Software Developer (Architectural Lead)',
    company: 'Full Stack Technology',
    summary:
      'Spearheading distributed backend architecture, AI model integration, and low-latency microservices for high-throughput enterprise SaaS applications.',
    highlights: [
      'Architected event-driven microservices processing 25,000+ requests/minute with 99.99% uptime',
      'Pioneered GenAI agent workflows with GPT-4o, reducing automated workflow latencies by 45%',
      'Mentored engineering teams on asynchronous design patterns, type safety, and clean API design'
    ],
    technologies: ['FastAPI', 'Python', 'React 19', 'TypeScript', 'GenAI', 'PostgreSQL', 'Docker'],
  },
  {
    year: '2025',
    role: 'Senior Software Developer',
    company: 'Full Stack Technology',
    summary:
      'Led the end-to-end development of scalable SaaS products, algorithmic trading platforms, and intelligent automation systems.',
    highlights: [
      'Built high-concurrency Order Management System integrated with Fyers brokerage APIs',
      'Optimized PostgreSQL query bottlenecks and caching layers, cutting p95 response times by 60%',
      'Integrated real-time WebSocket pipelines for live data streaming and instant notifications'
    ],
    technologies: ['Python', 'FastAPI', 'WebSockets', 'Redis', 'SQLAlchemy', 'Next.js', 'PostgreSQL'],
  },
  {
    year: '2024',
    role: 'Software Developer',
    company: 'Aagnia Technologies',
    summary:
      'Engineered core backend APIs, database schemas, and responsive web client interfaces for high-growth client applications.',
    highlights: [
      'Developed 40+ production REST API endpoints utilizing FastAPI and Pydantic validation',
      'Engineered multi-tenant database migrations and complex relational models with SQLAlchemy',
      'Collaborated closely with design teams to craft pixel-perfect, high-performance web experiences'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'REST APIs'],
  },
];

export const SKILLS_DATA: SkillNode[] = [
  {
    name: 'Python',
    movement: 'Hand Movement',
    category: 'backend',
    level: 'Core Mastery',
    description: 'Asynchronous event loops, clean architecture, metaclasses, and high-performance computation.',
    iconName: 'Code',
  },
  {
    name: 'FastAPI',
    movement: 'Foot Movement',
    category: 'backend',
    level: 'Production Grade',
    description: 'Sub-millisecond endpoints, dependency injection, async I/O, Pydantic validation & OpenAPI.',
    iconName: 'Zap',
  },
  {
    name: 'React & Next.js',
    movement: 'Spin',
    category: 'frontend',
    level: 'Advanced',
    description: 'React 19, server components, hooks architecture, smooth micro-animations & state management.',
    iconName: 'Layers',
  },
  {
    name: 'PostgreSQL & SQLAlchemy',
    movement: 'Jump',
    category: 'data',
    level: 'Production Grade',
    description: 'Complex relational modeling, indexing optimization, row-level locks & async ORM queries.',
    iconName: 'Database',
  },
  {
    name: 'AI & GenAI / LLMs',
    movement: 'Movement Trail',
    category: 'ai',
    level: 'Applied Innovation',
    description: 'Prompt engineering, structured outputs, LangChain, retrieval-augmented generation & agents.',
    iconName: 'Sparkles',
  },
  {
    name: 'Redis & WebSockets',
    movement: 'Rhythmic Beat',
    category: 'system',
    level: 'High Scale',
    description: 'Distributed locking, pub/sub messaging, time-series cache & low-latency full-duplex streaming.',
    iconName: 'Radio',
  },
  {
    name: 'TypeScript',
    movement: 'Graceful Pose',
    category: 'frontend',
    level: 'Advanced',
    description: 'Strict type modeling, generics, end-to-end type safety, modern modular architecture.',
    iconName: 'FileCode',
  },
  {
    name: 'Microservices & Docker',
    movement: 'Stage Stride',
    category: 'system',
    level: 'Architecture',
    description: 'Containerized service clusters, inter-service communication, health checks & CI/CD deployment.',
    iconName: 'Box',
  },
];

export const BEYOND_CODE_DATA = [
  {
    id: 'dance',
    title: 'Classical Dance',
    subtitle: 'Bharatanatyam & Rhythm',
    quote: 'Dance taught me that complexity is simply rhythm waiting to be mastered.',
    details: '10+ years exploring the geometric precision, footwork rhythms, and emotional storytelling of classical dance. The exact same discipline translates into writing harmonious, bug-free software architecture.',
    icon: '💃',
  },
  {
    id: 'music',
    title: 'Music & Cadence',
    subtitle: 'Rhythm, Beats & Harmony',
    quote: 'Every line of code has a tempo; every microservice is a voice in an orchestra.',
    details: 'Fascinated by rhythm structures, ghungroo beats, and ambient soundscapes. I often listen to acoustic rhythms while architecting distributed database locks.',
    icon: '🎵',
  },
  {
    id: 'gaming',
    title: 'Gaming & Strategy',
    subtitle: 'Mechanics & Virtual Worlds',
    quote: 'Interactive worlds prove that technology can evoke genuine wonder.',
    details: 'Love analyzing gameplay mechanics, real-time rendering pipelines, and immersive virtual storytelling that blends technology with emotion.',
    icon: '🎮',
  },
  {
    id: 'creativity',
    title: 'Choreography & Design',
    subtitle: 'Visual Aesthetics & Space',
    quote: 'Good code is functional; great code is a choreography of data.',
    details: 'Passionate about choreography, visual symmetry, glassmorphism aesthetics, and bringing theatrical lighting philosophy into modern digital interfaces.',
    icon: '✨',
  },
  {
    id: 'puzzles',
    title: 'Algorithmic Puzzles',
    subtitle: 'Problem Solving & Chess',
    quote: 'A complex bug is just an elegant puzzle waiting for the right perspective.',
    details: 'Addicted to dissecting complex system problems, concurrency race conditions, algorithmic challenges, and chess openings.',
    icon: '🧩',
  },
];

export const AI_KNOWLEDGE_BASE: { question: string; answer: string; keywords: string[] }[] = [
  {
    question: 'What does Aishwarya do?',
    keywords: ['what', 'do', 'role', 'developer', 'who'],
    answer:
      'Aishwarya Babu is a Senior Software Developer with over 2.5 years of hands-on production experience. She specializes in building high-throughput backend services, distributed microservices, multi-tenant SaaS platforms, and cutting-edge GenAI integrations using Python, FastAPI, React, and TypeScript. She is also a passionate classical dancer who brings rhythmic precision and mathematical harmony to software architecture.',
  },
  {
    question: 'What is her strongest technology?',
    keywords: ['strongest', 'technology', 'skills', 'best', 'tech'],
    answer:
      'Aishwarya\'s strongest core stack centers on Python & FastAPI for high-performance backend microservices (under 50ms latency), PostgreSQL & SQLAlchemy for resilient data models, Redis & WebSockets for real-time concurrency, and React 19 / TypeScript for reactive frontends. She also has deep applied experience orchestrating LLMs (GPT-4o) with strict schema validation.',
  },
  {
    question: 'Tell me about Everest Tutoring.',
    keywords: ['everest', 'tutoring', 'project', 'edtech'],
    answer:
      'Everest Tutoring is an end-to-end multi-tenant EdTech platform Aishwarya architected. She built an atomic slot-booking engine with distributed Redis locks that eliminated scheduling conflicts, integrated multi-currency payments, and connected live WebSocket notification feeds. The platform achieved 99.98% booking accuracy and supports 10,000+ monthly sessions.',
  },
  {
    question: 'Tell me about Investaa Trading.',
    keywords: ['investaa', 'trading', 'oms', 'fyers', 'algo'],
    answer:
      'Investaa is a low-latency Algorithmic Order Management System (OMS) Aishwarya engineered. It connects directly to Fyers APIs with resilient WebSocket market tick streams (1,500+ ticks/sec) and sub-50ms execution queues, featuring automated pre-trade risk controls and paper trading simulations.',
  },
  {
    question: 'Why should I hire her?',
    keywords: ['hire', 'why', 'strengths', 'value', 'join'],
    answer:
      'You should hire Aishwarya because she brings rare end-to-end architectural maturity paired with artistic discipline. She doesn\'t just write code — she designs resilient systems that withstand production loads, thinks proactively about race conditions and latency, and communicates with empathy and clarity. Her classical dance background gives her immense focus, stamina, and attention to detail.',
  },
];
