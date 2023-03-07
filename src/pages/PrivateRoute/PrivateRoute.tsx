import React, { FC, ReactNode, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth/Auth";

interface PrivateRouteProps {
}
 
const PrivateRoute:FC<PrivateRouteProps> = ({children}) => {
    
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if(auth?.user === 0){
            console.log("This is a protected Route and requires authenticated users. redircting....")    
            navigate("/login")
        }
    }, [auth]);

    return (
        (auth?.user ? 
            <div className="PrivateRoute w-full h-full">
                {children}
            </div>
            : null
        )
    )

}
 
export default PrivateRoute;