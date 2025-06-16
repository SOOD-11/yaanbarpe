
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 relative z-10">
          <div className="relative">
            <span className="text-2xl font-display font-bold">
              <span className="text-tulu-blue">Yaan</span>
              <span className="text-tulu-red">Barpe</span>
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-1 items-center">
          <Link 
            to="/"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Home
          </Link>
          
          <Link 
            to="/about"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/about') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            About
          </Link>
          
          <Link 
            to="/heritage"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/heritage') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Cultural Heritage
          </Link>
          
          <Link 
            to="/blog"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/blog') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Blog
          </Link>
          
          <Link 
            to="/packages"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/packages') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Packages
          </Link>
          
          <Link 
            to="/contact"
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              isActive('/contact') ? "bg-tulu-blue/10 text-tulu-blue" : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Contact
          </Link>
          
          <Button className="ml-4 bg-tulu-red hover:bg-tulu-blue transition-colors text-white" asChild>
            <Link to="/booking">Book Experience</Link>
          </Button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="lg:hidden text-foreground p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20">
          <div className="flex flex-col h-full overflow-y-auto space-y-6 p-8">
            <Link 
              to="/"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/heritage"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cultural Heritage
            </Link>
            <Link 
              to="/blog"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/packages"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Packages
            </Link>
            <Link 
              to="/contact"
              className="text-2xl font-display font-medium py-3 border-b border-border/30 hover:text-tulu-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <Button className="bg-tulu-red hover:bg-tulu-blue transition-colors text-white mt-4 py-6 text-lg" asChild>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>Book Experience</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
