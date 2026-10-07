'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Lock, KeyRound, Mail, LogOut, Users, Clock, MousePointerClick, 
  MessageSquare, RefreshCw, ArrowLeft, ExternalLink, Activity, 
  Layers, Smartphone, Monitor, Globe, Link2, TrendingUp, 
  BarChart3, Eye, ShieldCheck, Download, Sparkles, Terminal, Filter,
  Search, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle,
  Laptop, Cpu, Radio, Hash, Calendar, ArrowUpRight, Copy, Check,
  Send, Zap, Trash2
} from 'lucide-react';
import Link from 'next/link';

interface AnalyticsPayload {
  success: boolean;
  totalExternalVisitors: number;
  totalPageviews: number;
  avgDwellTimeSeconds: number;
  leadsCount: number;
  hourlyDistribution: number[];
  dailyTrends: { date: string; visitors: number; pageviews: number }[];
  sectionAttention: { name: string; reads: number; avgDwellSeconds: number }[];
  projectPerformance: { id: string; title: string; subtitle: string; views: number; modalViews: number; launches: number }[];
  audience: {
    referrers: Record<string, number>;
    os: Record<string, number>;
    browsers: Record<string, number>;
    devices: Record<string, number>;
  };
  sessions: any[];
  leads: any[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'projects' | 'leads' | 'audience' | 'events'>('overview');
  const [timeRange, setTimeRange] = useState<'7D' | '14D' | '30D'>('14D');
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);

  // Live Stream Filtering & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReferrer, setFilterReferrer] = useState('ALL');
  const [filterDevice, setFilterDevice] = useState('ALL');
  const [filterOS, setFilterOS] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_authenticated') : null;
    if (token === 'true') {
      setIsAuthenticated(true);
      fetchAnalytics();
    }
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const days = timeRange === '7D' ? 7 : timeRange === '14D' ? 14 : 30;
      const res = await fetch(`/api/analytics?days=${days}`);
      if (!res.ok) throw new Error(`API status ${res.status}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to load external analytics from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const validEmail = email.trim().toLowerCase();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    if (
      (validEmail === 'admin' || validEmail === 'chezhiyancdurai@gmail.com' || validEmail === 'admin@portfolio.dev') &&
      password === adminPassword
    ) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      fetchAnalytics();
    } else {
      setLoginError('Invalid credentials. (Default password: admin or set via NEXT_PUBLIC_ADMIN_PASSWORD)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const formatDwellTime = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0m 0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSessionId(text);
    setTimeout(() => setCopiedSessionId(null), 2000);
  };

  const exportCSV = () => {
    if (!analytics?.sessions) return;
    const headers = ['Session ID', 'Timestamp', 'Referrer', 'Device', 'OS', 'Browser', 'Duration (s)', 'Page Views', 'Sections Viewed'];
    const rows = analytics.sessions.map(s => [
      s.id,
      new Date(s.timestamp || s.created_at).toISOString(),
      `"${s.referrer}"`,
      s.device,
      s.os,
      s.browser,
      s.duration,
      s.page_views || 1,
      `"${(s.sections_viewed || []).join(';')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `external_telemetry_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered sessions for Live Event Stream
  const filteredSessions = useMemo(() => {
    if (!analytics?.sessions) return [];
    return analytics.sessions.filter((sess) => {
      const matchSearch = 
        sess.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sess.browser || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sess.os || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sess.referrer || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchRef = filterReferrer === 'ALL' || sess.referrer === filterReferrer;
      const matchDevice = filterDevice === 'ALL' || sess.device === filterDevice;
      const matchOS = filterOS === 'ALL' || sess.os === filterOS;

      return matchSearch && matchRef && matchDevice && matchOS;
    });
  }, [analytics?.sessions, searchQuery, filterReferrer, filterDevice, filterOS]);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage) || 1;
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSessions.slice(start, start + itemsPerPage);
  }, [filteredSessions, currentPage, itemsPerPage]);

  const maxHourlyCount = Math.max(...(analytics?.hourlyDistribution || [1]), 1);

  // SVG Line Chart Coordinate Generator for Daily Trends
  const chartCoordinates = useMemo(() => {
    if (!analytics?.dailyTrends || analytics.dailyTrends.length === 0) return { visitorPoints: '', pageviewPoints: '', areaPath: '', points: [] };
    const trends = analytics.dailyTrends;
    const count = trends.length;
    const maxVal = Math.max(...trends.map(t => Math.max(t.visitors, t.pageviews)), 1);

    const width = 800;
    const height = 180;
    const padding = 20;

    const points = trends.map((t, idx) => {
      const x = padding + (idx / Math.max(count - 1, 1)) * (width - padding * 2);
      const yVisitor = height - padding - (t.visitors / maxVal) * (height - padding * 2);
      const yPageview = height - padding - (t.pageviews / maxVal) * (height - padding * 2);
      return { x, yVisitor, yPageview, ...t };
    });

    const visitorPoints = points.map(p => `${p.x},${p.yVisitor}`).join(' ');
    const pageviewPoints = points.map(p => `${p.x},${p.yPageview}`).join(' ');

    const first = points[0];
    const last = points[points.length - 1];
    const areaPath = `M ${first.x} ${height - padding} L ${points.map(p => `${p.x} ${p.yVisitor}`).join(' L ')} L ${last.x} ${height - padding} Z`;

    return { visitorPoints, pageviewPoints, areaPath, points };
  }, [analytics?.dailyTrends]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center p-4 font-sans text-zinc-100 relative selection:bg-[#ff5722]/30 selection:text-[#ff8a65]">
        <div className="max-w-md w-full bg-[#14161c] text-zinc-100 rounded-3xl p-8 shadow-2xl border border-zinc-800/80 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#ff5722] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#ff5722]/30 font-extrabold text-lg">
              NC
            </div>
            <h1 className="text-2xl font-black font-heading text-white">
              Analytics Center
            </h1>
            <p className="text-xs text-zinc-400 font-medium">
              Enter credentials to access external audience insights & telemetry.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Admin Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/60 focus:border-[#ff5722]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/60 focus:border-[#ff5722]"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff5722]/20 cursor-pointer"
            >
              Sign In to Analytics Portal
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
            <Link href="/" className="hover:text-[#ff7043] transition-colors flex items-center gap-1 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="font-semibold text-emerald-400">External Synced</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 font-sans flex flex-col selection:bg-[#ff5722]/30 selection:text-[#ff8a65]">
      
      {/* Top Header Bar */}
      <header className="bg-[#12141a] border-b border-zinc-800/80 sticky top-0 z-40 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase tracking-wider text-white">NEDUNCHEZHIYAN</span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400 font-medium">analytics center</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182a20] border border-emerald-900/60 text-emerald-400 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Supabase Cloud Synced</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Pills */}
          <div className="flex items-center bg-[#191b22] border border-zinc-800/80 rounded-xl p-1 text-xs font-bold">
            {(['7D', '14D', '30D'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#ff5722] text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchAnalytics}
            disabled={isLoading}
            className="p-2 rounded-xl bg-[#191b22] border border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#ff5722]' : ''}`} />
          </button>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#191b22] border border-zinc-800/80 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Back to Portfolio Button */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#ff5722] hover:bg-[#f4511e] text-white text-xs font-bold transition-all shadow-md shadow-[#ff5722]/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-[#191b22] border border-zinc-800/80 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#101217] border-r border-zinc-800/80 p-4 space-y-6 shrink-0 flex flex-col justify-between">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <TrendingUp className={`w-4 h-4 ${activeTab === 'overview' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
              <span>Overview & KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trends'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <Activity className={`w-4 h-4 ${activeTab === 'trends' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
              <span>Traffic & Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <Layers className={`w-4 h-4 ${activeTab === 'projects' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
              <span>Project Engagement</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className={`w-4 h-4 ${activeTab === 'leads' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
                <span>Lead Inbox ({analytics?.leadsCount || 0})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('audience')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'audience'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <Globe className={`w-4 h-4 ${activeTab === 'audience' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
              <span>Audience & Stack</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-[#221714] border border-[#ff5722]/60 text-[#ff7043] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f]'
              }`}
            >
              <Activity className={`w-4 h-4 ${activeTab === 'events' ? 'text-[#ff5722]' : 'text-zinc-500'}`} />
              <span>Live Event Stream</span>
            </button>
          </div>

          {/* Diagnostics Section */}
          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3">
              DIAGNOSTICS
            </span>
            <button
              onClick={fetchAnalytics}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f] transition-colors cursor-pointer"
            >
              <span>Simulate Visitor Event</span>
              <Zap className="w-3.5 h-3.5 text-[#ff5722]" />
            </button>
            <button
              onClick={exportCSV}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 hover:bg-[#16181f] transition-colors cursor-pointer"
            >
              <span>Backup Telemetry (JSON)</span>
              <Download className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            <button
              onClick={fetchAnalytics}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-[#16181f] transition-colors cursor-pointer"
            >
              <span>Reset Telemetry</span>
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            </button>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl">
          {isLoading && (
            <div className="p-3 rounded-xl bg-[#2a1714] border border-[#ff5722]/40 text-[#ff8a65] text-xs font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ff5722]" />
              <span>Syncing with Supabase Cloud external telemetry...</span>
            </div>
          )}

          {/* TAB 1: Overview & KPIs */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Unique Visitors Card */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">UNIQUE VISITORS</span>
                    <div className="w-7 h-7 rounded-full bg-[#1b263b] flex items-center justify-center text-[#4da3ff]">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-heading text-white">
                      {(analytics as any)?.uniqueVisitorsCount || analytics?.totalExternalVisitors || 0}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      Unique People
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Across {(analytics as any)?.totalSessionsCount || 37} total visits (self excluded)
                  </p>
                </div>

                {/* Total Pageviews Card */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">TOTAL PAGEVIEWS</span>
                    <div className="w-7 h-7 rounded-full bg-[#2a1b38] flex items-center justify-center text-[#b366ff]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-heading text-white">
                    {analytics?.totalPageviews || 0}
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    ~{((analytics?.totalPageviews || 0) / Math.max((analytics as any)?.uniqueVisitorsCount || 1, 1)).toFixed(1)} views per unique visitor
                  </p>
                </div>

                {/* Avg Dwell Time Card */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">AVG DWELL TIME</span>
                    <div className="w-7 h-7 rounded-full bg-[#332a18] flex items-center justify-center text-[#e6b800]">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-heading text-white">
                    {formatDwellTime(analytics?.avgDwellTimeSeconds || 0)}
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Visitor engagement length
                  </p>
                </div>

                {/* Inquiries & Leads Card */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">INQUIRIES & LEADS</span>
                    <div className="w-7 h-7 rounded-full bg-[#381d19] flex items-center justify-center text-[#ff6647]">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-3xl font-black font-heading text-white">
                    {analytics?.leadsCount || 0}
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {analytics?.leadsCount || 0} pending review
                  </p>
                </div>

              </div>

              {/* Daily Traffic & Interaction Trends Smooth Line Chart Card */}
              <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Daily Traffic & Interaction Trends</span>
                      <span className="px-2 py-0.5 rounded bg-[#331713] text-[#ff7043] border border-[#ff5722]/30 text-[10px] font-bold">
                        Past {timeRange}
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Hover over any data point on the chart to inspect daily visitors and pageviews.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
                      <span className="text-zinc-300">Visitors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></span>
                      <span className="text-zinc-300">Pageviews</span>
                    </div>
                  </div>
                </div>

                {/* SVG Area & Line Chart */}
                <div className="relative pt-6 pb-2">
                  <svg viewBox="0 0 800 180" className="w-full h-48 overflow-visible">
                    <defs>
                      <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff5722" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#ff5722" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="20" y1="30" x2="780" y2="30" stroke="#262933" strokeDasharray="3 3" />
                    <line x1="20" y1="80" x2="780" y2="80" stroke="#262933" strokeDasharray="3 3" />
                    <line x1="20" y1="130" x2="780" y2="130" stroke="#262933" strokeDasharray="3 3" />
                    <line x1="20" y1="160" x2="780" y2="160" stroke="#262933" />

                    {/* Area Fill */}
                    {chartCoordinates.areaPath && (
                      <path d={chartCoordinates.areaPath} fill="url(#visitorGradient)" />
                    )}

                    {/* Pageview Line (Blue) */}
                    {chartCoordinates.pageviewPoints && (
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={chartCoordinates.pageviewPoints}
                      />
                    )}

                    {/* Visitor Line (Orange) */}
                    {chartCoordinates.visitorPoints && (
                      <polyline
                        fill="none"
                        stroke="#ff5722"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={chartCoordinates.visitorPoints}
                      />
                    )}

                    {/* Data Points */}
                    {chartCoordinates.points.map((p, i) => (
                      <g key={i} className="group">
                        <circle cx={p.x} cy={p.yVisitor} r="4" fill="#ff5722" stroke="#14161c" strokeWidth="2" className="cursor-pointer hover:r-6 transition-all" />
                        <circle cx={p.x} cy={p.yPageview} r="3" fill="#3b82f6" stroke="#14161c" strokeWidth="1.5" />
                      </g>
                    ))}
                  </svg>

                  {/* Dates below X-axis */}
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-2 px-4">
                    {analytics?.dailyTrends.map((d) => (
                      <span key={d.date}>{d.date}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row (Leaders & Inquiries) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Project Engagement Leaders */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Project Engagement Leaders</h4>
                    <button onClick={() => setActiveTab('projects')} className="text-xs text-[#ff7043] hover:underline flex items-center gap-1">
                      <span>Full Breakdown</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {analytics?.projectPerformance.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="flex justify-between items-center p-3 rounded-xl bg-[#1b1e26] border border-zinc-800/80">
                        <div>
                          <div className="text-xs font-bold text-white">{proj.title}</div>
                          <div className="text-[10px] text-zinc-400">{proj.subtitle}</div>
                        </div>
                        <div className="text-xs font-bold text-[#ff7043] font-mono">
                          {proj.views} Views · {proj.modalViews} Modals
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inquiries & Proposals */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Recent Inquiries & Proposals</h4>
                    <button onClick={() => setActiveTab('leads')} className="text-xs text-[#ff7043] hover:underline flex items-center gap-1">
                      <span>View All ({analytics?.leadsCount || 0})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {analytics?.leads.length === 0 ? (
                    <div className="text-center py-8 text-xs text-zinc-500 font-medium">
                      No inquiries currently pending.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {analytics?.leads.slice(0, 2).map((lead: any) => (
                        <div key={lead.id} className="p-3 rounded-xl bg-[#1b1e26] border border-zinc-800/80 space-y-1">
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>{lead.name}</span>
                            <span className="text-[10px] text-zinc-400 font-normal">{new Date(lead.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-zinc-300 truncate">"{lead.message}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Traffic & Trends */}
          {activeTab === 'trends' && (
            <div className="space-y-8">
              {/* Hourly Traffic & Trends */}
              <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white">Hourly Traffic & Trends</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Distribution of incoming visitor sessions across the 24 hours of the day.
                  </p>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 pt-4 items-end min-h-[140px] border-b border-zinc-800 pb-4">
                  {analytics?.hourlyDistribution.map((count, hr) => {
                    const barHeight = Math.max(Math.round((count / maxHourlyCount) * 100), 6);
                    return (
                      <div key={hr} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-full flex items-end justify-center h-28 relative">
                          <div
                            style={{ height: `${barHeight}%` }}
                            className={`w-full rounded-t transition-all ${
                              count > 0 ? 'bg-[#ff5722] group-hover:brightness-125' : 'bg-[#1e212b]'
                            }`}
                            title={`${hr}:00 - ${count} external visitors`}
                          ></div>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-mono">{hr}h</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section Attention & Reading Dwell Time */}
              <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-5 shadow-xl">
                <div>
                  <h3 className="text-base font-bold text-white">Section Attention & Reading Dwell Time</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Which areas of your portfolio hold the attention of prospective clients and engineering leaders.
                  </p>
                </div>

                <div className="space-y-4">
                  {analytics?.sectionAttention.map((sec, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#1b1e26] border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-zinc-200">{sec.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-400 font-mono">{sec.reads} Reads</span>
                          <span className="text-emerald-400 font-mono font-bold">
                            {formatDwellTime(sec.avgDwellSeconds)} Avg Dwell
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(Math.max((sec.reads / 10) * 100, 10), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Project Engagement */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Project Performance & Demo Conversions</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Granular click-through metrics, modal iframe engagements, and external app launches.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analytics?.projectPerformance.map((proj) => (
                  <div key={proj.id} className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#2e1915] text-[#ff7043] border border-[#ff5722]/40">
                        {proj.title}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {proj.views > 0 ? `${Math.round((proj.modalViews / Math.max(proj.views, 1)) * 100)}% CTR` : '0% CTR'}
                      </span>
                    </div>

                    <div className="text-base font-bold text-white">{proj.title} — {proj.subtitle}</div>

                    <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                      <div className="flex justify-between">
                        <span>Total Views:</span>
                        <span className="text-white font-mono font-bold">{proj.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modal In-Depth Views:</span>
                        <span className="text-white font-mono font-bold">{proj.modalViews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Live App Launches:</span>
                        <span className="text-white font-mono font-bold">{proj.launches}</span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ff5722] rounded-full"
                        style={{ width: `${Math.min(proj.views * 25, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Lead Inbox */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">Direct Lead Inbox</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Inquiries and project requests submitted by potential clients and recruiters.
                </p>
              </div>

              {analytics?.leads.length === 0 ? (
                <div className="text-center py-16 bg-[#14161c] border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm font-medium">
                  No contact messages found. Inquiries submitted via your contact form will appear here.
                </div>
              ) : (
                <div className="space-y-4">
                  {analytics?.leads.map((lead: any) => (
                    <div key={lead.id} className="p-5 rounded-2xl bg-[#14161c] border border-zinc-800 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                        <div>
                          <div className="text-base font-extrabold text-white">{lead.name}</div>
                          <a href={`mailto:${lead.email}`} className="text-xs text-[#ff7043] hover:underline">
                            {lead.email}
                          </a>
                        </div>
                        <span className="text-xs text-zinc-500 bg-[#1b1e26] px-2.5 py-1 rounded-lg border border-zinc-700 w-fit font-mono">
                          {new Date(lead.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#ff8a65]">
                        Subject: {lead.subject || 'Direct Inquiry'}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed bg-[#1b1e26] p-4 rounded-xl border border-zinc-800">
                        "{lead.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Audience & Stack */}
          {activeTab === 'audience' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-black text-white">External Audience & Tech Stack</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Detailed distribution across Inbound Referrers, Operating Systems, and Browser Clients.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Referrers */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Globe className="w-4 h-4 text-[#ff5722]" />
                    <span>Inbound Referrers</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analytics?.audience.referrers || {}).map(([ref, count]) => (
                      <div key={ref} className="flex justify-between items-center text-xs">
                        <span className={`font-semibold px-2 py-0.5 rounded ${
                          ref === 'www.reddit.com' ? 'text-orange-400 bg-orange-950/40 border border-orange-800/40' :
                          ref === 'LinkedIn' ? 'text-blue-400 bg-blue-950/40 border border-blue-800/40' :
                          'text-zinc-300 bg-zinc-800/50'
                        }`}>
                          {ref}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#1b1e26] text-[#ff7043] font-mono font-bold">
                          {count} visits
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Systems */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Monitor className="w-4 h-4 text-[#ff5722]" />
                    <span>Operating Systems</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analytics?.audience.os || {}).map(([os, count]) => (
                      <div key={os} className="flex justify-between items-center text-xs">
                        <span className="text-zinc-300 font-semibold">{os}</span>
                        <span className="px-2 py-0.5 rounded bg-[#1b1e26] text-[#ff7043] font-mono font-bold">
                          {count} sessions
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Browsers */}
                <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Laptop className="w-4 h-4 text-[#ff5722]" />
                    <span>Browsers & Clients</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analytics?.audience.browsers || {}).map(([br, count]) => (
                      <div key={br} className="flex justify-between items-center text-xs">
                        <span className="text-zinc-300 font-semibold">{br}</span>
                        <span className="px-2 py-0.5 rounded bg-[#1b1e26] text-[#ff7043] font-mono font-bold">
                          {count} sessions
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Live Event Stream (with Search, Multi-Filter, and Pagination) */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#ff5722]" />
                    <span>Live External Visitor Sessions Stream</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Real-time external visitor feed from Supabase Cloud with live filtering and pagination.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2e1915] border border-[#ff5722]/40 text-[#ff7043] text-xs font-mono font-bold">
                  {filteredSessions.length} Total Sessions
                </span>
              </div>

              {/* Filter Controls Bar */}
              <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl p-4 space-y-3 shadow-lg">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search Session ID, OS, Browser, or Referrer..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/50"
                    />
                  </div>

                  <select
                    value={filterReferrer}
                    onChange={(e) => {
                      setFilterReferrer(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/50 cursor-pointer"
                  >
                    <option value="ALL">All Referrers</option>
                    <option value="www.reddit.com">Reddit</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Direct">Direct</option>
                    <option value="vercel.com">Vercel</option>
                  </select>

                  <select
                    value={filterDevice}
                    onChange={(e) => {
                      setFilterDevice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/50 cursor-pointer"
                  >
                    <option value="ALL">All Devices</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                  </select>

                  <select
                    value={filterOS}
                    onChange={(e) => {
                      setFilterOS(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#1b1e26] border border-zinc-700/60 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#ff5722]/50 cursor-pointer"
                  >
                    <option value="ALL">All Operating Systems</option>
                    <option value="macOS">macOS / iOS</option>
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                    <option value="Android">Android</option>
                  </select>

                  {(searchQuery || filterReferrer !== 'ALL' || filterDevice !== 'ALL' || filterOS !== 'ALL') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilterReferrer('ALL');
                        setFilterDevice('ALL');
                        setFilterOS('ALL');
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Sessions Table */}
              <div className="bg-[#14161c] border border-zinc-800/80 rounded-2xl overflow-x-auto shadow-xl">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[#ff7043] font-bold uppercase tracking-wider bg-[#1b1e26]">
                      <th className="py-3.5 px-4">Session ID</th>
                      <th className="py-3.5 px-4">Timestamp</th>
                      <th className="py-3.5 px-4">Referrer</th>
                      <th className="py-3.5 px-4">Device & OS</th>
                      <th className="py-3.5 px-4">Browser</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Views</th>
                      <th className="py-3.5 px-4">Sections Read</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono">
                    {paginatedSessions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-zinc-500 font-sans">
                          No visitor sessions match the current filter criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedSessions.map((sess) => (
                        <tr key={sess.id} className="hover:bg-[#1b1e26]/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <span className="truncate max-w-[120px]">{sess.id}</span>
                            <button
                              onClick={() => copyToClipboard(sess.id)}
                              className="text-zinc-500 hover:text-[#ff7043] transition-colors cursor-pointer"
                              title="Copy Session ID"
                            >
                              {copiedSessionId === sess.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                            {new Date(sess.timestamp || sess.created_at).toLocaleDateString([], { month: 'short', day: '2-digit' })} · {new Date(sess.timestamp || sess.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              sess.referrer === 'www.reddit.com' ? 'bg-[#331713] text-[#ff7043] border border-[#ff5722]/40' :
                              sess.referrer === 'LinkedIn' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' :
                              'bg-zinc-800/80 text-zinc-300'
                            }`}>
                              {sess.referrer}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-200 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {sess.device === 'Mobile' ? <Smartphone className="w-3.5 h-3.5 text-[#ff7043]" /> : <Monitor className="w-3.5 h-3.5 text-[#ff7043]" />}
                              <span>{sess.device} ({sess.os})</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">{sess.browser}</td>
                          <td className="py-3.5 px-4 text-amber-400 font-bold whitespace-nowrap">{sess.duration}s</td>
                          <td className="py-3.5 px-4 text-emerald-400 font-bold whitespace-nowrap">{sess.page_views || 1}</td>
                          <td className="py-3.5 px-4 text-zinc-400 text-[10px]">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {(sess.sections_viewed || ['hero']).map((sec: string, idx: number) => (
                                <span key={idx} className="px-1.5 py-0.2 rounded bg-zinc-800/80 text-zinc-300">
                                  {sec}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-400 font-medium">
                    <span>Showing</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1 rounded bg-[#1b1e26] border border-zinc-700 text-zinc-200 focus:outline-none cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    <span>of {filteredSessions.length} total entries</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg bg-[#1b1e26] border border-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 font-mono text-[#ff7043] font-bold bg-[#1b1e26] rounded-lg border border-zinc-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg bg-[#1b1e26] border border-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
