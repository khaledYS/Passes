import { User, UserCredential, UserInfo } from "@firebase/auth";
import { createContext, FC, useState } from "react";

interface LoadingProps {
    
}

interface LoadingContextProps {
    isLoading :boolean
    setIsLoading: Function
}

export const LoadingContext = createContext<LoadingContextProps | null>(null);

const Loading:FC<LoadingProps> = ({children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}
 
export default Loading;