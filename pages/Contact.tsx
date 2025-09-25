import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Telegram Config ---
  const ENCRYPTED_TOKEN =
    "NzY3NDY2NDg5OTpBQUdMQmNSMlBPRWJLTWZFOXQxdnhfdXVDanhZcElpRzh6Yw==";
  const TELEGRAM_TOKEN = atob(ENCRYPTED_TOKEN);

  // All chat IDs that should receive the message
  const CHAT_IDS = ["6765506341", "6275543458"];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Telegram message (French like Cart orders)
    const message = `
📩 *Nouveau Message de Contact !*

👤 Nom : ${formData.name}
📧 Email : ${formData.email}

💬 Message :
${formData.message}
    `;

    try {
      // Send to all chat IDs
      await Promise.all(
        CHAT_IDS.map((id) =>
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
        title: "Message envoyé avec succès 🚀",
        description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
        duration: 4000,
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l’envoi du message.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "bnf.plastique@gmail.com",
      description: "Envoyez-nous un email à tout moment !",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+213 (0) 770 99 78 30",
      description: "Samedi - Jeudi\n8:00 AM - 5:00 PM",
    },
    {
      icon: MapPin,
      title: "Localisation",
      content: "09, rue Hammidat, Ouled Chebal, Wilaya d’Alger",
      description: "Passez nous dire bonjour dans notre magasin.",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Contactez-nous</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question ou besoin d’aide ? Envoyez-nous un message et nous vous répondrons rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Entrer en contact</h2>
              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, title, content, description }, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
                        <p className="text-primary font-medium">{content}</p>
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi - Jeudi</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vendredi (Al Joumoua)</span>
                  <span className="text-muted-foreground">Fermé</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Votre nom complet"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre.email@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      <Send size={18} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
