import { FC } from "react";
import {} from "@firebase/firestore"

interface PassProps {
    passData: passDataProps
}

interface passDataProps {
    id: string,
    username: string,
    password?: string,
    platform: string,
    type: string,
    createdAt: Date
}

const Pass:FC<PassProps> = ({passData}) => {
    // console.log(passData)
    return (
        <div className="bg-[#36454f] my-2">
            id: <h1>{passData.id}</h1>
            username: <h1>{passData.username}</h1>
            password: <h1>{passData.password}</h1>
            platform: <h1>{passData.platform}</h1>
            type: <h1>{passData.type}</h1>
            createdAt:
             <h1>{passData.createdAt.toLocaleString()}</h1>
        </div>
    );
}
 
export default Pass;