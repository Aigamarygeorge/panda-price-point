
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDeals } from '@/utils/mockData';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const deals = getDeals();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            category,
            image_url,
            brand,
            model,
            rating,
            review_count,
            created_at,
            additional_images,
            prices(
              id,
              price,
              currency,
              product_link,
              last_updated,
              store_id
            )
          `)
          .order('rating', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching featured products:', error);
          toast({
            variant: "destructive",
            title: "Failed to load featured products",
            description: error.message
          });
        } else if (data) {
          // Transform the Supabase data to match our Product type
          const transformedProducts: Product[] = data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description || '',
            category: item.category || '',
            imageUrl: item.image_url || '/placeholder.svg',
            brand: item.brand || '',
            model: item.model || '',
            prices: (item.prices || []).map(price => ({
              id: price.id.toString(),
              storeId: price.store_id || 'unknown',
              price: price.price,
              currency: price.currency || 'USD',
              priceDate: price.last_updated || new Date().toISOString(),
              url: price.product_link
            })),
            dateAdded: item.created_at || new Date().toISOString(),
            ...(item.rating && { rating: item.rating }),
            ...(item.review_count && { reviewCount: item.review_count }),
            ...(item.additional_images && { additionalImages: item.additional_images })
          }));
          
          setFeaturedProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error in fetchFeaturedProducts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 fade-in">
            Welcome to Price<span className="text-primary">Panda</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 fade-in" style={{ animationDelay: '0.2s' }}>
            Compare prices across multiple stores and find the best deals on your favorite products.
          </p>
          
          {/* Large Centered Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex shadow-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full border-0 focus-visible:ring-0 py-6 px-6 text-lg rounded-l-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-r-full bg-primary hover:bg-primary/90 px-6 py-6">
                <Search className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
          </form>
        </section>

        {/* Featured Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Sparkles className="text-primary mr-2 h-6 w-6" />
              <h2 className="text-2xl font-semibold">Featured Products</h2>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            // Top Deals Fallback if no featured products
            deals.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <Sparkles className="text-primary mr-2 h-6 w-6" />
                    <h2 className="text-2xl font-semibold">Top Deals</h2>
                  </div>
                  <Link to="/deals" className="text-primary hover:underline text-sm font-medium">
                    View all deals →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {deals.slice(0, 4).map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </>
            )
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <span className="text-xl font-bold">Price<span className="text-primary">Panda</span></span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Wishlist
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PricePanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
