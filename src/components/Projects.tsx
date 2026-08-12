'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Info, Eye, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'placeholder'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const FILTERS = [
    { key: 'all', label: `All Projects (${PROJECTS.length})` },
    { key: 'live', label: 'Live Demos (3)' },
    { key: 'placeholder', label: 'SaaS Concepts (4)' }
  ];

  return (
    <section id="projects" className="py-24 bg-[#fdf4f4] border-y border-rose-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-rose-300 text-xs font-mono text-[#881337] font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
              <span>05 // FEATURED PROJECTS & SAAS APPS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
              Selected Work & SaaS Applications
            </h2>
            <p className="text-base text-zinc-700 mt-2 max-w-2xl font-normal">
              Production web applications and SaaS platform concepts built with TypeScript, React, Next.js, FastAPI, Supabase, and PostgreSQL.
            </p>
          </div>

          {/* Filter Tabs - Instant Static Toggle */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-rose-300 shadow-sm">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#881337] text-white shadow-sm'
                      : 'text-[#881337] hover:bg-rose-100/60'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isLiveDemo = project.category === 'live';

            return (
              <div
                key={project.id}
                className="bg-white border border-rose-300 rounded-2xl overflow-hidden flex flex-col justify-between group transition-transform duration-150 hover:-translate-y-1 shadow-md hover:shadow-xl hover:border-[#881337]"
              >
                {/* Project Screenshot */}
                {project.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-zinc-100">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Live badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#881337] text-white text-[10px] font-mono font-extrabold uppercase tracking-wider shadow">
                        LIVE PREVIEW
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                <div>
                  {/* Badge Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-md ${
                        isLiveDemo
                          ? 'bg-[#881337] text-white border border-[#9f1239]'
                          : 'bg-[#fff1f2] text-[#881337] border border-rose-200'
                      }`}>
                        {project.badge || project.category.toUpperCase()}
                      </span>
                      {project.isPlaceholder && (
                        <span className="text-[11px] font-mono text-zinc-500 px-2.5 py-0.5 bg-rose-50 rounded border border-rose-200">
                          Configurable Placeholder
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-[#881337] hover:text-[#2a080c] transition-colors p-1.5 rounded-lg bg-[#fff1f2] border border-rose-200"
                      title="View Architecture Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading text-[#2a080c] mb-2 group-hover:text-[#881337] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-5 font-normal">
                    {project.description}
                  </p>

                  {/* Concept Card */}
                  <div className="p-4 rounded-xl bg-[#fff1f2]/80 border border-rose-200 space-y-2 mb-5">
                    <div className="text-xs font-mono text-zinc-700">
                      <strong className="text-[#881337] font-bold uppercase tracking-wider">Concept: </strong>
                      {project.concept}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs font-medium text-zinc-700">
                        <span className="text-[#881337] font-bold">✓</span>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pb-5 mb-5 border-b border-rose-100">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono font-bold text-[#881337]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono font-bold text-[#881337] hover:text-[#2a080c] transition-colors flex items-center gap-1.5"
                    >
                      <Info className="w-4 h-4 text-[#be123c]" />
                      <span>Specs & Architecture</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-[#fff1f2] border border-rose-200 text-[#881337] hover:bg-[#881337] hover:text-white transition-colors"
                          title="View Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveUrl && project.liveUrl !== '#' ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-track-id={`demo_${project.id}`}
                          data-track-label={`Live Demo: ${project.title}`}
                          data-track-category="demo"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-xs shadow-md transition-colors"
                        >
                          <span>Launch Live Demo</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono text-zinc-500">
                          Placeholder Link
                        </span>
                      )}
                    </div>
                    </div>
                </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Window */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
