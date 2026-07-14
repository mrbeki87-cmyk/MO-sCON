import { Link } from 'react-router-dom';
import { useCompanySettings } from '../../hooks/useCompanySettings';

export function Footer() {
  const { data: settings } = useCompanySettings();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-bold text-xl text-white tracking-tight">
              {settings?.company_name || "MO'sCON Engineering"}
            </span>
            <p className="mt-4 text-sm">Advanced construction finishing solutions. Delivering excellence in finishing works.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              {settings?.address ? (
                settings.address.split('\n').map((line, i) => (
                  <li key={i}>{line}</li>
                ))
              ) : (
                <>
                  <li>Kirkos Sub-city, W.10, H.No 918/79</li>
                  <li>Addis Ababa, Ethiopia</li>
                </>
              )}
              {settings?.contact_phone && <li>{settings.contact_phone}</li>}
              {settings?.contact_email && <li>{settings.contact_email}</li>}
              {!settings?.contact_phone && !settings?.contact_email && !settings?.address && (
                <>
                  <li>+251 935 199 119</li>
                  <li>moscon.engineering@gmail.com</li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} {settings?.company_name || "MO'sCON Engineering & Trading PLC"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
