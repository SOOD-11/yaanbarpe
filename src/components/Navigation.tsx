
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Cultural Heritage', href: '/heritage' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav 
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-display font-bold text-tulu-red">
            <span className="text-tulu-blue">Yaan</span>
            <span className="text-tulu-red">Barpe</span>
          </span>
          <span className="text-sm text-tulu-green font-medium hidden md:inline-block">(YBiee)</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href}
              className="text-sm font-medium hover:text-tulu-blue transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-tulu-blue after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-100"
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-tulu-red hover:bg-tulu-blue transition-colors text-white">
            Book Experience
          </Button>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href}
                className="text-foreground py-2 hover:text-tulu-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-tulu-red hover:bg-tulu-blue mt-2 transition-colors">
              Book Experience
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
