import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../ui/Section';
import { fadeIn } from '../../lib/animations';

export function CTA() {
  return (
    <Section bgClassName="bg-primary text-white">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Elevate Your Project?</h2>
        <p className="text-xl text-primary-light mb-10 max-w-2xl mx-auto">
          Partner with MO'sCON Engineering & Trading for advanced, durable, and aesthetically superior construction finishing solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/contact"
            className="inline-flex h-14 items-center justify-center rounded-md bg-white px-10 text-lg font-medium text-primary shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto"
          >
            Contact Us Today
          </Link>
          <Link 
            to="/products"
            className="inline-flex h-14 items-center justify-center rounded-md border border-white/30 bg-transparent px-10 text-lg font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto"
          >
            View Our Portfolio
          </Link>
        </div>
      </motion.div>
    </Section>
  );
}
