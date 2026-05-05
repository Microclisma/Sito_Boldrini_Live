import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { AthleteEdge } from '../components/AthleteEdge';
import { Transformations } from '../components/Transformations';
import { BlogTeaser } from '../components/BlogTeaser';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <AthleteEdge />
        <Transformations />
        <BlogTeaser />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
