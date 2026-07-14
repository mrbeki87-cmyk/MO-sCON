import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../ui/Section';
import { LazyImage } from '../ui/LazyImage';
import { staggerContainer, fadeIn } from '../../lib/animations';

const products = [
  {
    title: "Access / Raised Floor Systems",
    desc: "Modular flooring for data centers, offices, and critical infrastructure.",
    img: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80"
  },
  {
    title: "Athletic & Sports Flooring",
    desc: "Resilient surfaces for running tracks, gyms, playgrounds, and sports facilities.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80"
  },
  {
    title: "Ceiling & Flooring Systems",
    desc: "Functional and aesthetic ceiling/flooring finishes tailored to project needs.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80"
  },
  {
    title: "Sandwich Panels",
    desc: "Lightweight and thermally insulated panels for wall and roof systems.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
  }
];

export function ProductCategories() {
  return (
    <Section bgClassName="bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">Core Products</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Premium Finishing Systems</h3>
        </div>
        <Link 
          to="/products"
          className="text-primary font-medium hover:text-primary-light transition-colors whitespace-nowrap"
        >
          View All Products &rarr;
        </Link>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {products.map((p, i) => (
          <motion.div key={i} variants={fadeIn} className="group relative overflow-hidden rounded-2xl shadow-md h-80">
            <LazyImage 
              src={p.img} 
              alt={p.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={600}
              height={320}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h4 className="text-2xl font-bold text-white mb-2">{p.title}</h4>
              <p className="text-slate-300 max-w-md line-clamp-2">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
