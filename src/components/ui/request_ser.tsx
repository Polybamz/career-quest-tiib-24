import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";
import { Textarea } from "./textarea";



function ServiceRequestDialog({ showModal, setShowModal, plan, amount }: any) {
  const [method, setMethod] = useState("CARD");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("")

  return (
    <Dialog open={showModal} onOpenChange={setShowModal} >
      <DialogContent className=" overflow-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{plan}</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to complete your subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* <div className="grid gap-2">
            <Label>Plan</Label>
            <Input value={plan} disabled className="bg-muted" />
          </div> */}

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
          <div className="grid gap-2">
            <Label>Descryption</Label>
            <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
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

export default ServiceRequestDialog;

