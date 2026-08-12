'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Sparkles, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CommandOutput {
  command: string;
  output: string | string[];
}

const COMMAND_DATA: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  summary     - Print candidate positioning and experience",
    "  stack       - Print full tech stack details",
    "  saas-stats  - Print verified SaaS applications metric",
    "  contact     - Print direct contact email & phone",
    "  clear       - Clear terminal screen"
  ],
  summary: [
    `Name:        ${PERSONAL_INFO.name}`,
    `Title:       ${PERSONAL_INFO.title}`,
    `Experience:  ${PERSONAL_INFO.experience}`,
    `Focus:       Full Stack Web Apps, SaaS Products, FastAPI, Supabase, PostgreSQL`
  ],
  stack: [
    "Frontend:    TypeScript, React.js, Next.js, HTML5, CSS3, Tailwind CSS",
    "Backend:     FastAPI, REST APIs, Server-side application development",
    "Database:    Supabase, PostgreSQL, MongoDB",
    "Tooling:     Git, GitHub, API Integrations, Authentication, Production Debugging"
  ],
  "saas-stats": [
    "✔ Contributed to 10+ SaaS applications in production",
    "✔ Closed & fully built 3 SaaS applications end-to-end solo/lead",
    "✔ Hands-on experience: Auth, RLS policies, multi-tenant databases"
  ],
  contact: [
    `Email:       ${PERSONAL_INFO.email}`,
    `Phone:       +91 ${PERSONAL_INFO.phone}`,
    `Status:      ${PERSONAL_INFO.availabilityStatus}`
  ]
};

export default function TerminalWidget() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'npx anbuchezhiyan --summary',
      output: [
        `➜ ${PERSONAL_INFO.name} v1.0.0`,
        `Title: ${PERSONAL_INFO.title} (${PERSONAL_INFO.experience})`,
        `Highlights: Contributed to 10+ SaaS apps | Built 3 SaaS apps end-to-end`,
        `Type "help" or click presets below to run commands.`
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const result = COMMAND_DATA[trimmed] || [
      `Command not found: "${trimmed}". Type "help" for a list of available commands.`
    ];

    setHistory((prev) => [...prev, { command: cmdStr, output: result }]);
    setInputVal('');
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(`npx anbuchezhiyan-cli`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full bg-[#1c080d] border border-rose-900/40 rounded-2xl overflow-hidden shadow-2xl font-mono text-white"
    >
      {/* Terminal Top Bar */}
      <div className="bg-[#2a080c] px-5 py-3 border-b border-rose-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#be123c] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#e11d48] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#881337] inline-block"></span>
          </div>
          <span className="text-xs text-rose-200 ml-2 flex items-center gap-1.5 font-bold">
            <Terminal className="w-4 h-4 text-[#be123c]" />
            <span>anbuchezhiyan-cli</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCli}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-xs font-bold text-white transition-colors shadow-sm"
            title="Copy CLI command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            <span>{copied ? 'Copied!' : 'npx anbuchezhiyan-cli'}</span>
          </button>
        </div>
      </div>

      {/* Terminal History Container */}
      <div className="p-5 h-[260px] overflow-y-auto space-y-4 text-xs">
        <AnimatePresence>
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <span className="text-rose-400/80">guest@anbuchezhiyan:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="text-rose-100 pl-4 space-y-1 leading-relaxed border-l border-rose-800/60">
                {Array.isArray(item.output) ? (
                  item.output.map((line, lIdx) => (
                    <div key={lIdx} className="whitespace-pre-wrap">{line}</div>
                  ))
                ) : (
                  <div>{item.output}</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Command Presets Bar */}
      <div className="px-5 py-2.5 bg-[#2a080c]/80 border-t border-rose-900/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-rose-300 flex items-center gap-1 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#be123c]" />
          <span>Presets:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['summary', 'stack', 'saas-stats', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="px-3 py-1 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-white font-bold transition-colors shadow-xs"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(inputVal);
        }}
        className="px-5 py-3 bg.140407 border-t border-rose-900/40 flex items-center gap-2 text-xs"
      >
        <span className="text-rose-300 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help' or click presets above..."
          className="w-full bg-transparent text-white focus:outline-none text-xs font-mono"
        />
        <button type="submit" className="text-rose-300 hover:text-white p-1">
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
