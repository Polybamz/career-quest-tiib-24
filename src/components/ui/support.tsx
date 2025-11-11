import { Headphones } from "lucide-react";
import { Link } from "react-router-dom";


const ContactButton = () =>{
    return (
        <div className="fixed bottom-10 right-10">
            <Link to={'/contact'}>
               <div className="h-16 w-16 rounded-full  bg-primary/40 text-white flex justify-center items-center">
                <Headphones/>
               </div>
            </Link>
            
        </div>
    )
}

export default ContactButton;
