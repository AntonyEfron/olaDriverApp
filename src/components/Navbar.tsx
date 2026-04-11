import { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
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
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 py-4 px-4 sm:px-6 md:px-12`}
    >
      <div className={`mx-auto flex justify-between items-center transition-all duration-500 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[120rem] ${
        scrolled ? 'bg-black/40 backdrop-blur-md rounded-2xl py-3 px-6' : 'py-2 px-2'
      }`}>
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:rotate-12">
             <div className="w-full h-full rounded-full border-2 border-black" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
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
                  ? 'bg-lime text-black shadow-[0_0_20px_rgba(210,238,0,0.3)]' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={onLoginClick}
            className="text-white text-sm font-semibold hover:text-lime transition-colors"
          >
            Login
          </button>
          
          <button
            onClick={onSignupClick}
            className="group flex items-center gap-2 bg-lime hover:bg-lime-light text-black px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Book Now
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
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
              className="text-3xl font-bold text-white hover:text-lime"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-8 w-full px-12">
            <button
               onClick={() => { onLoginClick?.(); setIsMenuOpen(false); }}
               className="w-full py-4 rounded-xl border border-white/10 text-white font-bold"
            >
              Login
            </button>
            <button
               onClick={() => { onSignupClick?.(); setIsMenuOpen(false); }}
               className="w-full py-4 rounded-xl bg-lime text-black font-bold"
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
