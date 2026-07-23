import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Loader2, MessageCircle, Send, ExternalLink, Copy } from 'lucide-react';

import { Section } from '../components/ui/Section';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { fadeIn } from '../lib/animations';
import { submitContactInquiry, type ContactFormData } from '../services/contact.service';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCompanySettings } from '../hooks/useCompanySettings';

const contactSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  company_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function Contact() {
  useDocumentTitle('Contact Us');
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: settings } = useCompanySettings();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const readableProduct = productSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setValue('subject', `Inquiry regarding ${readableProduct}`);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactInquiry(data);
      toast.success("Thank you! Your inquiry has been submitted successfully.");
      reset();
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&fm=webp&w=1920"
            alt="Contact us"
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
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Get in touch for quotes, consultations, or any inquiries regarding our finishing solutions.
          </motion.p>
        </div>
      </section>

      <Section bgClassName="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Reach Out To Us</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Office Address</h4>
                  <p className="text-slate-600">
                    {settings?.address ? (
                      settings.address.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < settings.address!.split('\n').length - 1 && <br />}
                        </span>
                      ))
                    ) : (
                      <>Kirkos Sub-city, W.10, H.No 918/79<br/>Addis Ababa, Ethiopia</>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Phone</h4>
                  <div className="flex items-center gap-2 text-slate-600">
                    <a 
                      href={`tel:${settings?.contact_phone ? settings.contact_phone.replace(/\\s+/g, '') : '+251935199119'}`} 
                      className="flex items-center gap-1.5 hover:text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded cursor-pointer"
                      aria-label="Call our phone number"
                      target="_self"
                      rel="noopener"
                    >
                      {settings?.contact_phone || '+251 935 199 119'}
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(settings?.contact_phone || '+251 935 199 119');
                        toast.success('Phone number copied');
                      }}
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer flex-shrink-0"
                      title="Copy to clipboard"
                      aria-label="Copy phone number"
                      type="button"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Email</h4>
                  <div className="flex items-center gap-2 text-slate-600">
                    <a 
                      href={`mailto:${settings?.contact_email || 'moscon.engineering@gmail.com'}`}
                      className="flex items-center gap-1.5 hover:text-primary hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded cursor-pointer"
                      aria-label="Send us an email"
                      title="Opens your email application"
                      target="_self"
                      rel="noopener"
                    >
                      {settings?.contact_email || 'moscon.engineering@gmail.com'}
                      <ExternalLink size={14} className="opacity-70" />
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(settings?.contact_email || 'moscon.engineering@gmail.com');
                        toast.success('Email copied');
                      }}
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer flex-shrink-0"
                      title="Copy to clipboard"
                      aria-label="Copy email address"
                      type="button"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a 
                href="https://wa.me/251935199119?text=Hello%20MO'sCON%20Engineering" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={20} />
                <span className="font-medium">WhatsApp</span>
              </a>
              <a 
                href="https://t.me/moscon_engineering" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Contact MO'SCON on Telegram"
              >
                <Send size={20} />
                <span className="font-medium">Telegram</span>
              </a>
            </motion.div>
            
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4">Legal & Administrative</h4>
              <p className="text-slate-600">Company Name: {settings?.company_name || "MO'sCON Engineering & Trading"}</p>
              <p className="text-slate-600">Registered in: Addis Ababa, Ethiopia</p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <Input 
                    {...register("full_name")} 
                    placeholder="John Doe" 
                    className={errors.full_name ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                  <Input 
                    {...register("company_name")} 
                    placeholder="Acme Corp" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <Input 
                    {...register("email")} 
                    type="email" 
                    placeholder="john@example.com" 
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <Input 
                    {...register("phone_number")} 
                    placeholder="+1 234 567 890" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                <Input 
                  {...register("subject")} 
                  placeholder="Product Inquiry" 
                  className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                <textarea 
                  {...register("message")} 
                  className={`flex w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[150px] ${errors.message ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-primary"}`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
