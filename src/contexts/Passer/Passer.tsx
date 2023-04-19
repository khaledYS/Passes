import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface PasserProps {
    
}
export interface PasserContextProps{
    passer: string | undefined | null;
    setPasser: Dispatch<SetStateAction<string | undefined | null > >;
}

export const PasserContext = createContext<PasserContextProps | null | undefined>(undefined);

const Passer:FC<PasserProps> = ({children}) => {

    /**
     * undefined means is hasn't been declared
     * null means the user doesn't have a passer
     * string:value means the user has a passer
     */
    const [passer, setPasser] = useState<undefined | null | string>(undefined);

    return (
        <PasserContext.Provider value={{passer, setPasser}}>
            {children}
        </PasserContext.Provider>
    );
}
 
export default Passer;