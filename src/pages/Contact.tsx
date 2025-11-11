import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AdBanner from "@/components/layout/AdBanner";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";




const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+237681394295",
      description: "Mon-Fri 9AM-6PM WAT"
    },
    {
      icon: Mail,
      title: "Email",
      value: "yourcareercompanion@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Mvan, Yaoundé",
      description: ""
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri: 9AM - 6PM",
      description: "Saturday: 10AM - 2PM"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Banner Ad */}
      <div className="w-full flex justify-center py-4 bg-muted/30">
        <AdBanner  position="top" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services? Need assistance with your career journey? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <p className="text-lg">{info.value}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Live Chat */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Live Chat Support</h3>
                    <p className="text-muted-foreground mb-3">
                      Need instant help? Our live chat is available during business hours.
                    </p>
                    <Button>Start Live Chat</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Tell us how we can help you..."
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I apply for jobs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply browse our job listings, click on positions that interest you, 
                  and follow the application instructions. You can apply directly through 
                  our platform or via the employer's external link.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is Career Companion free for job seekers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! All job seeker services including job searching, profile creation, 
                  and career coaching resources are completely free. Employers pay for 
                  our recruitment services.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I get career coaching?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visit our Career Coaching section for free resources, articles, and tips. 
                  For personalized coaching sessions, contact us to discuss our premium 
                  coaching services.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer services outside Nigeria?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently, we focus primarily on the Nigerian job market, but we do have 
                  some international opportunities. Contact us to discuss your specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inline Ad */}
        <div className="flex justify-center py-12">
          <AdBanner position="inline" />
        </div>
      </div>
    </div>
  );
};

export default Contact;