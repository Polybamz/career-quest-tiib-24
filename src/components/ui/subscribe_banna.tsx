import { Card, CardHeader, CardTitle } from "./card"
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import React from "react";
import SubscriptionPlans from "./subscriptions_plan";
const SubscribeBanna: React.FC = () => {
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate()
    const handleClick = () => {
        setShow(!show);
        // navigate('/employers')
    }
return (
    <Card className="w-full border-2 border-yellow-700 bg-yellow-100 min-h-16">
        <CardHeader className="flex justify-center">
              <div>To post a job, please subscribe to one of our plans.
Subscribing helps you reach qualified talent faster and keeps the platform high-quality</div>
            <Button variant="outline" onClick={handleClick} className="ml-auto">{!show? ' View plans 👑' : 'Close plans'   }</Button>
 {show && <SubscriptionPlans />}
        </CardHeader>
       

    </Card>

)
}
export default SubscribeBanna;