import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import CodePlayground from '@/components/CodePlayground';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Capabilities from '@/components/Capabilities';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Spotlight from '@/components/Spotlight';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 relative overflow-hidden">
      <AnalyticsTracker />
      <Spotlight />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <CodePlayground />
      <Experience />
      <Projects />
      <Capabilities />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
