import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="text-8xl font-bold text-primary">404</div>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            <Link to="/shop" className="underline hover:text-primary">
              Browse our products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
