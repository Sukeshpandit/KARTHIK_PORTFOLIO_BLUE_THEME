import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Play, 
  ChevronRight,
  ChevronLeft,
  Phone, 
  Info,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { SectionHeading, Page, Reveal } from './Shared';

const base = import.meta.env.BASE_URL;
const wildlifeSlides = [
  { src: `${base}assets/wildlife/rescue-1.jpg`, caption: 'Live Cobra Rescue · Bengaluru' },
  { src: `${base}assets/wildlife/rescue-2.jpg`, caption: 'Python Relocation · Mysuru' },
  { src: `${base}assets/wildlife/rescue-3.jpg`, caption: 'Viper Handling · Mumbai' },
  { src: `${base}assets/wildlife/rescue-4.jpg`, caption: 'Field Operation · Goa' },
];

export const Wildlife = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlide((prev) => (prev + 1) % wildlifeSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > slide ? 1 : -1);
    setSlide(index);
  };

  const prev = () => {
    setDirection(-1);
    setSlide((prev) => (prev - 1 + wildlifeSlides.length) % wildlifeSlides.length);
  };

  const next = () => {
    setDirection(1);
    setSlide((prev) => (prev + 1) % wildlifeSlides.length);
  };

  const species = [
    { name: 'Spectacled Cobra', type: 'Venomous', risk: 'High', img: 'https://picsum.photos/seed/cobra/400/300' },
    { name: 'Russell\'s Viper', type: 'Venomous', risk: 'High', img: 'https://picsum.photos/seed/viper/400/300' },
    { name: 'Indian Rock Python', type: 'Non-Venomous', risk: 'Low', img: 'https://picsum.photos/seed/python/400/300' },
    { name: 'Common Rat Snake', type: 'Non-Venomous', risk: 'Low', img: 'https://picsum.photos/seed/ratsnake/400/300' },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 mb-48">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Reveal width="100%">
              <SectionHeading title="Wildlife Rescue" subtitle="Snake Specialist" align="left" />
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-1xl text-white/50 font-inter mb-12 leading-relaxed">
                Wildlife conservation is more than just a passion; it's a responsibility. 
                In a rapidly urbanizing world, I work to bridge the gap between humans and nature, 
                ensuring that every rescue is safe for both parties.
              </p>
            </Reveal>
            <div className="bg-red-900/40 backdrop-blur-xl border border-red-500/40 p-10 rounded-[2.5rem] mb-16 relative overflow-hidden group shadow-[0_0_40px_rgba(220,38,38,0.15)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-colors" />
              <div className="flex items-center gap-6 mb-6 text-red-400">
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle size={28} />
                </div>
                <h4 className="font-black uppercase tracking-[0.2em] text-sm text-red-300">Emergency Hotline</h4>
              </div>
              <p className="text-red-200/50 text-sm mb-10 leading-relaxed font-inter">Spotted a snake? Do not panic. Keep a safe distance and call immediately. Available 24/7 for emergency rescues.</p>
              <a href="tel:+919876543210" className="inline-flex items-center gap-4 bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-red-400 hover:scale-105 transition-all active:scale-95 shadow-xl shadow-red-900/40">
                <Phone size={20} /> +91 98765 43210
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            {/* Slideshow */}
            <div className="relative h-full min-h-[420px] rounded-3xl overflow-hidden">
              {/* Slides */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={slide}
                  src={wildlifeSlides[slide].src}
                  alt={wildlifeSlides[slide].caption}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Edge blending — bleeds image into page bg */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark/60 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark/60 to-transparent" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-5 left-6 z-20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{wildlifeSlides[slide].caption}</p>
              </div>

              {/* Prev / Next */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-dark/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-dark/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-5 right-6 z-20 flex gap-2 items-center">
                {wildlifeSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === slide ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-display text-primary mb-2">20+</p>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Species Handled</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-display text-primary mb-2">15m</p>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Avg Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-display text-primary mb-2">100%</p>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Safe Release Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-display text-primary mb-2">50+</p>
            <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Workshops Conducted</p>
          </div>
        </div>
      </section>

      {/* Rescue Videos */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Rescue Stories" subtitle="Recent Operations" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="group glass-card overflow-hidden">
                <div className="relative aspect-video">
                  <img src={`https://picsum.photos/seed/rescue-${i}/600/400`} alt="Video" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Mumbai • Feb 2026</p>
                  <h4 className="text-lg mb-4">Cobra Rescue from Residential Kitchen</h4>
                  <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors">
                    Watch Full Rescue <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Species Guide */}
      <section className="py-32 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Species Guide" subtitle="Know Your Neighbors" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {species.map((s, i) => (
              <div key={i} className="glass-card overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl mb-1">{s.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${s.type === 'Venomous' ? 'text-primary' : 'text-green-500'}`}>
                      {s.type}
                    </span>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Risk: {s.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 glass-card p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Info size={32} />
            </div>
            <div>
              <h4 className="text-2xl mb-2">What to do if you see a snake?</h4>
              <p className="text-white/60 font-inter text-sm">
                1. Maintain a distance of at least 10 feet. 2. Do not try to kill or capture it. 
                3. Keep an eye on its movement from a distance. 4. Call a professional rescuer immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
