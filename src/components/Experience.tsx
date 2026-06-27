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
      period: 'Sep 2025 - Present',
      title: 'Senior Software Developer',
      organization: 'Aagnia Technologies',
      description: [
        'Promoted to lead backend system architectures, API designs, and database scaling.',
        'Engineered Everest Tutoring (AI-powered portal with OpenAI & Stripe integrations) and Invetaa (algorithmic trading with Fyers API, MongoDB, & Redis).',
        'Built custom background client service applications for automated printer systems integration.',
        'Designed microservices structures utilizing Python, FastAPI, PostgreSQL, MongoDB, and Redis to achieve high-availability and low latency.',
      ],
    },
    {
      id: 2,
      type: 'work',
      period: 'Feb 2024 - Sep 2025',
      title: 'Software Developer',
      organization: 'Aagnia Technologies',
      description: [
        'Joined as full-stack software developer focusing on core FastAPI/Python backends and React/TypeScript frontends.',
        'Implemented subdomain-based tenant isolation supporting multi-institution configurations within a single database deployment.',
        'Integrated Stripe payments with role-based access control and plan-based feature restrictions.',
        'Established responsive web design structures and dynamic forms validation via React & ViteJS.',
      ],
    },
    {
      id: 3,
      type: 'education',
      period: '2023 - 2024',
      title: 'Full Stack Web Development (MERN)',
      organization: 'MERN Stack Course Certification',
      description: [
        'Mastered MongoDB, Express.js, React.js, and Node.js to build full-stack web applications.',
        'Learned modern state management, responsive designs, database architectures, and Git version control.',
      ],
    },
    {
      id: 4,
      type: 'education',
      period: '2020 - 2023',
      title: 'BCom IT (Bachelor of Commerce in Information Technology)',
      organization: 'University Education',
      description: [
        'Acquired academic foundations in database management, business application development, and IT software networks.',
        'Constructed initial web application layouts and learned programming foundations.',
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
