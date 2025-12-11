import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AiSearchModal from './AiSearchModal';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Theme State Management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme as 'light' | 'dark';
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigation = [
    { 
      name: 'Services', 
      path: '/services',
      type: 'dropdown',
      width: 'w-[600px]',
      gridCols: 'grid-cols-2',
      children: [
        { name: 'Web Development', path: '/services/web-development', icon: 'code', desc: 'Custom, high-performance websites.' },
        { name: 'SEO Optimization', path: '/services/seo', icon: 'trending_up', desc: 'Rank higher & drive traffic.' },
        { name: 'Paid Advertising', path: '/services/paid-advertising', icon: 'campaign', desc: 'ROI-focused PPC campaigns.' },
        { name: 'Branding', path: '/services/branding', icon: 'palette', desc: 'Build a memorable identity.' },
      ]
    },
    { name: 'Case Studies', path: '/case-studies', type: 'link' },
    { name: 'Pricing', path: '/pricing', type: 'link' },
    { name: 'About Us', path: '/about', type: 'link' },
    { 
      name: 'Resources', 
      path: '/resources',
      type: 'dropdown',
      width: 'w-80',
      gridCols: 'grid-cols-1',
      children: [
        { name: 'Blog', path: '/blog', icon: 'article', desc: 'Latest industry insights.' },
        { name: 'Resource Library', path: '/resources', icon: 'library_books', desc: 'Guides, templates & more.' },
        { name: 'ROI Calculator', path: '/roi-calculator', icon: 'calculate', desc: 'Forecast your growth potential.' },
      ]
    },
    { name: 'Contact', path: '/contact', type: 'link' }
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100">
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link to="/">
                <Logo iconClass="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item, idx) => (
                <div key={idx} className="relative group px-1">
                  {item.type === 'link' ? (
                    <Link 
                      to={item.path} 
                      className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 font-display tracking-wide ${
                        isActive(item.path) 
                          ? 'text-primary bg-primary/10' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="relative">
                      <Link 
                        to={item.path}
                        className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 font-display tracking-wide group-hover:bg-slate-100 dark:group-hover:bg-white/5 ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10'
                            : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white'
                        }`}
                      >
                        {item.name}
                        <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180 opacity-50">expand_more</span>
                      </Link>
                      
                      {/* Mega Menu / Dropdown */}
                      <div className={`absolute left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 ${item.width || 'w-72'}`}>
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 p-3 overflow-hidden ring-1 ring-black/5">
                          <div className={`grid gap-2 ${item.gridCols || 'grid-cols-1'}`}>
                              {item.children?.map((child, childIdx) => (
                                <Link 
                                  key={childIdx} 
                                  to={child.path}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                                >
                                  <div className="mt-1 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">{child.icon}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors font-display">{child.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{child.desc}</div>
                                  </div>
                                </Link>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
               <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
                aria-label="Search"
               >
                 <span className="material-symbols-outlined text-xl">search</span>
               </button>

               <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Dark Mode"
               >
                 <span className="material-symbols-outlined text-xl transition-transform duration-500 rotate-0 dark:-rotate-180">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                 </span>
               </button>

               <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>

               <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors px-2 font-display">
                Login
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 font-display">
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-3">
               <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
               >
                 <span className="material-symbols-outlined text-xl">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                 </span>
               </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Menu"
              >
                <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-[#0f1115] transition-transform duration-300 pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col gap-6 pb-12">
                {/* Mobile Search */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">search</span>
                    <button 
                        onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                        className="w-full text-left bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-500 dark:text-slate-400 text-sm font-sans"
                    >
                        Search site...
                    </button>
                </div>

                <nav className="flex flex-col space-y-1">
                    {navigation.map((item, idx) => (
                        <div key={idx} className="border-b border-slate-100 dark:border-white/5 pb-2 last:border-0">
                            {item.type === 'link' ? (
                                <Link 
                                    to={item.path} 
                                    className={`block py-3 text-lg font-bold font-display ${isActive(item.path) ? 'text-primary' : 'text-slate-800 dark:text-white'}`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <div className="py-2">
                                    <div className={`py-1 text-lg font-bold text-slate-800 dark:text-white mb-2 font-display`}>{item.name}</div>
                                    <div className="pl-4 border-l-2 border-slate-100 dark:border-white/10 space-y-3">
                                        {item.children?.map((child, cIdx) => (
                                            <Link 
                                                key={cIdx} 
                                                to={child.path} 
                                                className="flex items-center gap-3 py-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-sans"
                                            >
                                                <span className="material-symbols-outlined text-lg opacity-70">{child.icon}</span>
                                                <span className="font-medium">{child.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex flex-col gap-4 mt-4">
                    <Link to="/login" className="w-full py-3 text-center font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 font-display">
                        Client Login
                    </Link>
                    <Link to="/contact" className="w-full py-3 text-center font-bold text-white bg-primary rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 font-display">
                        Get a Quote
                    </Link>
                </div>
            </div>
        </div>
      </header>

      {/* Spacer */}
      <div className={`h-20 ${!scrolled && location.pathname !== '/' ? 'mb-6' : ''}`}></div>

      <AiSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-grow">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-slate-50 dark:bg-[#050505] border-t border-slate-200 dark:border-white/5 pt-20 pb-10 font-sans relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "32px 32px"}}></div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 mb-16">
                  
                  {/* Brand & Newsletter Column */}
                  <div className="lg:col-span-4 space-y-8">
                      <Link to="/" className="inline-block">
                        <Logo />
                      </Link>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                          AI-Powered Digital Success. We transform messy marketing data into a predictable revenue engine through advanced strategies and cutting-edge technology.
                      </p>
                      
                      {/* Newsletter */}
                      <div className="bg-white dark:bg-[#111111] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                          <h5 className="font-bold text-slate-900 dark:text-white mb-2 font-display">Subscribe to Insights</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Get the latest AI marketing trends delivered to your inbox.</p>
                          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                              <input 
                                type="email" 
                                placeholder="Enter email address" 
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                              />
                              <button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-3 py-2 flex items-center justify-center transition-colors">
                                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                              </button>
                          </form>
                      </div>
                  </div>

                  {/* Links Columns */}
                  <div className="lg:col-span-2 md:col-span-4 col-span-6">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide">Services</h4>
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                          <li><Link to="/services/web-development" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Web Development</Link></li>
                          <li><Link to="/services/seo" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">SEO Optimization</Link></li>
                          <li><Link to="/services/paid-advertising" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Paid Advertising</Link></li>
                          <li><Link to="/services/branding" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Branding & Identity</Link></li>
                          <li><Link to="/services" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-bold text-primary mt-2">View All Services →</Link></li>
                      </ul>
                  </div>

                  <div className="lg:col-span-2 md:col-span-4 col-span-6">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide">Company</h4>
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                          <li><Link to="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">About Us</Link></li>
                          <li><Link to="/careers" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 flex items-center gap-2">Careers <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded">HIRING</span></Link></li>
                          <li><Link to="/archive" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Our History</Link></li>
                          <li><Link to="/contact" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Contact</Link></li>
                          <li><Link to="/privacy" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Privacy Policy</Link></li>
                          <li><Link to="/terms" className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200">Terms of Service</Link></li>
                      </ul>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 col-span-12">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-6 font-display tracking-wide">Contact & Connect</h4>
                      <div className="space-y-4">
                          <div className="flex items-start gap-4 text-slate-600 dark:text-slate-400 text-sm group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors">
                                   <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                               </div>
                               <span className="mt-1">House 108, Road 10/2, Block D, Niketan,<br/>Gulshan 1, Dhaka, Bangladesh</span>
                          </div>
                           <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors">
                                   <span className="material-symbols-outlined text-primary text-lg">call</span>
                               </div>
                               <a href="tel:+8801580351067" className="hover:text-primary transition-colors font-medium">+880 1580 351067</a>
                          </div>
                           <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm group">
                               <div className="bg-white dark:bg-white/5 p-2 rounded-lg border border-slate-200 dark:border-white/10 group-hover:border-primary/50 transition-colors">
                                   <span className="material-symbols-outlined text-primary text-lg">mail</span>
                               </div>
                               <a href="mailto:sales@marketingwidget.com" className="hover:text-primary transition-colors font-medium">sales@marketingwidget.com</a>
                          </div>
                      </div>

                      {/* Social Icons */}
                      <div className="flex gap-3 pt-8">
                          {/* Facebook */}
                          <a href="https://www.facebook.com/marketingwidget" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-[#111] flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </a>
                          {/* LinkedIn */}
                          <a href="https://www.linkedin.com/company/marketing-widget-bd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-[#111] flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9H12.92v1.636h.049c.496-.94 1.712-1.929 3.55-1.929 3.795 0 4.496 2.497 4.496 5.746v6.002zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                           {/* Instagram */}
                           <a href="https://www.instagram.com/marketing_widget/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-[#111] flex items-center justify-center text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1 group/insta">
                             <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover/insta:fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                           </a>
                           {/* YouTube */}
                           <a href="https://www.youtube.com/@marketingwidget9641" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-[#111] flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                               <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                           </a>
                           {/* Reddit */}
                           <a href="https://www.reddit.com/user/marketingwidget/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white dark:bg-[#111] flex items-center justify-center text-[#FF4500] hover:bg-[#FF4500] hover:text-white transition-all shadow-sm border border-slate-200 dark:border-white/10 hover:-translate-y-1">
                               <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                           </a>
                      </div>
                  </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                      © 2021-{currentYear} <a href="https://marketingwidget.com" className="hover:text-primary transition-colors font-bold">Marketing Widget</a>. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6">
                      <Link to="/contact" className="text-sm font-bold bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                          Start a Project
                      </Link>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default Layout;
