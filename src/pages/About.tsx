import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { fadeIn, staggerContainer } from '../lib/animations';
import { SEO } from '../components/SEO';

export default function About() {
  return (
    <div className="w-full">
      <SEO 
        title="About MO'SCON | Engineering & Trading Company in Ethiopia"
        description="Learn about MO'SCON Engineering & Trading PLC, a specialized engineering company delivering innovative construction finishing and infrastructure solutions in Ethiopia."
        canonicalUrl="https://moscon.et/about"
      />
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
                 MO'sCON Engineering & Trading PLC is a specialized engineering and trading company providing innovative construction finishing and infrastructure solutions for commercial, institutional, industrial, educational, and sports facilities. We deliver premium products and integrated systems that enhance the functionality, durability, safety, and aesthetics of modern buildings.
                </p>
                <p>
                 Our portfolio includes public seating systems, sports infrastructure, raised access flooring, acoustic solutions, data center infrastructure, and other specialized construction finishing products. Through partnerships with internationally recognized manufacturers and leading global suppliers, we provide solutions that meet the highest international standards of quality, performance, and reliability.
                </p>
                <p>
                  Backed by a team of experienced professionals with strong technical expertise, we collaborate closely with architects, consultants, contractors, government institutions, and private developers to deliver customized solutions that meet the unique demands of every project.
                </p>
                <p>
                 At MO'sCON, we believe that every project deserves precision, reliability, and excellence. From consultation and product selection to supply and technical support, we are committed to delivering dependable solutions on time and to the highest standards—ensuring long-term value and complete customer satisfaction.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To be a leading engineering and trading company recognized for delivering innovative, reliable, and sustainable construction finishing and infrastructure solutions that shape modern spaces and exceed client expectations.
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To provide high-quality construction finishing and infrastructure solutions through technical excellence, trusted global partnerships, and exceptional customer service. We are committed to delivering innovative products, reliable support, and value-driven solutions that contribute to the success of every project.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
