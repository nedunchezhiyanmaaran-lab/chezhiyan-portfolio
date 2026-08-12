'use client';

import { Terminal, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#1a050a] border-t border-rose-900/60 pt-16 pb-12 text-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-rose-900/40">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#881337] text-white flex items-center justify-center shadow-md">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white uppercase tracking-wider">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-sm text-rose-200/90 max-w-md">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.experience}
            </p>

            <blockquote className="text-xs font-mono text-rose-300 italic border-l-2 border-[#881337] pl-3 font-semibold">
              "{PERSONAL_INFO.quote}"
            </blockquote>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold">
              Connect & Profiles
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#2b0a11] border border-rose-800 text-rose-200 hover:bg-[#881337] hover:text-white transition-all w-fit font-bold"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-rose-300/80">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with Next.js, TypeScript & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2b0a11] border border-rose-800 text-rose-200 hover:bg-[#881337] hover:text-white transition-all font-bold"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
