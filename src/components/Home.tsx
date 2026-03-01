import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Clapperboard, 
  ShieldAlert, 
  ArrowRight, 
  Youtube, 
  Instagram,
  Play,
  Award,
  Users,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';
import { SectionHeading, StatCard, Page, Marquee, Reveal } from './Shared';
import { useEffect, useState, useRef } from 'react';

export const Home = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    "National Level Bodybuilder",
    "Professional Actor",
    "Elite Gym Trainer",
    "Wildlife Rescuer"
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-mesh" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 parallax-bg"
            style={{ 
              backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/Tiger_prabrakar.jpg)`,
              filter: 'brightness(0.65)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark z-1" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-black tracking-[0.2rem] uppercase text-[18px] mb-8">
              The Journey of Excellence
            </p>
            <Reveal width="100%">
              <h1 className="text-huge mb-10 skew-10">
                KARTHIK SHEKAR ACHARYA
              </h1>
            </Reveal>
            <div className="h-16 overflow-hidden mb-16">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={taglineIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className="text-3xl md:text-5xl font-display text-white/60 tracking-widest uppercase italic"
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <button 
                onClick={() => setPage('fitness')}
                className="group relative px-12 py-5 bg-primary text-dark font-black rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 glow-primary"
              >
                <span className="relative z-10 uppercase tracking-[0.2em] text-xs">Explore Journey</span>
              </button>
              <button 
                onClick={() => setPage('contact')}
                className="px-12 py-5 border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all uppercase tracking-[0.2em] text-xs backdrop-blur-sm"
              >
                Book a Session
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
        >
          <p className="text-[9px] uppercase font-black tracking-[0.5em]">Scroll</p>
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <Marquee items={['National Bodybuilder', 'Action Actor', 'Elite Trainer', 'Wildlife Rescuer', 'National Champion']} />

      {/* Professional Journey Timeline */}
      {/* <section className="py-48 bg-dark px-6 relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-surface to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading title="The Legacy" subtitle="Professional Journey" />
          
          <div className="relative mt-32">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-primary/50 hidden md:block" />
            
            {[
              { year: '2015', title: 'The Beginning', desc: 'Started professional bodybuilding and won first regional championship.', icon: Award, side: 'left' },
              { year: '2018', title: 'National Glory', desc: 'Secured Gold at the National Bodybuilding Championship. Certified as Elite Trainer.', icon: Dumbbell, side: 'right' },
              { year: '2020', title: 'Silver Screen Debut', desc: 'Cast as a lead antagonist in a major regional action blockbuster.', icon: Clapperboard, side: 'left' },
              { year: '2022', title: 'Wildlife Guardian', desc: 'Completed 500+ successful snake rescues and started awareness programs.', icon: ShieldAlert, side: 'right' },
              { year: '2025', title: 'Elite Pro Gym', desc: 'Launched state-of-the-art training facility in Bengaluru.', icon: Star, side: 'left' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center mb-40 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-surface border border-white/10 items-center justify-center z-10 text-primary shadow-2xl group">
                  <item.icon size={24} className="group-hover:scale-110 transition-transform" />
                  <div className="absolute -inset-2 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className={`w-full md:w-1/2 ${item.side === 'left' ? 'md:pr-32 md:text-right' : 'md:pl-32 md:text-left'}`}>
                  <Reveal width="100%" delay={0.1}>
                    <div className={`inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-display text-xl mb-6 ${item.side === 'left' ? 'md:ml-auto' : ''}`}>
                      {item.year}
                    </div>
                  </Reveal>
                  <Reveal width="100%" delay={0.2}>
                    <h3 className="text-4xl mb-6 tracking-tight">{item.title}</h3>
                  </Reveal>
                  <Reveal width="100%" delay={0.3}>
                    <p className="text-white/40 font-inter text-lg leading-relaxed max-w-lg ml-auto mr-auto md:ml-0 md:mr-0">
                      {item.desc}
                    </p>
                  </Reveal>
                </div>
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-32 bg-mesh px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <StatCard label="Clients Transformed" value="1,200+" icon={Users} />
          <StatCard label="Movies & Projects" value="12+" icon={Clapperboard} />
          <StatCard label="Snakes Rescued" value="850+" icon={ShieldAlert} />
          <StatCard label="Years Experie  nce" value="10+" icon={Clock} />
        </div>
      </section>

      {/* Social Dashboard */}
      <section className="py-32 bg-dark px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <SectionHeading title="Real-Time Impact" subtitle="Social Presence" align="left" />
            <div className="flex gap-3 sm:gap-6 mb-24">
              <div className="glass-morphism px-4 py-3 sm:px-8 sm:py-6 flex items-center gap-3 sm:gap-6 rounded-2xl sm:rounded-3xl flex-1 sm:flex-none">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0">
                  <Youtube size={18} className="sm:hidden" />
                  <Youtube size={28} className="hidden sm:block" />
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-display leading-none">250K+</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mt-0.5">Subscribers</p>
                </div>
              </div>
              <div className="glass-morphism px-4 py-3 sm:px-8 sm:py-6 flex items-center gap-3 sm:gap-6 rounded-2xl sm:rounded-3xl flex-1 sm:flex-none">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-pink-600/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-pink-600 flex-shrink-0">
                  <Instagram size={18} className="sm:hidden" />
                  <Instagram size={28} className="hidden sm:block" />
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-display leading-none">180K+</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mt-0.5">Followers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -15 }}
                className="group relative aspect-video rounded-[2rem] overflow-hidden bg-surface border border-white/5"
              >
                <img 
                  src={`https://picsum.photos/seed/vikram-yt-${i}/800/450`} 
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-20 h-20 rounded-full bg-primary text-dark flex items-center justify-center shadow-2xl glow-primary">
                    <Play fill="currentColor" size={28} />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-[10px] text-primary font-black mb-3 uppercase tracking-[0.3em]">Bodybuilding Tips</p>
                  <h4 className="text-2xl leading-tight tracking-tight">How to build massive shoulders in 4 weeks</h4>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="group text-primary font-black uppercase tracking-[0.4em] text-[11px] flex items-center gap-4 mx-auto hover:text-white transition-all">
              View All Content <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Acting Teaser */}
      <section className="relative pt-64 pb-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/Prabas.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <SectionHeading title="The Screen Presence" subtitle="Acting Portfolio" />
          <p className="text-2xl text-white/50 font-inter mb-20 leading-relaxed max-w-3xl mx-auto">
            From high-octane action sequences to intense character-driven roles, 
            Vikram brings a unique blend of physical prowess and emotional depth to the silver screen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { val: '08', label: 'Feature Films' },
              { val: '04', label: 'Web Series' },
              { val: '15+', label: 'Commercials' },
              { val: '02', label: 'Awards Won' }
            ].map((stat, i) => (
              <div key={i} className="glass-morphism p-8 rounded-3xl">
                <p className="text-5xl font-display text-primary mb-2">{stat.val}</p>
                <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setPage('acting')}
            className="px-16 py-6 bg-white text-dark font-black rounded-2xl hover:bg-primary hover:scale-105 transition-all active:scale-95 uppercase tracking-[0.2em] text-xs shadow-2xl"
          >
            View Full Portfolio
          </button>
        </div>
      </section>

      {/* Wildlife Rescue CTA */}
      <section className="py-32 bg-dark px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 overflow-hidden ">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full -mr-80 -mt-80 blur-[120px]" />
          <div className="w-full lg:w-1/2 relative z-10">
            <SectionHeading title="Wildlife Rescue" subtitle="Snake Specialist" align="left" />
            <p className="text-white/40 font-inter text-lg mb-12 leading-relaxed">
              In the concrete jungle of Bengaluru, wildlife often finds itself in conflict with humans. 
              Vikram has dedicated his life to the safe rescue and relocation of snakes, 
              ensuring both human safety and animal welfare.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => setPage('wildlife')}
                className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-dark hover:scale-105 transition-all active:scale-95 shadow-xl"
              >
                <ShieldAlert size={20} /> Report Emergency
              </button>
              <button 
                onClick={() => setPage('wildlife')}
                className="glass-morphism px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all active:scale-95"
              >
                Rescue Stories
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 group">
              <img 
                src="https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1974&auto=format&fit=crop" 
                alt="Snake Rescue"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="text-primary font-display text-6xl mb-2">850+</p>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Successful Rescues</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
