import { motion } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Check, 
  ArrowRight, 
  Users, 
  Award, 
  Star,
  Zap,
  Target,
  Calendar
} from 'lucide-react';
import { SectionHeading, Page, Reveal } from './Shared';

export const Fitness = ({ setPage }: { setPage: (p: Page) => void }) => {
  const monthlyPlans = [
    {
      duration: '1 Month',
      months: 1,
      price: '₹3,000',
      perMonth: '₹3,000',
      savings: null,
      badge: null,
      features: ['Full Gym Access', 'Group Classes', 'Locker Room', 'Basic Nutrition Tips'],
    },
    {
      duration: '3 Months',
      months: 3,
      price: '₹7,500',
      perMonth: '₹2,500',
      savings: 'Save ₹1,500',
      badge: 'Popular',
      features: ['Full Gym Access', 'Group Classes', 'Locker Room', 'Nutrition Consultation', 'Progress Tracking', '1 Free PT Session'],
    },
    {
      duration: '6 Months',
      months: 6,
      price: '₹12,000',
      perMonth: '₹2,000',
      savings: 'Save ₹6,000',
      badge: 'Best Value',
      features: ['Full Gym Access', 'Group Classes', 'Locker Room', 'Monthly Nutrition Review', 'Progress Tracking', '3 Free PT Sessions', 'Steam Room Access', 'Priority Booking'],
    },
  ];

  const packages = [
    {
      name: 'Personal Training',
      price: '₹15,000',
      period: 'month',
      features: ['1-on-1 Sessions', 'Custom Workout Plan', 'Nutrition Guidance', 'Weekly Progress Check', '24/7 Support'],
      popular: true
    },
    {
      name: 'Online Coaching',
      price: '₹8,000',
      period: 'month',
      features: ['Remote Training App', 'Video Consultations', 'Meal Plans', 'Form Correction', 'Monthly Review'],
      popular: false
    },
    {
      name: 'Competition Prep',
      price: '₹25,000',
      period: 'package',
      features: ['Stage Posing Coaching', 'Peak Week Protocol', 'Supplement Strategy', 'Daily Check-ins', 'Mental Prep'],
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 mb-48">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Reveal width="100%">
              <SectionHeading title="Elite Training" subtitle="Fitness Philosophy" align="left" />
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-2xl text-white/50 font-inter mb-12 leading-relaxed">
                Bodybuilding isn't just about lifting weights; it's about sculpting the mind and body 
                to achieve peak human performance. My training methodology combines old-school intensity 
                with modern sports science.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              <div className="flex items-start gap-6 glass-morphism p-6 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2">National Champion</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold">Gold Medalist 2018-2021</p>
                </div>
              </div>
              <div className="flex items-start gap-6 glass-morphism p-6 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Star size={28} />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2">Elite Certified</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold">ISSA & ACE Professional</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setPage('contact')}
              className="bg-primary text-dark px-12 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:scale-105 transition-all active:scale-95 glow-primary"
            >
              Start Your Transformation
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl skew-10">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" 
                alt="Vikram Training"
                className="w-full h-full object-cover -skew-10 scale-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 glass-morphism p-10 rounded-3xl hidden md:block shadow-2xl">
              <p className="text-7xl font-display text-primary mb-2">100%</p>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">Success Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gym Location */}
      <section className="py-32 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="The Pro Gym" subtitle="Our Facility" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[400px] border border-white/10">
              {/* Mock Google Map */}
              <div className="w-full h-full bg-dark/50 flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=2070&auto=format&fit=crop" 
                  alt="Gym Interior"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-4" />
                  <p className="text-xl font-display">Elite Pro Gym, Mumbai</p>
                  <p className="text-white/50 text-sm">Sector 42, Marine Drive, Mumbai, MH</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div className="glass-card p-6">
                <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Operating Hours</h4>
                <ul className="text-sm text-white/60 flex flex-col gap-2">
                  <li className="flex justify-between"><span>Mon - Sat</span> <span>05:00 - 22:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span>08:00 - 12:00</span></li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Facilities</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Cardio Zone', 'Heavy Weights', 'Steam Room', 'Locker Room', 'Protein Bar', 'Parking'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-white/60">
                      <Check size={12} className="text-primary" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Training Packages" subtitle="Choose Your Path" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {packages.map((pkg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -20 }}
                  className={`glass-morphism p-12 flex flex-col relative rounded-[3rem] transition-all duration-500 ${pkg.popular ? 'border-primary/30 ring-1 ring-primary/10 bg-primary/5' : ''}`}
                >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] shadow-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl mb-3 tracking-tight">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-5xl font-display text-primary">{pkg.price}</span>
                  <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.3em]">/ {pkg.period}</span>
                </div>
                <ul className="flex flex-col gap-5 mb-12 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-sm text-white/50 font-inter">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check size={12} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${pkg.popular ? 'bg-primary text-dark hover:bg-white glow-primary' : 'glass-morphism hover:bg-white hover:text-dark'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Membership */}
      <section className="py-48 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Monthly Memberships" subtitle="Gym Access Plans" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {monthlyPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -16 }}
                className={`glass-morphism p-12 flex flex-col relative rounded-[3rem] transition-all duration-500 ${plan.badge === 'Popular' ? 'border-primary/30 ring-1 ring-primary/10 bg-primary/5' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] shadow-xl whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-2xl tracking-tight font-bold">{plan.duration}</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-display text-primary">{plan.price}</span>
                  <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.3em]">total</span>
                </div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{plan.perMonth} / month</p>
                {plan.savings && (
                  <span className="inline-block self-start bg-primary/15 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-8">
                    {plan.savings}
                  </span>
                )}
                {!plan.savings && <div className="mb-8" />}
                <ul className="flex flex-col gap-5 mb-12 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-sm text-white/50 font-inter">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check size={12} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPage('contact')}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${plan.badge === 'Popular' ? 'bg-primary text-dark hover:bg-white glow-primary' : 'glass-morphism hover:bg-white hover:text-dark'}`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations */}
      <section className="py-32 bg-surface px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Transformations" subtitle="Real Results" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map(i => (
              <div key={i} className="group relative rounded-3xl overflow-hidden border border-white/10">
                <div className="flex">
                  <div className="w-1/2 relative">
                    <img src={`https://picsum.photos/seed/before-${i}/600/800`} alt="Before" className="w-full aspect-[3/4] object-cover grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-dark/80 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Before</div>
                  </div>
                  <div className="w-1/2 relative">
                    <img src={`https://picsum.photos/seed/after-${i}/600/800`} alt="After" className="w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-primary text-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">After</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark to-transparent">
                  <h4 className="text-xl mb-1">Rohan Sharma</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest">12 Weeks Transformation • -15kg Fat Loss</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
