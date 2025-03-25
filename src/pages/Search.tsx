
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, FilterX } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  // Store the last query and page to prevent unnecessary rerenders
  const [lastFetchParams, setLastFetchParams] = useState({
    query: '',
    page: 0
  });

  useEffect(() => {
    // Reset to first page when search query changes
    setPage(1);
  }, [query]);

  useEffect(() => {
    // Skip fetch if we've already fetched with these exact params
    if (lastFetchParams.query === query && lastFetchParams.page === page) {
      return;
    }
    
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        // Count query to get total products for pagination
        let countQuery = supabase
          .from('products')
          .select('id', { count: 'exact' });
        
        // Apply search filter to count if query exists
        if (query) {
          countQuery = countQuery.or(
            `name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%,model.ilike.%${query}%`
          );
        }
        
        const { count, error: countError } = await countQuery;
        
        if (countError) {
          console.error('Error counting products:', countError);
        } else {
          setTotalProducts(count || 0);
        }

        // Main product query with pagination
        let productQuery = supabase
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
          .range((page - 1) * productsPerPage, page * productsPerPage - 1);
        
        // Apply search filter if query exists
        if (query) {
          productQuery = productQuery.or(
            `name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%,model.ilike.%${query}%`
          );
        }

        const { data, error } = await productQuery;

        if (error) {
          console.error('Error fetching products:', error);
          toast({
            variant: "destructive",
            title: "Failed to load products",
            description: error.message
          });
          addNotification({
            title: "Search Error",
            message: "Failed to load products. Please try again.",
            type: "error"
          });
          setProducts([]);
        } else if (data) {
          // Transform the Supabase data to match our Product type
          const transformedProducts: Product[] = data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            description: item.description || '',
            category: item.category || '',
            imageUrl: item.image_url || '/placeholder.svg', // Fallback to placeholder image
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
          
          setProducts(transformedProducts);
          
          if(query && transformedProducts.length === 0 && page === 1) {
            addNotification({
              title: "No Results",
              message: `We couldn't find any products matching "${query}"`,
              type: "info"
            });
          } else if(query && transformedProducts.length > 0 && page === 1) {
            addNotification({
              title: "Search Results",
              message: `Found ${totalProducts} products matching "${query}"`,
              type: "success"
            });
          }
        }
        
        // Update lastFetchParams to prevent duplicate fetches
        setLastFetchParams({
          query: query,
          page: page
        });
        
      } catch (error) {
        console.error('Error in fetchProducts:', error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Failed to load products. Please try again."
        });
        addNotification({
          title: "Error",
          message: "Something went wrong with your search. Please try again.",
          type: "error"
        });
        setProducts([]);
      } finally {
        // Add a small delay to show loading animation
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchProducts();
  }, [query, page, toast, addNotification]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const maxPage = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-2xl font-semibold mb-6 fade-in">
            {query ? (
              totalProducts > 0 
                ? `Search results for "${query}" (${totalProducts} products)`
                : `No results found for "${query}"`
            ) : 'All Products'}
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
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
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm scale-in">
              <FilterX className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-xl font-semibold mb-2">We couldn't find any products matching your search</h2>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Try using different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button 
                  onClick={() => navigate('/')}
                  className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Browse All Products
                </button>
                <button
                  onClick={() => navigate('/deals')}
                  className="btn-hover-effect inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md shadow-sm text-sm font-medium bg-white hover:bg-primary/5"
                >
                  View Today's Deals
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
