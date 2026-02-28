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
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Acting', value: 'acting' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/80 backdrop-blur-2xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
      
      <div className="max-w-7xl px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage('home')}>
          <div className="relative">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-display text-dark text-3xl">V</div>
            <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-2xl leading-none tracking-tighter">KARTHIK SHEKAR ACHARYA</h1>
            <p className="text-[10px] font-inter text-primary tracking-[0.4em] font-black uppercase">Elite Athlete • Actor</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.button
              key={item.value}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setPage(item.value)}
              className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:text-primary group ${currentPage === item.value ? 'text-primary' : 'text-white/60'}`}
            >
              <span className="relative z-10">{item.label}</span>
              <motion.span 
                className={`absolute -bottom-2 left-0 h-[1px] bg-primary transition-all duration-300 ${currentPage === item.value ? 'w-full' : 'w-0 group-hover:w-full'}`}
                layoutId="navUnderline"
              />
            </motion.button>
          ))}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => setPage('contact')}
            className="relative px-8 py-3 bg-primary text-dark font-black text-[11px] tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:scale-105 transition-all active:scale-95 glow-primary"
          >
            Book Session
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-dark/95 backdrop-blur-3xl z-[60] flex flex-col items-center justify-center gap-8 p-10"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            {navItems.map((item, i) => (
              <motion.button
                key={item.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setPage(item.value); setIsMobileMenuOpen(false); }}
                className={`text-5xl font-display tracking-widest uppercase ${currentPage === item.value ? 'text-primary' : 'text-white/40'}`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => { setPage('contact'); setIsMobileMenuOpen(false); }}
              className="mt-8 bg-primary text-dark px-12 py-5 rounded-2xl font-black text-sm tracking-widest uppercase"
            >
              Book Session
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-surface pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl mb-4">KARTHIK SHEKAR ACHARYA</h2>
          <p className="text-white/50 font-inter max-w-md mb-8 leading-relaxed">
            National Level Bodybuilder, Professional Actor, and Wildlife Rescuer. 
            Dedicated to pushing human limits and protecting nature's most misunderstood creatures.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all"><Youtube size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all"><Facebook size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3 font-inter text-sm text-white/60">
            <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setPage('fitness')} className="hover:text-white transition-colors">Fitness & Training</button></li>
            <li><button onClick={() => setPage('acting')} className="hover:text-white transition-colors">Acting Portfolio</button></li>
            <li><button onClick={() => setPage('wildlife')} className="hover:text-white transition-colors">Wildlife Rescue</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-6">Contact</h3>
          <ul className="flex flex-col gap-4 font-inter text-sm text-white/60">
            <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> contact@vikramsingh.pro</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> Elite Pro Gym, Mumbai, MH</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-inter uppercase tracking-widest">
        <p>© 2026 KARTHIK SHEKAR ACHARYA. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
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
