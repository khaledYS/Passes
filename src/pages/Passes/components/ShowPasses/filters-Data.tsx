import React, { Attributes, FC, HTMLAttributes, ReactNode } from "react";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { BsDashSquareFill, BsFacebook, BsInstagram, BsTelephoneXFill, BsWhatsapp } from "react-icons/bs"
import {SiGmail, SiTiktok, SiTwitter} from "react-icons/si"
import {SlSocialTwitter} from 'react-icons/sl'
import {FaAppStoreIos, FaGooglePlusSquare, FaSnapchatSquare, FaTwitterSquare, FaWhatsappSquare} from "react-icons/fa"
import {RiInstagramFill} from 'react-icons/ri'
import {MdEmail} from 'react-icons/md'
import {BiUserCircle} from "react-icons/bi"
import {DiGhostSmall} from "react-icons/di"
import { Variants } from "framer-motion";

interface platformOptProps{
    platformOptLabel: string,
    platformOptIcon: React.ReactElement
}

const PlatformOpt:FC<platformOptProps> = ({platformOptLabel, platformOptIcon})=>{

    return (
        <option value={platformOptLabel} aria-label={platformOptLabel} className="w-full h-full flex ">
            {platformOptIcon} {platformOptLabel}
        </option>
    )
}

interface PlatformIconProps {
    IconPassed: JSX.Element
}
const PlatefomrIcon:FC<PlatformIconProps> = ({IconPassed})=>{
    return (
        <div className="text-black text-2xl" >
            {IconPassed}
        </div>
    )
}

export const platforms:Array<{label: string, Icon: ReactNode, id:number}> = [
    
    {
        label: "All",
        Icon: (attr:Attributes)=>{return <DiGhostSmall {...attr} />},
        id: 0
    },
    {
        label: "Instagram",
        Icon: (attr:Attributes)=>{return <RiInstagramFill {...attr} />},
        id: 1
    },
    {
        label: "Whatsapp",
        Icon: (attr:Attributes)=>{return <FaWhatsappSquare {...attr} />},
        id: 2
    },
    {
        label: "Twitter",
        Icon: (attr:Attributes)=>{return <FaTwitterSquare {...attr} />},
        id: 3
    },
    {
        label: "Gmail",
        Icon: (attr:Attributes)=>{return <FaGooglePlusSquare {...attr} />},
        id: 4
    },
    {
        label: "FaceBook",
        Icon: (attr:Attributes)=>{return <BsFacebook {...attr} />},
        id: 5
    },
    {
        label: "TikTok",
        Icon: (attr:Attributes)=>{return <SiTiktok {...attr} />},
        id: 6
    },
    {
      label: "Snapchat",
      Icon: (attr:Attributes)=>{return <FaSnapchatSquare {...attr} />},
      id: 8
    },
    {
        label: "Others",
        Icon: (attr:Attributes)=>{return <FaAppStoreIos {...attr} />},
        id: 999
    }
]


export const choosePlatform = (platform:string)=>{
  let res = null;
  platforms.forEach(e=>{
    if(e.label.toLowerCase() == platform.toLowerCase()){
      res = e;
    }
  })
  return res;
}

export const userTypes:Array<{label: string, Icon: ReactNode, id:number, value: string}> = [
    {
        label: "All", 
        value: "All", 
        Icon: <PlatefomrIcon IconPassed={<DiGhostSmall />} />,
        id: 0
    },
    {
        label: "Phone Number",
        value: "PhoneNumber",
        Icon: <PlatefomrIcon IconPassed={<BsTelephoneXFill /> } />,
        id: 1
    },
    {
        label: "Email",
        value: "Email",
        Icon: <PlatefomrIcon IconPassed={<MdEmail /> } />,
        id: 2
    },
    {
        label: "Username",
        value: "Username",
        Icon: <PlatefomrIcon IconPassed={<BiUserCircle /> } />,
        id: 3
    },
]


export const  modalContainerVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 11,
        staggerDirection: -1,
        delay: 0.5,
      },
      opacity: 0,
    },
  };

  export const  containerVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        delay: 0.25,
      },
      opacity: 0,
    },
  };
  export const  inputContainerVariants: Variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
        staggerDirection: -1,
      },
    },
  };
  export const  inputVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  export const styleFilterInput = {
    cursor: "pointer",
    ".MuiInputLabel-root":{
        color: "#d5cfcf !important"
    },
    "& .MuiAutocomplete-root:hover":{
        ".MuiOutlinedInput-notchedOutline ":{
            border:"2px orange solid !important"
        }
    },
    "& .MuiTextField-root:hover":{
      ".MuiOutlinedInput-notchedOutline ":{
        border:"2px orange solid !important"
      }
    },
    ".MuiOutlinedInput-notchedOutline":{
        border:"2px #fff solid !important"
    },
    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
        border:"2px orange solid !important"
    },
    "& .MuiIconButton-root":{
        color:"white !important"
    },
    "& input":{
        color:"#fff !important"
    }, 
    "& .MuiInputBase-input": {
        '&:not([placeholder="custom platform (required)" ]) ': {
          cursor: "pointer",
        }
    }
  };