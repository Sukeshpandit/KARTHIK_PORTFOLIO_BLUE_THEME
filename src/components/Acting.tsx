import { motion } from 'motion/react';
import {
  Clapperboard,
  Play,
  Star,
  Film,
  Tv,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { SectionHeading, Page, Reveal } from './Shared';
import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Acting = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [filter, setFilter] = useState('All');

  const projects = [
    { title: 'The Silent Warrior', role: 'Vikram (Lead Antagonist)', year: '2024', genre: 'Action', platform: 'Theater', img: 'https://picsum.photos/seed/movie-1/600/800' },
    { title: 'Shadow Protocol', role: 'Agent X', year: '2023', genre: 'Thriller', platform: 'Netflix', img: 'https://picsum.photos/seed/movie-2/600/800' },
    { title: 'City of Gold', role: 'Inspector Rathore', year: '2023', genre: 'Crime', platform: 'Prime Video', img: 'https://picsum.photos/seed/movie-3/600/800' },
    { title: 'The Last Stand', role: 'Commander', year: '2022', genre: 'Action', platform: 'Theater', img: 'https://picsum.photos/seed/movie-4/600/800' },
    { title: 'Midnight Chase', role: 'The Driver', year: '2021', genre: 'Action', platform: 'Hotstar', img: 'https://picsum.photos/seed/movie-5/600/800' },
    { title: 'Broken Ties', role: 'Sameer', year: '2021', genre: 'Drama', platform: 'Theater', img: 'https://picsum.photos/seed/movie-6/600/800' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.genre === filter || p.platform === filter);

  return (
    <div className="pt-32 pb-20">
      {/* Hero — video background */}
      <section className="relative min-h-screen flex items-center -mt-32 pt-32 mb-24 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain origin-center"
          style={{ transform: 'rotate(-90deg) scale(1.28)' }}
          aria-hidden
        >
          <source src={`${import.meta.env.BASE_URL}assets/video/hero.mp4`} type="video/mp4" />
        </video>
        {/* Dark overlay on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-dark/5 z-[1]" aria-hidden />


<div className="relative z-10 w-full px-10 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Left — Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <p className="text-primary text-sm font-black uppercase tracking-[0.4em] mb-4">Screen Portfolio</p>
              <h1 className="font-display text-6xl lg:text-8xl leading-none mb-6">
                Actor
              </h1>
              <p className="text-white/50 font-inter text-lg leading-relaxed mb-10 max-w-md">
                Commanding physical presence and a versatile range — established as a formidable talent in the industry, specializing in high-intensity action and complex character roles.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-sm">
                <div className="glass-morphism p-4 rounded-2xl">
                  <p className="text-primary font-display text-3xl mb-1">08</p>
                  <p className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em]">Feature Films</p>
                </div>
                <div className="glass-morphism p-4 rounded-2xl">
                  <p className="text-primary font-display text-3xl mb-1">04</p>
                  <p className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em]">Web Series</p>
                </div>
                <div className="glass-morphism p-4 rounded-2xl">
                  <p className="text-primary font-display text-xl mb-1 italic">KN</p>
                  <p className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em]">Language</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Showreel */}
      <section className="py-48 bg-mesh px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Action Showreel" subtitle="Performance Highlights" />
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 group cursor-pointer shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" 
              alt="Showreel Thumbnail"
              className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary text-dark flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl glow-primary">
                <Play fill="currentColor" size={40} />
              </div>
            </div>
            <div className="absolute bottom-16 left-16">
              <h3 className="text-5xl mb-4 tracking-tight">Acting Reel 2025</h3>
              <p className="text-white/40 text-lg font-inter">Action, Drama & Commercial Highlights • 03:45</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filmography */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionHeading title="Filmography" subtitle="Complete Projects" align="left" />
            <div className="flex gap-2 mb-16">
              {['All', 'Action', 'Thriller', 'Netflix', 'Theater'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, i) => (
              <motion.div 
                key={i}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10"
              >
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{p.year}</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest">{p.platform}</span>
                  </div>
                  <h4 className="text-2xl mb-1">{p.title}</h4>
                  <p className="text-white/50 text-xs font-inter">{p.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
