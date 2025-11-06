import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "./label";
import { useState } from "react";
import { Input } from "./input";
import { CreditCard } from "lucide-react";


const SubscriptionPlans = () => {
    const [showModal, setShowmodal] = useState(false)
    const [amount, setAmount] = useState<string | null>()
    const yearlyDiscount = 0.2; // 20% discount for yearly plans
    const [plan,setPlan] = useState<string | null>()
    const [pamentmethod, setPamentmethod] = useState<string | null>()
    const pm = [{
        method: 'MOMO',
        address: '681095720'
    },
    {
        method: 'Orange Money',
        adress: '681031258'
    },
    {
        method: 'CARD',
        adress: ''
    }
    ]
    const pricingPlans = [
        {
            name: "Starter",
            price: "$10",
            period: "per month",
            description: "Perfect for small businesses and startups",
            features: [
                "Post up to 5 jobs per month",
                "Access to candidate profiles",
                "Basic applicant tracking",
                "Email support",
                "30-day job listing duration"
            ],
            popular: false
        },
        {
            name: "Professional",
            price: "$15",
            period: "per month",
            description: "Ideal for growing companies",
            features: [
                "Post up to 20 jobs per month",
                "Advanced candidate search filters",
                "Priority job placement",
                "Dedicated account manager",
                "60-day job listing duration",
                "Analytics and reporting",
                "Phone & email support"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "$30",
            period: "per month",
            description: "For large organizations with high-volume hiring",
            features: [
                "Unlimited job postings",
                "Premium candidate database access",
                "Custom branding on job posts",
                "API integration",
                "90-day job listing duration",
                "Advanced analytics dashboard",
                "24/7 priority support",
                "Dedicated recruitment consultant"
            ],
            popular: false
        }
    ];
    return (<section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">{'Choose Your Plan'}</h2>

        <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                    Yearly
                    <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="grid md:grid-cols-3 gap-6">
                {pricingPlans.map((plan, index) => (
                    <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                Most Popular
                            </Badge>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">/{plan.period}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                onClick={()=>{
                                    
                                    setAmount( Math.round(parseInt(plan.price.replace(/[^\d]/g, '')) ).toLocaleString())
                                    setPlan(plan.name)
                                    setShowmodal(true)
                                }}
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </TabsContent>

            <TabsContent value="yearly" className="grid md:grid-cols-3 gap-6">
                {pricingPlans.map((plan, index) => {
                    const yearlyPrice = Math.round(parseInt(plan.price.replace(/[^\d]/g, '')) * 12 * (1 - yearlyDiscount));
                    return (
                        <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    Most Popular
                                </Badge>
                            )}
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">${yearlyPrice.toLocaleString()}</span>
                                    <span className="text-muted-foreground">/year</span>
                                    <div className="text-sm text-primary">Save 20%</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className="w-full"
                                    variant={plan.popular ? "default" : "outline"}
                                      onClick={()=>{
                                    
                                    setAmount(yearlyPrice.toLocaleString())
                                    setPlan(plan.name)
                                    setShowmodal(true)
                                }}
                                >
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </TabsContent>
        </Tabs>
        <SubscriptionDialog showModal={showModal} setShowModal={setShowmodal} plan={plan} amount={amount} />
    </section>)
}

 function SubscriptionDialog({ showModal, setShowModal, plan, amount }: any) {
  const [method, setMethod] = useState("CARD");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Dialog open={showModal} onOpenChange={setShowModal} >
      <DialogContent className="sm:max-w-md overflow-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Subscribe to Plan</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to complete your subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label>Plan</Label>
            <Input value={plan} disabled className="bg-muted" />
          </div>

          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input value={`$${amount}`} disabled className="bg-muted" />
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              placeholder="e.g. 670000000" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          <Tabs value={method} onValueChange={setMethod} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="CARD">CARD <CreditCard size={18} className="text-blue-400 ml-2"/> </TabsTrigger>
              <TabsTrigger value="MOMO">MOMO</TabsTrigger>
              
              <TabsTrigger value="OrangeMoney">Orange Money</TabsTrigger>
            </TabsList>

            <TabsContent value="MOMO" className="space-y-2 mt-3">
              <Label>MOMO Number</Label>
              <Input placeholder="Enter your MOMO number" />
            </TabsContent>

            <TabsContent value="CARD" className="space-y-2 mt-3">
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Expiry</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="flex-1">
                  <Label>CVV</Label>
                  <Input placeholder="123" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="OrangeMoney" className="space-y-2 mt-3">
              <Label>Orange Money Number</Label>
              <Input placeholder="Enter your Orange Money number" />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => setShowModal(false)}>
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionPlans;

