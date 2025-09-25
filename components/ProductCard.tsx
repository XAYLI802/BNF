import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });

    // Reset button state after animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-background/80 backdrop-blur"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-primary">
          {product.price.toFixed(2)} DA
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full group relative overflow-hidden"
        >
          <div className={cn(
            "flex items-center justify-center space-x-2 transition-all duration-300",
            isAdding ? "opacity-0 transform scale-0" : "opacity-100 transform scale-100"
          )}>
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </div>
          
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            isAdding ? "opacity-100 transform scale-100" : "opacity-0 transform scale-0"
          )}>
            <Check size={18} className="text-success animate-pulse-success" />
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
