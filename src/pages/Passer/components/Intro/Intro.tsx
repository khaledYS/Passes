import { FC } from "react";

interface IntroProps {
    
}
 
const Intro:FC<IntroProps> = () => {
    return (
        <>
            <h1 className="mt-5 text-secondary-base text-5xl text-center font-bold">Hold On....</h1>
            <p className="mt-2 text-center font-extrabold text-gray-100 px-4">
                Before getting in Passes, you MUST create a passer.<br/>
                A passer is the key that you use to get into your account <br/> and also encrypt the passwords you stored.<br/>
                <span className="text-red-500">NOTE:</span> store your password in a secure place, because this key is the only way to get into your account.
            </p>
        </>
    );
}
 
export default Intro;