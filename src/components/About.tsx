import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Layout, Settings } from 'lucide-react';
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
      label: 'Backend & Core',
      icon: <Database size={18} />,
      skills: [
        { name: 'Python', level: 95 },
        { name: 'FastAPI', level: 93 },
        { name: 'Microservices Architecture', level: 88 },
        { name: 'OpenAI Integration', level: 85 },
        { name: 'Printer Background Services', level: 80 },
      ],
    },
    {
      id: 'databases',
      label: 'Databases & Caching',
      icon: <Cpu size={18} />,
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MongoDB', level: 86 },
        { name: 'Redis', level: 84 },
        { name: 'NoSQL Databases', level: 80 },
        { name: 'Relational Architecture', level: 88 },
      ],
    },
    {
      id: 'architecture',
      label: 'SaaS & Architecture',
      icon: <Settings size={18} />,
      skills: [
        { name: 'Subdomain Multi-tenancy', level: 90 },
        { name: 'Stripe Payment Systems', level: 88 },
        { name: 'Real-time APIs (Fyers API)', level: 88 },
        { name: 'Git & Version Control', level: 92 },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend & UI',
      icon: <Layout size={18} />,
      skills: [
        { name: 'React.js & TypeScript', level: 85 },
        { name: 'JavaScript & ViteJS', level: 88 },
        { name: 'HTML5 & CSS3', level: 85 },
        { name: 'Responsive Web Design', level: 90 },
      ],
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Engagement Increase', value: '30%' },
    { label: 'SaaS Deployments', value: 'Multi-Tenant' },
    { label: 'Core APIs Managed', value: 'Fyers / Stripe' },
  ];

  const currentCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">About Me</h2>
          <p className="section-subtitle">Senior Software Developer specializing in SaaS systems and AI-powered portals</p>
        </div>

        <div className="about-grid">
          <div className="about-info">
            <h3 className="about-heading">Scaling backend infrastructures & robust APIs.</h3>
            <p className="about-text">
              I am a Senior Software Developer at Aagnia Technologies with a solid foundation in BCom IT and extensive training in full-stack web development (MERN). I have 2+ years of professional experience building scalable backend systems, AI examination portals, and online trading brokerages.
            </p>
            <p className="about-text">
              My expertise spans Python, FastAPI, React, and TypeScript. I specialize in API architecture, payment integrations, multi-tenant databases, microservices, and real-time communication systems.
            </p>

            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass-panel">
                  <span className="stat-value text-gradient-accent">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-skills glass-panel">
            <h3 className="skills-heading">Technical Skills</h3>
            
            {/* Tabs */}
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
                          transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
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
