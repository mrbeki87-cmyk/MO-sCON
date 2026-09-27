import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../lib/animations';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { type Product } from '../types';
import { LazyImage } from '../components/ui/LazyImage';
import { SEO } from '../components/SEO';

const getProductSEOMeta = (slug: string, originalTitle: string) => {
  switch (slug) {
    case 'raised-access-flooring':
      return {
        title: "Raised Access Flooring in Ethiopia | MO'SCON Engineering",
        description: "Raised access flooring systems in Ethiopia for data centers, offices, control rooms and mission-critical facilities. Explore MO'SCON's modular flooring solutions."
      };
    case 'sports-infrastructure-solution':
      return {
        title: "Sports Infrastructure Solutions in Ethiopia | MO'SCON",
        description: "Sports infrastructure solutions in Ethiopia including athletic tracks, multi-sport courts, artificial turf and high-performance sports surfaces."
      };
    case 'sports-equipment-field-systems':
      return {
        title: "Sports Equipment & Field Systems in Ethiopia | MO'SCON",
        description: "Professional sports equipment and field systems for athletics, stadiums, schools, universities, sports clubs and training facilities in Ethiopia."
      };
    case 'acoustic-solutions':
      return {
        title: "Acoustic Ceiling & Wall Solutions in Ethiopia | MO'SCON",
        description: "Acoustic ceilings, wall cladding, soundproofing and partition solutions for offices, auditoriums, studios, healthcare facilities and commercial spaces in Ethiopia."
      };
    case 'data-center-infrastructure':
      return {
        title: "Data Center Infrastructure Solutions in Ethiopia | MO'SCON",
        description: "Data center infrastructure solutions including raised flooring, suspended ceilings, containment and cable management systems for mission-critical facilities."
      };
    case 'public-seating-solutions':
      return {
        title: "Public & Stadium Seating Solutions in Ethiopia | MO'SCON",
        description: "Durable public seating solutions for stadiums, sports arenas, auditoriums, theaters, educational institutions and public facilities in Ethiopia."
      };
    case 'toilet-cubicles':
    case 'toilet-partition':
      return {
        title: "HPL Toilet Cubicles & Partitions in Ethiopia | MO'SCON",
        description: "Commercial toilet cubicles and washroom partition systems in Ethiopia. High-quality HPL toilet partitions for public and commercial facilities."
      };
    default:
      return {
        title: `${originalTitle} in Ethiopia | MO'SCON`,
        description: `Explore ${originalTitle} solutions by MO'SCON Engineering & Trading in Ethiopia.`
      };
  }
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) throw error;
        setProduct(data as Product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const seoMeta = getProductSEOMeta(product.slug, product.title);
  
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moscon.et/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://moscon.et/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.title,
        "item": `https://moscon.et/products/${product.slug}`
      }
    ]
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      <SEO 
        title={seoMeta.title}
        description={seoMeta.description}
        canonicalUrl={`https://moscon.et/products/${product.slug}`}
        structuredData={breadcrumbData}
      />
      <section className="relative h-[60vh] min-h-[500px] flex items-end pt-32 pb-16">
        <div className="absolute inset-0 z-0 bg-slate-900">
          {product.img && (
            <LazyImage 
              src={product.img} 
              alt={product.title} 
              className="w-full h-full object-cover"
              containerClassName="w-full h-full absolute inset-0"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeIn} className="mb-6">
              <Link to="/products" className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Products
              </Link>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {product.title}
            </motion.h1>
            <motion.div variants={fadeIn} className="flex gap-4">
              <Link 
                to={`/contact?product=${product.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-secondary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 lg:p-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto space-y-16">
            
            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Overview</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{product.overview}</p>
            </motion.section>

            <div className="grid md:grid-cols-2 gap-12">
              {product.features && product.features.length > 0 && (
                <motion.section variants={fadeIn}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <motion.section variants={fadeIn}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Benefits</h2>
                  <ul className="space-y-4">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 size={20} className="text-secondary mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-600 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {product.applications && product.applications.length > 0 && (
                <motion.section variants={fadeIn} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Applications</h2>
                  <ul className="space-y-3">
                    {product.applications.map((app, i) => (
                      <li key={i} className="flex items-center text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-3" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {product.technical_highlights && product.technical_highlights.length > 0 && (
                <motion.section variants={fadeIn} className="bg-slate-950 p-8 rounded-2xl text-white shadow-lg h-full">
                  <h2 className="text-2xl font-bold text-white mb-6">Technical Highlights</h2>
                  <ul className="space-y-4">
                    {product.technical_highlights.map((tech, i) => {
                      const [label, ...rest] = tech.split(':');
                      const value = rest.join(':');
                      return (
                        <li key={i} className="flex flex-col border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                          <span className="text-slate-400 text-sm mb-1">{label}</span>
                          <span className="font-semibold">{value || tech}</span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.section>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
