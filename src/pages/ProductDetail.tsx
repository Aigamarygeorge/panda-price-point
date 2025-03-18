
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getStoreById, isInWishlist, addToWishlist, removeFromWishlist } from '@/utils/mockData';
import { Product, Store } from '@/types';
import { formatPrice } from '@/utils/priceUtils';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ExternalLink, ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

// Additional images for Robot Vacuum (prod5)
const productImages = {
  "prod5": [
    "https://images.unsplash.com/photo-1600805624740-ebe64a34a3c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567818668259-e66acbf804b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setInWishlist(isInWishlist(foundProduct.id));
        setCurrentImageIndex(0);
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

  const getProductImages = (productId: string): string[] => {
    return productImages[productId as keyof typeof productImages] || [product?.imageUrl || ''];
  };

  const nextImage = () => {
    if (!product) return;
    const images = getProductImages(product.id);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!product) return;
    const images = getProductImages(product.id);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
  const images = getProductImages(product.id);

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
            {/* Product Image Gallery */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Image navigation buttons */}
                {images.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
                
                {product.rating && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {product.rating.toFixed(1)}
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Thumbnail navigation */}
              {images.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
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
