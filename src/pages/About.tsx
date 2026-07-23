import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { fadeIn, staggerContainer } from '../lib/animations';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle('About Us');
  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&fm=webp&w=1920"
            alt="Corporate building"
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
            About MO'sCON
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Driven by a strong commitment to quality, precision, and innovation across every project we handle.
          </motion.p>
        </div>
      </section>

      <Section bgClassName="bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <div className="prose prose-lg text-slate-600 max-w-none space-y-4">
                <p>
                  MO'sCON Engineering & Trading PLC is a specialized engineering and trading company delivering innovative construction finishing and infrastructure solutions for commercial, institutional, industrial, and sports facilities. We are committed to providing high-quality products and integrated systems that enhance the functionality, durability, and aesthetics of modern buildings
                </p>
                <p>
                  We serve clients seeking modern, durable, and performance-based finishing systems for commercial, institutional, and industrial buildings in collaboration with manufacturers abroad.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our team combines industry knowledge, technical expertise, and a commitment to excellence. We work closely with architects, consultants, contractors, government institutions, and private developers to deliver tailored solutions with precision, reliability, and a strong focus on quality and client satisfaction.
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  At MO'sCON, we understand that every project demands precision, consistency, and timely execution. We are committed to delivering reliable solutions on schedule without compromising quality, ensuring that every product and service consistently meets the highest standards of performance, safety, and client satisfaction.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
