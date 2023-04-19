import { User, UserCredential, UserInfo } from "@firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { createContext, FC, useState } from "react";

interface AuthProps {
    
}

export interface AuthContextProps {
    user : User | 0 | null,
    setUser: Dispatch<SetStateAction<User | 0 | null>>;
}

export const AuthContext = createContext<{user: User | 0 | null; setUser:Dispatch<SetStateAction<User | 0 | null>>} | null>(null);

const Auth:FC<AuthProps> = ({children}) => {

    const [user, setUser] = useState<User | 0 | null>(null);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default Auth;