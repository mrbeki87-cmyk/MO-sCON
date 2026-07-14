import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { staggerContainer, fadeIn } from '../../lib/animations';
import { Users, Clock, Globe, Settings, MessageSquare } from 'lucide-react';

const strengths = [
  { icon: Users, title: "Qualified Team", desc: "A dedicated and technically qualified team." },
  { icon: Clock, title: "On-Time Delivery", desc: "Commitment to quality and on-time delivery." },
  { icon: Globe, title: "Top-Tier Suppliers", desc: "Access to top-tier international suppliers and brands." },
  { icon: Settings, title: "Custom Solutions", desc: "Customized solutions based on project needs." },
  { icon: MessageSquare, title: "Efficient Service", desc: "Efficient communication and client service." },
];

export function Strengths() {
  return (
    <Section bgClassName="bg-slate-50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Our Strengths</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Why Partner With Us</h3>
      </div>
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {strengths.map((s, i) => (
          <motion.div key={i} variants={fadeIn} className="h-full">
            <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow bg-white text-center">
              <CardHeader className="items-center pb-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <s.icon size={32} />
                </div>
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
