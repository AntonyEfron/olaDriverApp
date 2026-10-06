import { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSignupClick?: () => void;
}

const Navbar = ({ onSignupClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    // 1. Handle background blur on scroll
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });

    // 2. Handle active link highlighting with IntersectionObserver
    const sections = ['home', 'about', 'features', 'pricing', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle 20% of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Fleet' },
    { href: '#about', label: 'Categories' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 py-3 sm:py-4 px-3 sm:px-6 md:px-12`}
    >
      <div className={`mx-auto flex justify-between items-center transition-all duration-500 w-full ${
        scrolled ? 'bg-black/75 backdrop-blur-md rounded-2xl py-2.5 px-4 sm:px-6 border border-white/10' : 'py-2 px-2'
      }`}>
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:rotate-12">
             <div className="w-full h-full rounded-full border-2 border-black" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">
            OLA
          </span>
        </a>

        {/* Desktop Menu - Pill Style */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm border border-white/5 rounded-full px-2 py-1.5 ml-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeLink === link.href
                  ? 'bg-lime text-black shadow-[0_0_20px_rgba(210,238,0,0.3)] font-bold' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onSignupClick}
            className="group flex items-center gap-2 bg-lime hover:bg-lime-light text-black px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(210,238,0,0.25)] cursor-pointer"
          >
            <span>Book Now</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-bold text-white hover:text-lime transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-6 w-full max-w-xs px-6">
            <button
               onClick={() => { onSignupClick?.(); setIsMenuOpen(false); }}
               className="w-full py-3.5 rounded-xl bg-lime text-black font-black uppercase tracking-wider text-xs shadow-lg cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 text-white"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
