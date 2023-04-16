import Nav from "components/Nav/Nav";
import { AuthContext } from "contexts/Auth/Auth";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Intro from "./components/Intro/Intro";
import PasserInput from "./components/PasserInput/PasserInput";

interface PasserProps {
    
}
 
const Passer:FunctionComponent<PasserProps> = () => {
    const auth = useContext(AuthContext)
    const [strengthMeter, setStrengthMeter] = useState<0 | 1 | 2>(0);
    useEffect(() => {
        console.log(auth)
    }, []);
    return (
        <div className="w-full h-full flex flex-col">
            <Nav />
            <div className="bg-fifthdary-500 grow w-full flex justify-start flex-col ">
                <Intro />
                <PasserInput {...{strengthMeter, setStrengthMeter}} />
            </div>   
        </div>
    );
}
 
export default Passer;