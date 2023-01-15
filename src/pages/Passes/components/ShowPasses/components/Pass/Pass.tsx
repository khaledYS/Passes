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
    return (
        <div>
            <h1>{passData.id}</h1>
            <h1>{passData.username}</h1>
            <h1>{passData.password}</h1>
            <h1>{passData.platform}</h1>
            <h1>{passData.type}</h1>
            <h1>{passData.createdAt.toLocaleString()}</h1>
        </div>
    );
}
 
export default Pass;