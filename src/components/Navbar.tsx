import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useToast } from '@/components/ui/use-toast';
import { products } from '@/utils/mockData';

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

  // Get popular products (top 5 with highest rating)
  const popularProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  useEffect(() => {
    // Check login status from localStorage
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loginStatus);
    setUserName(name);

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // Re-check when location changes

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

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'} border-b border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <ShoppingBag className="h-8 w-8 text-primary mr-2 transition-transform group-hover:scale-110 duration-300" />
              <span className="text-xl font-bold text-secondary">
                Price<span className="text-primary">Panda</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 transition-colors duration-300 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Home
            </Link>
            
            {/* Popular Products Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`${location.pathname === '/popular' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}>
                    <Star className="w-4 h-4 mr-1" /> 
                    Popular Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {popularProducts.map((product) => (
                        <li key={product.id} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/product/${product.id}`}
                              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
                            >
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium truncate">{product.name}</h3>
                                <p className="text-xs text-muted-foreground truncate">
                                  {product.rating} ★ | {product.prices[0].store}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="col-span-2">
                        <div className="flex justify-end p-2">
                          <Button variant="outline" size="sm" asChild className="w-full justify-center">
                            <Link to="/search" className="text-xs font-medium">
                              View All Products
                            </Link>
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
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

          {/* Search Bar - Only show on non-home pages */}
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

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-muted transition-colors duration-300 relative">
              <Heart className="h-5 w-5 heart-favorite" />
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
                  <DropdownMenuItem asChild>
                    <Link to="/profile-settings" className="cursor-pointer w-full transition-colors duration-200 hover:bg-muted hover:text-primary">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer w-full transition-colors duration-200 hover:bg-muted hover:text-primary">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
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

          {/* Mobile menu button */}
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

      {/* Mobile menu */}
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
            <div className="space-y-1">
              <div className="flex items-center py-2 text-base font-medium">
                <Star className="w-4 h-4 mr-2" />
                Popular Products
              </div>
              <div className="pl-6 space-y-2">
                {popularProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block py-1.5 text-sm hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
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
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/profile-settings" 
                    className="flex items-center text-base font-medium hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
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
