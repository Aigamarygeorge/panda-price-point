
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice, findLowestPrice, findHighestPrice } from '@/utils/priceUtils';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/utils/mockData';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) =>  {
  const { toast } = useToast();
  const [inWishlist, setInWishlist] = React.useState(isInWishlist(product.id));

  const lowestPrice = findLowestPrice(product.prices);
  const highestPrice = findHighestPrice(product.prices);
  const hasPriceRange = lowestPrice !== highestPrice;

  const toggleWishlist = () => {
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

  return (
    <Card className={`product-card ${className}`}>
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
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
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-2 ${inWishlist ? 'text-primary' : ''}`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>
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
            <span className="text-sm text-muted-foreground">
              {product.reviewCount} reviews
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button className="w-full">Compare Prices</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
