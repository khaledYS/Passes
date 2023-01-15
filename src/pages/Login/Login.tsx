import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth/Auth";
import {FcGoogle} from "react-icons/fc"
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { FRauth } from "../../firebase";

interface LoginProps {
    
}
 
const Login:FC<LoginProps> = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    
    console.log(auth)
    async function loginWithGoogle() {
        try{
            const provider = new GoogleAuthProvider();
            let user = await signInWithRedirect(FRauth, provider);
        }catch(err){
            // @ts-ignore
            console.log(err.code)
        }
    }

    useEffect(() => {
        if(auth?.user){
            console.log("User already signed in, to sign in with another account please logout from the current account. redircting....");
            navigate("/");
        }
    }, [auth]);


    return (
        (!auth?.user ?
            <div className="LoginComponent grid place-items-center flex-1">
                <button onClick={()=>{
                    (async ()=>{
                        await loginWithGoogle();
                    })();
                }} className="flex items-center justify-center gap-2 px-4 p-2 bg-[#e4e4e4] rounded-xl filter transition-all hover:brightness-75 ">
                    <FcGoogle className="text-4xl" />   Continue with Google
                </button>
            </div>
            : null
        )
    )
}
 
export default Login;