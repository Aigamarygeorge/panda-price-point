
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getStoreById, isInWishlist, addToWishlist, removeFromWishlist } from '@/utils/mockData';
import { Product, Store } from '@/types';
import { formatPrice } from '@/utils/priceUtils';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ExternalLink, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from '@/components/Navbar';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setInWishlist(isInWishlist(foundProduct.id));
      }
      setIsLoading(false);
    }
  }, [id]);

  const toggleWishlist = () => {
    if (!product) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      setInWishlist(false);
      toast({
        description: "Removed from wishlist",
      });
    } else {
      addToWishlist(product.id);
      setInWishlist(true);
      toast({
        description: "Added to wishlist",
      });
    }
  };

  const getStoreInfo = (storeId: string): Store | undefined => {
    return getStoreById(storeId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-24 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-24 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Sort prices from lowest to highest
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full object-cover rounded-lg"
              />
              {product.rating && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {product.rating.toFixed(1)}
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{product.brand}</p>
                  <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                  {product.reviewCount && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.reviewCount} reviews
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${inWishlist ? 'text-primary border-primary' : ''}`}
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="mt-6">
                <p className="text-lg font-semibold">
                  Lowest Price: <span className="text-primary text-xl">{formatPrice(lowestPrice.price)}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available from {product.prices.length} {product.prices.length === 1 ? 'store' : 'stores'}
                </p>
              </div>
              
              <div className="mt-6">
                <a 
                  href={lowestPrice.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full">
                    View Best Deal
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Price Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Compare Prices</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPrices.map((price) => {
                  const store = getStoreInfo(price.storeId);
                  return (
                    <TableRow key={price.id}>
                      <TableCell className="font-medium">
                        {store?.name || 'Unknown Store'}
                      </TableCell>
                      <TableCell>
                        {formatPrice(price.price)}
                        {price.id === lowestPrice.id && (
                          <Badge variant="outline" className="ml-2 bg-green-50 border-green-200 text-green-700">
                            Best Price
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(price.priceDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={price.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            Go to Store
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
