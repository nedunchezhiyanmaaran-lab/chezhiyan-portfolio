'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code, Cpu, ShieldAlert, Rocket, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '@/data/portfolioData';

const STEP_ICONS = [Search, Compass, Code, Cpu, ShieldAlert, Rocket];

export default function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="py-24 bg-white relative border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-rose-200 text-xs font-mono text-[#881337] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
            <span>06 // DEVELOPMENT APPROACH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#2a080c]">
            Engineering Workflow
          </h2>
          <p className="text-base text-zinc-600 mt-2 max-w-2xl font-normal">
            A disciplined 6-stage engineering process for turning product specs into production-grade web applications.
          </p>
        </motion.div>

        {/* Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#881337] text-white border-[#9f1239] shadow-lg shadow-rose-900/20'
                    : 'bg-[#fff1f2]/80 border-rose-200 text-[#881337] hover:bg-rose-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-[#881337]'}`}>
                    {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#be123c]'}`} />
                </div>
                <div className="text-sm font-bold truncate font-heading">{step.title}</div>
                <div className={`text-[11px] font-mono truncate ${isSelected ? 'text-rose-200' : 'text-zinc-600'}`}>{step.subtitle}</div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-t-full hidden md:block"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="maroon-card rounded-3xl p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#881337] text-white border border-[#9f1239] font-mono text-xs font-bold">
                STAGE {activeStep.number}
              </span>
              <span className="text-xs font-mono text-[#881337] uppercase tracking-wider font-bold">
                {activeStep.subtitle}
              </span>
            </div>

            <h3 className="text-3xl font-bold font-heading text-[#2a080c]">
              {activeStep.number} — {activeStep.title}
            </h3>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
              {activeStep.description}
            </p>

            <div className="space-y-2.5 pt-2">
              {activeStep.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-center gap-3 p-3 rounded-xl bg-[#fff1f2] border border-rose-200 text-xs font-bold text-zinc-800 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#be123c] shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#fff1f2] border border-rose-200 rounded-2xl p-6 font-mono text-xs text-zinc-700 space-y-4">
            <div className="flex items-center justify-between text-[#881337] pb-3 border-b border-rose-200">
              <span className="font-bold text-[#881337]">CHECKLIST_VERIFICATION</span>
              <span className="text-xs font-bold">STEP_{activeStep.number}</span>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="text-[#881337]">$ execution_phase --step {activeStep.number}</div>
              <div className="text-[#881337] font-bold">✔ Requirement boundary parameters checked</div>
              <div className="text-[#881337] font-bold">✔ Specs & API contracts validated</div>
              <div className="text-[#881337] font-bold">✔ Type-safe reusable components committed</div>
              <div className="text-zinc-500">status: READY_FOR_NEXT_PHASE</div>
            </div>

            <div className="pt-4 border-t border-rose-200 flex justify-between items-center text-xs">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-white border border-rose-200 text-[#881337] hover:bg-rose-50 disabled:opacity-40 font-bold"
              >
                Previous Step
              </button>

              <button
                disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold disabled:opacity-40 flex items-center gap-1.5 shadow-md shadow-rose-900/20"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
