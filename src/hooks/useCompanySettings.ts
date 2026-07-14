import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface CompanySettings {
  company_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
}

export function useCompanySettings() {
  return useQuery<CompanySettings>({
    queryKey: ['company_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*');

      if (error) {
        console.error('Error fetching company settings:', error);
        return {};
      }

      const settings: CompanySettings = {};
      data.forEach((setting) => {
        if (setting.key === 'company_name') settings.company_name = setting.value;
        if (setting.key === 'contact_email') settings.contact_email = setting.value;
        if (setting.key === 'contact_phone') settings.contact_phone = setting.value;
        if (setting.key === 'address') settings.address = setting.value;
      });

      return settings;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since settings rarely change
  });
}
