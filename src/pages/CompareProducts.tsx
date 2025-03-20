
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { getProductById, getCompareLists, removeFromCompareList } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { formatPrice } from '@/utils/priceUtils';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';

const CompareProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCompareList();
  }, []);

  const loadCompareList = () => {
    setLoading(true);
    const compareListIds = getCompareLists();
    
    if (compareListIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    
    const productsData = compareListIds
      .map(id => getProductById(id))
      .filter((product): product is Product => product !== undefined);
      
    setProducts(productsData);
    setLoading(false);
  };

  const handleRemoveProduct = (productId: string) => {
    removeFromCompareList(productId);
    loadCompareList();
    toast({
      description: "Product removed from comparison list",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to browsing
          </Link>
          
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Your Compare List is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add products to your compare list to see a side-by-side comparison of their features and prices.
            </p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find all unique features across products
  const allFeatures = Array.from(
    new Set(
      products.flatMap(product => product.features || [])
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to browsing
          </Link>
          <h1 className="text-2xl font-bold">Compare Products</h1>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))] gap-4 mb-8">
              {/* Header Row */}
              <div className="font-semibold text-lg"></div>
              {products.map(product => (
                <div key={product.id} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -top-2 -right-2 rounded-full bg-white shadow-sm hover:bg-gray-100"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Image Row */}
              <div className="flex items-center font-semibold">Image</div>
              {products.map(product => (
                <div key={`img-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </Link>
                </div>
              ))}

              {/* Name Row */}
              <div className="flex items-center font-semibold">Name</div>
              {products.map(product => (
                <div key={`name-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                  <Link to={`/product/${product.id}`} className="font-medium hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                </div>
              ))}

              {/* Brand Row */}
              <div className="flex items-center font-semibold">Brand</div>
              {products.map(product => (
                <div key={`brand-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                  {product.brand}
                </div>
              ))}

              {/* Price Row */}
              <div className="flex items-center font-semibold">Price</div>
              {products.map(product => {
                const lowestPrice = Math.min(...product.prices.map(p => p.price));
                return (
                  <div key={`price-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                    <span className="text-primary font-semibold">{formatPrice(lowestPrice)}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      (from {product.prices.length} {product.prices.length === 1 ? 'store' : 'stores'})
                    </span>
                  </div>
                );
              })}

              {/* Rating Row */}
              <div className="flex items-center font-semibold">Rating</div>
              {products.map(product => (
                <div key={`rating-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                  {product.rating ? (
                    <div className="flex items-center">
                      <span className="text-amber-500">★</span>
                      <span className="ml-1">{product.rating.toFixed(1)}</span>
                      {product.reviewCount && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No ratings</span>
                  )}
                </div>
              ))}

              {/* Features Rows */}
              <div className="flex items-center font-semibold">Features</div>
              {products.map(product => (
                <div key={`features-head-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
                  {product.features && product.features.length > 0 ? (
                    <span className="text-sm text-muted-foreground">
                      {product.features.length} features
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No features listed</span>
                  )}
                </div>
              ))}

              {/* Individual Features */}
              {allFeatures.map(feature => (
                <React.Fragment key={feature}>
                  <div className="flex items-center text-sm pl-4 py-2">{feature}</div>
                  {products.map(product => {
                    const hasFeature = product.features?.includes(feature);
                    return (
                      <div 
                        key={`feature-${product.id}-${feature}`} 
                        className={`p-4 text-center ${hasFeature ? 'text-green-600' : 'text-red-500'}`}
                      >
                        {hasFeature ? '✓' : '✗'}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
