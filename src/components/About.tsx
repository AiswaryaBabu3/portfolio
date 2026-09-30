import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, Sparkles, TrendingUp, ShieldCheck, GraduationCap, Award, Globe2 } from 'lucide-react';
import './About.css';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function About() {
  const [activeTab, setActiveTab] = useState('backend');

  const categories: SkillCategory[] = [
    {
      id: 'backend',
      label: 'Backend & APIs',
      icon: <Database size={18} />,
      skills: [
        { name: 'FastAPI & Asyncio', level: 96 },
        { name: 'Python & Pydantic v2', level: 96 },
        { name: 'SQLModel & SQLAlchemy 2.0', level: 92 },
        { name: 'REST APIs & WebSockets', level: 94 },
        { name: 'Node.js & Express', level: 86 },
        { name: 'Alembic & APScheduler', level: 90 },
        { name: 'Playwright Browser Automation', level: 88 },
      ],
    },
    {
      id: 'genai',
      label: 'GenAI & LLM',
      icon: <Sparkles size={18} />,
      skills: [
        { name: 'OpenAI API (GPT-4o)', level: 95 },
        { name: 'Anthropic Claude & Gemini API', level: 92 },
        { name: 'Context Injection & RAG Workflows', level: 94 },
        { name: 'Structured JSON Output & Fallbacks', level: 96 },
        { name: 'Centralized Token & Cost Accounting', level: 92 },
        { name: 'Prompt Engineering & Chatbots', level: 95 },
      ],
    },
    {
      id: 'trading',
      label: 'Trading & Real-Time',
      icon: <TrendingUp size={18} />,
      skills: [
        { name: 'Fyers Trading API & Streaming WebSockets', level: 94 },
        { name: '4-Microservice OMS & Algo Engine', level: 92 },
        { name: 'Redis Pub/Sub & Inter-Service Bus', level: 94 },
        { name: 'Vectorized Backtesting (Pandas & NumPy)', level: 90 },
        { name: 'Drag-and-Drop Strategy Builder (React Flow)', level: 90 },
        { name: 'Apache ECharts & Recharts Analytics', level: 88 },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend & UI',
      icon: <Layout size={18} />,
      skills: [
        { name: 'React 18 / 19 & TypeScript', level: 94 },
        { name: 'Next.js 16 (App Router, SSR/SSG)', level: 92 },
        { name: 'Redux Toolkit & Redux-Saga', level: 90 },
        { name: 'Tailwind CSS & Material UI', level: 92 },
        { name: 'PrimeReact & Fabric.js Canvas', level: 88 },
        { name: 'MathLive & KaTeX Proctoring UI', level: 86 },
      ],
    },
    {
      id: 'databases',
      label: 'Databases & DevOps',
      icon: <Cpu size={18} />,
      skills: [
        { name: 'PostgreSQL & Relational Data Modeling', level: 92 },
        { name: 'MongoDB (Motor / Async)', level: 90 },
        { name: 'Redis (Caching & Pub/Sub)', level: 94 },
        { name: 'Docker & Containerization', level: 88 },
        { name: 'GitLab CI/CD & SonarQube Scanning', level: 86 },
        { name: 'Subdomain Multi-Tenant SaaS & RBAC', level: 95 },
      ],
    },
    {
      id: 'integrations',
      label: 'Third-Party Services',
      icon: <ShieldCheck size={18} />,
      skills: [
        { name: 'Stripe API & Webhooks (Subscriptions)', level: 94 },
        { name: 'VdoCipher Secure Video Delivery', level: 90 },
        { name: 'Google Drive API & Firebase Admin', level: 88 },
        { name: 'Twilio & Resend Messaging', level: 90 },
        { name: 'Xero Node SDK (Invoicing)', level: 86 },
        { name: 'PDFPlumber & ReportLab Document Gen', level: 88 },
      ],
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Distributed Microservices', value: '4' },
    { label: 'SaaS Platforms Built', value: 'Multi-Tenant' },
    { label: 'Trading & AI Systems', value: 'Production' },
  ];

  const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">About Me</h2>
          <p className="section-subtitle">
            Senior Software Developer building resilient backend architectures, multi-tenant SaaS, and GenAI platforms
          </p>
        </div>

        <div className="about-grid">
          <div className="about-info">
            <h3 className="about-heading">Architecting high-throughput microservices & intelligent AI ecosystems.</h3>
            <p className="about-text">
              I am a <strong>Senior Software Developer</strong> at <strong>Aagnia Technologies</strong> (Coimbatore, Tamil Nadu) with 2+ years of hands-on experience building scalable backend architectures, multi-tenant SaaS platforms, distributed microservices, and AI-driven applications.
            </p>
            <p className="about-text">
              My engineering focus centers on <strong>Python, FastAPI, TypeScript, React 18/19, and Next.js 16</strong>. I have architected mission-critical systems including <strong>Everest Tutoring</strong> (an AI-powered examination and proctored learning platform with GPT-4o evaluation) and <strong>Invetaa</strong> (a 4-microservice quantitative trading brokerage with live Fyers API and Redis Pub/Sub).
            </p>
            <p className="about-text">
              From automated rubric-based evaluations with structured JSON outputs and centralized LLM token accounting, to low-latency order routing, vectorized backtesting, and subdomain tenant isolation, I bridge high-level system design with rigorous code quality.
            </p>

            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-panel">
                  <span className="stat-value text-gradient-accent">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Academic & Languages Highlights */}
            <div className="about-credentials-grid">
              <div className="credential-card glass-panel">
                <div className="cred-icon"><GraduationCap size={20} /></div>
                <div>
                  <h4 className="cred-title">B.Com in Information Technology</h4>
                  <p className="cred-sub">VLB Janakiammal College of Arts and Science • CGPA: 7.4 / 10 (2020 – 2023)</p>
                </div>
              </div>

              <div className="credential-card glass-panel">
                <div className="cred-icon"><Award size={20} /></div>
                <div>
                  <h4 className="cred-title">Full Stack Development (MERN)</h4>
                  <p className="cred-sub">NSchool Academy Certification (2024)</p>
                </div>
              </div>

              <div className="credential-card glass-panel">
                <div className="cred-icon"><Globe2 size={20} /></div>
                <div>
                  <h4 className="cred-title">Languages Spoken</h4>
                  <p className="cred-sub">English (Professional) • Malayalam (Native) • Tamil (Fluent)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-skills glass-panel">
            <h3 className="skills-heading">Technical Proficiency</h3>
            
            {/* Category Tabs */}
            <div className="skills-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`skills-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Skills Progress */}
            <div className="skills-list">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentCategory.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: index * 0.04, ease: 'easeOut' }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
