'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Code2, Layers, AlertCircle } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white border border-rose-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-rose-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded font-bold ${
                    project.category === 'live'
                      ? 'bg-[#881337] text-white'
                      : 'bg-[#fff1f2] text-[#881337] border border-rose-200'
                  }`}>
                    {project.badge || project.category.toUpperCase()}
                  </span>
                  {project.isPlaceholder && (
                    <span className="text-[11px] font-mono text-zinc-500">Configurable Concept</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#2a080c]">{project.title}</h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#fff1f2] border border-rose-200 text-[#881337] hover:bg-[#881337] hover:text-white transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="p-4 rounded-2xl bg-[#fff1f2] border border-rose-200 text-sm font-semibold text-[#881337]">
                Concept: {project.concept}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
                  <div className="text-xs font-mono text-[#881337] font-bold uppercase flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-[#be123c]" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
                  <div className="text-xs font-mono text-[#881337] font-bold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#be123c]" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#881337] font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#be123c]" />
                  <span>Key Features & Functional Workflows</span>
                </h4>
                <div className="space-y-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fff1f2] border border-rose-200 text-xs font-semibold text-zinc-800">
                      <span className="text-[#881337] font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#881337] font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#be123c]" />
                  <span>Technology Architecture</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1 rounded-xl bg-[#fff1f2] border border-rose-200 text-xs font-mono font-bold text-[#881337]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {project.isPlaceholder && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-mono text-zinc-600 flex items-center justify-between font-semibold">
                  <span>Marked for replacement with actual repo/live details.</span>
                  <span className="text-[#881337] font-bold">[Placeholder]</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-rose-100 flex items-center justify-end gap-3 bg-white">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff1f2] border border-rose-200 text-[#881337] hover:bg-[#881337] hover:text-white text-xs font-bold transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold shadow-lg shadow-rose-900/20 transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
