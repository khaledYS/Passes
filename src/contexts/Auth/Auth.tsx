import { User, UserCredential, UserInfo } from "@firebase/auth";
import { createContext, FC, useState } from "react";

interface AuthProps {
    
}

interface AuthContextProps {
    user : UserInfo | 0 | null,
    setUser: Function
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const Auth:FC<AuthProps> = ({children}) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default Auth;