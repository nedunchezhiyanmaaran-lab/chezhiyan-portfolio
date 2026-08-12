'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { PERSONAL_INFO } from '@/data/portfolioData';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-rose-900/15 py-3 shadow-md shadow-rose-950/5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="group flex items-center gap-3 text-zinc-900 hover:text-[#881337] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#881337] text-white flex items-center justify-center group-hover:bg-[#9f1239] transition-all shadow-md">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-base tracking-tight font-bold text-[#2a080c] group-hover:text-[#881337] transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-[#881337] font-mono tracking-widest font-bold uppercase leading-none">
              FULL STACK DEVELOPER
            </span>
          </div>
        </a>

        {/* Desktop Links - Instant Static Toggle */}
        <nav className="hidden md:flex items-center gap-1 bg-[#fff1f2] p-1.5 rounded-full border border-rose-200 shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'text-white font-bold bg-[#881337] shadow-sm'
                    : 'text-[#881337] hover:text-[#2a080c] hover:bg-rose-100/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-[#fff1f2] border border-rose-200 text-[#881337] hover:bg-[#881337] hover:text-white transition-colors shadow-xs"
            title="Admin Analytics Portal"
          >
            <Lock className="w-4 h-4" />
          </Link>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            data-track-id="cta_lets_talk"
            data-track-label="CTA: Let's Talk Navbar"
            data-track-category="cta"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-rose-900/20 hover:shadow-rose-900/35 hover:scale-105"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-[#fff1f2] border border-rose-200 text-[#881337] hover:text-[#2a080c] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-rose-200 p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#881337] text-white'
                        : 'text-[#881337] hover:bg-rose-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-rose-200 flex flex-col gap-2">
                <Link
                  href="/admin"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#fff1f2] border border-rose-300 text-[#881337] font-bold text-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>Admin Analytics Portal</span>
                </Link>

                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#881337] text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-rose-900/20"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
