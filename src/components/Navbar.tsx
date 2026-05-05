import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Chi Sono', href: '/#chi-sono' },
  { name: 'Servizi', href: '/#servizi' },
  { name: 'L\'Atleta', href: '/#atleta' },
  { name: 'Prima e Dopo', href: '/#prima-dopo' },
  { name: 'Blog', href: '/#blog' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-zinc-200/50' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="/#home" className={`text-xs font-black tracking-widest uppercase border-b-2 pb-1 ${isScrolled ? 'text-zinc-900 border-zinc-900' : 'text-zinc-900 border-zinc-900'}`}>
          N. Boldrini nutrizionista a Brescia
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-tighter italic text-zinc-900 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contatti"
            className="px-4 py-1.5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-tighter italic rounded-full hover:bg-zinc-800 transition-colors"
          >
            Prenota Consulto
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            className="text-zinc-900 p-2 -mr-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-t border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-tighter italic text-zinc-100 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/#contatti"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-block text-center px-5 py-3 bg-primary text-white text-sm font-bold uppercase tracking-tighter italic rounded-full"
              >
                Prenota Consulto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
