'use client';

import { Layout, Server, Database, BarChart3, Workflow, Globe2, Sparkles } from 'lucide-react';
import { CAPABILITIES } from '@/data/portfolioData';

const ICONS = [Layout, Workflow, Server, BarChart3, Database, Globe2];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 bg-white border-t border-rose-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono text-[#881337] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
            <span>05 // WHAT I CAN BUILD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
            Engineering Capabilities
          </h2>
          <p className="text-base text-zinc-600 mt-2 max-w-2xl font-normal">
            Key software solutions and application architectures I engineer across web, backend microservices, and database platforms.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={cap.number}
                className="maroon-card rounded-2xl p-7 flex flex-col justify-between group transition-transform duration-150 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-mono font-extrabold text-[#881337]">
                      {cap.number}
                    </span>
                    <div className="p-3 rounded-xl bg-[#881337] text-white group-hover:bg-[#9f1239] transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#be123c] font-bold uppercase tracking-wider mb-1">
                    {cap.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[#2a080c] mb-3 group-hover:text-[#881337] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
                    {cap.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-rose-100 flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono font-bold text-[#881337]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
