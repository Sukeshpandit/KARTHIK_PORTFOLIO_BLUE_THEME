import { motion } from 'motion/react';
import { SectionHeading } from './Shared';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook } from 'lucide-react';
import React, { useState } from 'react';

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="pt-48 pb-20 px-6 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Contact & Bookings" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-5xl mb-10 tracking-tight leading-tight">Let's build something <span className="text-primary italic">great</span> together.</h3>
            <p className="text-2xl text-white/50 font-inter mb-16 leading-relaxed">
              Whether you're looking for personal training, interested in a film collaboration, 
              or have a wildlife emergency, I'm here to help. Reach out through any of the channels below.
            </p>

            <div className="space-y-10 mb-16">
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shadow-xl">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] mb-2">Email Address</p>
                  <p className="text-xl font-medium">contact@vikramsingh.pro</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shadow-xl">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] mb-2">Phone Number</p>
                  <p className="text-xl font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shadow-xl">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] mb-2">Gym Location</p>
                  <p className="text-xl font-medium">Marine Drive, Mumbai, MH</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-500 hover:scale-110 shadow-xl">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-morphism p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/5"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-8 shadow-2xl glow-primary">
                  <Send size={48} />
                </div>
                <h3 className="text-4xl mb-6 tracking-tight">Message Sent!</h3>
                <p className="text-xl text-white/50 font-inter mb-10">Thank you for reaching out. Vikram will get back to you shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-primary font-black uppercase tracking-[0.3em] text-[10px] underline underline-offset-8 hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] ml-2">Full Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all duration-300 font-inter text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] ml-2">Email Address</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all duration-300 font-inter text-sm" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] ml-2">Inquiry Type</label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all duration-300 appearance-none font-inter text-sm cursor-pointer">
                      <option className="bg-dark">Personal Training</option>
                      <option className="bg-dark">Acting / Film Project</option>
                      <option className="bg-dark">Wildlife Rescue</option>
                      <option className="bg-dark">General Inquiry</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      <Send size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.4em] ml-2">Your Message</label>
                  <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all duration-300 font-inter text-sm resize-none" placeholder="Tell me more about your requirements..."></textarea>
                </div>
                <button 
                  disabled={formState === 'submitting'}
                  className="w-full bg-primary text-dark font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl glow-primary active:scale-95"
                >
                  {formState === 'submitting' ? 'Sending...' : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
