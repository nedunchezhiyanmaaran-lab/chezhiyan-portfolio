'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Server, Shield, Layers, Sparkles } from 'lucide-react';

interface CodeSnippet {
  id: string;
  label: string;
  language: string;
  icon: any;
  filename: string;
  description: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'nextjs',
    label: 'Next.js App Router',
    language: 'TypeScript',
    icon: Layers,
    filename: 'app/api/saas/route.ts',
    description: 'Type-safe server endpoint with payload validation and error handling.',
    code: `import { NextResponse } from 'next/server';
import { z } from 'zod';

const RequestSchema = z.object({
  organizationId: z.string().uuid(),
  tier: z.enum(['starter', 'pro', 'enterprise']),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationId, tier } = RequestSchema.parse(body);

    const subscription = await updateTenantTier(organizationId, tier);

    return NextResponse.json({
      success: true,
      data: subscription,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request payload' },
      { status: 400 }
    );
  }
}`
  },
  {
    id: 'fastapi',
    label: 'FastAPI Microservice',
    language: 'Python',
    icon: Server,
    filename: 'main.py',
    description: 'High-performance REST endpoint with Pydantic schemas and dependency injection.',
    code: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List

app = FastAPI(title="SaaS Analytics Service")

class TelemetryPayload(BaseModel):
    event_name: str
    user_id: str
    metadata: dict

@app.post("/api/v1/telemetry", status_code=201)
async def record_event(
    payload: TelemetryPayload,
    current_user = Depends(get_authenticated_user)
):
    """
    Ingest user activity telemetry with validation.
    """
    record_id = await db.telemetry.insert_one(payload.dict())
    return {"status": "ingested", "event_id": str(record_id)}`
  },
  {
    id: 'supabase',
    label: 'Supabase RLS Policy',
    language: 'PostgreSQL SQL',
    icon: Shield,
    filename: 'schema_rls.sql',
    description: 'Row-level security enforcement for multi-tenant data isolation.',
    code: `-- Enforce Row Level Security on SaaS Tenant Tables
ALTER TABLE tenant_projects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view only their organization's data
CREATE POLICY "Tenant Isolation Policy"
ON tenant_projects
FOR ALL
TO authenticated
USING (
  organization_id IN (
    SELECT org_id FROM user_organizations
    WHERE user_id = auth.uid()
  )
);`
  }
];

export default function CodePlayground() {
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#180509] border-y border-rose-900/60 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#881337] border border-rose-700 text-xs font-mono text-white font-bold mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>03 // PRODUCTION CODE STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            Architecture & Code Snippets
          </h2>
          <p className="text-base text-rose-200/90 mt-2 max-w-2xl font-normal">
            Real code snippets demonstrating type-safety, clean API architecture, structured error handling, and database security.
          </p>
        </div>

        {/* Code Showcase Container */}
        <div className="bg-[#24080e] border border-rose-900/60 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Tabs */}
          <div className="bg-[#2d0b13] px-5 py-4 border-b border-rose-900/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {SNIPPETS.map((snippet) => {
                const Icon = snippet.icon;
                const isSelected = activeSnippet.id === snippet.id;

                return (
                  <button
                    key={snippet.id}
                    onClick={() => setActiveSnippet(snippet)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-[#881337] text-white shadow-md border border-rose-600'
                        : 'text-rose-200 hover:bg-[#881337]/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{snippet.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-rose-300 hidden sm:inline font-semibold">
                {activeSnippet.filename}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-xs font-mono font-bold text-white transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-3 bg-[#1e060b] border-b border-rose-900/40 text-xs font-mono text-rose-200 flex items-center justify-between">
            <span>{activeSnippet.description}</span>
            <span className="text-white font-bold">{activeSnippet.language}</span>
          </div>

          <div className="p-6 font-mono text-xs overflow-x-auto bg-[#140306] text-rose-100 leading-relaxed">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeSnippet.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="whitespace-pre font-mono"
              >
                {activeSnippet.code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-8 select-none text-rose-400/60 text-right pr-4 shrink-0 font-mono text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-rose-100">{line}</span>
                  </div>
                ))}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
