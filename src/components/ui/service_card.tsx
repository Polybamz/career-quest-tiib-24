import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./button";
import ServiceRequestDialog from "./request_ser";
import { useState } from "react";

const ServiceCard = ({ service, index, Icon }: any) => {
    const [showDialog, setShowDialog] = useState(false)
    const [title, setTitle] = useState()
    return (
        <div className="relative px-4">
            <div className="w-full h-10 absolute z-10 right-0 left-0 shadow-lg rounded-tr-[12px] rounded-bl-[12px]  py-[2px] top-5 bg-primary">
                <div className="border-y h-full border-dashed rounded-tr-[13px] rounded-bl-[13px] flex justify-center items-center text-white ">
                    <p className=" uppercase">{service.title}</p>
                </div>
            </div>
            <div className="h-5 w-4 bg-primary  absolute rounded-br-lg  z-8 right-0 top-12 p-[2px]">
                <div className="h-full w-full border-dashed border-b border-r rounded-br-lg  "></div>
            </div>
            <div className="h-5 w-4 bg-primary absolute rounded-tl-lg  z-8 left-0 top-3 p-[2px]">
                <div className="h-full w-full border-dashed border-t border-l  rounded-tl-lg  "></div>

            </div>
            <Card key={index} className="text-center hover:shadow-lg transition-shadow fade-in-up ">

                <CardHeader>
                    <Icon className="h-12 w-12 mt-10 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter className="flex justify-center items-center"><Button variant="outline" onClick={() => {
                    setTitle(service.title)

                    setShowDialog(true)
                }} className="w-full">Request Service</Button></CardFooter>
            </Card>
            <ServiceRequestDialog
                showModal={showDialog}
                setShowModal={setShowDialog}
                plan={title}
                amount={100}
            />
        </div>
    )
}

export default ServiceCard;