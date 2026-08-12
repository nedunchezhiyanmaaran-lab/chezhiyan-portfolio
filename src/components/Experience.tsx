'use client';

import { Briefcase, Calendar, MapPin, Award, ChevronRight, Layers } from 'lucide-react';
import { EXPERIENCE_DATA, PERSONAL_INFO } from '@/data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white border-t border-rose-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono text-[#881337] font-bold mb-3">
            <span>03 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
            Experience & SaaS Milestones
          </h2>
          <p className="text-base text-zinc-600 mt-2 max-w-2xl font-normal">
            Proven track record building production software across full-stack web applications, SaaS platforms, and backend systems.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="maroon-card rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-xl"
            >
              {/* Top Bar info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-rose-100">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="p-2.5 rounded-xl bg-[#881337] text-white shadow-md">
                      <Briefcase className="w-5 h-5" />
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-[#2a080c] tracking-tight">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-sm font-mono text-[#881337] font-bold flex items-center gap-2">
                    <span>{exp.company}</span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-zinc-600 font-semibold">{exp.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-[#881337]">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200">
                    <Calendar className="w-4 h-4 text-[#be123c]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200">
                    <MapPin className="w-4 h-4 text-[#be123c]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-zinc-700 leading-relaxed mb-6 font-normal">
                {exp.description}
              </p>

              {/* Verified SaaS Deliveries Banner */}
              <div className="p-5 rounded-2xl bg-[#fff1f2] border border-rose-200 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#881337] text-white shadow-md">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#881337] font-bold uppercase tracking-wider">
                      SaaS Contributions
                    </div>
                    <div className="text-base font-extrabold text-[#2a080c]">
                      Contributed to {PERSONAL_INFO.saasContributed}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 border-t md:border-t-0 md:border-l border-rose-200 pt-3 md:pt-0 md:pl-5">
                  <div className="p-2.5 rounded-xl bg-[#881337] text-white shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#881337] font-bold uppercase tracking-wider">
                      End-to-End Shipped
                    </div>
                    <div className="text-base font-extrabold text-[#2a080c]">
                      Fully built & closed {PERSONAL_INFO.saasClosed}
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities Grid */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#881337] font-bold">
                  Core Responsibilities & Technical Execution:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs font-semibold text-zinc-700 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#be123c] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-rose-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#881337] mr-2">Technologies Used:</span>
                {exp.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono font-bold text-[#881337]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
