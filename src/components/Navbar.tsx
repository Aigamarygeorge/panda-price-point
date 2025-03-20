import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, Settings, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from '@/components/ui/use-toast';
import { getCompareLists } from '@/utils/mockData';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loginStatus);
    setUserName(name);

    const compareList = getCompareLists();
    setCompareCount(compareList.length);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    toast({
      description: "Logged out successfully",
    });
    navigate('/');
  };

  const goToProfileSettings = () => {
    navigate('/profile-settings');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'} border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <ShoppingBag className="h-8 w-8 text-primary mr-2 transition-transform group-hover:scale-110 duration-300" />
              <span className="text-xl font-bold text-secondary">
                Price<span className="text-primary">Panda</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 transition-colors duration-300 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Home
            </Link>
            
            <Link 
              to="/deals" 
              className={`px-3 py-2 transition-colors duration-300 ${location.pathname === '/deals' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 transition-colors duration-300 ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              About
            </Link>
          </div>

          {location.pathname !== '/' && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="w-full flex">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className={`w-full focus-visible:ring-primary rounded-l-full pl-4 transition-all duration-300 ${searchFocused ? 'search-bar-expanded' : 'search-bar-collapsed'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Button type="submit" className="rounded-r-full bg-primary hover:bg-primary/90 transition-all duration-300">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-muted transition-colors duration-300 relative">
              <Heart className="h-5 w-5 heart-favorite" />
            </Link>
            
            <Link to="/compare" className="p-2 rounded-full hover:bg-muted transition-colors duration-300 relative">
              <GitCompare className="h-5 w-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 scale-in">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Welcome, {userName}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={goToProfileSettings} className="cursor-pointer w-full transition-colors duration-200 hover:bg-muted hover:text-primary">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer w-full transition-colors duration-200 hover:bg-muted hover:text-primary">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/compare" className="cursor-pointer w-full transition-colors duration-200 hover:bg-muted hover:text-primary">
                      <GitCompare className="mr-2 h-4 w-4" />
                      <span>Compare Products</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors duration-200 hover:bg-red-50 hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="default" className="btn-hover-effect">Login</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-muted focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-border slide-in-right">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="mb-4 flex">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full rounded-l-full pl-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-r-full bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link 
              to="/" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/deals" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-base font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <div className="flex space-x-4 pt-2">
              <Link 
                to="/wishlist" 
                className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Link>
              
              <Link 
                to="/compare" 
                className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <GitCompare className="h-5 w-5 mr-2" />
                Compare
                {compareCount > 0 && (
                  <span className="ml-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>
              
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => {
                      goToProfileSettings();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
