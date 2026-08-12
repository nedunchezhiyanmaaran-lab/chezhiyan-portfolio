'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Layers, Cpu, Server, Database, ShieldCheck, 
  Clock, CheckCircle2, ArrowRight, Zap, Code2, Terminal
} from 'lucide-react';
import { trackClick } from '@/lib/analyticsStore';

interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  estimatedWeeks: string;
  frontendStack: string;
  backendStack: string;
  databaseStack: string;
  features: string[];
  sampleEndpoint: string;
}

const TEMPLATES: ProjectTemplate[] = [
  {
    id: 'saas_mvp',
    name: 'SaaS Platform & Multi-Tenant App',
    category: 'Full Stack SaaS',
    estimatedWeeks: '3 - 4 Weeks',
    frontendStack: 'Next.js App Router (TypeScript, Tailwind CSS)',
    backendStack: 'FastAPI Python Microservices (JWT Auth, Pydantic)',
    databaseStack: 'Supabase PostgreSQL (Row Level Security Enabled)',
    features: [
      'Multi-tenant database schema with strict RLS policies',
      'Stripe subscription webhook integrations & tier limits',
      'Automated OpenAPI documentation & type-safe API client',
      'Responsive dark/light user dashboard & settings'
    ],
    sampleEndpoint: `GET /api/v1/tenant/metrics\nAuthorization: Bearer jwt_tenant_token\nResponse: 200 OK (Latency: 14ms)`
  },
  {
    id: 'crm_dashboard',
    name: 'Enterprise CRM & Pipeline Management',
    category: 'Custom CRM System',
    estimatedWeeks: '2 - 3 Weeks',
    frontendStack: 'React.js (TypeScript, Recharts, Lucide Icons)',
    backendStack: 'FastAPI REST Service (Async PostgreSQL engine)',
    databaseStack: 'PostgreSQL & Redis Caching',
    features: [
      'Lead status pipeline tracking & stage transitions',
      'Interactive analytical charts & revenue metrics',
      'Optimistic UI state updates for instant table filtering',
      'Role-based access control (Admin, Manager, Rep)'
    ],
    sampleEndpoint: `POST /api/v1/leads/pipeline-status\nBody: { "lead_id": "ld_92a", "stage": "CLOSED_WON" }\nResponse: 200 OK (Latency: 18ms)`
  },
  {
    id: 'rms_reporting',
    name: 'Real-Time RMS & Operational Dashboard',
    category: 'Resource Management',
    estimatedWeeks: '3 Weeks',
    frontendStack: 'Next.js (React Server Components, Framer Motion)',
    backendStack: 'Python FastAPI (WebSockets + REST)',
    databaseStack: 'MongoDB & PostgreSQL Hybrid',
    features: [
      'Real-time resource allocation & operational telemetry',
      'Live ping monitoring & system health indicators',
      'Exportable reporting data tables (CSV, JSON, PDF)',
      'Granular audit logs & session monitoring'
    ],
    sampleEndpoint: `GET /api/v1/rms/telemetry/live\nHeader: X-API-KEY secret_rms_live\nResponse: 200 OK (Latency: 11ms)`
  }
];

export default function SaaSArchitectWidget() {
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate>(TEMPLATES[0]);
  const [simulatedBuildProgress, setSimulatedBuildProgress] = useState(false);
  const [simulatedConsoleLog, setSimulatedConsoleLog] = useState<string | null>(null);

  const handleSimulateBuild = () => {
    trackClick('architect_widget_simulate', `Simulated ${selectedTemplate.name}`, 'interactive');
    setSimulatedBuildProgress(true);
    setSimulatedConsoleLog('Initializing architecture blueprint tracer...');

    setTimeout(() => {
      setSimulatedConsoleLog('Validating FastAPI backend OpenAPI contracts...');
    }, 400);

    setTimeout(() => {
      setSimulatedConsoleLog('Applying Supabase PostgreSQL Row Level Security policies...');
    }, 800);

    setTimeout(() => {
      setSimulatedBuildProgress(false);
      setSimulatedConsoleLog(`✔ Architecture Spec Verified: ${selectedTemplate.name} ready for production deployment.`);
    }, 1300);
  };

  return (
    <section id="innovation-architect" className="py-24 bg-[#fff1f2]/60 border-y border-rose-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#881337] text-white text-xs font-mono font-bold mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>INNOVATIVE TECHNICAL SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
              Interactive System Architect Calculator
            </h2>
            <p className="text-base text-zinc-700 mt-2 max-w-2xl font-normal">
              Select your project scope to see how I architect end-to-end full-stack web applications, database schemas, and FastAPI microservices.
            </p>
          </div>

          <span className="text-xs font-mono text-[#881337] font-bold px-4 py-2 rounded-xl bg-white border border-rose-300 shadow-xs">
            ⚡ Proven Engineering Velocity
          </span>
        </div>

        {/* Template Selector Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate.id === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplate(tmpl);
                  trackClick(`select_tmpl_${tmpl.id}`, `Selected ${tmpl.name}`, 'interactive');
                }}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#881337] text-white border-[#9f1239] shadow-lg shadow-rose-900/20 scale-[1.01]'
                    : 'bg-white border-rose-300 text-[#2a080c] hover:border-[#881337] hover:bg-rose-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-rose-200' : 'text-[#881337]'}`}>
                    {tmpl.category}
                  </span>
                  <Zap className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#be123c]'}`} />
                </div>
                <div className="font-bold text-base font-heading mb-1">{tmpl.name}</div>
                <div className={`text-xs font-mono font-semibold ${isSelected ? 'text-rose-100' : 'text-zinc-500'}`}>
                  Est. Delivery: {tmpl.estimatedWeeks}
                </div>
              </button>
            );
          })}
        </div>

        {/* Architecture Inspector Panel */}
        <div className="bg-white border border-rose-300 rounded-3xl p-7 sm:p-9 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stack Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono text-[#881337] font-bold uppercase tracking-wider mb-1">
                SELECTED ARCHITECTURE SPECIFICATION
              </div>
              <h3 className="text-2xl font-bold font-heading text-[#2a080c]">
                {selectedTemplate.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#fff1f2] border border-rose-200 flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#be123c] shrink-0" />
                <div>
                  <span className="text-[#881337] font-bold">Frontend: </span>
                  <span className="text-zinc-800 font-semibold">{selectedTemplate.frontendStack}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fff1f2] border border-rose-200 flex items-center gap-3">
                <Server className="w-5 h-5 text-[#be123c] shrink-0" />
                <div>
                  <span className="text-[#881337] font-bold">Backend API: </span>
                  <span className="text-zinc-800 font-semibold">{selectedTemplate.backendStack}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fff1f2] border border-rose-200 flex items-center gap-3">
                <Database className="w-5 h-5 text-[#be123c] shrink-0" />
                <div>
                  <span className="text-[#881337] font-bold">Database: </span>
                  <span className="text-zinc-800 font-semibold">{selectedTemplate.databaseStack}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-[#881337] uppercase">
                Included Production Deliverables:
              </div>
              <div className="space-y-2">
                {selectedTemplate.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-[#be123c] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSimulateBuild}
              disabled={simulatedBuildProgress}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-rose-900/20 transition-all disabled:opacity-50"
            >
              <Terminal className="w-4 h-4" />
              <span>{simulatedBuildProgress ? 'Testing Architecture Spec...' : 'Simulate API & Database Tracer'}</span>
            </button>
          </div>

          {/* Right Column: Simulated Live Console */}
          <div className="lg:col-span-5 bg-[#1c080d] border border-rose-900/60 rounded-2xl p-6 font-mono text-xs text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/60">
              <span className="text-rose-300 font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#be123c]" />
                <span>Simulated API Contract</span>
              </span>
              <span className="text-rose-400 text-[10px]">LIVE TRACER</span>
            </div>

            <div className="bg-[#140407] p-4 rounded-xl border border-rose-900/40 text-rose-100 whitespace-pre font-mono leading-relaxed">
              {selectedTemplate.sampleEndpoint}
            </div>

            {simulatedConsoleLog && (
              <div className="p-3.5 rounded-xl bg-[#881337] text-white text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
                <span>➜</span>
                <span>{simulatedConsoleLog}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
