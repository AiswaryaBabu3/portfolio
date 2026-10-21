import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, HelpCircle, Square, RefreshCw } from 'lucide-react';
import {
  type ChatMessage,
  type OllamaStatus,
  checkOllamaConnection,
  streamOllamaChat,
  generateSmartFallbackResponse,
} from '../../utils/ollamaClient';
import { soundscape } from '../../utils/soundscape';
import './scenes.css';

interface Scene08Props {
  onNext: () => void;
}

export default function Scene08AIOrb({ onNext }: Scene08Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Greetings! I am **Aishu AI**, Aiswarya Babu's interactive engineering assistant powered by local LLMs (Ollama). Ask me anything about her architecture, sub-50ms trading microservices, multi-tenant EdTech systems, or freestyle dance flow!",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [ollamaStatus, setOllamaStatus] = useState<OllamaStatus>({
    isOnline: false,
    models: [],
    activeModel: 'qwen2.5:0.5b',
    baseUrl: '/api/ollama',
  });
  const [selectedModel, setSelectedModel] = useState<string>('qwen2.5:0.5b');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sampleQuestions = [
    'What does Aiswarya do?',
    'Tell me about Investaa Trading.',
    'Tell me about Everest Tutoring.',
    'What is her strongest technology?',
    'Why should I hire her?',
    'How does dance influence her code?',
  ];

  const refreshOllama = async () => {
    setIsRefreshing(true);
    try {
      const status = await checkOllamaConnection();
      setOllamaStatus(status);
      if (status.models.length > 0 && !status.models.includes(selectedModel)) {
        setSelectedModel(status.activeModel || status.models[0]);
      }
    } catch {
      // ignore
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshOllama();
    const interval = setInterval(refreshOllama, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, isStreaming]);

  const handleAsk = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || isStreaming) return;

    soundscape.playChime(1);
    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsStreaming(true);
    setStreamingContent('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

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
          console.warn('Ollama streaming error, falling back:', err);
          const fallback = generateSmartFallbackResponse(trimmed);
          simulateTypewriterFallback(fallback);
        },
        controller.signal
      );
    } else {
      const fallback = generateSmartFallbackResponse(trimmed);
      simulateTypewriterFallback(fallback);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(inputText);
  };

  // Inline styling for bold and code tags
  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '1px 5px',
              borderRadius: '4px',
              color: '#facc15',
              fontFamily: 'monospace',
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const renderFormatted = (content: string) => {
    const lines = content.split('\n');
    return (
      <div style={{ lineHeight: '1.55' }}>
        {lines.map((line, idx) => {
          const t = line.trim();
          if (t.startsWith('### ')) {
            return (
              <h4 key={idx} style={{ color: '#06b6d4', margin: '6px 0 2px', fontSize: '13px', fontWeight: 800 }}>
                {t.replace('### ', '')}
              </h4>
            );
          }
          if (t.startsWith('- ') || t.startsWith('* ')) {
            return (
              <div key={idx} style={{ paddingLeft: '12px', margin: '2px 0' }}>
                • {renderInlineStyles(t.replace(/^[-*]\s+/, ''))}
              </div>
            );
          }
          if (!t) return <div key={idx} style={{ height: '4px' }} />;
          return <div key={idx} style={{ margin: '2px 0' }}>{renderInlineStyles(line)}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="journey-scene-container scene-ai">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow cyan-eyebrow">
          <Bot size={13} style={{ color: '#06b6d4' }} /> SCENE 08 • OLLAMA AI ASSISTANT
        </span>
        <h2 className="scene-main-heading">Aishu AI Assistant</h2>
        <p className="scene-sub-heading">
          Chat with Aiswarya's personal AI twin powered by local LLMs (Ollama) & real-time streaming
        </p>
      </div>

      {/* AI Chat Console */}
      <div className="ai-console-card">
        {/* Status Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '11px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: ollamaStatus.isOnline ? '#10b981' : '#f59e0b',
                boxShadow: `0 0 8px ${ollamaStatus.isOnline ? '#10b981' : '#f59e0b'}`,
              }}
            />
            <span style={{ fontWeight: 700, color: ollamaStatus.isOnline ? '#34d399' : '#fbbf24' }}>
              {ollamaStatus.isOnline ? `Ollama Active` : `Smart Assistant Mode`}
            </span>
            {ollamaStatus.isOnline && ollamaStatus.models.length > 0 && (
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '2px 6px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {ollamaStatus.models.map((m) => (
                  <option key={m} value={m} style={{ background: '#180a29' }}>
                    {m}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={refreshOllama}
            disabled={isRefreshing}
            title="Refresh Ollama status"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
            }}
          >
            <RefreshCw size={11} className={isRefreshing ? 'spin-icon' : ''} />
            <span>Check Status</span>
          </button>
        </div>

        {/* Chat History Stream */}
        <div className="ai-chat-stream">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`ai-message-bubble ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="msg-avatar-icon">
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="msg-content-text">
                {msg.role === 'user' ? msg.content : renderFormatted(msg.content)}
              </div>
            </motion.div>
          ))}

          {/* Streaming Bubble */}
          {isStreaming && (
            <div className="ai-message-bubble msg-ai">
              <div className="msg-avatar-icon">
                <Bot size={14} />
              </div>
              <div className="msg-content-text">
                {streamingContent ? (
                  <>
                    {renderFormatted(streamingContent)}
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '12px',
                        background: '#06b6d4',
                        marginLeft: '3px',
                        animation: 'blink 0.8s infinite',
                      }}
                    />
                  </>
                ) : (
                  <div className="msg-typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                )}
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
                disabled={isStreaming}
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
            placeholder="Ask Aishu AI anything about Aiswarya..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isStreaming}
          />
          {isStreaming ? (
            <button
              type="button"
              className="ai-send-btn"
              onClick={handleStopStreaming}
              style={{ background: '#ef4444' }}
              title="Stop Generation"
            >
              <Square size={13} fill="#fff" />
            </button>
          ) : (
            <button
              type="submit"
              className="ai-send-btn"
              disabled={!inputText.trim()}
              title="Send"
            >
              <Send size={15} />
            </button>
          )}
        </form>
      </div>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Step to the Final Performance (Curtain Call) →
      </button>
    </div>
  );
}
