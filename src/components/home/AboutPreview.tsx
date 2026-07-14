import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../ui/Section';
import { LazyImage } from '../ui/LazyImage';
import { fadeIn } from '../../lib/animations';

export function AboutPreview() {
  return (
    <Section bgClassName="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Forward-Thinking Finishing Solutions
          </h3>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            MO'sCON Engineering & Trading is a forward-thinking company specializing in delivering advanced construction finishing solutions. Though newly established, we are driven by a strong commitment to quality, precision, and innovation across every project we handle.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            We serve clients seeking modern, durable, and performance-based finishing systems for commercial, institutional, and industrial buildings in collaboration with manufacturers abroad.
          </p>
          <Link 
            to="/about"
            className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-secondary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Learn More About Our Vision
          </Link>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
        >
          <LazyImage 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80" 
            alt="Modern architecture detail" 
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
            width={600}
            height={800}
          />
        </motion.div>
      </div>
    </Section>
  );
}
