import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const LinkedinIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const validate = () => {
    const tempErrors: Partial<FormState> = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!form.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!form.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="bg-blob blob-3"></div>
      
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title text-gradient">Let's Connect</h2>
          <p className="section-subtitle">Have an opportunity or inquiry? Send me a message!</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details */}
          <div className="contact-details">
            <h3 className="contact-heading">Got a project in mind?</h3>
            <p className="contact-text">
              I am open to discussions about backend system designs, SaaS architectures, payment integrations, or API consulting. Reach out through any of these channels:
            </p>

            <div className="info-cards-list">
              <div className="info-card glass-panel">
                <div className="info-icon purple">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="info-label">Email Me</span>
                  <a href="mailto:aiswaryababu544@gmail.com" className="info-value">aiswaryababu544@gmail.com</a>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon cyan">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="info-label">Call / WhatsApp</span>
                  <a href="tel:6369632313" className="info-value">+91 6369632313</a>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon rose">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">Coimbatore, Tamilnadu</span>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon purple" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <span className="info-label">LinkedIn</span>
                  <a href="https://linkedin.com/in/aiswarya-babu-ab49b0278" target="_blank" rel="noopener noreferrer" className="info-value">aiswarya-babu-ab49b0278</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper glass-panel">
            {status === 'success' ? (
              <div className="success-message">
                <CheckCircle2 size={56} className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                    disabled={status === 'sending'}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    disabled={status === 'sending'}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    placeholder="Project Inquiry"
                    disabled={status === 'sending'}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`form-input ${errors.message ? 'error' : ''}`}
                    placeholder="Tell me about your project details..."
                    disabled={status === 'sending'}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
