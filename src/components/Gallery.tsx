import { motion } from 'motion/react';
import { SectionHeading, Page } from './Shared';
import { useState } from 'react';

export const Gallery = () => {
  const [filter, setFilter] = useState('All');
  
  const items = [
    { type: 'Fitness', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
    { type: 'Acting', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
    { type: 'Wildlife', img: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1974&auto=format&fit=crop' },
    { type: 'Fitness', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop' },
    { type: 'Acting', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop' },
    { type: 'Wildlife', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop' },
    { type: 'Fitness', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' },
    { type: 'Acting', img: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop' },
    { type: 'Wildlife', img: 'https://images.unsplash.com/photo-1520182205149-1e5e4e7329b4?q=80&w=1923&auto=format&fit=crop' },
  ];

  const filteredItems = filter === 'All' ? items : items.filter(i => i.type === filter);

  return (
    <div className="pt-48 pb-20 px-6 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <SectionHeading title="Visual Journey" subtitle="Media Gallery" align="left" />
          <div className="flex flex-wrap gap-3 mb-24">
            {['All', 'Fitness', 'Acting', 'Wildlife'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${filter === f ? 'bg-primary text-dark shadow-xl glow-primary' : 'glass-morphism text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {filteredItems.map((item, i) => (
            <motion.div 
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className="relative rounded-[2.5rem] overflow-hidden border border-white/5 group cursor-pointer shadow-xl"
            >
              <img 
                src={item.img} 
                alt={item.type} 
                className="w-full object-cover group-hover:scale-110 transition-all duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-primary text-dark px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
                  {item.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
