import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const Cart = () => {
  const { items, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  // Encrypted bot token
  const ENCRYPTED_TOKEN =
    "NzY3NDY2NDg5OTpBQUdMQmNSMlBPRWJLTWZFOXQxdnhfdXVDanhZcElpRzh6Yw==";
  const TELEGRAM_TOKEN = atob(ENCRYPTED_TOKEN);
  const CHAT_ID = ["6765506341", "6275543458"];

  const onSubmit = async (data) => {
    const TAX_RATE = 0.19; // 19% TVA

    // Subtotal (without tax)
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // Tax
    const tax = subtotal * TAX_RATE;

    // Grand total
    const grandTotal = subtotal + tax;

    // Product list with quantity, unit price, and subtotal
    const productList = items
      .map((item) => {
        const unitPrice = item.price.toLocaleString("fr-DZ", {
          minimumFractionDigits: 2,
        });
        const subtotalItem = (item.price * (item.quantity || 1)).toLocaleString(
          "fr-DZ",
          { minimumFractionDigits: 2 }
        );
        return `- ${item.name} x${item.quantity || 1} — ${unitPrice} DA each (Subtotal: ${subtotalItem} DA)`;
      })
      .join("\n");

    const message = `
🛒 *Nouvelle Commande Reçue !*

👤 Client : ${data.firstName} ${data.lastName}
📧 Email : ${data.email}
📞 Téléphone : ${data.phone}
🏙️ Ville : ${data.ville}, ${data.wilaya}
🏠 Adresse : ${data.address}

━━━━━━━━━━━━━━━
📦 Articles (${itemCount})
${productList}
━━━━━━━━━━━━━━━

💵 *Sous-total* : ${subtotal.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA
🧾 *TVA (19%)* : ${tax.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA
💰 *Total TTC* : ${grandTotal.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA

✅ Merci pour votre commande ! Nous vous contacterons bientôt pour la livraison.
`;

    try {
      await Promise.all(
        CHAT_ID.map((id) =>
          fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: id,
              text: message,
              parse_mode: "Markdown",
            }),
          })
        )
      );

      toast({
        title: "Delivery Started!",
        description: `We have received your order of ${itemCount} items totaling ${grandTotal.toFixed(
          2
        )} DA.`,
        duration: 4000,
      });

      clearCart();
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while sending order to Telegram.",
        duration: 4000,
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingCart
              size={64}
              className="mx-auto text-muted-foreground mb-6"
            />
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Your cart is empty
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link to="/shop">
                Start Shopping
                <ArrowLeft className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Subtotal / Tax / Total for UI display
  const TAX_RATE = 0.19;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items ({itemCount})</span>
                    <span>{subtotal.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-success">Depends on the distance</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (19%)</span>
                    <span>{tax.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{grandTotal.toLocaleString("fr-DZ", { minimumFractionDigits: 2 })} DA</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <h3 className="text-sm font-medium">Your Information</h3>
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("wilaya")}
                    placeholder="Wilaya (State/Region)"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("ville")}
                    placeholder="Ville (City)"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />
                  <input
                    {...register("address")}
                    placeholder="Address"
                    className="w-full bg-gray-900 text-white border rounded-lg p-2 text-sm"
                    required
                  />

                  <Button type="submit" className="w-full" size="lg">
                    <Truck size={18} className="mr-2" />
                    Proceed to Delivery
                  </Button>
                </form>

                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link to="/shop">
                      <ArrowLeft size={16} className="mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>🔒 Secure checkout with encryption</p>
                  <p>🤝 Trusted payment on delivery</p>
                  <p>🛡️ Buyer protection guaranteed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
