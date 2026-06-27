import { motion, type Variants } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Experience.css';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  period: string;
  title: string;
  organization: string;
  description: string[];
}

export default function Experience() {
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      period: '2024 - Present',
      title: 'Senior Software Developer',
      organization: 'Everest Tutoring / Invetaa Projects',
      description: [
        'Built Invetaa, a robust trading brokerage platform integrating Fyers API for real-time trade execution and automated strategy analysis.',
        'Developed Everest Tutoring, an AI-powered portal enabling syllabus-aware chatbots, automatic question generators, and answer evaluation.',
        'Designed microservices structures utilizing Python, FastAPI, PostgreSQL, MongoDB, and Redis to achieve high-availability and low latency.',
      ],
    },
    {
      id: 2,
      type: 'work',
      period: '2022 - 2024',
      title: 'SaaS Platform Developer',
      organization: 'SaaS Integration Services',
      description: [
        'Implemented subdomain-based tenant isolation supporting multi-institution configurations within a single database deployment.',
        'Integrated Stripe payments with role-based access control and plan-based feature restrictions.',
        'Contributed to frontend React.js structures improving UI/UX refinements, dynamic form handling, and validations.',
      ],
    },
    {
      id: 3,
      type: 'education',
      period: '2018 - 2022',
      title: 'Computer Science Graduate',
      organization: 'Academic & Training Milestones',
      description: [
        'Built mobile-responsive static layouts and academic portals (such as Nschool Academy web page).',
        'Studied relational database architectures, NoSQL structures, and concurrent system designs.',
        'Established standard developer workflows using Git/GitHub for collaborative software releases.',
      ],
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 80,
      },
    }),
  };

  return (
    <section id="experience" className="experience-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">My Journey</h2>
          <p className="section-subtitle">Professional software development experience and accomplishments</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {timelineItems.map((item, index) => (
            <div key={item.id} className="timeline-item">
              {/* Timeline Icon Indicator */}
              <div className="timeline-badge-wrapper">
                <div className={`timeline-badge ${item.type === 'work' ? 'work' : 'education'}`}>
                  {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                </div>
              </div>

              {/* Timeline Content Card */}
              <motion.div
                className="timeline-card glass-panel"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                custom={index}
              >
                <div className="timeline-card-header">
                  <span className="timeline-period">{item.period}</span>
                  <h3 className="timeline-role">{item.title}</h3>
                  <h4 className="timeline-org">{item.organization}</h4>
                </div>
                
                <ul className="timeline-desc-list">
                  {item.description.map((bullet, i) => (
                    <li key={i} className="timeline-bullet">{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
