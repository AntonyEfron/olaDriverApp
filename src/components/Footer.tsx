import { ChevronRight, Facebook, Instagram, Linkedin, Twitter, Sparkles } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  // Exactly matching the ticker items in the screenshot
  const tickerItems = [
    "Vehicle Tracking Software",
    "GPS Fleet Monitoring",
    "Fleet Analytics Platform",
    "Driver Performance Tracking",
    "Multi-Country Fleet Operations",
    "Automated Dispatch Systems",
    "Real-time Route Optimization"
  ];

  // Precisely defined links from the screenshot
  const companyLinks = ['About', 'Careers', 'Press'];
  const productLinks = ['Features', 'Pricing', 'Security', 'Integrations'];
  const resourceLinks = ['Blog', 'Case Studies', 'Documentation', 'Support'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Compliance'];

  const footerSections = [
    { title: 'Company', links: companyLinks },
    { title: 'Product', links: productLinks },
    { title: 'Resources', links: resourceLinks },
    { title: 'Legal', links: legalLinks },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Twitter, label: 'Twitter' }
  ];

  return (
    <footer id="contact" className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Infinite Scrolling Ticker */}
      <div className="bg-[#D2EE00] py-4 relative z-20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tickerItems.map((item, idx) => (
                <div key={idx} className="flex items-center mx-8">
                  <span className="text-black font-black text-sm md:text-base uppercase tracking-wider">{item}</span>
                  <Sparkles className="w-5 h-5 text-black/40 fill-black/20 ml-16" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl 4xl:max-w-9xl 5xl:max-w-[140rem] mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-20 reveal">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-black text-xl mb-8 tracking-tight">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Support' ? '#support' : '#'}
                      className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#D2EE00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                      </div>
                      <span className="text-base md:text-lg font-medium">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar Divider */}
        <div className="h-px w-full bg-white/10 mb-10" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-center md:text-left">
            <p className="text-gray-500 text-sm font-medium">© {year} Ola Cars. All rights reserved.</p>
            <p className="text-gray-600 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:text-[#D2EE00] transition-colors cursor-help">
              CIN: U74140DL2024PTC123456 / GST: 07AAAFO1234A1Z5
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-10 h-10 5xl:w-16 5xl:h-16 rounded-full bg-[#D2EE00] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(210,238,0,0.5)] group"
                title={social.label}
              >
                <social.icon className="w-5 h-5 5xl:w-8 5xl:h-8 text-black transition-transform group-hover:rotate-12" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle decorative background glow */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-[#D2EE00]/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
