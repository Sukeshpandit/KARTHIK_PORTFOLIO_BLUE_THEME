import { motion, useTransform, useMotionValue, useSpring } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { Play, Star, Brain, Dumbbell, Film, ArrowRight } from 'lucide-react';
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

/* ── Acting Bits — horizontal auto-scroll carousel ── */
const ClipCard = ({
  clip,
  onHoverChange,
}: {
  clip: { title: string; label: string; videoSrc: string; thumbnail: string };
  onHoverChange: (h: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    onHoverChange(true);
    if (videoRef.current && clip.videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  };

  const leave = () => {
    setHovered(false);
    onHoverChange(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="relative shrink-0 w-[32rem] aspect-video rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? '0 0 0 1px rgba(201,168,76,0.5), 0 20px 60px rgba(0,0,0,0.7)'
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.35s',
      }}
    >
      {/* Thumbnail */}
      <img
        src={clip.thumbnail}
        alt={clip.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          hovered && clip.videoSrc ? 'opacity-0' : 'opacity-100'
        } ${hovered ? 'scale-105' : 'scale-100'}`}
      />

      {/* Video — only rendered when a source is provided */}
      {clip.videoSrc && (
        <video
          ref={videoRef}
          src={clip.videoSrc}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

      {/* Label badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[9px] font-inter font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary backdrop-blur-sm">
          {clip.label}
        </span>
      </div>

      {/* Idle play icon */}
      {!hovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play size={14} fill="currentColor" className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Bottom title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className={`font-display text-lg tracking-tight transition-colors duration-300 ${hovered ? 'text-primary' : 'text-white'}`}>
          {clip.title}
        </p>
      </div>

      {/* Gold border on hover */}
      <div className={`absolute inset-0 rounded-2xl border pointer-events-none transition-all duration-300 ${hovered ? 'border-primary/40' : 'border-white/8'}`} />
    </div>
  );
};

const ActingBits = () => {
  // ← paste videoSrc paths here when available
  const clips = [
    { title: 'The Silent Warrior', label: 'Action',   videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-1/800/450' },
    { title: 'Shadow Protocol',    label: 'Thriller', videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-2/800/450' },
    { title: 'City of Gold',       label: 'Crime',    videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-3/800/450' },
    { title: 'The Last Stand',     label: 'Action',   videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-4/800/450' },
    { title: 'Midnight Chase',     label: 'Thriller', videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-5/800/450' },
    { title: 'Broken Ties',        label: 'Drama',    videoSrc: '', thumbnail: 'https://picsum.photos/seed/bit-6/800/450' },
  ];

  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);
  const SPEED     = 0.55; // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="pt-8 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-3">
        <h2 className="font-display text-6xl md:text-8xl text-white uppercase tracking-wider">Acting Bits</h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #021523 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #021523 0%, transparent 100%)' }} />

        {/* Scrolling track — duplicated for seamless loop */}
        <div ref={trackRef} className="flex gap-5 w-max pl-6">
          {[...clips, ...clips].map((clip, i) => (
            <ClipCard
              key={i}
              clip={clip}
              onHoverChange={(h) => { pausedRef.current = h; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Press & Reviews ── */
const pressReviews = [
  { publication: 'Variety',           abbr: 'Va', tag: 'Film Review', reviewer: 'Ananya Krishnan',      date: 'Mar 2024', rating: 5, snippet: 'Karthik delivers a commanding performance that anchors the film — a raw, magnetic presence that holds the screen with effortless authority.' },
  { publication: 'Film Companion',    abbr: 'FC', tag: 'Feature',     reviewer: 'Rahul Desai',           date: 'Jan 2024', rating: 5, snippet: 'Every scene he inhabits crackles with tension. His instincts are impeccable — he knows exactly when to hold back and when to unleash.' },
  { publication: 'The Hindu',         abbr: 'TH', tag: 'Review',      reviewer: 'Sudhir Krishnaswamy',  date: 'Nov 2023', rating: 4, snippet: 'A breakthrough performance. Shekar brings a rare emotional intelligence to his role, balancing menace and vulnerability in equal measure.' },
  { publication: 'Filmfare',          abbr: 'Ff', tag: 'Cover Story', reviewer: 'Priya Nair',            date: 'Sep 2023', rating: 5, snippet: 'There is something deeply compelling about the way Karthik occupies the frame — a cinematic gravity that few actors possess.' },
  { publication: 'NDTV',              abbr: 'ND', tag: 'Review',      reviewer: 'Saibal Chatterjee',     date: 'Jun 2023', rating: 4, snippet: 'A performance of remarkable subtlety. He communicates entire worlds through a glance, a pause — the hallmark of a truly gifted actor.' },
  { publication: 'Deccan Herald',     abbr: 'DH', tag: 'Feature',     reviewer: 'Kavitha Rao',           date: 'Apr 2023', rating: 5, snippet: 'Karthik Shekar Acharya is the real discovery of this film — every moment he is on screen, you simply cannot look away.' },
];

const PressReviews = () => {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);
  const SPEED     = 0.4;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    posRef.current = 0;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current - half}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      className="py-12 overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h2 className="font-display text-6xl md:text-8xl text-white uppercase tracking-wider">
          Press <span className="text-primary italic">&</span> Reviews
        </h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #021523 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #021523 0%, transparent 100%)' }} />

        <div ref={trackRef} className="flex gap-5 w-max pl-6 pb-4">
          {[...pressReviews, ...pressReviews].map((r, i) => (
            <div
              key={i}
              className="shrink-0 w-64 md:w-80 p-4 md:p-7 rounded-2xl border border-white/8 flex flex-col gap-2 md:gap-4 relative overflow-hidden group hover:border-primary/30 transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.035)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* Ambient glow */}
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'rgba(201,168,76,0.08)', filter: 'blur(30px)' }} />

              {/* Publication row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-xs text-dark shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, rgba(201,168,76,0.70))' }}
                  >
                    {r.abbr}
                  </div>
                  <span className="font-display text-base text-white uppercase tracking-wider leading-none">{r.publication}</span>
                </div>
                <span className="text-[8px] font-inter uppercase tracking-[0.2em] text-primary/70 border border-primary/20 px-2 py-0.5 rounded-full shrink-0">
                  {r.tag}
                </span>
              </div>

              {/* Star rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={10} className={si < r.rating ? 'text-primary fill-primary' : 'text-white/15'} />
                ))}
              </div>

              {/* Decorative quote mark */}
              <div className="hidden md:block font-display text-6xl text-primary/15 leading-none -mb-5 select-none">"</div>

              {/* Snippet */}
              <p className="text-white/70 text-xs md:text-sm font-inter leading-relaxed italic flex-1">
                {r.snippet}
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-primary/30 via-white/8 to-transparent" />

              {/* Reviewer + date */}
              <div className="flex items-center justify-between">
                <span className="text-white/45 text-xs font-inter">— {r.reviewer}</span>
                <span className="text-white/25 text-[10px] font-mono tabular-nums">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────── Main Component ─────────────── */
export const Acting = ({ setPage }: { setPage: (p: Page) => void }) => {

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

      {/* ── Biography Section ── */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: 'center 15%', transform: 'scale(0.7)', transformOrigin: 'center 15%' }}
            src={`${import.meta.env.BASE_URL}assets/images/Anger.jpg`}
            alt=""
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent hidden md:block" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-24 pb-16">

          {/* Left: bio content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start"
          >
            {/* <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-6 inline-flex items-center gap-2 border border-white/10">
              <span className="text-xs font-inter uppercase tracking-[0.2em] text-primary">The Narrative</span>
            </div> */}

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.85] mb-8 text-white uppercase">
              <span className="text-primary italic">Acting</span> Biography
            </h2>

            <div className="space-y-5 max-w-xl">
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                A presence that commands the frame and a depth that lingers long after the credits roll.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                With over eight years of experience across independent cinema and mainstream productions, Karthik has carved a niche as a transformative performer. His unique value lies in the intersection of raw, visceral intensity and quiet, calculated vulnerability.
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                Whether portraying a weathered antagonist or a complex action lead, Karthik brings an authenticity that anchors every scene — making him a preferred collaborator for directors seeking truth in every frame.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-md font-inter font-bold uppercase tracking-wider text-dark"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, rgba(201,168,76,0.75) 100%)',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
                }}
              >
                Full CV / Credits
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-md border border-white/20 font-inter font-bold uppercase tracking-wider text-white bg-white/5 backdrop-blur-sm transition-all"
              >
                Download Headshots
              </motion.button>
            </div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:flex justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                alt="Karthik Shekar Acharya Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src={`${import.meta.env.BASE_URL}assets/images/Anger.jpg`}
              />
              <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'rgba(201,168,76,0.08)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Acting Bits carousel ── */}
      <ActingBits />

      {/* ── Press & Reviews ── */}
      <PressReviews />

      {/* ── Photo Gallery ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display text-6xl md:text-8xl text-white uppercase tracking-wider">
              The <span className="text-primary italic">Gallery</span>
            </h2>
            <p className="text-white/40 text-sm font-inter uppercase tracking-[0.3em] mt-3">
              Audition Frames &amp; On-Set Captures
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
            {/* Row 1: large left + 2 stacked right */}
            {[
              { src: 'Anger.jpg',              span: 'col-span-1 md:col-span-2 row-span-2' },
              { src: 'heroImage2.png',         span: 'col-span-1 row-span-1' },
              { src: 'heroImage3.png',         span: 'col-span-1 row-span-1' },
              { src: 'Homehero1.JPG',          span: 'col-span-1 md:col-span-2 row-span-1' },
              { src: 'Prabas.jpg',             span: 'col-span-1 row-span-2' },
              { src: 'shared image (1).jpg',   span: 'col-span-1 md:col-span-2 row-span-2' },
              { src: 'shared image (3).jpg',   span: 'col-span-1 row-span-1' },
              { src: 'shared image (4).jpg',   span: 'col-span-1 row-span-1' },
              { src: 'shared image (5).jpg',   span: 'col-span-1 row-span-1' },
              { src: 'shared image (6).jpg',   span: 'col-span-1 md:col-span-2 row-span-1' },
              { src: 'Tiger_prabrakar.jpg',    span: 'col-span-1 row-span-1' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`${item.span} group relative rounded-xl overflow-hidden cursor-pointer`}
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/${item.src}`}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                {/* Dark overlay — lifts on hover */}
                <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/10 transition-colors duration-500" />
                {/* Gold border flash on hover */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/40 transition-colors duration-400 pointer-events-none" />
                {/* Corner accent */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/70 transition-all duration-400 group-hover:w-8 group-hover:h-8" />
                {/* Gold scan line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collaborate CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div
          className="p-12 md:p-20 rounded-3xl border border-white/5 relative overflow-hidden"
          style={{ backgroundColor: '#0a1d2c' }}
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'rgba(201,168,76,0.10)', filter: 'blur(100px)' }} />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'rgba(201,168,76,0.05)', filter: 'blur(100px)' }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase mb-6 leading-tight">
                Collaborate<br />with Karthik
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                For inquiries regarding new projects, theatrical representation, or commercial bookings, reach out directly.
              </p>
            </div>
            <div className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage('contact')}
                className="inline-flex items-center gap-4 px-10 py-6 rounded-md font-inter font-bold uppercase tracking-widest text-dark text-lg"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, rgba(201,168,76,0.80) 100%)',
                  boxShadow: '0 20px 60px rgba(201,168,76,0.3)',
                }}
              >
                <span>Contact Talent Agency</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
