export interface Product {
  id: string;
  slug: string;
  title: string;
  overview: string;
  img: string | null;
  features: string[];
  benefits: string[];
  applications: string[];
  technical_highlights: string[];
  created_at?: string;
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  company_name?: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface CompanySettings {
  key: string;
  value: string;
  updated_at: string;
}
