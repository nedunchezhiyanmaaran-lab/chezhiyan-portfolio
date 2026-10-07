import { NextResponse } from 'next/server';
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:uCQDroCL1o2aWKEK@db.cmzfnieekeckwkigyoew.supabase.co:5432/postgres';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '14', 10);

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Fetch STRICTLY external visitor sessions
    const sessionsQuery = `
      SELECT id, timestamp, duration, referrer, device, browser, os, country, city, page_views, sections_viewed, project_interactions, created_at
      FROM visitor_sessions
      WHERE referrer != 'localhost'
        AND NOT (referrer = 'vercel.com' AND duration > 1000)
        AND NOT (city = 'Nedun Laptop' AND duration > 500)
      ORDER BY timestamp DESC
    `;
    const sessionsRes = await client.query(sessionsQuery);
    const sessions = sessionsRes.rows;

    // Fetch leads
    let leads: any[] = [];
    try {
      const leadsRes = await client.query('SELECT * FROM portfolio_leads ORDER BY timestamp DESC');
      leads = leadsRes.rows;
    } catch {
      leads = [];
    }

    // 1. Calculate Deduplicated Unique Visitors (Same visitor returning = 1 unique visitor)
    const uniqueVisitorFingerprints = new Set();
    sessions.forEach(s => {
      // Fingerprint by device + OS + browser + referrer signature
      const fingerprint = `${s.device || 'Desktop'}-${s.os || 'Unknown'}-${s.browser || 'Unknown'}-${s.referrer || 'Direct'}`;
      uniqueVisitorFingerprints.add(fingerprint);
    });
    const uniqueVisitorsCount = uniqueVisitorFingerprints.size;
    const totalSessionsCount = sessions.length;

    // 2. Total Pageviews & Dwell Times
    const totalPageviews = sessions.reduce((acc, s) => acc + (s.page_views || 1), 0);
    const totalDurationSeconds = sessions.reduce((acc, s) => acc + (s.duration || 1), 0);
    const avgDwellTimeSeconds = totalSessionsCount > 0 ? Math.round(totalDurationSeconds / totalSessionsCount) : 0;

    // 3. Hourly Distribution (0h to 23h)
    const hourlyDistribution = Array(24).fill(0);
    sessions.forEach(s => {
      const date = new Date(s.timestamp || s.created_at);
      const hour = date.getHours();
      if (hour >= 0 && hour < 24) {
        hourlyDistribution[hour] += 1;
      }
    });

    // 4. Daily Trends (Past N days)
    const dailyMap: Record<string, { date: string; visitors: number; pageviews: number }> = {};
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      dailyMap[key] = { date: key, visitors: 0, pageviews: 0 };
    }

    sessions.forEach(s => {
      const date = new Date(s.timestamp || s.created_at);
      const key = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      if (dailyMap[key]) {
        dailyMap[key].visitors += 1;
        dailyMap[key].pageviews += (s.page_views || 1);
      }
    });
    const dailyTrends = Object.values(dailyMap);

    // 5. Section Attention & Dwell Time
    const sectionStats: Record<string, { name: string; reads: number; totalDwell: number }> = {
      work: { name: '01 · Selected Work & Projects', reads: 0, totalDwell: 0 },
      capabilities: { name: '02 · Engineering Capabilities', reads: 0, totalDwell: 0 },
      hero: { name: 'Hero & Introduction', reads: 0, totalDwell: 0 },
      process: { name: '04 · Development Process', reads: 0, totalDwell: 0 },
      about: { name: 'About & Background', reads: 0, totalDwell: 0 },
      contact: { name: 'Contact & Let’s Talk', reads: 0, totalDwell: 0 }
    };

    sessions.forEach(s => {
      const sections = Array.isArray(s.sections_viewed) ? s.sections_viewed : [];
      const sessionDuration = s.duration || 1;
      sections.forEach((sec: string) => {
        const lower = sec.toLowerCase();
        let key = lower;
        if (lower.includes('work') || lower.includes('project')) key = 'work';
        else if (lower.includes('capab') || lower.includes('skill')) key = 'capabilities';
        else if (lower.includes('hero')) key = 'hero';
        else if (lower.includes('process')) key = 'process';
        else if (lower.includes('about')) key = 'about';
        else if (lower.includes('contact')) key = 'contact';

        if (sectionStats[key]) {
          sectionStats[key].reads += 1;
          sectionStats[key].totalDwell += sessionDuration;
        }
      });
    });

    const sectionAttention = Object.values(sectionStats).map(sec => ({
      name: sec.name,
      reads: sec.reads,
      avgDwellSeconds: sec.reads > 0 ? Math.round(sec.totalDwell / sec.reads) : 0
    }));

    // 6. Project Performance
    const projectStats: Record<string, { id: string; title: string; subtitle: string; views: number; modalViews: number; launches: number }> = {
      'roamora': { id: 'roamora', title: 'Roamora', subtitle: 'Travel Intelligence', views: 0, modalViews: 0, launches: 0 },
      'jameen': { id: 'jameen', title: 'Jameen', subtitle: 'Restaurant Dining & QR', views: 0, modalViews: 0, launches: 0 },
      'acmecrm': { id: 'acmecrm', title: 'AcmeCRM', subtitle: 'Pipeline Architecture', views: 0, modalViews: 0, launches: 0 },
      'gym-website': { id: 'gym-website', title: 'Fitness SaaS', subtitle: 'Gym & Booking Hub', views: 0, modalViews: 0, launches: 0 }
    };

    sessions.forEach(s => {
      const interactions = Array.isArray(s.project_interactions) ? s.project_interactions : [];
      interactions.forEach((inter: any) => {
        const pid = (inter.projectId || '').toLowerCase();
        let targetKey = '';
        if (pid.includes('travel') || pid.includes('roamora')) targetKey = 'roamora';
        else if (pid.includes('restaurant') || pid.includes('jameen')) targetKey = 'jameen';
        else if (pid.includes('crm') || pid.includes('acme')) targetKey = 'acmecrm';
        else if (pid.includes('gym') || pid.includes('fitness')) targetKey = 'gym-website';

        if (targetKey && projectStats[targetKey]) {
          projectStats[targetKey].views += 1;
          if (inter.action === 'view_modal' || inter.action === 'modal') {
            projectStats[targetKey].modalViews += 1;
          }
          if (inter.action === 'launch' || inter.action === 'live_demo') {
            projectStats[targetKey].launches += 1;
          }
        }
      });
    });

    // 7. Breakdown Maps
    const referrers: Record<string, number> = {};
    const osMap: Record<string, number> = {};
    const browserMap: Record<string, number> = {};
    const deviceMap: Record<string, number> = {};

    sessions.forEach(s => {
      const ref = s.referrer || 'Direct';
      referrers[ref] = (referrers[ref] || 0) + 1;

      const os = s.os || 'Unknown';
      osMap[os] = (osMap[os] || 0) + 1;

      const br = s.browser || 'Unknown';
      browserMap[br] = (browserMap[br] || 0) + 1;

      const dev = s.device || 'Desktop';
      deviceMap[dev] = (deviceMap[dev] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      uniqueVisitorsCount,
      totalSessionsCount,
      totalExternalVisitors: uniqueVisitorsCount, // Distinct unique visitors
      totalPageviews,
      avgDwellTimeSeconds,
      leadsCount: leads.length,
      hourlyDistribution,
      dailyTrends,
      sectionAttention,
      projectPerformance: Object.values(projectStats),
      audience: {
        referrers,
        os: osMap,
        browsers: browserMap,
        devices: deviceMap
      },
      sessions,
      leads
    });

  } catch (err: any) {
    console.error('Analytics API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
