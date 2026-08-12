'use client';

import { useState } from 'react';
import { 
  Code2, Atom, Layers, FileCode, Palette, Wind, 
  Zap, Server, Cpu, Database, HardDrive, Box, 
  GitBranch, Globe, Lock, Workflow, Monitor, Terminal,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { TECH_STACK } from '@/data/portfolioData';

const ICON_MAP: Record<string, any> = {
  Code2, Atom, Layers, FileCode, Palette, Wind,
  Zap, Server, Cpu, Database, HardDrive, Box,
  GitBranch, Github: GithubIcon, Globe, Lock, Workflow, Monitor, Terminal
};

const CATEGORIES = [
  { key: 'all', label: 'All Technologies' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools & Ecosystem' },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = activeTab === 'all'
    ? TECH_STACK
    : TECH_STACK.filter(item => item.category === activeTab);

  return (
    <section id="tech-stack" className="py-24 bg-white relative border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono text-[#881337] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
              <span>02 // TECH STACK & ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
              Technical Capabilities & Tools
            </h2>
            <p className="text-base text-zinc-600 mt-2 max-w-xl font-normal">
              Proven technologies, frameworks, and databases I use to build production-grade web applications.
            </p>
          </div>

          {/* Category Filter Tabs - Pure Instant Static Toggle */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#fff1f2] rounded-2xl border border-rose-200 shadow-sm">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#881337] text-white shadow-sm'
                      : 'text-[#881337] hover:bg-rose-100/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || Code2;
            const isHovered = hoveredItem === item.name;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-5 rounded-2xl maroon-card cursor-pointer ${
                  isHovered ? 'border-[#881337] bg-[#fdf2f2]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#881337] text-white shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md badge-maroon">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#2a080c] mb-1 flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.featured && (
                    <span className="w-2 h-2 rounded-full bg-[#be123c] animate-pulse"></span>
                  )}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed min-h-[38px] font-normal">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Status: Active</span>
                  <span className={`transition-colors font-bold ${isHovered ? 'text-[#881337]' : 'text-zinc-500'}`}>
                    {isHovered ? '● Production Ready' : 'Verified'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
