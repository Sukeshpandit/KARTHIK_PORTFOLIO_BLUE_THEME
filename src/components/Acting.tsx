import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { Play, Star } from 'lucide-react';
import { SectionHeading, Page } from './Shared';
import { useState, useRef, useEffect } from 'react';

/* ── Showreel data ──
   youtubeId : YouTube video ID (e.g. 'dQw4w9WgXcQ')  — takes priority
   videoSrc  : local / CDN path  (e.g. '/assets/video/reel1.mp4')
   thumbnail : poster image shown before play
─────────────────────────────────────────────────── */
const reels = [
  {
    title: 'Acting Reel 2025',
    subtitle: 'Action, Drama & Commercial Highlights',
    duration: '03:45',
    label: 'Official Reel',
    youtubeId: '',   // ← paste YouTube video ID here
    videoSrc:  '',   // ← or local video path
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  },
  {
    title: 'Action Showcase',
    subtitle: 'High-Intensity Fight & Stunt Sequences',
    duration: '02:10',
    label: 'Action Cut',
    youtubeId: '',
    videoSrc:  '',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
  },
  {
    title: 'Drama Highlights',
    subtitle: 'Character Depth & Emotional Range',
    duration: '04:20',
    label: 'Drama Cut',
    youtubeId: '',
    videoSrc:  '',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop',
  },
];

/* ── Single card — lives inside overflow-hidden sticky container ── */
const ReelCard = ({
  reel,
  index,
  total,
  progress,
}: {
  reel: (typeof reels)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const [playing, setPlaying] = useState(false);

  const N   = total;
  const seg = 1 / N;

  const enterA = Math.max(0,    index * seg - seg * 0.22);
  const enterB = Math.min(1,    index * seg + seg * 0.12);
  const exitA  = Math.max(0,    (index + 1) * seg - seg * 0.22);
  const exitB  = Math.min(0.99, (index + 1) * seg + seg * 0.12);

  const peekPct = index === 0 ? 0 : 78 + (index - 1) * 6;

  const yInput  = index === 0 ? [0, 1] : [0, enterA, enterB, 1];
  const yOutput = index === 0 ? ['0%', '0%'] : [`${peekPct}%`, `${peekPct}%`, '0%', '0%'];

  const scaleInput  = index === N - 1 ? [0, 1] : [0, exitA, exitB, 1];
  const scaleOutput = index === N - 1 ? [1, 1] : [1, 1, 0.88, 0.88];

  const opInput  = index === N - 1 ? [0, 1] : [0, exitA, exitB, 1];
  const opOutput = index === N - 1 ? [1, 1] : [1, 1, 0.55, 0.55];

  const y       = useTransform(progress, yInput,  yOutput);
  const scale   = useTransform(progress, scaleInput, scaleOutput);
  const opacity = useTransform(progress, opInput,  opOutput);

  const blurAmount = useTransform(scale, [1, 0.88], [0, 6]);
  const filter     = useTransform(blurAmount, (v: number) => `blur(${v}px)`);

  // YouTube embed URL (autoplay + no related videos)
  const embedSrc = reel.youtubeId
    ? `https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, zIndex: index + 1, y, scale, opacity, filter }}
      className="flex items-center justify-center px-6 bg-dark"
    >
      <motion.div
        whileHover={playing ? {} : { scale: 1.012 }}
        onClick={() => !playing && setPlaying(true)}
        className="relative w-full max-w-[62rem] aspect-video rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          boxShadow: playing
            ? '0 0 0 1px rgba(201,168,76,0.5), 0 24px 80px rgba(0,0,0,0.8)'
            : '0 0 60px 0 rgba(201,168,76,0.10), 0 24px 60px rgba(0,0,0,0.7)',
          border: playing ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(201,168,76,0.15)',
          transition: 'box-shadow 0.4s, border-color 0.4s',
        }}
      >

        {/* ── PLAYING STATE ── */}
        {playing && (
          <>
            {embedSrc ? (
              <iframe
                src={embedSrc}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : reel.videoSrc ? (
              <video
                src={reel.videoSrc}
                autoPlay
                controls
                className="absolute inset-0 w-full h-full object-cover bg-black"
              />
            ) : (
              /* No source yet — friendly placeholder */
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 gap-4">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
                  <Play size={22} className="text-primary/50 ml-1" fill="currentColor" />
                </div>
                <p className="text-white/35 text-sm font-inter tracking-wide">Video coming soon</p>
                <p className="text-white/20 text-[10px] font-inter">Set <code className="text-primary/40">youtubeId</code> or <code className="text-primary/40">videoSrc</code> in the reels array</p>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(false); }}
              className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-dark/80 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark/95 transition-all text-sm"
            >
              ✕
            </button>
          </>
        )}

        {/* ── THUMBNAIL STATE ── */}
        {!playing && (
          <>
            {/* Poster image */}
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark/75 to-transparent" />
            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-dark via-dark/55 to-transparent" />

            {/* Gold scan line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

            {/* Corner accents */}
            {(['top-4 left-4 border-t-2 border-l-2', 'top-4 right-4 border-t-2 border-r-2', 'bottom-4 left-4 border-b-2 border-l-2', 'bottom-4 right-4 border-b-2 border-r-2'] as const).map((cls, ci) => (
              <div key={ci} className={`absolute w-5 h-5 border-primary/40 ${cls} transition-all duration-500 group-hover:w-7 group-hover:h-7 group-hover:border-primary/70`} />
            ))}

            {/* Top row — label badge + duration */}
            <div className="absolute top-5 left-6 right-6 flex justify-between items-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/12 backdrop-blur-sm border border-primary/20">
                <Star size={8} className="text-primary fill-primary" />
                <span className="text-primary text-[9px] font-black uppercase tracking-[0.3em]">{reel.label}</span>
              </div>
              <span className="text-white/45 text-[10px] font-mono tabular-nums bg-dark/50 backdrop-blur-sm px-2 py-0.5 rounded">
                {reel.duration}
              </span>
            </div>

            {/* Watermark card number */}
            <div className="absolute top-4 right-16 select-none pointer-events-none font-display text-[6rem] font-bold leading-none"
              style={{ color: 'rgba(255,255,255,0.04)' }}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.14 }}
                className="relative w-20 h-20 rounded-full bg-primary text-dark flex items-center justify-center"
                style={{ boxShadow: '0 0 50px rgba(201,168,76,0.5), 0 0 100px rgba(201,168,76,0.15)' }}
              >
                <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-20" />
                <Play fill="currentColor" size={26} className="ml-1" />
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-6 left-7 right-7">
              <h3 className="text-2xl font-display mb-1 tracking-tight group-hover:text-primary transition-colors duration-300">
                {reel.title}
              </h3>
              <p className="text-white/40 text-xs font-inter mb-3">{reel.subtitle}</p>
              {/* Animated progress bar (decorative) */}
              <div className="h-[2px] bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary/80 to-primary/30 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Stack scroll container — hijacks wheel until all cards are revealed ── */
const ShowreelStack = () => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const progressMV    = useMotionValue(0);
  const springProgress = useSpring(progressMV, { stiffness: 320, damping: 38, mass: 0.2 });
  const progressRef   = useRef(0);
  const lockedRef     = useRef(false); // stays true once engaged until progress reaches 0 or 1

  useEffect(() => {
    const TOTAL_DELTA = 600;

    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Engage as soon as the section occupies the viewport (top visible, bottom not yet gone)
      const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;

      // Lock on first qualifying wheel event; stay locked until progress hits 0 or 1
      if (!lockedRef.current) {
        if (isVisible && ((e.deltaY > 0 && progressRef.current < 1) || (e.deltaY < 0 && progressRef.current > 0))) {
          lockedRef.current = true;
        } else {
          return;
        }
      }

      const next = Math.max(0, Math.min(1, progressRef.current + e.deltaY / TOTAL_DELTA));

      if ((e.deltaY > 0 && progressRef.current < 1) || (e.deltaY < 0 && progressRef.current > 0)) {
        e.preventDefault();
        progressRef.current = next;
        progressMV.set(next);
      } else {
        // Progress hit boundary — release the lock so page can scroll again
        lockedRef.current = false;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [progressMV]);

  return (
    <div ref={sectionRef} className="h-[70vh] relative overflow-hidden bg-dark" style={{ perspective: '1400px' }}>
      {reels.map((reel, i) => (
        <ReelCard key={i} reel={reel} index={i} total={reels.length} progress={springProgress} />
      ))}
    </div>
  );
};

/* ─────────────── Main Component ─────────────── */
export const Acting = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [filter, setFilter] = useState('All');

  const projects = [
    { title: 'The Silent Warrior', role: 'Vikram (Lead Antagonist)', year: '2024', genre: 'Action', platform: 'Theater', img: 'https://picsum.photos/seed/movie-1/600/800' },
    { title: 'Shadow Protocol',    role: 'Agent X',                  year: '2023', genre: 'Thriller', platform: 'Netflix',   img: 'https://picsum.photos/seed/movie-2/600/800' },
    { title: 'City of Gold',       role: 'Inspector Rathore',        year: '2023', genre: 'Crime',   platform: 'Prime Video',img: 'https://picsum.photos/seed/movie-3/600/800' },
    { title: 'The Last Stand',     role: 'Commander',                year: '2022', genre: 'Action', platform: 'Theater',    img: 'https://picsum.photos/seed/movie-4/600/800' },
    { title: 'Midnight Chase',     role: 'The Driver',               year: '2021', genre: 'Action', platform: 'Hotstar',    img: 'https://picsum.photos/seed/movie-5/600/800' },
    { title: 'Broken Ties',        role: 'Sameer',                   year: '2021', genre: 'Drama',  platform: 'Theater',    img: 'https://picsum.photos/seed/movie-6/600/800' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.genre === filter || p.platform === filter);

  return (
    <div className="pb-20">

      {/* ── Hero — sticky, stays behind as showreel scrolls over ── */}
      <div className="sticky top-0 h-screen z-0">
        <section className="relative h-screen flex flex-col overflow-hidden">

          {/* Dark tint layer */}
          <div className="absolute inset-0 z-10 bg-dark opacity-40 pointer-events-none" />

          {/* Cinema gradient — left to right */}
          <div className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #021523 0%, rgba(2,21,35,0.82) 40%, transparent 100%)' }} />

          {/* Bottom fade */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-dark via-transparent to-transparent pointer-events-none" />

          {/* Actor video — right side, asymmetric */}
          <video
            autoPlay muted loop playsInline
            className="absolute right-0 top-0 h-full w-full sm:w-1/2 object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
            style={{ transform: 'rotate(-90deg) scale(0.9)', right: '55px' }}
            aria-hidden
          >
            <source src={`${import.meta.env.BASE_URL}assets/video/hero.mp4`} type="video/mp4" />
          </video>

          {/* Ambient glow — top left */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none z-0"
            style={{ background: 'rgba(201,168,76,0.05)', filter: 'blur(120px)' }} />
          {/* Ambient glow — bottom right */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full pointer-events-none z-0"
            style={{ background: 'rgba(41,59,75,0.2)', filter: 'blur(120px)' }} />

          {/* Content canvas */}
          <div className="relative z-30 flex-grow flex flex-col justify-between md:justify-center px-8 md:px-20 lg:px-32 pt-20 pb-8 md:pb-0">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl flex flex-col h-full md:h-auto md:space-y-8"
            >
              {/* Main heading — split name with colour accent */}
              <div className="-translate-x-6">
                <h1 className="font-display text-5xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight text-white drop-shadow-2xl">
                  KARTHIK<br />
                  <span className="text-primary">SHEKAR</span><br />
                  ACHARYA
                </h1>
              </div>

              {/* Spacer — pushes stats to bottom on mobile */}
              <div className="flex-1 md:hidden" />

              {/* Bento stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pt-4 md:pt-8 max-w-2xl">
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors group cursor-default">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">Experience</p>
                  <p className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors">08</p>
                  <p className="text-sm text-white/60 font-inter">Feature Films</p>
                </div>
                {/* <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors group cursor-default">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">Digital</p>
                  <p className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors">04</p>
                  <p className="text-sm text-white/60 font-inter">Web Series</p>
                </div> */}
                <div className="col-span-2 md:col-span-1 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors group cursor-default">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">Language</p>
                  <p className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">KANNADA</p>
                  <p className="text-sm text-white/60 font-inter">(Native Speaker)</p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block w-full sm:w-auto px-10 py-5 font-display font-bold uppercase tracking-widest text-lg rounded-xl text-dark"
                  style={{
                    background: 'linear-gradient(to bottom right, #C9A84C, rgba(201,168,76,0.65))',
                    boxShadow: '0 20px 60px rgba(201,168,76,0.4)',
                  }}
                >
                  AVAILABLE FOR CASTING
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
                  className="hidden sm:flex w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-display font-bold uppercase tracking-widest text-lg rounded-xl items-center justify-center gap-3 transition-colors"
                >
                  <Play fill="currentColor" size={20} />
                  WATCH SHOWREEL
                </motion.button>
              </div>
            </motion.div>
          </div>


        </section>
      </div>

      {/* ── Showreel — stacked card scroll ── */}
      <section className="relative z-10" style={{ background: 'linear-gradient(to bottom, transparent 0%, #0a1d2c 6%)' }}>
        <div className="pt-48 pb-4 max-w-7xl mx-auto px-6">
          <SectionHeading title="Action Showreel" subtitle="Performance Highlights" />
        </div>
        <ShowreelStack />
      </section>

      {/* ── Filmography ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionHeading title="Filmography" subtitle="Complete Projects" align="left" />

            <div className="flex flex-wrap gap-2 mb-16">
              {['All', 'Action', 'Thriller', 'Netflix', 'Theater'].map(f => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  whileTap={{ scale: 0.94 }}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filter === f
                      ? 'bg-primary text-dark shadow-lg'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  style={filter === f ? { boxShadow: '0 0 20px rgba(201,168,76,0.4)' } : {}}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  whileHover={{ y: -8 }}
                  className="group relative aspect-[6/5] rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  {/* Gold top-left corner on hover */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:w-10 group-hover:h-10" />

                  {/* Glowing bottom bar on hover */}
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{p.year}</span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[8px] font-bold uppercase tracking-widest border border-white/10">
                        {p.platform}
                      </span>
                    </div>
                    <h4 className="text-2xl mb-1 group-hover:text-primary transition-colors duration-300">{p.title}</h4>
                    <p className="text-white/50 text-xs font-inter">{p.role}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
