import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';

const Home = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10K+" },
    { icon: ShoppingBag, label: "Products Sold", value: "50K+" },
    { icon: Star, label: "5-Star Reviews", value: "98%" },
    { icon: Award, label: "Years Experience", value: "5+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="relative py-20 px-4 bg-gradient-to-br from-background via-accent/20 to-background">
  <div className="container mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
      Welcome to BNF-Store
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
      Discover premium products with exceptional quality and unbeatable prices.
      Your one-stop shop for the quickest order fulfillment and seamless shopping experience.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg" className="text-lg px-8 py-3">
        <Link to="/shop">
          Shop Now
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        className="text-lg px-8 py-3"
        onClick={() => {
          document.getElementById("stats-section")?.scrollIntoView({ 
            behavior: "smooth" 
          });
        }}
      >
        Learn More
      </Button>
    </div>
  </div>
</section>

{/* Stats Section */}
<section id="stats-section" className="py-16 px-4 bg-accent/30">
  <div className="container mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map(({ icon: Icon, label, value }, index) => (
        <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
          <CardContent className="space-y-2">
            <Icon className="mx-auto text-primary" size={32} />
            <div className="text-2xl font-bold text-card-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out our handpicked selection of products that our customers love most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust BNF-Store for their tech needs.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link to="/shop">
              Browse Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;