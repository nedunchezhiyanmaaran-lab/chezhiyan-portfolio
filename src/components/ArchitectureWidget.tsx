'use client';

import { useState } from 'react';
import { Server, Database, ArrowRight, Play, CheckCircle2, Activity, Code } from 'lucide-react';

interface NodeInfo {
  id: string;
  name: string;
  role: string;
  tech: string;
  description: string;
  payload: string;
}

const NODES: NodeInfo[] = [
  {
    id: 'user',
    name: 'Client / User',
    role: 'Browser Interface',
    tech: 'Chrome / Safari / Mobile',
    description: 'Triggers user action, handles optimistic UI state updates, and renders accessible views.',
    payload: `{\n  "action": "GET_DASHBOARD_METRICS",\n  "user_id": "usr_94a20b",\n  "timestamp": "${new Date().toISOString().substring(0, 10)}"\n}`
  },
  {
    id: 'frontend',
    name: 'Next.js / React',
    role: 'Frontend Layer',
    tech: 'TypeScript, Tailwind CSS',
    description: 'Renders dynamic pages, manages client state, and dispatches fetch requests.',
    payload: `{\n  "headers": {\n    "Authorization": "Bearer jwt_eyJhbG..."\n  },\n  "params": { "timeframe": "30d" }\n}`
  },
  {
    id: 'apigateway',
    name: 'API Gateway Layer',
    role: 'REST Interface',
    tech: 'HTTPS / CORS / Rate Limit',
    description: 'Validates JWT tokens, applies request rate-limiting, and handles CORS routing.',
    payload: `{\n  "route": "/api/v1/analytics/overview",\n  "status": "VALIDATED",\n  "latency": "14ms"\n}`
  },
  {
    id: 'backend',
    name: 'FastAPI Backend',
    role: 'Application Logic',
    tech: 'Python, Pydantic, OpenAPI',
    description: 'Executes core business logic, runs Pydantic validations, and queries database layer.',
    payload: `{\n  "microservice": "analytics_worker",\n  "execution_time_ms": 18,\n  "db_queries": 2\n}`
  },
  {
    id: 'database',
    name: 'Supabase / MongoDB',
    role: 'Data Persistence',
    tech: 'PostgreSQL / DocumentDB',
    description: 'Stores relational tables, indexes JSON payloads, and returns query sets.',
    payload: `{\n  "records_returned": 1280,\n  "cache_hit": true,\n  "status": "200 OK"\n}`
  }
];

export default function ArchitectureWidget() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(NODES[1]);
  const [isRunningPing, setIsRunningPing] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [pingResult, setPingResult] = useState<string | null>(null);

  const handleRunPing = () => {
    if (isRunningPing) return;
    setIsRunningPing(true);
    setPingResult(null);

    NODES.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
        if (index === NODES.length - 1) {
          setTimeout(() => {
            setIsRunningPing(false);
            setActiveStep(null);
            setPingResult('200 OK • Latency: 32ms • Pipeline Active');
          }, 400);
        }
      }, index * 350);
    });
  };

  return (
    <div className="w-full bg-white border border-rose-200 rounded-2xl overflow-hidden shadow-xl">
      {/* Top Bar */}
      <div className="bg-[#fff1f2] px-5 py-3 border-b border-rose-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#be123c] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#e11d48] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#881337] inline-block"></span>
          </div>
          <span className="text-xs font-mono text-[#881337] ml-2 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#be123c]" />
            <span>architecture-pipeline.json</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#881337] text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Pipeline Active
          </span>
          <button
            onClick={handleRunPing}
            disabled={isRunningPing}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-xs font-mono font-bold text-white transition-colors disabled:opacity-50 shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isRunningPing ? 'animate-spin text-white' : 'text-white'}`} />
            <span>{isRunningPing ? 'Tracing Pipeline...' : 'Test Request Flow'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Node Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isActivePing = activeStep === index;

            return (
              <div key={node.id} className="flex flex-col md:flex-row items-center">
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-[#881337] text-white border-[#9f1239] shadow-lg shadow-rose-900/20'
                      : isActivePing
                      ? 'bg-rose-100 border-[#881337] ring-2 ring-[#be123c]/40'
                      : 'bg-[#fff1f2]/80 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono uppercase tracking-wider font-extrabold ${isSelected ? 'text-rose-200' : 'text-[#881337]'}`}>
                      0{index + 1} • {node.role}
                    </span>
                    {isActivePing && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#be123c] animate-ping"></span>
                    )}
                  </div>
                  <div className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#2a080c]'}`}>{node.name}</div>
                  <div className={`text-xs font-mono truncate mt-0.5 ${isSelected ? 'text-rose-100' : 'text-zinc-600'}`}>{node.tech}</div>

                  {isSelected && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-t-full hidden md:block"></div>
                  )}
                </button>

                {index < NODES.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-1 text-[#881337]">
                    <ArrowRight className={`w-4 h-4 ${activeStep === index ? 'text-[#be123c] animate-pulse' : ''}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Inspector */}
        <div className="bg-[#fff1f2]/80 border border-rose-200 rounded-xl p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 shadow-sm">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#881337] font-bold uppercase tracking-wider">
                Component Inspector:
              </span>
              <span className="text-sm font-bold text-[#2a080c]">{selectedNode.name}</span>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed font-normal">
              {selectedNode.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#881337]">
              <span className="px-2.5 py-1 bg-white border border-rose-200 rounded-md font-bold">
                Role: {selectedNode.role}
              </span>
              <span className="px-2.5 py-1 bg-white border border-rose-200 rounded-md font-bold">
                Stack: {selectedNode.tech}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#2a080c] border border-rose-900/40 rounded-lg p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-rose-200 pb-2 mb-2 border-b border-rose-900/60">
              <span className="flex items-center gap-2 text-white font-semibold">
                <Code className="w-4 h-4 text-[#be123c]" />
                <span>Simulated Node Payload</span>
              </span>
              <span className="text-xs text-rose-300 font-bold">
                {selectedNode.id.toUpperCase()}_LAYER
              </span>
            </div>
            <pre className="text-rose-100 overflow-x-auto whitespace-pre leading-relaxed font-mono">
              {selectedNode.payload}
            </pre>
          </div>
        </div>

        {pingResult && (
          <div className="p-3.5 rounded-xl bg-[#881337] text-white text-xs font-mono flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{pingResult}</span>
            </span>
            <span className="text-rose-200">Request ID: req_f81a3d92</span>
          </div>
        )}
      </div>
    </div>
  );
}
