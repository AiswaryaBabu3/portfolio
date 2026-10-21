import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Trash2,
  Minimize2,
  Square,
  FileText,
  Cpu
} from 'lucide-react';
import {
  type ChatMessage,
  type OllamaStatus,
  checkOllamaConnection,
  streamOllamaChat,
  generateSmartFallbackResponse,
} from '../utils/ollamaClient';
import { soundscape } from '../utils/soundscape';
import './chatbot.css';

interface AishuChatbotProps {
  onOpenResume?: () => void;
}

export default function AishuChatbot({ onOpenResume }: AishuChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Namaskaram & Greetings! I am **Aishu AI**, Aiswarya Babu's interactive engineering assistant. Ask me anything about her distributed microservices, Investaa OMS, Everest Tutoring, tech stack, or freestyle dance passion!",
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [ollamaStatus, setOllamaStatus] = useState<OllamaStatus>({
    isOnline: false,
    models: [],
    activeModel: 'llama3:latest',
    baseUrl: '/api/ollama',
  });
  const [selectedModel, setSelectedModel] = useState<string>('qwen2.5:0.5b');
  const [isCheckingOllama, setIsCheckingOllama] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Quick prompt suggestions
  const suggestions = [
    'Tell me about Investaa Trading Platform',
    'How does Everest Tutoring handle concurrency?',
    'What is Aiswarya\'s core tech stack?',
    'Why should we hire Aiswarya?',
    'Tell me about her freestyle dance journey',
    'Malayalam-il samsarikkamo?',
  ];

  // Refresh Ollama status
  const refreshOllama = async () => {
    setIsCheckingOllama(true);
    try {
      const status = await checkOllamaConnection();
      setOllamaStatus(status);
      if (status.models.length > 0 && !status.models.includes(selectedModel)) {
        setSelectedModel(status.activeModel || status.models[0]);
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingOllama(false);
    }
  };

  useEffect(() => {
    refreshOllama();
    const interval = setInterval(refreshOllama, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, isStreaming]);

  // Handle user asking question
  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isStreaming) return;

    soundscape.playChime(1);
    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    setIsStreaming(true);
    setStreamingContent('');

    // Abort controller for streaming
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Check if Ollama is online with active models
    if (ollamaStatus.isOnline && (ollamaStatus.models.length > 0 || selectedModel)) {
      let accumulated = '';
      await streamOllamaChat(
        updatedMessages,
        selectedModel || ollamaStatus.activeModel,
        ollamaStatus.baseUrl,
        (chunk) => {
          accumulated += chunk;
          setStreamingContent(accumulated);
        },
        (finalResponse) => {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: finalResponse || accumulated },
          ]);
          setStreamingContent('');
          setIsStreaming(false);
          soundscape.playChime(3);
        },
        (err) => {
          console.warn('Ollama streaming error, switching to smart knowledge fallback:', err);
          // Fallback to smart engine if Ollama returned error
          const fallback = generateSmartFallbackResponse(textToSend);
          simulateTypewriterFallback(fallback);
        },
        controller.signal
      );
    } else {
      // Smart Fallback Engine with typewriter effect
      const fallback = generateSmartFallbackResponse(textToSend);
      simulateTypewriterFallback(fallback);
    }
  };

  // Simulate smooth typewriter for local knowledge responses
  const simulateTypewriterFallback = (fullText: string) => {
    const words = fullText.split(' ');
    let current = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        current += (index > 0 ? ' ' : '') + words[index];
        setStreamingContent(current);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }]);
        setStreamingContent('');
        setIsStreaming(false);
        soundscape.playChime(3);
      }
    }, 28);
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (streamingContent) {
      setMessages((prev) => [...prev, { role: 'assistant', content: streamingContent }]);
    }
    setStreamingContent('');
    setIsStreaming(false);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Conversation reset! I am ready to answer any questions about Aiswarya Babu's engineering achievements, distributed systems, or dance journey.",
      },
    ]);
    soundscape.playChime(2);
  };

  // Simple Markdown Renderer
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="chat-markdown-text">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('### ')) {
            return <h3 key={idx}>{trimmed.replace('### ', '')}</h3>;
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const bullet = trimmed.replace(/^[-*]\s+/, '');
            return (
              <ul key={idx}>
                <li>{renderInlineStyles(bullet)}</li>
              </ul>
            );
          }
          if (!trimmed) {
            return <div key={idx} style={{ height: '4px' }} />;
          }
          return <p key={idx}>{renderInlineStyles(line)}</p>;
        })}
      </div>
    );
  };

  // Helper for bold and code tags
  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="aishu-chatbot-container">
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <motion.button
          className="aishu-chatbot-fab"
          onClick={() => {
            setIsOpen(true);
            soundscape.playChime(4);
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Chat with Aishu AI (Ollama Powered)"
        >
          <div className="chatbot-fab-icon-wrap">
            <Bot size={20} className="fab-avatar-icon" />
            <div className="fab-pulse-ring" />
          </div>
          <span className="chatbot-fab-label">Ask Aishu AI</span>
          <div
            className={
              ollamaStatus.isOnline
                ? 'chatbot-fab-online-dot'
                : 'chatbot-fab-fallback-dot'
            }
            title={
              ollamaStatus.isOnline
                ? `Ollama Online (${selectedModel || 'Active'})`
                : 'Smart Assistant Mode'
            }
          />
        </motion.button>
      )}

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="aishu-chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="chat-window-header">
              <div className="chat-header-profile">
                <div className="chat-avatar-ring">
                  <Bot size={22} />
                </div>
                <div className="chat-title-group">
                  <div className="chat-bot-name">Aishu AI Assistant</div>
                  <div
                    className={`chat-status-pill ${
                      ollamaStatus.isOnline ? 'status-online' : 'status-fallback'
                    }`}
                  >
                    <span className="status-dot-pulse" />
                    <span>
                      {ollamaStatus.isOnline
                        ? `Ollama Active (${selectedModel || 'Local LLM'})`
                        : 'Smart Assistant Mode'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="chat-header-actions">
                <button
                  className="chat-head-btn"
                  onClick={refreshOllama}
                  disabled={isCheckingOllama}
                  title="Check Ollama Connection"
                >
                  <RefreshCw
                    size={14}
                    className={isCheckingOllama ? 'spin-icon' : ''}
                  />
                </button>
                {onOpenResume && (
                  <button
                    className="chat-head-btn"
                    onClick={() => {
                      soundscape.playChime(3);
                      onOpenResume();
                    }}
                    title="View Aiswarya's Full Resume"
                  >
                    <FileText size={14} />
                  </button>
                )}
                <button
                  className="chat-head-btn"
                  onClick={handleClearHistory}
                  title="Clear Conversation"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  className="chat-head-btn"
                  onClick={() => setIsOpen(false)}
                  title="Minimize Chat"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  className="chat-head-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Model Selector Bar (shown when Ollama is online and models exist) */}
            {ollamaStatus.isOnline && ollamaStatus.models.length > 0 && (
              <div className="chat-model-toolbar">
                <span className="model-select-label">
                  <Cpu size={12} /> Model:
                </span>
                <select
                  className="model-dropdown-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  {ollamaStatus.models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message Stream */}
            <div className="chat-messages-stream">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-msg-row ${
                    msg.role === 'user' ? 'msg-row-user' : 'msg-row-assistant'
                  }`}
                >
                  <div className="chat-msg-avatar">
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="chat-msg-card">
                    {msg.role === 'user' ? (
                      <div>{msg.content}</div>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}
                  </div>
                </div>
              ))}

              {/* Streaming in progress bubble */}
              {isStreaming && (
                <div className="chat-msg-row msg-row-assistant">
                  <div className="chat-msg-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="chat-msg-card">
                    {streamingContent ? (
                      <>
                        {renderFormattedContent(streamingContent)}
                        <span className="chat-streaming-cursor" />
                      </>
                    ) : (
                      <div className="typing-dots-bubble">
                        <span className="chat-dot" />
                        <span className="chat-dot" />
                        <span className="chat-dot" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            <div className="chat-suggestions-container">
              <div className="chat-suggest-title">
                <Sparkles size={12} /> Suggested Topics:
              </div>
              <div className="chat-pills-wrap">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="chat-pill-chip"
                    onClick={() => handleSend(s)}
                    disabled={isStreaming}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="chat-input-area">
              <form
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  type="text"
                  className="chat-text-field"
                  placeholder="Ask Aishu AI anything..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  disabled={isStreaming}
                  autoFocus
                />

                {isStreaming ? (
                  <button
                    type="button"
                    className="chat-submit-btn chat-stop-btn"
                    onClick={handleStopStreaming}
                    title="Stop Generating"
                  >
                    <Square size={13} fill="#fff" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="chat-submit-btn"
                    disabled={!inputQuery.trim()}
                    title="Send Message"
                  >
                    <Send size={14} />
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
