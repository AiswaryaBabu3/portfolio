import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, HelpCircle, Loader2 } from 'lucide-react';
import { AI_KNOWLEDGE_BASE } from '../../data/journeyData';
import './scenes.css';

interface Scene08Props {
  onNext: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function Scene08AIOrb({ onNext }: Scene08Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Greetings. I am Aishu AI, the intelligent neural orb of this dance universe. Ask me anything about Aishwarya\'s engineering architecture, production systems, or background.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'What does Aishwarya do?',
    'What is her strongest technology?',
    'Tell me about Everest Tutoring.',
    'Tell me about Investaa Trading.',
    'Why should I hire her?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleAsk = (query: string) => {
    if (!query.trim() || isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent retrieval
    setTimeout(() => {
      const qLower = query.toLowerCase();
      // Match from knowledge base
      let matched = AI_KNOWLEDGE_BASE.find(
        (kb) =>
          kb.question.toLowerCase().includes(qLower) ||
          qLower.includes(kb.question.toLowerCase()) ||
          kb.keywords.some((k) => qLower.includes(k))
      );

      let reply = matched
        ? matched.answer
        : `Aishwarya specializes in high-throughput Python, FastAPI, and React 19 microservices. She has architected real-time trading engines (Investaa) and multi-tenant SaaS platforms (Everest Tutoring). Feel free to ask about her specific projects, skills, or why her unique combination of engineering and classical dance brings immense value to your team.`;

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 750);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(inputText);
  };

  return (
    <div className="journey-scene-container scene-ai">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow cyan-eyebrow">
          <Bot size={13} style={{ color: '#06b6d4' }} /> SCENE 08 • THE INTELLIGENT ORB
        </span>
        <h2 className="scene-main-heading">Aishu AI Assistant</h2>
        <p className="scene-sub-heading">Ask me about Aishwarya's production systems, skills, and engineering philosophy</p>
      </div>

      {/* AI Chat Console */}
      <div className="ai-console-card">
        {/* Chat History Stream */}
        <div className="ai-chat-stream">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`ai-message-bubble ${msg.sender === 'user' ? 'msg-user' : 'msg-ai'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="msg-avatar-icon">
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="msg-content-text">{msg.text}</div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="ai-message-bubble msg-ai">
              <div className="msg-avatar-icon">
                <Bot size={14} />
              </div>
              <div className="msg-typing-indicator">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="ai-suggestions-row">
          <HelpCircle size={13} className="suggest-icon" />
          <div className="suggest-pills-scroll">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                className="suggest-pill-btn"
                onClick={() => handleAsk(q)}
                disabled={isTyping}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form className="ai-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ai-text-input"
            placeholder="Ask Aishu AI anything about my work..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputText.trim() || isTyping}>
            {isTyping ? <Loader2 size={16} className="spin-icon" /> : <Send size={16} />}
          </button>
        </form>
      </div>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Step to the Final Performance (Curtain Call) →
      </button>
    </div>
  );
}
