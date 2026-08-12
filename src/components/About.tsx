'use client';

import { CheckCircle2, Server, Database, Layout, Shield, Cpu, RefreshCw, Terminal, Sparkles } from 'lucide-react';
import { ABOUT_DATA, PERSONAL_INFO } from '@/data/portfolioData';

const FOCUS_ICONS = [
  Layout,
  Server,
  Terminal,
  Database,
  Shield,
  Cpu,
  RefreshCw,
  CheckCircle2
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#faf2f2] border-y border-rose-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-rose-300 text-xs font-mono text-[#881337] font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
              <span>01 // ABOUT ME & PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c] leading-tight">
              {ABOUT_DATA.heading}
            </h2>

            <p className="text-lg text-zinc-800 leading-relaxed font-medium">
              {ABOUT_DATA.intro}
            </p>

            {ABOUT_DATA.narrative.map((paragraph, idx) => (
              <p key={idx} className="text-base text-zinc-700 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}

            <div className="p-6 rounded-2xl bg-white border border-rose-300 space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono text-[#881337]">
                <span className="font-extrabold uppercase tracking-wider">ENGINEERING SUMMARY</span>
                <span className="font-bold">VERIFIED BACKGROUND</span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                Focused on delivering end-to-end full-stack solutions. Skilled in turning product specs into clean TypeScript components, FastAPI backend endpoints, and robust database models.
              </p>
            </div>
          </div>

          {/* Right Metrics & Pillars Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_DATA.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-rose-300 p-5 rounded-2xl shadow-md hover:border-[#881337] transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-gradient-rose">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#2a080c] mt-1.5">{stat.label}</div>
                  <div className="text-xs text-[#881337] font-mono mt-0.5 font-semibold">{stat.note}</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-rose-300 rounded-2xl p-7 space-y-5 shadow-md">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#881337] font-bold flex items-center justify-between">
                <span>Core Engineering Focus</span>
                <span className="text-[#881337] font-bold">8 Technical Pillars</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ABOUT_DATA.coreAreas.map((area, idx) => {
                  const Icon = FOCUS_ICONS[idx % FOCUS_ICONS.length];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#fff1f2] border border-rose-200 hover:border-[#881337] transition-colors text-xs font-bold text-[#2a080c] shadow-xs"
                    >
                      <Icon className="w-4 h-4 text-[#be123c] shrink-0" />
                      <span className="truncate">{area}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
