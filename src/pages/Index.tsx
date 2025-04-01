
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const deals = getDeals();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      
      try {
        // Count query to get total products
        const { count, error: countError } = await supabase
          .from('products')
          .select('id', { count: 'exact' });
        
        if (countError) {
          console.error('Error counting products:', countError);
        } else {
          setTotalProducts(count || 0);
        }

        // Fetch products with pagination
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            category,
            image_url,
            additional_images,
            brand,
            model,
            rating,
            review_count,
            created_at,
            prices(
              id,
              price,
              currency,
              product_link,
              store_id,
              last_updated
            )
          `)
          .range((page - 1) * productsPerPage, page * productsPerPage - 1)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          toast({
            variant: "destructive",
            title: "Failed to load products",
            description: error.message
          });
          setAllProducts([]);
        } else if (data) {
          // Transform the Supabase data to match our Product type
          const transformedProducts: Product[] = data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description || '',
            category: item.category || '',
            imageUrl: item.image_url || '/placeholder.svg',
            additionalImages: item.additional_images || [],
            brand: item.brand || '',
            model: item.model || '',
            prices: (item.prices || []).map(price => ({
              id: price.id.toString(),
              storeId: price.store_id || 'store1',
              price: price.price,
              currency: price.currency || 'USD',
              priceDate: price.last_updated || new Date().toISOString(),
              url: price.product_link
            })),
            dateAdded: item.created_at || new Date().toISOString(),
            ...(item.rating && { rating: item.rating }),
            ...(item.review_count && { reviewCount: item.review_count })
          }));
          
          setAllProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error in fetchAllProducts:', error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Failed to load products. Please try again."
        });
      } finally {
        // Add a small delay to show loading animation
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchAllProducts();
  }, [page, toast]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const maxPage = Math.ceil(totalProducts / productsPerPage);

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

        {/* Top Deals Section */}
        {deals.length > 0 && (
          <section className="mb-16">
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
          </section>
        )}

        {/* All Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">All Products</h2>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
              
              {/* Pagination */}
              {maxPage > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => page > 1 && handlePageChange(page - 1)}
                        className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        href="#"
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, maxPage) }, (_, i) => {
                      // Create a sliding window of 5 pages around current page
                      let pageNum;
                      if (maxPage <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= maxPage - 2) {
                        pageNum = maxPage - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <a
                            href="#"
                            className={`h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium ${
                              page === pageNum
                                ? "bg-primary text-white"
                                : "text-gray-600 hover:bg-primary/10"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                          >
                            {pageNum}
                          </a>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => page < maxPage && handlePageChange(page + 1)}
                        className={page >= maxPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        href="#"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
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
