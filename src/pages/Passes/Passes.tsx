import { FunctionComponent } from "react";
import { signOut } from "firebase/auth";
import { FRauth } from "../../firebase";
import Nav from "../../components/Nav/Nav";
import { Outlet } from "react-router";

interface PassesProps {
    
}
 
const Passes:FunctionComponent<PassesProps> = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <Nav/>
            <div className="Passses w-full flex-1 overflow-hidden">
                <Outlet />
            </div>
        </ div>
    );
}
 
export default Passes;