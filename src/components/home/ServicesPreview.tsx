import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { LazyImage } from '../ui/LazyImage';
import { fadeIn } from '../../lib/animations';

export function ServicesPreview() {
  return (
    <Section bgClassName="bg-slate-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="order-2 lg:order-1 relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <LazyImage 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80" 
            alt="Engineering planning" 
            className="w-full h-full object-cover opacity-20"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="order-1 lg:order-2"
        >
          <h2 className="text-sm font-bold text-secondary tracking-wider uppercase mb-3">Expert Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Comprehensive Finishing Services
          </h3>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Beyond supplying top-tier materials, we provide comprehensive services tailored to your specific project needs. From initial consultation to final installation, our technically qualified team ensures seamless execution.
          </p>
          <ul className="space-y-6 mb-10">
            {[
              "Professional consultation and material selection.",
              "Precision installation of complex floor, ceiling, and partition systems.",
              "Customized acoustic and thermal insulation solutions.",
              "Collaboration with top international manufacturers to guarantee quality."
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mr-4 mt-1">
                  ✓
                </span>
                <span className="text-slate-300 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
