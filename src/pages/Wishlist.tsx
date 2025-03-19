
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getWishlist, getProductById } from '@/utils/mockData';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, LogIn } from 'lucide-react';

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    
    // Check if user is logged in
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    if (loginStatus) {
      const wishlistIds = getWishlist();
      const products = wishlistIds
        .map(id => getProductById(id))
        .filter((product): product is Product => product !== undefined);
      
      setWishlistProducts(products);
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
          
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <LogIn className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Please log in to view your wishlist</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Log in to your account to save products to your wishlist and track prices across different stores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleLogin}>
                Log In
              </Button>
              <Link to="/">
                <Button variant="outline">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Save your favorite products to keep track of the best deals across different stores.
            </p>
            <Link to="/">
              <Button>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
