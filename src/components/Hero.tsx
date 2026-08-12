'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Sparkles, Layers, ShieldCheck, Terminal, Network, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import ArchitectureWidget from './ArchitectureWidget';
import TerminalWidget from './TerminalWidget';

/* Pure CSS typewriter — zero JS intervals */
const ROLE = 'Full Stack Developer';

export default function Hero() {
  const [interactiveTab, setInteractiveTab] = useState<'architecture' | 'terminal'>('architecture');

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.substring(1));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-mesh-maroon bg-grid-maroon">
      {/* Static top glow — no JS, no blur recalc loop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-rose-200/25 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-center mb-20">

          {/* LEFT */}
          <div className="flex flex-col items-start">

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#fff1f2] border border-rose-300 text-xs font-mono text-[#881337] shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#be123c] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#881337]" />
              </span>
              <span className="font-bold tracking-wide">{PERSONAL_INFO.availabilityStatus}</span>
            </div>

            <div className="text-xs font-mono tracking-widest font-bold text-[#881337] uppercase mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#be123c]" />
              <span>Full Stack Developer • SaaS Architect</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-heading tracking-tight text-[#2a080c] leading-[1.08] mb-6">
              Building modern web applications{' '}
              <span className="text-gradient-rose">from interface to infrastructure.</span>
            </h1>

            <p className="text-base text-zinc-600 leading-relaxed max-w-lg mb-8">
              I'm <strong className="text-[#881337] font-semibold">{PERSONAL_INFO.name}</strong> — a Full Stack Developer with{' '}
              <strong className="text-zinc-900">{PERSONAL_INFO.experience}</strong> crafting responsive frontends, FastAPI microservices, and scalable SaaS platforms.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button
                onClick={() => scrollToSection('#projects')}
                data-track-id="cta_view_work"
                data-track-label="CTA: View My Work Hero"
                data-track-category="cta"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-sm tracking-wide uppercase transition-colors shadow-lg shadow-rose-900/20"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('#contact')}
                data-track-id="cta_contact_me"
                data-track-label="CTA: Contact Me Hero"
                data-track-category="cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-[#881337] font-semibold text-sm transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4 text-[#be123c]" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 divide-x divide-rose-200">
              {[
                { Icon: Sparkles, value: PERSONAL_INFO.experience, label: 'Experience' },
                { Icon: Layers,   value: PERSONAL_INFO.saasContributed, label: 'SaaS Contributed' },
                { Icon: ShieldCheck, value: PERSONAL_INFO.saasClosed, label: 'End-to-End' },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="pl-6 first:pl-0">
                  <div className="text-xl font-extrabold font-mono text-[#2a080c]">{value}</div>
                  <div className="text-[11px] font-semibold text-[#881337] uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — minimal premium dark card, zero JS intervals */}
          <div className="hidden lg:block">
            <div className="relative bg-[#180408] rounded-3xl p-6 shadow-2xl shadow-rose-950/30 border border-rose-900/25 overflow-hidden">

              {/* Static inner glow — no animation */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#881337]/15 blur-[50px] rounded-full pointer-events-none" />

              {/* Window chrome */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-900/70" />
                  <span className="w-3 h-3 rounded-full bg-rose-800/50" />
                  <span className="w-3 h-3 rounded-full bg-[#881337]" />
                </div>
                <span className="text-[10px] font-mono text-rose-600 tracking-widest">dev.status.ts</span>
              </div>

              {/* CSS-only typewriter role display */}
              <div className="relative z-10 mb-5">
                <div className="text-[10px] font-mono text-rose-600 mb-1.5 tracking-widest uppercase">Current Role</div>
                <div className="text-white font-mono text-sm font-bold overflow-hidden whitespace-nowrap border-r-2 border-[#be123c] typewriter-text">
                  Full Stack Developer
                </div>
              </div>

              <div className="h-px bg-rose-900/40 mb-5 relative z-10" />

              {/* Static tech stack — no rotating state */}
              <div className="relative z-10 space-y-2.5 mb-5">
                <div className="text-[10px] font-mono text-rose-600 tracking-widest uppercase mb-2">Stack</div>
                {[
                  { label: 'Next.js 15',   status: 'Compiled ✓' },
                  { label: 'FastAPI',      status: '200 OK · 12ms' },
                  { label: 'Supabase',     status: 'RLS Active' },
                  { label: 'TypeScript',   status: 'Strict Mode' },
                  { label: 'Vercel',       status: 'Deployed ✓' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.04] border border-rose-900/20">
                    <span className="text-rose-100 text-xs font-mono font-semibold">{row.label}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500">{row.status}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-rose-900/40 mb-4 relative z-10" />

              {/* Availability */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-600 font-semibold">Open to opportunities</span>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-900/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">Available</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive widget switcher */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 p-1.5 bg-[#fff1f2] rounded-xl border border-rose-200">
              <button
                onClick={() => setInteractiveTab('architecture')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors ${
                  interactiveTab === 'architecture' ? 'bg-[#881337] text-white shadow-sm' : 'text-[#881337] hover:bg-rose-100/60'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Full Stack System Flow</span>
              </button>
              <button
                onClick={() => setInteractiveTab('terminal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-colors ${
                  interactiveTab === 'terminal' ? 'bg-[#881337] text-white shadow-sm' : 'text-[#881337] hover:bg-rose-100/60'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Developer CLI Terminal</span>
              </button>
            </div>
            <span className="text-xs font-mono text-[#881337] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#be123c] animate-ping" />
              Interactive Engineering Demo
            </span>
          </div>
          <div>
            {interactiveTab === 'architecture' ? <ArchitectureWidget /> : <TerminalWidget />}
          </div>
        </div>

      </div>
    </section>
  );
}
