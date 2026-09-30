import { motion, type Variants } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin } from 'lucide-react';
import './Experience.css';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'certification';
  period: string;
  title: string;
  organization: string;
  location?: string;
  description: string[];
}

export default function Experience() {
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      period: 'February 2024 – Present',
      title: 'Software Developer / Senior Software Developer',
      organization: 'Aagnia Technologies',
      location: 'Coimbatore, Tamil Nadu',
      description: [
        'Full-stack and backend developer across Everest Tutoring (AI-powered EdTech) and Invetaa (algorithmic trading microservices), covering backend architecture, APIs, real-time services, frontend workflows, and third-party integrations.',
        'Engineered an automated rubric-based writing evaluation system using GPT-4o with structured JSON output, fallback handling, and centralized LLM token/cost accounting.',
        'Designed a distributed 4-microservice trading platform (Algo Engine, OMS, Backtesting Service, Webhook Consumer) with Redis Pub/Sub, Fyers streaming WebSockets, and vectorized backtesting with Pandas & NumPy.',
        'Created "Elliot", a syllabus-aware academic chatbot with dynamic context injection from student performance, weak topics, schedules, and learning activities.',
        'Implemented subdomain-based multi-tenant isolation and role-based access control (RBAC), enabling multiple institutions within a single shared deployment.',
        'Integrated Stripe subscription tiers and webhooks, VdoCipher secure video delivery, Google Drive API, Twilio/Resend messaging, and booklet print request background daemons.',
        'Built a Next.js 16 App Router booking platform using SSR/SSG patterns, integrated with Xero Node SDK and Stripe for automated invoicing and bookkeeping.',
        'Applied GitLab CI/CD, Docker, SonarQube, and security scanning practices across all production development workflows.',
      ],
    },
    {
      id: 2,
      type: 'certification',
      period: '2024',
      title: 'Full Stack Development (MERN Stack)',
      organization: 'NSchool Academy',
      location: 'Coimbatore, Tamil Nadu',
      description: [
        'Completed comprehensive hands-on engineering training covering MongoDB, Express.js, React.js, and Node.js.',
        'Built full-stack web applications with modern state management, component architecture, responsive design, and REST APIs.',
      ],
    },
    {
      id: 3,
      type: 'education',
      period: '2020 – 2023',
      title: 'Bachelor of Commerce in Information Technology (B.Com IT)',
      organization: 'VLB Janakiammal College of Arts and Science',
      location: 'Coimbatore, Tamil Nadu • CGPA: 7.4 / 10',
      description: [
        'Studied core computational foundations, relational database management systems, data structures, and enterprise information technology.',
        'Developed foundational programming, logic building, and analytical skills.',
      ],
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 85,
      },
    }),
  };

  const getBadgeIcon = (type: 'work' | 'education' | 'certification') => {
    switch (type) {
      case 'work':
        return <Briefcase size={16} />;
      case 'certification':
        return <Award size={16} />;
      case 'education':
        return <GraduationCap size={16} />;
    }
  };

  return (
    <section id="experience" className="experience-section section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">Work & Education Journey</h2>
          <p className="section-subtitle">
            Professional software engineering tenure, notable achievements, and academic background
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {timelineItems.map((item, index) => (
            <div key={item.id} className="timeline-item">
              {/* Timeline Icon Indicator */}
              <div className="timeline-badge-wrapper">
                <div className={`timeline-badge ${item.type}`}>
                  {getBadgeIcon(item.type)}
                </div>
              </div>

              {/* Timeline Content Card */}
              <motion.div
                className="timeline-card glass-panel"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index}
              >
                <div className="timeline-card-header">
                  <span className="timeline-period">{item.period}</span>
                  <h3 className="timeline-role">{item.title}</h3>
                  <div className="timeline-org-row">
                    <h4 className="timeline-org">{item.organization}</h4>
                    {item.location && (
                      <span className="timeline-location">
                        <MapPin size={13} /> {item.location}
                      </span>
                    )}
                  </div>
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
