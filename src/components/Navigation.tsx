
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 relative z-10">
          <div className="relative">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Yaan</span>
              <span className="text-red-600">Barpe</span>
            </span>
            <span className="absolute -bottom-2 right-0 text-xs px-1 py-0.5 bg-yellow-500 text-white rounded-md">YBiee</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link 
            to="/"
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/') ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-blue-600"
            )}
          >
            Home
          </Link>
          
          <Link 
            to="/blog"
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/blog') ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-blue-600"
            )}
          >
            Blog
          </Link>
          
          <Link 
            to="/packages"
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/packages') ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-blue-600"
            )}
          >
            Packages
          </Link>
          
          <Button className="ml-4 bg-red-600 hover:bg-blue-600 transition-colors text-white">
            Book Experience
          </Button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="lg:hidden text-gray-700 p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-20">
          <div className="flex flex-col h-full overflow-y-auto space-y-6 p-8">
            <Link 
              to="/"
              className="text-2xl font-medium py-3 border-b border-gray-200 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog"
              className="text-2xl font-medium py-3 border-b border-gray-200 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/packages"
              className="text-2xl font-medium py-3 border-b border-gray-200 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Packages
            </Link>
            
            <Button className="bg-red-600 hover:bg-blue-600 transition-colors text-white mt-4 py-6 text-lg">
              Book Experience
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
