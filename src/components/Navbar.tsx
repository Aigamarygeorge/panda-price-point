
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarProfileMenu from './NavbarProfileMenu';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Expandable Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center font-bold text-lg">
              Price<span className="text-primary">Panda</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="p-4">
            <Link to="/" className="block py-2 text-lg font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/deals" className="block py-2 text-lg font-medium hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/wishlist" className="block py-2 text-lg font-medium hover:text-primary transition-colors">
              Wishlist
            </Link>
            <Link to="/contact" className="block py-2 text-lg font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      )}
      
      {/* Main navbar */}
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl md:text-2xl">Price<span className="text-primary">Panda</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
            Deals
          </Link>
          <Link to="/wishlist" className="text-sm font-medium hover:text-primary transition-colors">
            <Heart className="h-4 w-4 inline-block mr-1" />
            Wishlist
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="hidden md:block">
            <NotificationBell />
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100 text-gray-600"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          {/* User Profile */}
          <div className="hidden md:block">
            <NavbarProfileMenu />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/deals" className="text-lg font-medium hover:text-primary transition-colors">
                Deals
              </Link>
              <Link to="/wishlist" className="text-lg font-medium hover:text-primary transition-colors">
                <Heart className="h-4 w-4 inline-block mr-1" />
                Wishlist
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                Contact
              </Link>
              
              {/* Notification Bell for mobile */}
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium">Notifications</span>
                <NotificationBell />
              </div>
              
              {/* User profile for mobile */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <NavbarProfileMenu />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
