import { signOut } from "@firebase/auth";
import { FC } from "react";
import Nav from "../../components/Nav/Nav";
import { app, FRauth } from "../../firebase";

interface MyAccountProps {
    
}
 
const MyAccount:FC<MyAccountProps> = () => {
    return (
        <>
            <Nav sticky />
            <div onClick={()=>{
                signOut(FRauth)
            }}>

                this is my account
            </div>
        </>
    );
}
 
export default MyAccount   ;