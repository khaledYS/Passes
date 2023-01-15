import { FC } from "react";
import Nav from "../../components/Nav/Nav";

interface RootProps {
    
}
 
const Root:FC<RootProps> = () => {
    return (
        <>
            <Nav sticky/>
            <div className="w-full flex-grow overflow-auto grid place-items-center">
                <div className="text-[6vw] roboto-font text-white italic">
                    Manage your <span className="line-through" style={{textDecorationColor:"red"}}>Passwords</span> <span className="text-[#0fff07]">Passes</span>.
                </div>
            </div>
        </>
    );
}
 
export default Root;