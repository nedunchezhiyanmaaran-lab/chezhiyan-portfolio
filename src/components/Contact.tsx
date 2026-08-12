'use client';

import { useState } from 'react';
import { Mail, Phone, Copy, Check, Send, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { logLeadInquiry, trackClick } from '@/lib/analyticsStore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    trackClick('copy_email', 'Contact: Copy Email Action', 'contact');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    trackClick('copy_phone', 'Contact: Copy Phone Action', 'contact');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // POST to our server-side Next.js API route
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Direct Contact Form Submission',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      trackClick('contact_form_submit', 'Contact: Form Submitted', 'contact');
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmittedSuccess(false), 6000);
    } catch (err) {
      console.warn('API call failed, falling back to local storage:', err);
      try {
        // Fallback: Save local copy
        await logLeadInquiry({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Direct Contact Form Submission',
          message: formData.message,
        });
        trackClick('contact_form_submit', 'Contact: Form Submitted', 'contact');
        setIsSubmitting(false);
        setSubmittedSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmittedSuccess(false), 6000);
      } catch (fallbackErr) {
        console.error('Local fallback also failed:', fallbackErr);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#2a080c] via-[#4c0519] to-[#881337] border-t border-rose-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#881337] border border-rose-600 text-xs font-mono text-white font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>07 // CONTACT & COLLABORATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Have a product in mind?
            </h2>

            <p className="text-base text-rose-100/90 leading-relaxed font-normal">
              Let’s turn the idea into something people can actually use. Reach out directly or fill in the form for inquiries regarding full-stack projects, SaaS platforms, backend APIs, or technical opportunities.
            </p>

            {/* Direct Cards */}
            <div className="space-y-4 pt-2">
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#1c060a] border border-rose-800/80 flex items-center justify-between gap-4 shadow-xl hover:border-rose-500 transition-colors">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="p-3 rounded-xl bg-[#881337] text-white shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono text-rose-300">Direct Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-base font-bold text-white hover:text-rose-200 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    data-track-id="copy_email"
                    data-track-label="Contact: Copy Email Action"
                    data-track-category="contact"
                    className="p-2.5 rounded-xl bg-[#2d0910] border border-rose-800 text-rose-200 hover:bg-rose-900 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    Email Me
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-[#1c060a] border border-rose-800/80 flex items-center justify-between gap-4 shadow-xl hover:border-rose-500 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#881337] text-white shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-rose-300">Direct Phone</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-base font-bold text-white hover:text-rose-200 transition-colors block"
                    >
                      +91 {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyPhone}
                    data-track-id="copy_phone"
                    data-track-label="Contact: Copy Phone Action"
                    data-track-category="contact"
                    className="p-2.5 rounded-xl bg-[#2d0910] border border-rose-800 text-rose-200 hover:bg-rose-900 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-rose-100 text-[#881337] text-xs font-bold uppercase transition-colors"
                  >
                    Call Me
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1c060a]/80 border border-rose-800/60 flex items-center gap-3 text-xs text-rose-200 font-medium">
              <Sparkles className="w-4 h-4 text-rose-300 shrink-0" />
              <span>Typically responds within 24 hours. Confidential inquiries welcomed.</span>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white text-zinc-900 rounded-3xl p-7 sm:p-9 shadow-2xl relative border border-rose-200">
            <h3 className="text-2xl font-bold font-heading text-[#2a080c] mb-6 flex items-center gap-2.5">
              <MessageSquare className="w-6 h-6 text-[#881337]" />
              <span>Send a Direct Message</span>
            </h3>

            {submittedSuccess ? (
              <div className="p-6 rounded-2xl bg-[#fff1f2] border border-rose-300 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-[#881337] font-bold text-lg">
                  <Check className="w-6 h-6" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Thank you for getting in touch. Anbuchezhiyan will review your message and reply to your email address promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-[#881337] uppercase">
                      Your Name <span className="text-[#be123c]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337] transition-all ${
                        errors.name ? 'border-red-500' : 'border-rose-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-[#881337] uppercase">
                      Your Email <span className="text-[#be123c]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337] transition-all ${
                        errors.email ? 'border-red-500' : 'border-rose-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs font-mono text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-bold text-[#881337] uppercase">
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. SaaS Platform Development / Full Stack Position"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-rose-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337] transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-[#881337] uppercase">
                    Message <span className="text-[#be123c]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Provide details about your project scope, web application requirements, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337] transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-rose-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs font-mono text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-sm uppercase tracking-wider transition-colors duration-150 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
