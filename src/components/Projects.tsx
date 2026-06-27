import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import './Projects.css';

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Custom inline SVG for GitHub icon
const GithubIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  category: 'web' | 'ai' | 'mobile';
  tags: string[];
  description: string;
  longDescription: string;
  features: string[];
  image: string; // Gradients/Visual icons as fallback
  githubUrl: string;
  demoUrl: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'web' | 'ai' | 'mobile'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Everest Tutoring',
      category: 'ai',
      tags: ['FastAPI', 'PostgreSQL', 'Stripe', 'React.js', 'Google Drive API'],
      description: 'AI-powered examination portal enabling automated question generation, evaluation, and chatbot tutoring.',
      longDescription: 'Everest Tutoring is an AI-integrated SaaS examination system enabling automated question generation, AI-based answer evaluation, and personalized feedback. Designed to support multi-institution usage within a single scalable deployment.',
      features: [
        'Automated syllabus-aware question generation and AI evaluation.',
        'Syllabus-aware tutoring chatbot providing real-time academic guidance.',
        'Subdomain-based tenant isolation for multi-institution support.',
        'Stripe payment integration with plan-based feature restrictions.',
        'Print request management module with admin approval workflows.',
        'Secure fetching of academic files using Google Drive API integration.',
      ],
      image: 'linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
    {
      id: 2,
      title: 'Invetaa',
      category: 'web',
      tags: ['Python', 'FastAPI', 'MongoDB', 'Redis', 'Fyers API'],
      description: 'Online trading platform for algorithmic and manual trading with real-time Fyers API integration.',
      longDescription: 'Invetaa is a high-availability online trading brokerage platform supporting both algorithmic and manual trading. It delivers concurrent trading environments with real-time analytics to improve execution speed and reduce emotional bias.',
      features: [
        'Real-time trade execution using integration with Fyers API.',
        'Automated strategy setups and live data analysis for precision trading.',
        'Scalable backend services using Python, FastAPI, MongoDB, and Redis caching.',
        'High-availability concurrent trading environments with low-latency alerts.',
      ],
      image: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
    {
      id: 3,
      title: 'Nschool Academy',
      category: 'mobile',
      tags: ['HTML5', 'CSS3', 'Responsive Design'],
      description: 'Fully responsive educational landing page demonstrating vanilla design principles and responsive layouts.',
      longDescription: 'Designed and developed a static, mobile-responsive web page structure for Nschool Academy. Built using vanilla HTML5 and CSS3 styles to ensure rapid loading speeds and structural flexibility across devices.',
      features: [
        '100% mobile-responsive layout structure without frameworks.',
        'Clean CSS3 styling variables and layout grids.',
        'Cross-browser rendering and fluid typography setups.',
      ],
      image: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
      githubUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">Featured Projects</h2>
          <p className="section-subtitle">A curation of recent software engineering and API development works</p>
        </div>

        {/* Filter Buttons */}
        <div className="projects-filters">
          {(['all', 'web', 'ai', 'mobile'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card glass-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-thumbnail" style={{ background: project.image }}>
                  <div className="project-category-tag">{project.category}</div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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

              <div className="modal-thumbnail" style={{ background: selectedProject.image }}>
                <div className="modal-category">{selectedProject.category}</div>
              </div>

              <div className="modal-body">
                <h3 className="modal-title">{selectedProject.title}</h3>
                
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <p className="modal-desc">{selectedProject.longDescription}</p>

                <h4 style={{ margin: '16px 0 8px 0', fontSize: '15px', color: 'var(--text-primary)' }}>Key Features:</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{feature}</li>
                  ))}
                </ul>

                <div className="modal-actions">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View Code <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
