
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MailchimpSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  // ⚠️ Put your Mailchimp API key and List ID here
  const API_KEY = "4ea951a627cfd2f9b55c008e4e9b38d0-us11"; // e.g. "abcd1234-us21"
  const LIST_ID = "171685417e"; // e.g. "1a2b3c4d5e"
  const DATACENTER = API_KEY.split("-")[1]; // gets "us21" part from key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${API_KEY}`, // Mailchimp requires "apikey" format
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      });

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        const errorData = await res.json();
        setStatus(errorData.detail || "Subscription failed");
      }
    } catch (err) {
      setStatus(err.message || "Subscription failed");
    }
  };

  return (
    <section className="py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Stay Updated</CardTitle>
          <CardDescription>
            Get the latest job opportunities and career tips delivered to your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          {status === "success" && (
            <p className="text-sm text-green-600 mt-2 text-center">
              🎉 Subscribed successfully! Check your inbox.
            </p>
          )}
          {status && status !== "success" && status !== "loading" && (
            <p className="text-sm text-red-600 mt-2 text-center">
              ⚠️ {status}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
