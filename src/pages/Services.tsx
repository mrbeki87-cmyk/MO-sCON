import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { fadeIn, staggerContainer } from '../lib/animations';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Services() {
  useDocumentTitle('Our Services');
  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&fm=webp&w=1920"
            alt="Services background"
            className="w-full h-full object-cover opacity-40"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Expert installation, custom solutions, and dedicated support for every phase of your project.
          </motion.p>
        </div>
      </section>

      <Section bgClassName="bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeIn} className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Consultation</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our technically qualified team offers comprehensive consultation to help you select the exact finishing materials your project requires. We evaluate structural, aesthetic, and functional needs to provide customized solutions.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Precision Installation</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We don't just supply materials; we guarantee they are installed with the highest level of precision. From complex raised floor systems to acoustic partitions, our installation services ensure durability and compliance.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Project Management & Support</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We prioritize efficient communication and on-time delivery. Throughout the project lifecycle, our team provides continuous support, working directly with international brands to source materials without delay.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
