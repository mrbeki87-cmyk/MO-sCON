import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Building2, HardHat, ShieldCheck, Users, Server, Volume2, Grid, Trophy, Layout, Columns } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { ProductCard } from '../components/ui/ProductCard';
import { LazyImage } from '../components/ui/LazyImage';
import { CardSkeleton } from '../components/ui/Skeleton';
import { staggerContainer, fadeIn, slideUp } from '../lib/animations';
import { supabase } from '../lib/supabase';
import { type Product } from '../types';
import { SEO } from '../components/SEO';

const heroProducts = [
  { id: 'public-seating', title: 'Public Seating', subtitle: 'Premium Comfort', icon: Users, color: 'primary' },
  { id: 'data-center', title: 'Data Center', subtitle: 'Advanced Infrastructure', icon: Server, color: 'secondary' },
  { id: 'acoustic', title: 'Acoustic Solutions', subtitle: 'Sound Control', icon: Volume2, color: 'primary' },
  { id: 'raised-floor', title: 'Raised Access Flooring', subtitle: 'Premium Systems', icon: Grid, color: 'secondary' },
  { id: 'sports', title: 'Sports Infrastructure', subtitle: 'Professional Grade', icon: Trophy, color: 'primary' },
  { id: 'field', title: 'Field Systems', subtitle: 'Durable Surfaces', icon: Layout, color: 'secondary' },
  { id: 'toilet', title: 'Toilet Partition', subtitle: 'Modern Washrooms', icon: Columns, color: 'primary' }
];

const cardSlots = [
  // Slot 0: Top left (always visible)
  { className: "absolute top-4 -left-4 md:top-10 md:-left-12 z-20", delay: 0, yOffset: -10, duration: 4 },
  // Slot 1: Bottom right (always visible)
  { className: "absolute bottom-10 -right-4 md:bottom-20 md:-right-12 z-20", delay: 1, yOffset: 10, duration: 5 },
  // Slot 2: Bottom left (hidden on mobile)
  { className: "absolute -bottom-6 left-4 md:left-12 hidden sm:block z-20", delay: 2, yOffset: -8, duration: 4.5 },
  // Slot 3: Top right (hidden on mobile/tablet, visible on desktop)
  { className: "absolute -top-6 right-4 md:right-12 hidden lg:block z-20", delay: 1.5, yOffset: 8, duration: 4.2 },
  // Slot 4: Middle left (hidden on tablet/mobile, visible on large desktop)
  { className: "absolute top-1/2 -translate-y-1/2 -left-8 md:-left-16 hidden xl:block z-20", delay: 0.5, yOffset: -12, duration: 4.8 },
];

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MO'SCON Engineering & Trading",
      "url": "https://moscon.et/"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MO'SCON Engineering & Trading",
      "url": "https://moscon.et/",
      "logo": "https://moscon.et/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+251 935 199 119",
        "contactType": "customer service",
        "email": "moscon.engineering@gmail.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kirkos Sub-city, W.10, H.No 918/79",
        "addressLocality": "Addis Ababa",
        "addressCountry": "ET"
      }
    }
  ];

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setFeaturedProducts(data as Product[] || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="w-full">
      <SEO 
        title="MO'SCON Engineering & Trading | Engineering Solutions in Ethiopia"
        description="MO'SCON Engineering & Trading provides advanced construction finishing, raised access flooring, sports infrastructure, acoustic solutions, data center infrastructure and public seating solutions in Ethiopia."
        canonicalUrl="https://moscon.et/"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />
        <div className="absolute inset-0 bg-blueprint opacity-20 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-0" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content (50%) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <motion.div variants={fadeIn} className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary-light text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-primary-light mr-2 animate-pulse"></span>
                  MO'sCON Engineering & Trading
                </span>
              </motion.div>
              
              <motion.h1 
                variants={slideUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
              >
                Building the <br className="hidden md:block" />
                Future of <span className="text-primary-light">Ethiopia</span>
              </motion.h1>
              
              <motion.p 
                variants={slideUp}
                className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed"
              >
                We deliver world-class engineering solutions, premium construction materials, and innovative finishing systems for commercial and industrial projects.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  to="/products"
                  className="inline-flex h-14 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-light hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Request Consultation
                </Link>
              </motion.div>
              
              <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[
                  "International Suppliers",
                  "Premium Solutions",
                  "Customer-Focused"
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-slate-300 text-sm font-medium">
                    <CheckCircle2 className="text-primary-light mr-2 flex-shrink-0" size={18} />
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right Image (50%) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 relative mt-12 lg:mt-0"
            >
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&fm=webp&w=1200"
                  alt="Modern Commercial Architecture"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              {cardSlots.map((slot, index) => {
                const product = heroProducts[(startIndex + index) % heroProducts.length];
                const Icon = product.icon;
                
                return (
                  <motion.div
                    key={`slot-${index}`}
                    animate={{ y: [0, slot.yOffset, 0] }}
                    transition={{ repeat: Infinity, duration: slot.duration, ease: "easeInOut", delay: slot.delay }}
                    className={`${slot.className} bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl shadow-xl hover:shadow-primary/20 transition-all duration-300 group overflow-hidden`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${product.color === 'primary' ? 'bg-primary/20 text-primary-light' : 'bg-secondary/20 text-secondary-light'}`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white whitespace-nowrap">{product.title}</div>
                          <div className="text-xs text-slate-300 whitespace-nowrap">{product.subtitle}</div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <Section className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              <Building2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Materials</h3>
            <p className="text-slate-600 leading-relaxed">
              We source and supply only the highest grade construction and finishing materials globally, ensuring unmatched durability and aesthetics.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm">
              <HardHat size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Engineering</h3>
            <p className="text-slate-600 leading-relaxed">
              Our team of seasoned engineers brings decades of combined experience in complex commercial and industrial development projects.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Uncompromising Quality</h3>
            <p className="text-slate-600 leading-relaxed">
              Rigorous quality control processes and adherence to international standards guarantee that every project exceeds expectations.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Featured Products Preview */}
      <Section bgClassName="bg-slate-50 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 max-w-7xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Featured Solutions</h2>
            <p className="text-lg text-slate-600">Discover our range of advanced finishing materials designed for modern architecture.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link 
              to="/products"
              className="group inline-flex items-center text-primary font-semibold hover:text-primary-light transition-colors mt-6 md:mt-0"
            >
              View Full Catalog
              <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        >
          {isLoading ? (
             Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-slate-500">No products available.</div>
          )}
        </motion.div>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Setting the Standard in African Construction</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              At MO'sCON, we don't just supply materials; we provide comprehensive engineering solutions. Our deep understanding of local challenges combined with international expertise allows us to deliver unparalleled results.
            </p>
            <ul className="space-y-4">
              {[
                "End-to-end project management capabilities",
                "Direct partnerships with global manufacturers",
                "Dedicated technical support and installation guidance",
                "Commitment to sustainable and eco-friendly practices"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  variants={fadeIn}
                  className="flex items-center text-slate-700 font-medium"
                >
                  <CheckCircle2 className="text-primary mr-3 flex-shrink-0" size={24} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <LazyImage 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
                alt="Architectural detailing"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <div className="text-4xl font-bold text-primary mb-1">10+</div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
