import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { staggerContainer } from '../lib/animations';
import { ProductCard } from '../components/ui/ProductCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { supabase } from '../lib/supabase';
import { type Product } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Products() {
  useDocumentTitle('Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setProducts(data as Product[] || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&fm=webp&w=1920"
            alt="Products background"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Comprehensive finishing materials engineered for commercial and industrial excellence.
          </motion.p>
        </div>
      </section>

      <Section bgClassName="bg-slate-50">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              No products found.
            </div>
          )}
        </motion.div>
      </Section>
    </div>
  );
}
