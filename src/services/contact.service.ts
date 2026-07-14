import { supabase } from '../lib/supabase';

export interface ContactFormData {
  full_name: string;
  company_name?: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
}

export async function submitContactInquiry(data: ContactFormData) {
  const { error } = await supabase
    .from('inquiries')
    .insert([
      {
        full_name: data.full_name,
        company_name: data.company_name || null,
        email: data.email,
        phone: data.phone_number || null,
        subject: data.subject,
        message: data.message,
        status: 'new'
      }
    ]);

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
  }
  
  return true;
}
