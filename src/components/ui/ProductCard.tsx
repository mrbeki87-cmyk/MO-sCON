import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Box } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { type Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {product.img ? (
          <LazyImage 
            src={product.img} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            containerClassName="w-full h-full"
            width={400}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
            <Box size={48} className="mb-2 opacity-50" />
            <span className="text-sm">Image pending</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-slate-600 line-clamp-2 mb-6 flex-grow text-sm leading-relaxed">
          {product.overview}
        </p>
        
        <Link 
          to={`/products/${product.slug}`}
          className="inline-flex items-center font-medium text-primary hover:text-primary-light transition-colors group/link mt-auto w-max"
        >
          View Details
          <ArrowRight size={18} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
