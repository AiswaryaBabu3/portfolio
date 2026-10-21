// AI Assistant Client with Ollama streaming integration & smart fallback
import { PROJECTS_DATA } from '../data/journeyData';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OllamaStatus {
  isOnline: boolean;
  models: string[];
  activeModel: string;
  baseUrl: string;
}

export const AISWARYA_SYSTEM_PROMPT = `
You are "Aishu AI", the personal intelligent engineering assistant and portfolio ambassador for Aiswarya Babu.
You speak on her behalf to recruiters, engineering leaders, collaborators, and visitors.
You are articulate, enthusiastic, warm, confident, and technically sharp.

ABOUT AISWARYA BABU:
- Name: Aiswarya Babu
- Current Role: Senior Software Developer & Architectural Lead at Full Stack Technology (2026 — Present).
- Past Roles: Senior Software Developer at Full Stack Technology (2025), Software Developer at Aagnia Technologies (2024).
- Total Experience: 2.5+ years of high-impact production engineering experience.
- Education & Passions: Computer Science / Engineering, and award-winning freestyle dancer.
- Tech Stack Mastery:
  * Backend: Python, FastAPI (sub-millisecond endpoints, async I/O, dependency injection), Pydantic, Celery.
  * Frontend: React 19, TypeScript, Next.js, Framer Motion, Three.js, responsive WebGL interfaces.
  * Data & Caching: PostgreSQL, SQLAlchemy async ORM, Redis (distributed locks, pub/sub, time-series tick cache).
  * Concurrency & Real-Time: WebSockets (1,500+ ticks/sec streams), atomic transaction control, distributed state.
  * AI & GenAI: OpenAI GPT-4o, LangChain, ChromaDB, LlamaIndex, Ollama, prompt engineering, structured JSON outputs.
  * DevOps & Architecture: Docker, Microservices clusters, Linux, Git, CI/CD, Event-driven architecture.

SIGNATURE PROJECTS:
1. "Everest Tutoring" (Multi-tenant EdTech & Booking Ecosystem):
   - Problem: 35% scheduling conflicts and payment delays.
   - Solution: Event-driven multi-tenant SaaS booking platform with sub-second slot locking via Redis distributed locks, automated time-zone normalization, Stripe/Razorpay payments, and live WebSocket notifications.
   - Result: 99.98% booking accuracy, <120ms scheduling latency, 10,000+ monthly active booking sessions.

2. "Investaa Trading Platform" (Low-Latency Algorithmic Execution OMS):
   - Problem: High order latency and slippage during volatile opens with unstable broker websockets.
   - Solution: Sub-50ms high-throughput Order Management System integrated with Fyers API v3, processing 1,500+ live market ticks/sec with pre-trade risk filters and paper-trading simulator.
   - Result: Reduced order placement latency from 450ms down to 42ms with zero missed stop-losses across 50,000+ executions.

3. "AI Question Generation Engine" (Autonomous GenAI Assessment Pipeline):
   - Problem: Manual curriculum exam authoring took weeks and had high error rates.
   - Solution: Autonomous GenAI pipeline using GPT-4o with strict Pydantic JSON schemas, LaTeX mathematical rendering, multi-stage fact verification, and Bloom's taxonomy alignment.
   - Result: Cut exam paper authoring from 14 days down to under 4 minutes with 98.4% educator acceptance.

4. "Trading & Backtesting System" (High-Performance Quantitative Strategy Engine):
   - Problem: Overfitting and slow backtesting over multi-year tick data.
   - Solution: Vectorized NumPy + Cython event-driven simulation with realistic slippage, commission, Sharpe/Sortino ratios, and TradingView charts.
   - Result: 18x faster simulation speed, analyzing 5 years of 1-minute historical data in 2.8 seconds.

BEYOND CODE (DANCE & CREATIVITY):
- Aiswarya is an award-winning freestyle dancer. She views coding and dance as twin expressions of rhythm and structure:
  "Dance taught me that complexity is simply rhythm waiting to be mastered. Good code is functional; great code is choreography of data."
- She brings high energy, rhythm, attention to detail, and poise to engineering teams.

LANGUAGE SUPPORT:
- Primary language: English.
- If the visitor greets or asks in Malayalam or Manglish (e.g., "enthokke undu", "Aiswarya enth cheyyunnu", "aishu super aanu", "job undo"), answer warmly in friendly Malayalam/Manglish combined with technical clarity!

BEHAVIORAL GUIDELINES:
- Give direct, engaging, and well-structured responses.
- Highlight her real engineering strengths (concurrency, distributed locks, sub-50ms latency, microservices).
- Offer to connect them with her via LinkedIn, GitHub (Aiswaryababu3), or invite them to view her Resume.
- Keep responses concise (usually 2-4 structured paragraphs or bullet points) unless deep technical elaboration is requested.
`.trim();

// Local endpoints
const PROXY_OLLAMA_URL = '/api/ollama';
const DIRECT_OLLAMA_URL = 'http://localhost:11434';

/**
 * Detect available Ollama endpoint and fetch installed models
 */
export async function checkOllamaConnection(customUrl?: string): Promise<OllamaStatus> {
  const urlsToTry = customUrl
    ? [customUrl, PROXY_OLLAMA_URL, DIRECT_OLLAMA_URL]
    : [PROXY_OLLAMA_URL, DIRECT_OLLAMA_URL];

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${url}/api/tags`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const models = (data.models || []).map((m: { name?: string }) => m.name || '').filter(Boolean);
        const preferred =
          models.find(
            (m: string) =>
              m.includes('llama') ||
              m.includes('qwen') ||
              m.includes('mistral') ||
              m.includes('phi') ||
              m.includes('gemma')
          ) ||
          models[0] ||
          'llama3';

        return {
          isOnline: true,
          models,
          activeModel: preferred,
          baseUrl: url,
        };
      }
    } catch {
      // try next
    }
  }

  return {
    isOnline: false,
    models: [],
    activeModel: 'llama3:latest',
    baseUrl: PROXY_OLLAMA_URL,
  };
}

/**
 * Stream chat response from Ollama API
 */
export async function streamOllamaChat(
  messages: ChatMessage[],
  model: string,
  baseUrl: string,
  onChunk: (textChunk: string) => void,
  onDone: (fullText: string) => void,
  onError: (err: Error) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    const formattedMessages = [
      { role: 'system', content: AISWARYA_SYSTEM_PROMPT },
      ...messages.slice(-8), // keep last 8 turns for context
    ];

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama3',
        messages: formattedMessages,
        stream: true,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported by browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed.message?.content) {
            fullText += parsed.message.content;
            onChunk(parsed.message.content);
          }
        } catch {
          // partial line ignore
        }
      }
    }

    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim());
        if (parsed.message?.content) {
          fullText += parsed.message.content;
          onChunk(parsed.message.content);
        }
      } catch {
        // ignore
      }
    }

    onDone(fullText);
  } catch (err: unknown) {
    if (signal?.aborted) return;
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Comprehensive Smart Fallback Knowledge Engine
 * Dynamically answers any question with rich context if Ollama is not active.
 */
export function generateSmartFallbackResponse(rawQuery: string): string {
  const q = rawQuery.toLowerCase().trim();

  // Malayalam / Manglish greetings
  if (
    q.includes('enthokke') ||
    q.includes('enthoke') ||
    q.includes('sugamano') ||
    q.includes('sukhamano') ||
    q.includes('vishesham') ||
    q.includes('namaskaram') ||
    q.includes('malayalam')
  ) {
    return `Namaskaram! സുഖമായിരിക്കുന്നു! 😊 
Njan Aiswarya Babu-inte personal AI assistant aanu. Aiswarya oru brilliant Senior Software Developer & Distributed Systems Lead aanu, koodathe passionate freestyle dancer-um aanu!

Aiswarya-yude projects (Everest Tutoring SaaS, Investaa Trading Platform OMS, GenAI Engine), tech stack (FastAPI, Python, React 19, Redis), experience or dance journey-ye patti enthu venamenkilum chodikkam!`;
  }

  // Who is Aiswarya / Summary
  if (
    q.includes('who are you') ||
    q.includes('who is aiswarya') ||
    q.includes('tell me about aiswarya') ||
    q.includes('about her') ||
    q.includes('introduce') ||
    q.includes('summary')
  ) {
    return `**Aiswarya Babu** is a high-impact **Senior Software Developer & Architectural Lead** with over 2.5 years of production experience designing resilient distributed systems, sub-50ms trading microservices, and AI-driven platforms.

⚡ **Key Highlights:**
- **Current Position:** Senior Software Developer at Full Stack Technology.
- **Architectural Speciality:** Asynchronous Python & FastAPI, atomic slot booking with Redis distributed locks, high-throughput WebSockets (1,500+ ticks/sec), and React 19.
- **AI Innovations:** GenAI workflows integrating GPT-4o with strict Pydantic JSON schemas.
- **Creative Rhythm:** Award-winning freestyle dancer who brings fluid rhythm, discipline, and stamina into system choreography.`;
  }

  // Investaa Trading / Algorithmic Trading
  if (
    q.includes('investaa') ||
    q.includes('trading') ||
    q.includes('fyers') ||
    q.includes('broker') ||
    q.includes('order management') ||
    q.includes('oms') ||
    q.includes('stock')
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === 'investaa');
    return `### 📈 ${proj?.title || 'Investaa Trading Platform'}
*${proj?.tagline || 'Low-Latency Algorithmic Execution OMS'}*

- **The Challenge:** ${proj?.problem || 'Sub-second slippage during volatile opens.'}
- **Aiswarya's Architecture:** Built with an asynchronous Python event loop, Redis time-series tick cache, and a FastAPI cluster connected directly to Fyers API v3.
- **Core Feats:**
  * Sub-50ms execution queues with automated stop-loss guards.
  * Real-time WebSocket market depth tick streamer processing **1,500+ ticks/sec**.
  * Multi-account copy trading engine with slippage mitigation.
- **Measurable Impact:** Reduced average order latency from 450ms down to **42ms** across 50,000+ execution cycles.`;
  }

  // Everest Tutoring / EdTech
  if (
    q.includes('everest') ||
    q.includes('tutoring') ||
    q.includes('booking') ||
    q.includes('edtech') ||
    q.includes('saas') ||
    q.includes('slot')
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === 'everest-tutoring');
    return `### 🎓 ${proj?.title || 'Everest Tutoring'}
*${proj?.tagline || 'Multi-Tenant EdTech & Booking Ecosystem'}*

- **The Challenge:** ${proj?.problem || 'Fragmented scheduling and booking conflicts.'}
- **Aiswarya's Solution:** Engineered an event-driven multi-tenant SaaS booking platform using FastAPI, PostgreSQL row-level security, and React 19.
- **Distributed Concurrency:** Created atomic slot booking powered by **distributed Redis locks**, eliminating double-booking race conditions.
- **Measurable Result:** Achieved **99.98% booking accuracy**, sub-120ms scheduling latency, and scaled effortlessly to over **10,000+ monthly active booking sessions**.`;
  }

  // AI Question Generation Engine
  if (
    q.includes('question') ||
    q.includes('genai') ||
    q.includes('gpt') ||
    q.includes('exam') ||
    q.includes('curriculum') ||
    q.includes('assessment')
  ) {
    const proj = PROJECTS_DATA.find((p) => p.id === 'ai-question-generation');
    return `### 🧠 ${proj?.title || 'AI Question Generation Engine'}
*${proj?.tagline || 'Autonomous Assessment Pipeline'}*

- **The Innovation:** Autonomous GenAI pipeline using GPT-4o, LangChain, and ChromaDB vector retrieval.
- **Zero Hallucination Strategy:** Enforced strict Pydantic JSON schemas, LaTeX mathematical equation parsing, and multi-stage fact verification against academic syllabi.
- **Impact:** Compressed exam paper creation from 14 days down to **under 4 minutes** with a **98.4% educator acceptance rating** across 5,000+ assessment items.`;
  }

  // Backtesting / Quantitative Finance
  if (q.includes('backtest') || q.includes('backtesting') || q.includes('quantitative') || q.includes('quant')) {
    const proj = PROJECTS_DATA.find((p) => p.id === 'trading-backtest-system');
    return `### ⚡ ${proj?.title || 'Trading & Backtesting System'}
*${proj?.tagline || 'High-Performance Quantitative Strategy Engine'}*

- **Core Engine:** Event-driven & vectorized backtester powered by NumPy, Cython calculations, and Celery asynchronous job distribution.
- **Risk Metrics:** Instant computation of Sharpe Ratio, Sortino Ratio, Maximum Drawdown, and Monte Carlo robustness stress tests.
- **Speed:** Accelerated simulations by **18x**, processing 5 years of 1-minute historical data in just **2.8 seconds**.`;
  }

  // Technologies / Skills
  if (
    q.includes('tech stack') ||
    q.includes('skills') ||
    q.includes('languages') ||
    q.includes('tools') ||
    q.includes('fastapi') ||
    q.includes('python') ||
    q.includes('react')
  ) {
    return `### 🛠️ Aiswarya's Core Technical Arsenal

1. **Backend & Architecture:**
   - **Python & FastAPI:** Asynchronous programming, clean modular architecture, sub-millisecond endpoints, dependency injection.
   - **Microservices & Concurrency:** Docker container clusters, Celery workers, event-driven pipelines.

2. **Data & High Performance:**
   - **PostgreSQL & SQLAlchemy:** Row-level locks, complex schema modeling, index optimization.
   - **Redis:** Distributed mutex locks, Pub/Sub channels, high-frequency tick caching.

3. **Frontend & Interactive UI:**
   - **React 19 & Next.js:** Strict TypeScript, component architecture, hooks, Three.js 3D WebGL, Framer Motion.

4. **Real-time & AI:**
   - **WebSockets:** Full-duplex live streaming (1,500+ ticks/sec).
   - **GenAI / LLMs:** GPT-4o, Ollama local inference, LangChain, vector embeddings, structured JSON schemas.`;
  }

  // Experience / Career History
  if (
    q.includes('experience') ||
    q.includes('career') ||
    q.includes('company') ||
    q.includes('where did she work') ||
    q.includes('jobs') ||
    q.includes('history')
  ) {
    return `### 💼 Professional Journey

- **2026 — Present: Senior Software Developer (Architectural Lead)** at *Full Stack Technology*
  Architecting event-driven microservices handling 25,000+ req/min with 99.99% uptime, leading GenAI workflows, and mentoring engineering teams on asynchronous design.

- **2025: Senior Software Developer** at *Full Stack Technology*
  Engineered high-concurrency Order Management Systems (Investaa), optimized PostgreSQL bottlenecks to slash p95 latency by 60%, and built resilient WebSocket feeds.

- **2024: Software Developer** at *Aagnia Technologies*
  Developed 40+ production REST API endpoints with FastAPI, built multi-tenant migrations with SQLAlchemy, and crafted responsive web clients.`;
  }

  // Dance / Beyond Code / Personality
  if (
    q.includes('dance') ||
    q.includes('dancer') ||
    q.includes('hobby') ||
    q.includes('hobbies') ||
    q.includes('music') ||
    q.includes('freestyle') ||
    q.includes('passion')
  ) {
    return `### 💃 Freestyle Dance & Creative Rhythm

Aiswarya is an award-winning freestyle dancer! She believes that software engineering and dance share the exact same foundation: **rhythm, cadence, and spatial awareness**.

> *"Dance taught me that complexity is simply rhythm waiting to be mastered. Good code is functional; great code is a choreography of data."*

Her background in freestyle dance gives her extraordinary discipline, high physical & mental stamina, poise under pressure, and a sharp eye for visual balance and timing.`;
  }

  // Why Hire Aiswarya
  if (
    q.includes('hire') ||
    q.includes('why should') ||
    q.includes('strength') ||
    q.includes('fit') ||
    q.includes('recommend')
  ) {
    return `### 🌟 Why You Should Hire Aiswarya Babu

1. **Production-Proven Architectural Maturity:** She doesn't just write features; she designs systems that handle concurrency race conditions, network failures, and high load without breaking a sweat.
2. **Full-Spectrum Velocity:** From writing sub-50ms FastAPI backend services and PostgreSQL row-level locks to implementing responsive React 19 / WebGL client experiences.
3. **GenAI & Modern AI Integration:** Deep practical experience grounding LLMs with strict schema validation and structured outputs.
4. **Relentless Energy & Discipline:** Her discipline as an award-winning dancer translates into high stamina, impeccable attention to detail, and great team energy.
5. **Clear Communication:** Articulate, humble, collaborative, and always driven by measurable business outcomes.`;
  }

  // Contact / Resume / Hire
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('hire her') ||
    q.includes('reach') ||
    q.includes('resume') ||
    q.includes('github') ||
    q.includes('linkedin')
  ) {
    return `### 📬 Connect with Aiswarya Babu

- **Resume:** You can view and download her complete verified resume directly using the **"View Full Resume"** button in the HUD!
- **GitHub:** [github.com/Aiswaryababu3](https://github.com/Aiswaryababu3)
- **Role Openings:** Open to Senior Software Developer, Backend Architect, and Full Stack Lead roles.

Feel free to explore her live projects or ask me any further technical questions!`;
  }

  // Default intelligent assistant response
  return `Thank you for asking! As Aiswarya Babu's AI Assistant, I can provide full insights into her:

1. **Production Systems:** Everest Tutoring (Multi-tenant SaaS booking) & Investaa (Sub-50ms Algorithmic Trading OMS).
2. **Core Tech Stack:** Python, FastAPI, React 19, TypeScript, PostgreSQL, Redis distributed locks, and WebSockets.
3. **AI & GenAI Pipelines:** Autonomous question generation with GPT-4o, LangChain, and structured schemas.
4. **Artistic Synergy:** How her award-winning freestyle dance discipline fuels harmonious software architecture.

Would you like details on a specific project, her architectural decisions, or reasons to hire her?`;
}
