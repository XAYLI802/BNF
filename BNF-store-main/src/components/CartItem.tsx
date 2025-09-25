import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  isRemoving?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, isRemoving = false }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        isRemoving ? "animate-cart-item-exit" : "animate-cart-item-enter"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground truncate">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.price.toFixed(2)} DA each
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={14} />
            </Button>

            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>

          <div className="text-right">
            <div className="font-semibold text-lg">
              {(item.price * item.quantity).toFixed(2)} DA
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
