import { Attributes, createElement, FC } from "react";
import { Timestamp } from "@firebase/firestore"
import { choosePlatform } from "../../filters-Data";
import { ReactJSXElementAttributesProperty } from "@emotion/react/types/jsx-namespace";
import PrintDate from "../../../../../../components/PrintDate/PrintDate";
import { FaAppStoreIos } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { BiWindowOpen } from "react-icons/bi";

interface PassProps {
    passData: passDataProps
}

interface passDataProps {
    id: string;
    username: string;
    password?: string;
    platform: string;
    type: string;
    createdAt:{
        nanoseconds: number;
        seconds: number;
    }
}
const Pass:FC<PassProps> = ({passData}) => {
    
    let username = passData.username;
    if(username.length > 10){
        username = username.slice(0, 10) + "...";
    }

    let timestampFromServer = passData.createdAt;
    let timestamp_ = Number(`${timestampFromServer.seconds}`+`${(timestampFromServer.nanoseconds / 1000000)}`);
    let timestamp = new Date(timestamp_);

    const platform = choosePlatform(passData.platform) || null;
    function Icon(rest:Array<Attributes>) {
        // @ts-ignore
        return platform ? <platform.Icon {...rest} /> : (<FaAppStoreIos className="text-[#FCFCFC] bg-transparent px-1 rounded-lg text-5xl" />)
    }
    return (
        <div className="bg-[#5B6078] my-1 text-white w-full px-2 py-3 mx-auto rounded-lg flex items-center justify-between pr-4">
            <div className="mr-4">
                {/* @ts-ignore */}
                <div><Icon className="text-[#FCFCFC] text-5xl" /></div>
            </div>
            <div className="flex flex-col justify-start w-full">
                <span className="text-2xl">{passData.platform}</span>
                <span className="text-gray-300 ml-2">{username} - {passData.type} </span>
            </div>
            <div className="flex flex-col items-center justify-center ml-4">
                {/* @ts-ignore */}
                <PrintDate className="text-gray-400" timestamp={timestamp} />
                <Link to={passData.username}>
                    <IconButton >
                        <BiWindowOpen className="text-[#4fd634] text-2xl" />
                    </IconButton>
                </Link>
            </div>
        </div>
    );
}
 
export default Pass;