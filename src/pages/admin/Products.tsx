import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminCard } from '../../components/admin/AdminCard';
import { Modal } from '../../components/admin/Modal';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { type Product } from '../../types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    overview: '',
    img: '',
    features: '',
    benefits: '',
    applications: '',
    technical_highlights: ''
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to fetch products');
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        slug: product.slug,
        title: product.title,
        overview: product.overview,
        img: product.img || '',
        features: (product.features || []).join('\n'),
        benefits: (product.benefits || []).join('\n'),
        applications: (product.applications || []).join('\n'),
        technical_highlights: (product.technical_highlights || []).join('\n')
      });
    } else {
      setEditingProduct(null);
      setFormData({
        slug: '', title: '', overview: '', img: '', features: '', benefits: '', applications: '', technical_highlights: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate the URL slug when the Title is being typed
      if (name === 'title') {
        newData.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special chars with hyphens
          .replace(/^-+|-+$/g, '');   // Remove leading or trailing hyphens
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        slug: formData.slug,
        title: formData.title,
        overview: formData.overview,
        img: formData.img,
        features: formData.features.split('\n').filter(Boolean),
        benefits: formData.benefits.split('\n').filter(Boolean),
        applications: formData.applications.split('\n').filter(Boolean),
        technical_highlights: formData.technical_highlights.split('\n').filter(Boolean),
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id);
        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
        toast.success('Product added successfully');
      }
      
      closeModal();
      fetchProducts();
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', deleteTargetId);
      if (error) throw error;
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Product
        </button>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              No products found. Click "Add Product" to create one.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4 rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-md overflow-hidden bg-slate-100">
                        {product.img ? (
                          <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{product.title}</td>
                    <td className="px-6 py-4 font-mono text-xs">{product.slug}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(product.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminCard>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
              <ImageUploader 
                currentImageUrl={formData.img}
                onImageUploaded={(url) => setFormData(prev => ({ ...prev, img: url }))}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="flex h-11 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="e.g. Sandwich Panels"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL Slug</label>
                <input
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="flex h-11 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono text-xs"
                  placeholder="e.g. sandwich-panels"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Overview</label>
              <textarea
                required
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Features (One per line)</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Benefits (One per line)</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Applications (One per line)</label>
                <textarea
                  name="applications"
                  value={formData.applications}
                  onChange={handleInputChange}
                  className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Technical Highlights (One per line)</label>
                <textarea
                  name="technical_highlights"
                  value={formData.technical_highlights}
                  onChange={handleInputChange}
                  className="flex w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[120px]"
                  placeholder="e.g. Fire Rating: 120 mins"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-md transition-colors flex items-center disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete Product"
        isLoading={isDeleting}
      />
    </div>
  );
}
