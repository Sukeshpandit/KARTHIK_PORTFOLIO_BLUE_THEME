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
      {/* Hero */}
      <section className="px-6 mb-48">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5 relative group skew-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Vikram Headshot"
                className="w-full h-full object-cover -skew-10 scale-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-10">
                <button className="w-full bg-white text-dark py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-2xl">
                  <Download size={18} /> Download Headshots
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <Reveal width="100%">
              <SectionHeading title="The Actor" subtitle="Screen Portfolio" align="left" />
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-2xl text-white/50 font-inter mb-12 leading-relaxed">
                With a commanding physical presence and a versatile range, Vikram has established 
                himself as a formidable talent in the industry. Specializing in high-intensity 
                action and complex character roles.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
              <div className="glass-morphism p-8 rounded-3xl">
                <p className="text-primary font-display text-5xl mb-2">08</p>
                <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.3em]">Feature Films</p>
              </div>
              <div className="glass-morphism p-8 rounded-3xl">
                <p className="text-primary font-display text-5xl mb-2">04</p>
                <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.3em]">Web Series</p>
              </div>
              <div className="glass-morphism p-8 rounded-3xl">
                <p className="text-primary font-display text-5xl mb-2 italic">Hindi</p>
                <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.3em]">Primary Language</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Action', 'Stunts', 'Martial Arts', 'Dialogue Delivery', 'Method Acting'].map(skill => (
                <span key={skill} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary hover:border-primary/50 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
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
