import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { fadeIn, staggerContainer } from '../../lib/animations';
import { ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

const reasons = [
  {
    icon: ShieldCheck,
    title: "Reliable Quality",
    desc: "We source our materials from trusted international manufacturers ensuring durability and compliance with modern standards."
  },
  {
    icon: TrendingUp,
    title: "Innovative Approach",
    desc: "We stay ahead of the curve by offering the latest in construction finishing technologies, from smart access doors to advanced acoustic foams."
  },
  {
    icon: Award,
    title: "Client-Focused",
    desc: "Our mission is built around a customer-first approach, prioritizing your project requirements and timelines above all else."
  }
];

export function WhyChooseUs() {
  return (
    <Section bgClassName="bg-slate-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Building Trust Through Excellence
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            At MO'sCON, we don't just supply materials; we deliver peace of mind. Our vision is to become a trusted name in construction finishing by offering reliable, innovative, and client-focused solutions.
          </p>
          <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg mt-8">
            <LazyImage 
              src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80" 
              alt="Construction site" 
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
              width={800}
              height={600}
            />
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col space-y-10"
        >
          {reasons.map((r, i) => (
            <motion.div key={i} variants={fadeIn} className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                <r.icon size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{r.title}</h4>
                <p className="text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
