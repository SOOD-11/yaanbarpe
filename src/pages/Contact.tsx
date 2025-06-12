
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <div className="py-24 px-4 md:px-8 bg-gradient-to-b from-tulu-sand/20 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-tulu-blue">Contact</span> <span className="text-tulu-red">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to explore Tulu Nadu? Get in touch with us to plan your cultural journey 
              or ask any questions about our experiences.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-tulu-blue">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help you plan the perfect cultural experience in Tulu Nadu. 
                    Reach out to us for bookings, custom tours, or any questions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-tulu-red mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Our Location</h3>
                      <p className="text-muted-foreground">
                        Car Street, Udupi, Karnataka 576101<br />
                        Near Sri Krishna Temple
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-tulu-green mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone Numbers</h3>
                      <p className="text-muted-foreground">
                        +91 9876543210<br />
                        +91 8765432109
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-tulu-teal mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        info@yaanbarpe.com<br />
                        bookings@yaanbarpe.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-tulu-gold mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Operating Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Sunday: 9:00 AM - 7:00 PM<br />
                        Emergency Contact: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-tulu-blue">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your travel plans or ask any questions..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-tulu-red hover:bg-tulu-blue text-white"
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
