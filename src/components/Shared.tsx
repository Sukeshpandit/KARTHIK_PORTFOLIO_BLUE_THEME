import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Menu, 
  X, 
  Dumbbell, 
  Clapperboard, 
  ShieldAlert, 
  MessageCircle,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Play,
  Award,
  Users,
  Clock,
  Star
} from 'lucide-react';

// --- Types ---
export type Page = 'home' | 'fitness' | 'acting' | 'wildlife' | 'gallery' | 'contact';

// --- Components ---

export const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNav = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Acting', value: 'acting' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Gallery', value: 'gallery' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-dark/90 backdrop-blur-2xl py-2.5 border-b border-white/5 shadow-2xl' : 'bg-transparent py-5'
      }`}>
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-primary to-primary/40 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14">

          {/* Brand */}
          <motion.button
            className="relative flex items-center gap-3 group flex-shrink-0 mr-auto"
            onClick={() => handleNav('home')}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-display text-dark text-2xl shadow-lg">
                K
              </div>
              <div className="absolute -inset-1 bg-primary/30 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="leading-none text-left">
              <p className="text-[9px] sm:text-[10px] font-black tracking-[0.35em] text-white/40 uppercase">KARTHIK SHEKAR</p>
              <p className="text-xl sm:text-2xl font-display tracking-tight text-white leading-tight">ACHARYA</p>
              <p className="hidden sm:block text-[8px] font-inter text-white/35 tracking-[0.28em] uppercase mt-0.5">BODYBUILDER &nbsp;|&nbsp; ACTOR &nbsp;|&nbsp; WILDLIFE RESCUER</p>
            </div>
          </motion.button>

          {/* Desktop / Tablet nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.button
                key={item.value}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                onClick={() => handleNav(item.value)}
                className={`relative px-3 lg:px-4 py-2 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
                  currentPage === item.value
                    ? 'bg-primary text-dark shadow-md'
                    : 'text-white/55 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Full CTA — desktop only */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.35 }}
              onClick={() => handleNav('contact')}
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-primary text-dark font-black text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-lg glow-primary"
            >
              Book Session
            </motion.button>

            {/* Compact CTA — tablet only */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.35 }}
              onClick={() => handleNav('contact')}
              className="hidden md:inline-flex lg:hidden items-center px-4 py-2 border border-primary/60 text-primary font-black text-[10px] tracking-[0.2em] uppercase rounded-lg hover:bg-primary hover:text-dark transition-all active:scale-95"
            >
              Contact
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition-all"
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-[78vw] max-w-[320px] z-[70] bg-dark border-l border-white/8 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display text-dark text-lg">K</div>
                  <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Navigation</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col p-3 gap-1 overflow-y-auto">
                {[...navItems, { label: 'Contact', value: 'contact' as Page }].map((item, i) => (
                  <motion.button
                    key={item.value}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055 }}
                    onClick={() => handleNav(item.value)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[12px] font-bold tracking-[0.12em] uppercase transition-all ${
                      currentPage === item.value
                        ? 'bg-primary text-dark shadow-md'
                        : 'text-white/55 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={15} className={currentPage === item.value ? 'text-dark/60' : 'text-white/15'} />
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-4 border-t border-white/5">
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  onClick={() => handleNav('contact')}
                  className="w-full py-3.5 bg-primary text-dark font-black text-[12px] tracking-[0.2em] uppercase rounded-xl hover:bg-white transition-all active:scale-95 shadow-lg"
                >
                  Book Session
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  const navLinks: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Fitness & Training', value: 'fitness' },
    { label: 'Acting Portfolio', value: 'acting' },
    { label: 'Wildlife Rescue', value: 'wildlife' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <footer className="bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main row */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between">

          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <div className="mb-7">
              <p className="text-[11px] font-black tracking-[0.45em] text-white/40 uppercase mb-0.5">KARTHIK SHEKAR</p>
              <h2 className="text-6xl sm:text-7xl font-display tracking-tight leading-none text-white">ACHARYA</h2>
              <p className="text-[11px] text-white/35 tracking-[0.28em] uppercase mt-3 font-inter">
                BODYBUILDER &nbsp;|&nbsp; ACTOR &nbsp;|&nbsp; WILDLIFE RESCUER
              </p>
            </div>

            {/* Horizontal nav */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => setPage(link.value)}
                  className="text-[13px] font-inter text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-white/45 font-inter text-sm mb-7">
              <Mail size={15} className="text-white/30 flex-shrink-0" />
              contact@karthikacharya.pro
            </div>

            {/* Social */}
            <div>
              <p className="text-[11px] text-white/30 font-inter mb-3 tracking-wide">Do follow me on social media</p>
              <div className="flex gap-2.5">
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 transition-all"><Instagram size={16} /></a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 transition-all"><Facebook size={16} /></a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 transition-all"><Youtube size={16} /></a>
              </div>
            </div>
          </div>

          {/* Right — image + subscribe */}
          <div className="flex flex-col items-start lg:items-end gap-4 lg:w-72 flex-shrink-0">
            <div className="w-full lg:w-72 h-44 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                alt="Gym"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="https://www.youtube.com/@Ksacharya6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-black text-[11px] tracking-[0.25em] uppercase rounded-xl hover:bg-red-500 hover:scale-105 transition-all active:scale-95 shadow-lg"
            >
              <Youtube size={16} fill="currentColor" />
              Subscribe
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-white/25 font-inter uppercase tracking-widest">
          <p>© 2026 KARTHIK SHEKAR ACHARYA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'Personal Training Inquiry', msg: "Hi Vikram! I'm interested in Personal Training. I'd like to know more about your packages." },
    { label: 'Gym Membership', msg: "Hi! I'm interested in joining your gym. Can you share the location and membership details?" },
    { label: 'Online Coaching', msg: "Hi Vikram! I'm looking for Online Coaching. How can we get started?" },
    { label: 'Acting Portfolio Request', msg: "Hi! We're interested in your acting portfolio for an upcoming project." },
    { label: 'Snake Rescue Emergency', msg: "EMERGENCY: I've spotted a snake at my location. Need immediate assistance!" },
  ];

  const handleWhatsApp = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#25D366]">
                <MessageCircle fill="currentColor" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Chat with Vikram</p>
                <p className="text-white/80 text-[10px] uppercase tracking-wider">Typically replies in 1h</p>
              </div>
            </div>
            <div className="p-2 flex flex-col gap-1">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleWhatsApp(opt.msg)}
                  className="w-full text-left p-3 text-xs font-semibold hover:bg-white/5 rounded-lg transition-colors flex justify-between items-center group"
                >
                  {opt.label}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} fill="currentColor" />}
      </button>
    </div>
  );
};

export const Marquee = ({ items }: { items: string[] }) => (
  <div className="relative flex overflow-x-hidden bg-primary py-6 border-y border-dark/10 skew-10 -rotate-2 scale-105 my-20">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex items-center mx-16">
          <span className="text-dark font-display text-6xl uppercase tracking-widest">{item}</span>
          <Star className="ml-16 text-dark/30" size={24} fill="currentColor" />
        </div>
      ))}
    </div>
  </div>
);

export const Reveal = ({ children, width = "fit-content", delay = 0.25 }: { children: React.ReactNode, width?: "fit-content" | "100%", delay?: number }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, ease: "easeIn", delay }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--color-primary)",
          zIndex: 20,
        }}
      />
    </div>
  );
};

export const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string; subtitle?: string; align?: 'left' | 'center' }) => (
  <div className={`mb-24 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8 justify-center md:justify-start"
      style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}
    >
      <div className="h-[2px] w-16 bg-primary" />
      <p className="text-primary font-black tracking-[0.5em] uppercase text-[11px]">
        {subtitle}
      </p>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-huge"
    >
      {title}
    </motion.h2>
  </div>
);

export const StatCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    className="glass-morphism p-12 flex flex-col items-center text-center group hover:bg-primary/5 transition-all duration-700 rounded-[2.5rem] relative overflow-hidden"
  >
    <div className="absolute -inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
    <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-10">
      <Icon size={48} />
    </div>
    <h3 className="text-6xl font-display mb-4 tracking-tighter relative z-10">{value}</h3>
    <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em] relative z-10">{label}</p>
  </motion.div>
);
