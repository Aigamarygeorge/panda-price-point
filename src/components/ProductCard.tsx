
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatPrice, findLowestPrice, findHighestPrice } from '@/utils/priceUtils';
import { 
  addToWishlist, 
  removeFromWishlist, 
  isInWishlist, 
  addToCompareList, 
  isInCompareList,
  addToViewedProducts
} from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '', index = 0 }) =>  {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [inWishlist, setInWishlist] = React.useState(isInWishlist(product.id));
  const [inCompareList, setInCompareList] = React.useState(isInCompareList(product.id));
  const [animate, setAnimate] = React.useState(false);

  const lowestPrice = findLowestPrice(product.prices);
  const highestPrice = findHighestPrice(product.prices);
  const hasPriceRange = lowestPrice !== highestPrice;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to your wishlist",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (inWishlist) {
      const success = removeFromWishlist(product.id);
      if (success) {
        setInWishlist(false);
        toast({
          description: "Removed from wishlist",
        });
      }
    } else {
      const success = addToWishlist(product.id);
      if (success) {
        setInWishlist(true);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 600);
        toast({
          description: "Added to wishlist",
        });
      }
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCompareList(product.id);
    setInCompareList(true);
    toast({
      description: "Added to compare list",
    });
  };

  const handleProductClick = () => {
    // Record this product as viewed
    addToViewedProducts(product.id);
  };

  return (
    <Card className={`product-card stagger-item scale-in hover-lift ${className}`} style={{ animationDelay: `${0.05 + index * 0.05}s` }}>
      <Link to={`/product/${product.id}`} onClick={handleProductClick}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          />
          {product.rating && (
            <Badge className="absolute top-2 right-2 bg-primary">
              ★ {product.rating.toFixed(1)}
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="flex-1" onClick={handleProductClick}>
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`heart-favorite ${inWishlist ? 'text-primary' : ''} ${animate ? 'animate-heart-pulse' : ''}`}
                    onClick={toggleWishlist}
                  >
                    <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${inCompareList ? 'text-primary' : ''}`}
                    onClick={handleCompareClick}
                  >
                    <GitCompare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Add to compare
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
        
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="price-tag">
              {hasPriceRange 
                ? `From ${formatPrice(lowestPrice)}`
                : formatPrice(lowestPrice)
              }
            </span>
            <span className="text-sm text-muted-foreground">
              {product.prices.length} {product.prices.length === 1 ? 'store' : 'stores'}
            </span>
          </div>

          {product.reviewCount && (
            <span className="text-sm text-muted-foreground mt-1">
              {product.reviewCount} reviews
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-grow" onClick={handleProductClick}>
            <Button variant="default" className="w-full btn-hover-effect transition-all duration-300 hover:bg-primary/90">
              Compare Prices
            </Button>
          </Link>
          {inCompareList && (
            <Link to="/compare">
              <Button variant="outline" className="btn-hover-effect">
                <GitCompare className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
