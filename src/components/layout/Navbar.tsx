import { Link } from 'react-router-dom';
import { navigation } from '../../config/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // Mobile menu is closed via onClick on the Links.

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = cn(
    "fixed top-0 left-0 w-full z-50 transition-all duration-300",
    isScrolled || isOpen
      ? "bg-white shadow-md border-b border-slate-100 py-2" 
      : "bg-transparent py-4 border-b border-white/10"
  );

  const textClass = isScrolled || isOpen ? "text-slate-600 hover:text-primary" : "text-white/90 hover:text-white";
  const logoTextClass = isScrolled || isOpen ? "text-primary" : "text-white";

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 z-50">
            <img 
              src="/logo.png" 
              alt="MO'sCON Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className={cn("font-bold text-xl tracking-tight transition-colors duration-300", logoTextClass)}>
              MO'sCON
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className={cn("font-medium transition-colors duration-300 text-sm tracking-wide", textClass)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={cn("transition-colors duration-300 focus:outline-none", isScrolled || isOpen ? "text-slate-900" : "text-white")}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-4 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className="text-slate-600 hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
