import { Headphones, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";


const ContactButton = () =>{
    return (
        <div className="fixed bottom-10 right-10">
            <Link to={'/contact'}>
               <div className="h-12 w-12 rounded-full shadow-lg  bg-primary/60 text-white flex justify-center items-center">
               <div className="p-[8px] absolute top-0 right-2 rounded-full bg-blue-500"></div>
                <MessageCircle/>
               </div>
               <p className="text-primary font-bold shadow-sm">Contact</p>
            </Link>
            
        </div>
    )
}

export default ContactButton;
