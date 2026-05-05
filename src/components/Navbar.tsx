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
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
        isScrolled || mobileMenuOpen 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-zinc-200/50' 
          : 'bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-3 md:py-6'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12 md:h-auto">
        <a href="/#home" className="flex flex-col group">
          <span className="text-[10px] md:text-xs font-black tracking-tighter uppercase text-zinc-900 leading-none group-hover:text-primary transition-colors">
            Nazzareno Boldrini
          </span>
          <span className="text-[7px] md:text-[9px] font-medium tracking-widest uppercase text-zinc-400 mt-1">
            Nutrizionista <span className="hidden xs:inline sm:inline">a Brescia</span>
          </span>
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

        <div className="flex items-center md:hidden">
          <button
            className="text-zinc-900 p-2 -mr-2 focus:outline-none bg-zinc-100/50 rounded-lg active:scale-95 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
