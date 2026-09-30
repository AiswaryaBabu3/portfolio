import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, MoveHorizontal, LayoutGrid, Sparkles } from 'lucide-react';
import everestTutoringImg from '../assets/everest-tutoring.png';
import invetaaImg from '../assets/invetaa-trading.png';
import everestBookingImg from '../assets/everest-booking.png';
import TiltCard from './TiltCard';
import './Projects.css';

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const GithubIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  badge: string;
  category: 'ai' | 'fintech' | 'saas' | 'backend';
  tags: string[];
  description: string;
  longDescription: string;
  features: string[];
  image: string; // Gradient fallback
  imageUrl?: string; // High-res screenshot
  githubUrl: string;
  demoUrl?: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fintech' | 'saas' | 'backend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [dragWidth, setDragWidth] = useState(0);

  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Everest Tutoring – AI Examination & Learning Ecosystem',
      badge: 'GenAI & EdTech Ecosystem',
      category: 'ai',
      tags: ['FastAPI', 'Python', 'OpenAI GPT-4o', 'PostgreSQL', 'React 18/19', 'Next.js 16', 'Stripe', 'Docker'],
      description: 'Multi-tenant AI learning platform with automated GPT-4o writing evaluation, syllabus chatbot, and proctored examination.',
      longDescription: 'Everest Tutoring is an enterprise-grade AI-powered learning and examination platform supporting multi-tenant institutional operations. It features real-time proctoring with session replay, curriculum-aligned chatbot tutoring, and automated rubric-based grading powered by OpenAI GPT-4o.',
      features: [
        'Engineered an automated rubric-based writing evaluation system using GPT-4o with structured JSON output and retry/fallback handling.',
        'Built centralized LLM token and cost accounting for prompt tokens, completion tokens, model usage, USD expenditure, and agent routing.',
        'Created "Elliot," a syllabus-aware academic chatbot with dynamic context injection from student performance, weak topics, schedules, and learning activities.',
        'Implemented VTT/SRT transcript processing to generate structured lesson notes, summaries, key concepts, and interactive video quizzes.',
        'Integrated rrweb session recording/replay, MathLive, KaTeX, and Fabric.js into the examination experience to support proctoring and audit trails.',
        'Built bulk data ingestion and normalization with Pandas and OpenPyXL for questions and video metadata.',
        'Developed Everest_Meet_Bot with Playwright for Google Meet joining, session persistence, and automated browser permissions.',
        'Implemented subdomain-based multi-tenant isolation and role-based access control (RBAC), enabling multiple institutions within a shared platform.',
        'Integrated Stripe subscription tiers and webhooks, VdoCipher API for secure video delivery, and Twilio/Resend messaging.',
      ],
      image: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
      imageUrl: everestTutoringImg,
      demoUrl: 'https://learn.everesttutoring.com.au/home',
      githubUrl: 'https://github.com/Aiswaryababu3',
    },
    {
      id: 2,
      title: 'Invetaa – Algorithmic & Quantitative Trading Brokerage Platform',
      badge: '4-Microservice Trading System',
      category: 'fintech',
      tags: ['Python', 'FastAPI', 'MongoDB', 'Redis Pub/Sub', 'Fyers API', 'React Flow', 'Apache ECharts'],
      description: 'Distributed 4-microservice quantitative trading platform with live Fyers streaming, vectorized backtesting, and automated OMS.',
      longDescription: 'Invetaa is a high-availability online trading brokerage platform engineered for quantitative strategy execution and algorithmic trading. Built with a decoupled microservice architecture, it ensures low-latency execution and real-time risk analytics for active traders.',
      features: [
        'Designed a distributed 4-microservice platform: Algo Engine, Order Management System (OMS), Backtesting Service, and Webhook Consumer.',
        'Built quantitative strategy execution, including SMA Crossover workflows for NSE/NFO Futures & Options with concurrent processing.',
        'Developed the OMS for automated order routing, Stop-Loss, Take-Profit, Trailing Stop-Loss, and margin validation via Fyers API.',
        'Built a vectorized historical backtesting engine with Pandas and NumPy for P&L and risk analytics.',
        'Implemented Redis Pub/Sub as the inter-service communication layer, enabling real-time market and execution events to flow between microservices.',
        'Fyers streaming WebSockets and webhooks feeding live broker order states and tick-by-tick market updates.',
        'Developed a drag-and-drop visual strategy builder with React & React Flow, plus real-time financial charts using Apache ECharts and Recharts.',
      ],
      image: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      imageUrl: invetaaImg,
      demoUrl: 'https://trader.investaa.in/login',
      githubUrl: 'https://github.com/Aiswaryababu3',
    },
    {
      id: 3,
      title: 'Everest Consultation & Booking Platform',
      badge: 'Full-Stack SaaS Platform',
      category: 'saas',
      tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Stripe', 'Xero Node SDK'],
      description: 'Next.js App Router booking platform for trial sessions and tutor consultations with automated Xero bookkeeping.',
      longDescription: 'A modern consultation scheduling and billing platform built for educational tutors and institutions. Features client self-booking, calendar synchronization, automated invoicing, and bookkeeping reconciliation.',
      features: [
        'Built Next.js 16 App Router booking platform for trial bookings and tutor consultations using SSR/SSG patterns.',
        'Integrated Xero Node SDK and Stripe for invoicing, payment reconciliation, and bookkeeping workflows.',
        'Real-time availability slot detection with timezone adjustments.',
        'Fully responsive UI styled with Tailwind CSS and animated interactions.',
      ],
      image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      imageUrl: everestBookingImg,
      demoUrl: 'https://hshstest.everesttutoring.com.au',
      githubUrl: 'https://github.com/Aiswaryababu3',
    },
    {
      id: 4,
      title: 'Automated Print Request & Background Daemon Service',
      badge: 'Background Services & Automation',
      category: 'backend',
      tags: ['Python', 'FastAPI', 'APScheduler', 'ReportLab', 'PDFPlumber', 'Win32'],
      description: 'Background client service application enabling automated printer integration and academic booklet generation.',
      longDescription: 'A client-side background daemon integrated with institutional booklet print-request workflows. Automates queue scheduling, PDF extraction, document compilation, and printer spooling.',
      features: [
        'Built custom background client service applications for automated printer systems integration.',
        'Automated document compilation and watermark injection using ReportLab and PDFPlumber.',
        'Integrated with main web platform via secure HMAC webhook dispatch.',
        'Fault-tolerant local spooling with automatic retry on printer hardware errors.',
      ],
      image: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      githubUrl: 'https://github.com/Aiswaryababu3',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'GenAI & EdTech' },
    { id: 'fintech', label: 'Trading & Microservices' },
    { id: 'saas', label: 'Next.js SaaS' },
    { id: 'backend', label: 'Backend Daemons' },
  ];

  // Calculate carousel scroll bounds
  useEffect(() => {
    if (carouselTrackRef.current && carouselViewportRef.current) {
      const scrollWidth = carouselTrackRef.current.scrollWidth;
      const clientWidth = carouselViewportRef.current.clientWidth;
      setDragWidth(Math.max(0, scrollWidth - clientWidth + 30));
    }
  }, [filteredProjects, viewMode]);

  const handleSlide = (direction: 'left' | 'right') => {
    if (!carouselViewportRef.current) return;
    const scrollAmount = 400;
    carouselViewportRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">Featured Projects</h2>
          <p className="section-subtitle">
            Production systems, microservice architectures, and AI applications from my professional career
          </p>
        </div>

        {/* Top Controls Bar: Filter & 3D Stage View Switcher */}
        <div className="projects-controls-bar">
          <div className="projects-filters">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="view-mode-toggle">
            <button
              onClick={() => setViewMode('carousel')}
              className={`toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              title="3D Draggable Stage Carousel"
            >
              <Sparkles size={14} /> 3D Stage
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grid View"
            >
              <LayoutGrid size={14} /> Grid
            </button>
          </div>
        </div>

        {/* 3D DRAGGABLE STAGE CAROUSEL VIEW */}
        {viewMode === 'carousel' ? (
          <div className="stage-carousel-wrapper">
            <div className="carousel-drag-hint">
              <MoveHorizontal size={15} /> Click & drag to glide through projects on stage
            </div>

            <div className="stage-carousel-viewport" ref={carouselViewportRef}>
              <motion.div
                ref={carouselTrackRef}
                drag="x"
                dragConstraints={{ right: 0, left: -dragWidth }}
                dragElastic={0.15}
                className="carousel-track"
              >
                {filteredProjects.map((project) => (
                  <div key={project.id} className="carousel-card-item">
                    <TiltCard maxTilt={14} onClick={() => setSelectedProject(project)}>
                      <div className="project-card glass-card">
                        <div
                          className={`project-thumbnail ${project.imageUrl ? 'has-image' : ''}`}
                          style={!project.imageUrl ? { background: project.image } : undefined}
                        >
                          {project.imageUrl && (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="project-thumb-img"
                              draggable={false}
                            />
                          )}
                          <div className="project-category-tag">{project.badge}</div>
                        </div>

                        <div className="project-info">
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-desc">{project.description}</p>

                          <div className="project-tags">
                            {project.tags.slice(0, 4).map((tag, i) => (
                              <span key={i} className="project-tag">{tag}</span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="project-tag">+{project.tags.length - 4}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrow Controls */}
            <div className="carousel-nav-controls">
              <button
                onClick={() => handleSlide('left')}
                className="carousel-nav-btn"
                aria-label="Previous Project"
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {filteredProjects.length} Projects on Stage
              </span>
              <button
                onClick={() => handleSlide('right')}
                className="carousel-nav-btn"
                aria-label="Next Project"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Stage Floor Reflection Glow */}
            <div className="projects-stage-glow"></div>
          </div>
        ) : (
          /* GRID VIEW WITH 3D TILT */
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltCard maxTilt={14} onClick={() => setSelectedProject(project)}>
                    <div className="project-card glass-card">
                      <div
                        className={`project-thumbnail ${project.imageUrl ? 'has-image' : ''}`}
                        style={!project.imageUrl ? { background: project.image } : undefined}
                      >
                        {project.imageUrl && (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="project-thumb-img"
                            draggable={false}
                          />
                        )}
                        <div className="project-category-tag">{project.badge}</div>
                      </div>

                      <div className="project-info">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-desc">{project.description}</p>

                        <div className="project-tags">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="project-tag">{tag}</span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="project-tag">+{project.tags.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-content glass-panel"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
                <X size={20} />
              </button>

              <div
                className={`modal-thumbnail ${selectedProject.imageUrl ? 'has-image' : ''}`}
                style={!selectedProject.imageUrl ? { background: selectedProject.image } : undefined}
              >
                {selectedProject.imageUrl && (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="modal-thumb-img"
                  />
                )}
                <div className="modal-category">{selectedProject.badge}</div>
              </div>

              <div className="modal-body">
                <h3 className="modal-title">{selectedProject.title}</h3>

                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <p className="modal-desc">{selectedProject.longDescription}</p>

                <h4 style={{ margin: '18px 0 10px 0', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Key Engineering Contributions:
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.7' }}>
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>{feature}</li>
                  ))}
                </ul>

                <div className="modal-actions">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Live Platform <ExternalLink size={16} />
                    </a>
                  )}
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View on GitHub <GithubIcon size={16} />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn btn-secondary"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
