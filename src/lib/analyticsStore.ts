import { supabase } from './supabase';

export interface ClickMetric {
  id: string;
  label: string;
  category: 'cta' | 'demo' | 'contact' | 'interactive' | 'social';
  count: number;
  url?: string;
}

export interface LiveLinkClickLog {
  id: string;
  projectName: string;
  url: string;
  timestamp: string;
  visitorLocation: string;
  device: string;
}

export interface VisitorSession {
  sessionId: string;
  timestamp: string;
  device: string;
  browser: string;
  location: string;
  dwellTimeSeconds: number;
  clicksCount: number;
  lastActive: string;
}

export interface LeadInquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalPageviews: number;
  totalTimeSpentSeconds: number;
  clicks: Record<string, ClickMetric>;
  liveLinkLogs: LiveLinkClickLog[];
  sessions: VisitorSession[];
  leads: LeadInquiry[];
  adminPasswordHash?: string;
}

const STORAGE_KEY = 'anbu_portfolio_analytics_live';

const INITIAL_CLICK_METRICS: Record<string, ClickMetric> = {
  cta_lets_talk: { id: 'cta_lets_talk', label: "CTA: Let's Talk", category: 'cta', count: 0 },
  cta_view_work: { id: 'cta_view_work', label: "CTA: View My Work", category: 'cta', count: 0 },
  cta_contact_me: { id: 'cta_contact_me', label: "CTA: Contact Me Hero", category: 'cta', count: 0 },
  
  // SEPARATE INDIVIDUAL LIVE DEMO METRICS
  demo_gym_website: { 
    id: 'demo_gym_website', 
    label: "Live Demo: Fitness & Gym Website", 
    category: 'demo', 
    count: 0,
    url: 'https://gym-website-smoky-xi.vercel.app/'
  },
  demo_acme_crm: { 
    id: 'demo_acme_crm', 
    label: "Live Demo: Acme CRM Platform", 
    category: 'demo', 
    count: 0,
    url: 'https://acme-crm-frontend.vercel.app/'
  },
  demo_rms_dashboard: { 
    id: 'demo_rms_dashboard', 
    label: "Live Demo: RMS Dashboard", 
    category: 'demo', 
    count: 0,
    url: 'https://rms-frontend-jet-zeta.vercel.app/dashboard'
  },

  copy_email: { id: 'copy_email', label: "Contact: Copy Email Action", category: 'contact', count: 0 },
  copy_phone: { id: 'copy_phone', label: "Contact: Copy Phone Action", category: 'contact', count: 0 },
  cli_preset_summary: { id: 'cli_preset_summary', label: "Interactive: CLI Preset (Summary)", category: 'interactive', count: 0 },
  cli_preset_stack: { id: 'cli_preset_stack', label: "Interactive: CLI Preset (Stack)", category: 'interactive', count: 0 },
  system_ping_test: { id: 'system_ping_test', label: "Interactive: System Flow Ping Test", category: 'interactive', count: 0 },
  view_project_specs: { id: 'view_project_specs', label: "Modal: View Project Specs", category: 'demo', count: 0 },
};

const INITIAL_LIVE_LINK_LOGS: LiveLinkClickLog[] = [];
const INITIAL_LEADS: LeadInquiry[] = [];
const INITIAL_SESSIONS: VisitorSession[] = [];

export function getAnalyticsData(): AnalyticsData {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 0,
      totalPageviews: 0,
      totalTimeSpentSeconds: 0,
      clicks: INITIAL_CLICK_METRICS,
      liveLinkLogs: INITIAL_LIVE_LINK_LOGS,
      sessions: INITIAL_SESSIONS,
      leads: INITIAL_LEADS,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialData: AnalyticsData = {
        totalVisitors: 0,
        totalPageviews: 0,
        totalTimeSpentSeconds: 0,
        clicks: INITIAL_CLICK_METRICS,
        liveLinkLogs: INITIAL_LIVE_LINK_LOGS,
        sessions: INITIAL_SESSIONS,
        leads: INITIAL_LEADS,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw) as AnalyticsData;
  } catch (err) {
    console.error('Failed to read analytics from storage', err);
    return {
      totalVisitors: 0,
      totalPageviews: 0,
      totalTimeSpentSeconds: 0,
      clicks: INITIAL_CLICK_METRICS,
      liveLinkLogs: INITIAL_LIVE_LINK_LOGS,
      sessions: INITIAL_SESSIONS,
      leads: INITIAL_LEADS,
    };
  }
}

export function saveAnalyticsData(data: AnalyticsData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save analytics to storage', err);
  }
}

export function trackClick(
  buttonId: string, 
  customLabel?: string, 
  category: 'cta' | 'demo' | 'contact' | 'interactive' | 'social' = 'cta',
  url?: string
): void {
  const data = getAnalyticsData();
  const current = data.clicks[buttonId] || {
    id: buttonId,
    label: customLabel || buttonId,
    category,
    count: 0,
    url
  };

  data.clicks[buttonId] = {
    ...current,
    count: current.count + 1
  };

  // If this is a live demo link click, log individual live link entry
  if (category === 'demo' && url) {
    const newLog: LiveLinkClickLog = {
      id: `log_${Date.now()}`,
      projectName: customLabel || buttonId,
      url,
      timestamp: 'Just now',
      visitorLocation: 'Bengaluru, India',
      device: 'Desktop (Chrome)'
    };
    data.liveLinkLogs = [newLog, ...data.liveLinkLogs.slice(0, 49)];
  }

  if (data.sessions.length > 0) {
    data.sessions[0].clicksCount += 1;
    data.sessions[0].lastActive = 'Just now';
  }

  saveAnalyticsData(data);
}

export function updateTimeSpent(secondsToAdd: number): void {
  const data = getAnalyticsData();
  data.totalTimeSpentSeconds += secondsToAdd;

  if (data.sessions.length > 0) {
    data.sessions[0].dwellTimeSeconds += secondsToAdd;
    data.sessions[0].lastActive = 'Active now';
  }

  saveAnalyticsData(data);
}

export async function logLeadInquiry(lead: Omit<LeadInquiry, 'id' | 'timestamp'>): Promise<void> {
  try {
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          name: lead.name,
          email: lead.email,
          subject: lead.subject || 'Direct Contact Form Submission',
          message: lead.message,
        }
      ]);

    if (error) {
      console.warn('Failed to insert lead into Supabase, falling back to localStorage:', error.message);
      saveToLocalStorageFallback(lead);
    }
  } catch (err) {
    console.error('Error logging lead to Supabase, falling back to localStorage:', err);
    saveToLocalStorageFallback(lead);
  }
}

function saveToLocalStorageFallback(lead: Omit<LeadInquiry, 'id' | 'timestamp'>): void {
  const data = getAnalyticsData();
  const newLead: LeadInquiry = {
    ...lead,
    id: `lead_${Date.now()}`,
    timestamp: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  data.leads = [newLead, ...data.leads];
  saveAnalyticsData(data);
}

export function resetAnalyticsData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
