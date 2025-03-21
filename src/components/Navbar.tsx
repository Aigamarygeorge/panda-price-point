import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavbarProfileMenu from './NavbarProfileMenu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu and search bar when route changes
    setMobileMenuOpen(false);
    setSearchBarOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?q=${searchQuery}`;
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Expandable Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center font-bold text-lg">
              E-Shop
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
            <Link to="/categories" className="block py-2 text-lg font-medium hover:text-primary transition-colors">
              Categories
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
          <span className="font-bold text-xl md:text-2xl">E-Shop</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
            Deals
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Search and User */}
        <div className="flex items-center space-x-4">
          {/* Search Icon (Desktop) */}
          <div className="hidden md:block">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSearchBar}
              className="hover:bg-gray-100 text-gray-600"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
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
      
      {/* Expandable Search Bar */}
      {searchBarOpen && (
        <div className="border-t border-gray-200 py-3 px-4 bg-gray-50">
          <div className="container mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full text-gray-400"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
      
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
              <Link to="/categories" className="text-lg font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                Contact
              </Link>
              
              {/* Search for mobile */}
              <form onSubmit={handleSearch} className="relative mt-2">
                <Input 
                  type="search" 
                  placeholder="Search for products..." 
                  className="w-full pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full text-gray-400"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              
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
