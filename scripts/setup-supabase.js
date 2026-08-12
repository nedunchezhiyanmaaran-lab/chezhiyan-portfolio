const { Client } = require('pg');

const connectionString = 'postgresql://postgres:uCQDroCL1o2aWKEK@db.cmzfnieekeckwkigyoew.supabase.co:5432/postgres';

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();
    console.log('Connected successfully!');

    // 1. Create portfolio_totals table
    console.log('Creating portfolio_totals table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_totals (
        key TEXT PRIMARY KEY,
        value BIGINT NOT NULL DEFAULT 0
      );
    `);

    // Seed default totals if empty
    const totalsRes = await client.query('SELECT COUNT(*) FROM portfolio_totals');
    if (parseInt(totalsRes.rows[0].count, 10) === 0) {
      console.log('Seeding portfolio_totals table...');
      await client.query(`
        INSERT INTO portfolio_totals (key, value) VALUES
        ('total_visitors', 142),
        ('total_pageviews', 389),
        ('total_time_spent_seconds', 66600);
      `);
    }

    // 2. Create portfolio_clicks table
    console.log('Creating portfolio_clicks table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_clicks (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        category TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        url TEXT
      );
    `);

    // Seed default clicks if empty
    const clicksRes = await client.query('SELECT COUNT(*) FROM portfolio_clicks');
    if (parseInt(clicksRes.rows[0].count, 10) === 0) {
      console.log('Seeding portfolio_clicks table...');
      await client.query(`
        INSERT INTO portfolio_clicks (id, label, category, count, url) VALUES
        ('cta_lets_talk', 'CTA: Let''s Talk', 'cta', 48, NULL),
        ('cta_view_work', 'CTA: View My Work', 'cta', 64, NULL),
        ('cta_contact_me', 'CTA: Contact Me Hero', 'cta', 29, NULL),
        ('demo_gym_website', 'Live Demo: Fitness & Gym Website', 'demo', 52, 'https://gym-website-smoky-xi.vercel.app/'),
        ('demo_acme_crm', 'Live Demo: Acme CRM Platform', 'demo', 41, 'https://acme-crm-frontend.vercel.app/'),
        ('demo_rms_dashboard', 'Live Demo: RMS Dashboard', 'demo', 37, 'https://rms-frontend-jet-zeta.vercel.app/dashboard'),
        ('copy_email', 'Contact: Copy Email Action', 'contact', 31, NULL),
        ('copy_phone', 'Contact: Copy Phone Action', 'contact', 19, NULL),
        ('cli_preset_summary', 'Interactive: CLI Preset (Summary)', 'interactive', 26, NULL),
        ('cli_preset_stack', 'Interactive: CLI Preset (Stack)', 'interactive', 22, NULL),
        ('system_ping_test', 'Interactive: System Flow Ping Test', 'interactive', 35, NULL),
        ('view_project_specs', 'Modal: View Project Specs', 'demo', 28, NULL);
      `);
    }

    // 3. Create portfolio_live_link_logs table
    console.log('Creating portfolio_live_link_logs table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_live_link_logs (
        id TEXT PRIMARY KEY,
        project_name TEXT NOT NULL,
        url TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        visitor_location TEXT NOT NULL,
        device TEXT NOT NULL
      );
    `);

    // Seed default live link logs if empty
    const logsRes = await client.query('SELECT COUNT(*) FROM portfolio_live_link_logs');
    if (parseInt(logsRes.rows[0].count, 10) === 0) {
      console.log('Seeding portfolio_live_link_logs table...');
      await client.query(`
        INSERT INTO portfolio_live_link_logs (id, project_name, url, timestamp, visitor_location, device) VALUES
        ('log_01', 'Fitness & Gym Website', 'https://gym-website-smoky-xi.vercel.app/', NOW() - INTERVAL '12 minutes', 'Bengaluru, India', 'Desktop (Chrome)'),
        ('log_02', 'Acme CRM Platform', 'https://acme-crm-frontend.vercel.app/', NOW() - INTERVAL '45 minutes', 'San Francisco, USA', 'Desktop (Safari)'),
        ('log_03', 'RMS Dashboard', 'https://rms-frontend-jet-zeta.vercel.app/dashboard', NOW() - INTERVAL '2 hours', 'London, UK', 'Mobile (iOS)'),
        ('log_04', 'Fitness & Gym Website', 'https://gym-website-smoky-xi.vercel.app/', NOW() - INTERVAL '3 hours', 'Berlin, Germany', 'Desktop (Firefox)');
      `);
    }

    // 4. Create portfolio_sessions table
    console.log('Creating portfolio_sessions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_sessions (
        session_id TEXT PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        device TEXT NOT NULL,
        browser TEXT NOT NULL,
        location TEXT NOT NULL,
        dwell_time_seconds INTEGER NOT NULL DEFAULT 0,
        clicks_count INTEGER NOT NULL DEFAULT 0,
        last_active TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed default sessions if empty
    const sessionsRes = await client.query('SELECT COUNT(*) FROM portfolio_sessions');
    if (parseInt(sessionsRes.rows[0].count, 10) === 0) {
      console.log('Seeding portfolio_sessions table...');
      await client.query(`
        INSERT INTO portfolio_sessions (session_id, timestamp, device, browser, location, dwell_time_seconds, clicks_count, last_active) VALUES
        ('sess_9f81a0', NOW(), 'Desktop', 'Chrome 122 (Windows)', 'Bengaluru, India', 340, 5, NOW()),
        ('sess_84b2c1', NOW() - INTERVAL '14 minutes', 'Desktop', 'Safari 17 (macOS)', 'San Francisco, USA', 520, 8, NOW() - INTERVAL '14 minutes'),
        ('sess_71c3d2', NOW() - INTERVAL '1 hour', 'Mobile', 'Mobile Safari (iOS)', 'London, UK', 280, 4, NOW() - INTERVAL '1 hour');
      `);
    }

    // 5. Create portfolio_leads table
    console.log('Creating portfolio_leads table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed default leads if empty
    const leadsRes = await client.query('SELECT COUNT(*) FROM portfolio_leads');
    if (parseInt(leadsRes.rows[0].count, 10) === 0) {
      console.log('Seeding portfolio_leads table...');
      await client.query(`
        INSERT INTO portfolio_leads (id, name, email, subject, message, timestamp) VALUES
        ('lead_01', 'Sarah Lin', 'sarah.lin@techstart.io', 'Senior Full Stack Lead Position', 'Loved your portfolio architecture and live demos! We are hiring a Full Stack Developer for our SaaS product. Let us set up an interview call.', NOW() - INTERVAL '2 hours'),
        ('lead_02', 'Michael Vance', 'm.vance@growthcorp.com', 'Custom CRM & Dashboard Development', 'Checked your RMS Dashboard live demo. We need a similar custom reporting platform built with Next.js & FastAPI. Are you open for freelance project work?', NOW() - INTERVAL '1 day'),
        ('lead_03', 'David Miller', 'david@nexuslabs.co', 'FastAPI Microservices Consultation', 'Impressive backend endpoints and Supabase RLS integration setup. Would love to discuss API architecture consulting.', NOW() - INTERVAL '3 days');
      `);
    }

    // 6. Setup Row Level Security and Policies on portfolio_leads
    console.log('Setting up Row Level Security and Policies for portfolio_leads...');
    await client.query(`
      ALTER TABLE portfolio_leads ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow anonymous inserts" ON portfolio_leads;
      DROP POLICY IF EXISTS "Allow select access" ON portfolio_leads;
      CREATE POLICY "Allow anonymous inserts" ON portfolio_leads FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow select access" ON portfolio_leads FOR SELECT USING (true);
    `);

    console.log('All database tables successfully created and seeded!');
  } catch (err) {
    console.error('Error setting up Supabase database:', err);
  } finally {
    await client.end();
  }
}

main();
