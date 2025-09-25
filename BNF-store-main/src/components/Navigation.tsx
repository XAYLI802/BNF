import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Store, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: Store, label: 'Shop' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: itemCount },
    { path: '/contact', icon: Phone, label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary-glow transition-colors"
          >
            BNF-Store
          </Link>
          
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label, badge }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
                {badge && badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse-success"
                  >
                    {badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;