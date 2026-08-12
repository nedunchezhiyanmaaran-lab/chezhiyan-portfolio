'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, KeyRound, Mail, LogOut, Users, Clock, MousePointerClick, 
  MessageSquare, RefreshCw, Trash2, ArrowLeft, CheckCircle2, ShieldCheck, 
  ExternalLink, Sparkles, Activity, Layers, Smartphone, Monitor, Globe, Link2
} from 'lucide-react';
import Link from 'next/link';
import { 
  getAnalyticsData, 
  resetAnalyticsData, 
  AnalyticsData, 
  VisitorSession, 
  LeadInquiry,
  LiveLinkClickLog
} from '@/lib/analyticsStore';
import { supabase } from '@/lib/supabase';


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'livelinks' | 'leads' | 'sessions'>('livelinks');

  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_authenticated') : null;
    if (token === 'true') {
      setIsAuthenticated(true);
      refreshData();
    }
  }, []);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': 'Bearer admin'
        }
      });

      if (!response.ok) {
        throw new Error(`API error, status ${response.status}`);
      }

      const result = await response.json();
      const dbLeads = result.leads || [];

      const mappedLeads: LeadInquiry[] = dbLeads.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        timestamp: new Date(item.timestamp).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
      setLeads(mappedLeads);
      setIsUsingSupabase(true);
    } catch (err) {
      console.warn('Could not fetch leads from API, falling back to local storage:', err);
      setIsUsingSupabase(false);
      // Fallback
      const data = getAnalyticsData();
      setLeads(data.leads);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const refreshData = () => {
    const data = getAnalyticsData();
    setAnalytics(data);
    fetchLeads();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const validEmail = email.trim().toLowerCase();
    if (
      (validEmail === 'chezhiyancdurai@gmail.com' || validEmail === 'admin@anbuchezhiyan.dev' || validEmail === 'admin') &&
      password === 'Chezhiyan@vk18'
    ) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      refreshData();
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const handleResetAnalytics = () => {
    if (confirm('Are you sure you want to reset all stored analytics data?')) {
      resetAnalyticsData();
      refreshData();
    }
  };

  const formatTimeSpent = (totalSeconds: number) => {
    const hours = (totalSeconds / 3600).toFixed(1);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hrs (${mins}m avg)`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a080c] via-[#4c0519] to-[#881337] flex items-center justify-center p-4 font-sans text-white relative">
        <div className="max-w-md w-full bg-white text-zinc-900 rounded-3xl p-8 shadow-2xl border border-rose-200 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#881337] text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-900/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-[#2a080c]">
              Admin Analytics Portal
            </h1>
            <p className="text-xs text-zinc-600 font-semibold">
              Enter credentials to view portfolio insights, visitor time, click heatmaps & leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-[11px] font-semibold text-[#881337] uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  id="admin-email"
                  type="text"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-rose-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-[11px] font-semibold text-[#881337] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-rose-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-900/20"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-zinc-500">
            <Link href="/" className="hover:text-[#881337] transition-colors flex items-center gap-1 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="font-semibold">v1.0 Protected</span>
          </div>

        </div>
      </div>
    );
  }

  const clicksList = analytics ? Object.values(analytics.clicks).sort((a, b) => b.count - a.count) : [];
  const totalClicks = clicksList.reduce((acc, curr) => acc + curr.count, 0);

  // Individual Live Demo metrics
  const gymClicks = analytics?.clicks.demo_gym_website?.count || 0;
  const acmeClicks = analytics?.clicks.demo_acme_crm?.count || 0;
  const rmsClicks = analytics?.clicks.demo_rms_dashboard?.count || 0;

  return (
    <div className="min-h-screen bg-[#faf2f2] text-zinc-900 font-sans">
      
      {/* Admin Navbar Header */}
      <header className="bg-white border-b border-rose-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#881337] text-white flex items-center justify-center font-extrabold shadow-md">
              AC
            </div>
            <div>
              <div className="text-base font-bold text-[#2a080c] font-heading flex items-center gap-2">
                <span>Anbuchezhiyan Portfolio Analytics</span>
                <span className="px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#881337] text-[10px] font-bold border border-rose-200 tracking-wider uppercase">
                  ADMIN PORTAL
                </span>
              </div>
              <div className="text-xs text-zinc-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Real-Time Live Link & Visitor Tracking Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fff1f2] border border-rose-200 text-xs font-semibold text-[#881337] hover:bg-rose-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Portfolio</span>
            </Link>

            <button
              onClick={refreshData}
              className="p-2.5 rounded-xl bg-white border border-rose-200 text-[#881337] hover:bg-rose-50 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold shadow-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Total Visitors */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#881337]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Visitors</span>
              <Users className="w-5 h-5 text-[#be123c]" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-[#2a080c]">
              {analytics?.totalVisitors || 0}
            </div>
            <div className="text-xs text-zinc-500 flex items-center justify-between">
              <span>Unique Sessions</span>
              <span className="text-emerald-600 font-bold">+12% this week</span>
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#881337]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Time Spent</span>
              <Clock className="w-5 h-5 text-[#be123c]" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-[#2a080c]">
              {formatTimeSpent(analytics?.totalTimeSpentSeconds || 0)}
            </div>
            <div className="text-xs text-zinc-500 flex items-center justify-between">
              <span>Avg Dwell Time</span>
              <span className="text-emerald-600 font-bold">4m 42s / visitor</span>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#881337]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Live Links Clicked</span>
              <Link2 className="w-5 h-5 text-[#be123c]" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-[#2a080c]">
              {gymClicks + acmeClicks + rmsClicks} Clicks
            </div>
            <div className="text-xs text-zinc-500 flex items-center justify-between">
              <span>Tracked Live Projects</span>
              <span className="text-emerald-600 font-bold">3 Active Demos</span>
            </div>
          </div>

          {/* Lead Submissions */}
          <div className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#881337]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Lead Inquiries</span>
              <MessageSquare className="w-5 h-5 text-[#be123c]" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-[#2a080c]">
              {isLoadingLeads ? '...' : leads.length}
            </div>
            <div className="text-xs text-zinc-500 flex items-center justify-between">
              <span>Contact Messages</span>
              <span className="text-emerald-600 font-bold">Direct Inquiries</span>
            </div>
          </div>

        </div>

        {/* Individual Live Demo Click Cards */}
        <div className="bg-white border border-rose-300 rounded-3xl p-7 space-y-5 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div>
              <h3 className="text-xl font-bold font-heading text-[#2a080c] flex items-center gap-2">
                <Link2 className="w-5 h-5 text-[#881337]" />
                <span>Individual Live Demo Links Click Breakdown</span>
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                Exact click counters recorded separately for each of your real deployed Vercel live links.
              </p>
            </div>
            <span className="text-xs text-[#881337] font-bold px-3 py-1 bg-[#fff1f2] border border-rose-200 rounded-lg">
              Total Live Link Clicks: {gymClicks + acmeClicks + rmsClicks}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Gym Website Card */}
            <div className="p-5 rounded-2xl bg-[#fff1f2] border border-rose-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#881337] uppercase tracking-wider">Live Demo #1</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#881337] text-white text-xs font-semibold">
                  {gymClicks} Clicks
                </span>
              </div>
              <div className="text-base font-bold text-[#2a080c]">Fitness & Gym Platform</div>
              <a
                href="https://gym-website-smoky-xi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#881337] hover:underline flex items-center gap-1 font-semibold truncate"
              >
                <span>gym-website-smoky-xi.vercel.app</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {/* Acme CRM Card */}
            <div className="p-5 rounded-2xl bg-[#fff1f2] border border-rose-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#881337] uppercase tracking-wider">Live Demo #2</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#881337] text-white text-xs font-semibold">
                  {acmeClicks} Clicks
                </span>
              </div>
              <div className="text-base font-bold text-[#2a080c]">Acme CRM Platform</div>
              <a
                href="https://acme-crm-frontend.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#881337] hover:underline flex items-center gap-1 font-semibold truncate"
              >
                <span>acme-crm-frontend.vercel.app</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {/* RMS Dashboard Card */}
            <div className="p-5 rounded-2xl bg-[#fff1f2] border border-rose-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#881337] uppercase tracking-wider">Live Demo #3</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#881337] text-white text-xs font-semibold">
                  {rmsClicks} Clicks
                </span>
              </div>
              <div className="text-base font-bold text-[#2a080c]">RMS Dashboard</div>
              <a
                href="https://rms-frontend-jet-zeta.vercel.app/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#881337] hover:underline flex items-center gap-1 font-semibold truncate"
              >
                <span>rms-frontend-jet-zeta.vercel.app</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between bg-white border border-rose-200 rounded-2xl p-2 shadow-xs">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTab('livelinks')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'livelinks'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#881337] hover:bg-rose-50'
              }`}
            >
              🔗 Live Link Clicks Log ({analytics?.liveLinkLogs.length})
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#881337] hover:bg-rose-50'
              }`}
            >
              📊 Full Click Distribution
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#881337] hover:bg-rose-50'
              }`}
            >
              📬 Lead Inquiries ({isLoadingLeads ? '...' : leads.length})
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'sessions'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#881337] hover:bg-rose-50'
              }`}
            >
              🌐 Visitor Sessions Log
            </button>
          </div>

          <button
            onClick={handleResetAnalytics}
            className="text-xs font-semibold text-red-600 hover:text-red-800 p-2 flex items-center gap-1.5"
            title="Reset All Analytics"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Storage</span>
          </button>
        </div>

        {/* Tab 1: Live Links Click Log */}
        {activeTab === 'livelinks' && (
          <div className="bg-white border border-rose-200 rounded-3xl p-7 space-y-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#2a080c]">
                  Individual Live Demo Click Log
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Recorded timestamps and visitor locations whenever someone clicks your real Vercel live links.
                </p>
              </div>
            </div>

            <table className="w-full text-left text-sm text-zinc-700">
              <thead>
                <tr className="border-b border-rose-200 text-[#881337] font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-3">Project Name</th>
                  <th className="py-3 px-3">Live URL</th>
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Visitor Location</th>
                  <th className="py-3 px-3">Device / Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {analytics?.liveLinkLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-rose-50/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#2a080c]">{log.projectName}</td>
                    <td className="py-3.5 px-3">
                      <a
                        href={log.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#881337] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">{log.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-600 font-medium">{log.timestamp}</td>
                    <td className="py-3.5 px-3 text-zinc-800 font-semibold">{log.visitorLocation}</td>
                    <td className="py-3.5 px-3 text-zinc-700 font-medium">{log.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Full Click Heatmap */}
        {activeTab === 'overview' && (
          <div className="bg-white border border-rose-200 rounded-3xl p-7 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#2a080c]">
                  Full Button & CTA Click Distribution Heatmap
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Captures which links, live demos, and buttons visitors click most on your portfolio.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#881337] px-3 py-1 bg-[#fff1f2] border border-rose-200 rounded-lg">
                Total Recorded Clicks: {totalClicks}
              </span>
            </div>

            <div className="space-y-4">
              {clicksList.map((item) => {
                const percentage = totalClicks > 0 ? Math.round((item.count / totalClicks) * 100) : 0;

                return (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="font-bold text-[#2a080c] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#be123c]"></span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[#881337] font-semibold">
                        {item.count} clicks ({percentage}%)
                      </span>
                    </div>

                    <div className="w-full h-3 bg-rose-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#881337] via-[#be123c] to-[#e11d48] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Lead Inquiries Table */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-rose-200 rounded-3xl p-7 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#2a080c]">
                  Direct Contact Lead Inquiries
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Messages submitted by clients, recruiters, and startup founders from your portfolio contact form.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {isUsingSupabase ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Database Connected
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 flex items-center gap-1 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Local Storage (Fallback)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {isLoadingLeads ? (
                <div className="text-center py-12 text-zinc-500 text-sm font-medium">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#881337]" />
                  <span>Loading inquiries from database...</span>
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 text-sm font-medium border border-dashed border-rose-200 rounded-2xl">
                  No inquiries found. Contact form messages will appear here.
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-[#fff1f2]/80 border border-rose-200 space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200 pb-3">
                      <div>
                        <div className="text-base font-extrabold text-[#2a080c]">{lead.name}</div>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-xs text-[#881337] hover:underline font-semibold"
                        >
                          {lead.email}
                        </a>
                      </div>
                      <div className="text-xs text-zinc-500 bg-white px-2.5 py-1 rounded-lg border border-rose-200 w-fit font-medium">
                        {lead.timestamp}
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-[#881337]">
                      Subject: {lead.subject || 'N/A'}
                    </div>

                    <p className="text-sm text-zinc-800 leading-relaxed font-normal bg-white p-4 rounded-xl border border-rose-200">
                      "{lead.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Visitor Sessions Log */}
        {activeTab === 'sessions' && (
          <div className="bg-white border border-rose-200 rounded-3xl p-7 space-y-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#2a080c]">
                  Real-Time Visitor Sessions Log
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Session details, devices, location, dwell time, and interaction counts.
                </p>
              </div>
            </div>

            <table className="w-full text-left text-sm text-zinc-700">
              <thead>
                <tr className="border-b border-rose-200 text-[#881337] font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-3">Session ID</th>
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3">Device / Browser</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Dwell Time</th>
                  <th className="py-3 px-3">Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {analytics?.sessions.map((sess) => (
                  <tr key={sess.sessionId} className="hover:bg-rose-50/60 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#2a080c]">{sess.sessionId}</td>
                    <td className="py-3.5 px-3 text-zinc-600 font-medium">{sess.timestamp}</td>
                    <td className="py-3.5 px-3 text-zinc-800 font-semibold">
                      <div className="flex items-center gap-1.5 font-medium">
                        {sess.device === 'Mobile' ? <Smartphone className="w-3.5 h-3.5 text-[#be123c]" /> : <Monitor className="w-3.5 h-3.5 text-[#be123c]" />}
                        <span>{sess.browser}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-700 font-semibold">{sess.location}</td>
                    <td className="py-3.5 px-3 text-[#881337] font-bold">
                      {Math.floor(sess.dwellTimeSeconds / 60)}m {sess.dwellTimeSeconds % 60}s
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-700">
                      {sess.clicksCount} actions
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
}
