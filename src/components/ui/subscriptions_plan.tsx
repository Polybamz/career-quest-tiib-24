import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "./label";
import { useState } from "react";
import { Input } from "./input";
import { useAuth } from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscribe";
import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOneTimeModal, setShowOneTimeModal] = useState(false);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

  const [amount, setAmount] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [days, setDays] = useState<number>(1);

  const { user } = useAuth();
  const twentyP = 0.2
  // ---------------------------
  //  Subscription Plans
  // ---------------------------
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
      price: `$${80 * 60 / 100}`,
      period: "Bi-Anual",
      description: "Ideal for growing companies",
      features: [
        "Post up to 15 jobs per month",
        "Access to candidate profiles",
        "Basic applicant tracking",
        "Email support",
        "30-day job listing duration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: `$${90 * (10 * 12) / 100}`,
      period: "Annual",
      description: "For large organizations",
      features: [
        "10% off",
        "Post up to 25 jobs per month",
        "Access to candidate profiles",
        "Basic applicant tracking",
        "Email support",
        "30-day job listing duration"
      ],
      popular: false
    }
  ];

  // ---------------------------
  // Handle Subscription Click
  // ---------------------------
  const handleSubscriptionClick = (planName: string, price: string) => {
    const numeric = Math.round(parseInt(price.replace(/[^\d]/g, "")));

    setAmount(numeric.toLocaleString());
    setPlan(planName);

    // if (!user) {
    //   setOpenLoginPrompt(true);
    //   return;
    // }

    setShowModal(true);
  };

  // ---------------------------
  // Handle One-Time Job Posting
  // ---------------------------
  const handleOneTimeClick = (type: "Premium" | "Standard") => {
    const rate = type === "Premium" ? 5000 : 3000;
    setPlan(type);
    // setAmount((rate * days).toLocaleString());

    // if (!user) {
    //   setOpenLoginPrompt(true);
    //   return;
    // }

    setShowOneTimeModal(true);
  };

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>

      {/* GRID: Subscriptions + One-Time Job Post */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* LEFT: One-Time Job Posting */}
        <Card className="border-2 border-indigo-300 bg-indigo-50 h-fit">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">Post a Job Without Subscription</CardTitle>
            <CardDescription>
              Promote your job instantly without any long-term plan.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* Days selection */}
            <div>
              <Label>Number of Days</Label>
              <Input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
              />
            </div>

            {/* PREMIUM */}
            <Card className="p-4 border-primary border-2 bg-white">
              <p className="font-semibold text-lg">Premium – {5000*days} XAF/day</p>
              <p className="text-sm text-muted-foreground">
                Appears on top of job search + emailed to all job seekers.
              </p>
              <Link to = {`/add-job/${5000*days}/${days}/premium`}>
              <Button
                className="mt-3 w-full"
                onClick={() => handleOneTimeClick("Premium")}
              >
                Post Premium Job
              </Button>
              </Link>
              
            </Card>

            {/* STANDARD */}
            <Card className="p-4 bg-white border">
              <p className="font-semibold text-lg">Standard – {3000*days} XAF/day</p>
              <p className="text-sm text-muted-foreground">
                Good visibility at an affordable rate.
              </p>
              <Link to = {`/add-job/${3000*days}/${days}/standard`}>
              <Button
                variant="outline"
                className="mt-3 w-full"
                onClick={() => handleOneTimeClick("Standard")}
              >
                Post Standard Job
              </Button>
              </Link>
            </Card>

          </CardContent>
        </Card>
        {/* RIGHT: Subscription Plans (3 columns) */}
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
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
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscriptionClick(plan.name, plan.price)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>

      {/* Subscription Modal */}
      <SubscriptionDialog
        showModal={showModal}
        setShowModal={setShowModal}
        plan={plan}
        amount={amount}
        duration={plan === 'Starter' ? 30 : plan === 'Professional' ? 180 : 365}
      />
      {/* <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to {plan}</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm">Amount: ₦{amount}</p>

          <DialogFooter>
            <Button className="w-full">Proceed to Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* One-Time Job Posting Modal */}
      <Dialog open={showOneTimeModal} onOpenChange={setShowOneTimeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{plan} Job Posting</DialogTitle>
          </DialogHeader>

          <p className="text-sm mb-2">Days: {days}</p>
          <p className="font-semibold text-lg mb-4">Amount: {amount} XAF</p>

          <DialogFooter>
            <Button className="w-full">Proceed to Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Login Prompt */}
      <Dialog open={openLoginPrompt} onOpenChange={setOpenLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <p>You need to be logged in to continue.</p>
          <DialogFooter>
            <Link to="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};



function SubscriptionDialog({ showModal, setShowModal, plan, amount, duration }: any) {
  const [method, setMethod] = useState("MOMO");
  const [email, setEmail] = useState('');
  const [transactionId, setTransactionId] = useState('')
  const { createSubscription, subscriptionState } = useSubscription()
  const { user } = useAuth()

  const [dataError, setDataErro] = useState({
    email: null,
    transactionId: null
  })
  const handleSubmit = async () => {
    if (!email || !transactionId) {
      setDataErro({ email: email ? null : 'Email is required', transactionId: transactionId ? null : 'Transaction Id required' })
      return;
    }

    const payload = {
      employerId: user['uid'],
      plan: plan,
      duration: duration,
      startDate: Date(),
      transactionId: transactionId
    }

    await createSubscription({ ...payload })

  }

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
          <div className="flex gap-2">
            <div className="grid gap-2">
              <Label>Plan</Label>
              <Input value={plan} disabled className="bg-muted" />
            </div>

            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input value={`$${amount} `} disabled className="bg-muted" />
            </div>
            <div className="grid gap-2">
              <Label>Duration</Label>
              <Input value={`${duration} days`} disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {dataError.email && <p className="text-red-400 italic text-sm">{dataError.email}</p>}
          </div>
          {/* 
          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              placeholder="e.g. 670000000" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div> */}

          <Tabs value={method} onValueChange={setMethod} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              {/* <TabsTrigger value="CARD">CARD <CreditCard size={18} className="text-blue-400 ml-2" /> </TabsTrigger> */}
              <TabsTrigger value="MOMO">MOMO</TabsTrigger>

              <TabsTrigger value="OrangeMoney">Orange Money</TabsTrigger>
            </TabsList>

            <TabsContent value="MOMO" className="space-y-2 mt-3">
              <Label>MOMO Number</Label>
              <p>Dial <strong>*126#</strong> send ${amount}/{600 * amount}XAF to 681095720</p>
              <p>Copy the transaction ID and submit </p>
              <Input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter your MOMO transaction ID" />
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
              <p></p>
              <Input placeholder="Enter your Transaction ID" />
            </TabsContent>
            {dataError.transactionId && <p className="text-red-400 italic text-sm">{dataError.transactionId}</p>}

          </Tabs>
        </div>
        {subscriptionState.error && <p className="text-red-400">{subscriptionState.error}</p>}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {subscriptionState.loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const CheckUserDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogDescription className="mb-4">Please log In or create an account to complete your subscription</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}   >Cancel</Button>
          <Link to={`/auth/employers`} onClick={() => setOpen(false)}>
            <Button >Sign In/Sign Up</Button>
          </Link>

        </DialogFooter>
      </DialogContent>

    </Dialog>
  )

}

export default SubscriptionPlans;

