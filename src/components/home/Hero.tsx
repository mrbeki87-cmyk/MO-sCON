import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../lib/animations';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeIn} className="mb-6">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              MO'sCON Engineering & Trading PLC
            </span>
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
            Advanced Construction <br className="hidden md:block" />
            <span className="text-primary-light">Finishing Solutions</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Delivering excellence in finishing works by combining technical expertise, quality materials, and a customer-first approach.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/products"
              className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-10 text-lg font-medium text-white shadow-sm transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
            >
              Explore Our Products
            </Link>
            <Link 
              to="/contact"
              className="inline-flex h-14 items-center justify-center rounded-md border border-white/20 bg-white/10 px-10 text-lg font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto backdrop-blur-sm"
            >
              Request a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
