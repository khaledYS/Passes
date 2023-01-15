import React, { FC, ReactNode } from "react";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { BsDashSquareFill, BsFacebook, BsInstagram, BsTelephoneXFill, BsWhatsapp } from "react-icons/bs"
import {SiGmail, SiTiktok, SiTwitter} from "react-icons/si"
import {SlSocialTwitter} from 'react-icons/sl'
import {FaGooglePlusSquare, FaTwitterSquare, FaWhatsappSquare} from "react-icons/fa"
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
        Icon: <PlatefomrIcon IconPassed={<DiGhostSmall /> } />,
        id: 0
    },
    {
        label: "Instagram",
        Icon: <PlatefomrIcon IconPassed={<RiInstagramFill /> } />,
        id: 1
    },
    {
        label: "Whatsapp",
        Icon: <PlatefomrIcon IconPassed={<FaWhatsappSquare /> } />,
        id: 2
    },
    {
        label: "Twitter",
        Icon: <PlatefomrIcon IconPassed={<FaTwitterSquare /> } />,
        id: 3
    },
    {
        label: "Gmail",
        Icon: <PlatefomrIcon IconPassed={<FaGooglePlusSquare /> } />,
        id: 4
    },
    {
        label: "FaceBook",
        Icon: <PlatefomrIcon IconPassed={<BsFacebook /> } />,
        id: 5
    },
    {
        label: "TikTok",
        Icon: <PlatefomrIcon IconPassed={<SiTiktok /> } />,
        id: 6
    },
    {
        label: "Others",
        Icon: <PlatefomrIcon IconPassed={<BsDashSquareFill /> } />,
        id: 7
    }
]


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