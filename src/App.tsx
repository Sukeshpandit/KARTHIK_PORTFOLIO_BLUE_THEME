import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Footer, WhatsAppButton, Page } from './components/Shared';
import { Home } from './components/Home';
import { Fitness } from './components/Fitness';
import { Acting } from './components/Acting';
import { Wildlife } from './components/Wildlife';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home setPage={setPage} />;
      case 'fitness': return <Fitness setPage={setPage} />;
      case 'acting': return <Acting setPage={setPage} />;
      case 'wildlife': return <Wildlife setPage={setPage} />;
      case 'gallery': return <Gallery />;
      case 'contact': return <Contact />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
      <WhatsAppButton />
    </div>
  );
}
