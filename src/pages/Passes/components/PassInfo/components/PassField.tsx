import { Tooltip } from "@mui/material";
import ComparePasser from "components/ComparePasser/ComparePasser";
import { AES, enc } from "crypto-js";
import { FunctionComponent, useEffect, useState } from "react";
import { BiCopy, BiCopyAlt, BiCopyright } from "react-icons/bi";
import { BsFillFileEarmarkLock2Fill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { Navigate } from "react-router";

interface PassFieldProps {
  fieldName: string;
  fieldValue: string;
  disableCopy?: boolean | undefined;
}

const PassField: FunctionComponent<PassFieldProps> = ({
  fieldName,
  fieldValue,
  disableCopy=false,
}) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);
  const [tooltipIsClicked, setTooltipIsClicked] = useState<boolean>(false);
  const [locked, setLocked] = useState<boolean>(true);
  const [passPassword, setPassPassword] = useState<string | null>(null);
  const [PasserComp, [showPasserComp, setShowPasserComp], [passerFUser]] =
    ComparePasser(
      // if the passer comp checks passer and it ended up with the correct passer, then decrypt the passer and assign it to teh passPassword state
      async (correctPasserFUser:string) => {
        const res = await AES.decrypt(fieldValue, correctPasserFUser).toString(enc.Utf8);
        setPassPassword(res);
        setLocked(false)
      },
      () => {},
      false
    );

  // function to copy the text;
  const copyField = async () => {
    await navigator.clipboard.writeText(passPassword!);
    setTooltipIsClicked(true);
  };

  useEffect(() => {
    // animate the tooltip after clicking it, so it can show the "copied" text. so to not be closed immdiately but instead must wait 800ml;
    if (tooltipIsClicked) {
      setTimeout(() => {
        setTooltipIsClicked(false);
        setTooltipIsOpen(false);
      }, 800);
    }
  }, [tooltipIsClicked]);
  
  return (
    <div className="bg-white border-pink-700 border-4 my-3 flex rounded-xl select-none text-2xl max-sm:text-xl">
      <div className="whitespace-nowrap px-2 flex items-center text-black rounded-lg w-full">

        <div className=" pr-2 border-pink-700 border-r-2 h-full fieldname-shadow py-2 grid place-items-center">
          {fieldName}
        </div>{" "}

        {/**
         * this conditions goes like this: 
         * if (pass password is encrypted){
         *    if(the lock-button clicked){
         *       show the passer comp
         *    }else if(the lock-button hasn't been clicked){
         *      show the lock-button icon
         *    }
         * }else if(pass password has been decrypted and ready to display){
         *    show the decrypted pass password
         * }
         */}
        {locked && !passPassword ? (
          showPasserComp ? (
            <div className="w-full h-full my-2 mx-2 grid place-items-center">
              <PasserComp />
            </div>
          ) : (
            <div
              onClick={() => {
                setShowPasserComp(true)
              }}
              className="cursor-pointer backdrop-filter transition-all hover:backdrop-brightness-75   w-full h-full grid place-items-center">
              <BsFillFileEarmarkLock2Fill className="text-red-600" />
            </div>
          )
        ) : (
          <div className=" py-1 pl-2">{passPassword}</div>
        )}

      </div>

      {!locked && !disableCopy ? (
        <div
          onClick={copyField}
          className="cursor-pointer text-black  flex items-center mx-2 border-pink-700 border-l-2 pl-1 fieldname-shadow-reversed ">
          <Tooltip
            className=""
            title={
              <div className="text-base">
                {tooltipIsClicked ? "copied !!" : "copy"}
              </div>
            }
            placement="top"
            open={tooltipIsOpen}
            arrow>
            <div
              onClick={copyField}
              onMouseOver={() => {
                setTooltipIsOpen(true);
              }}
              onMouseLeave={() => {
                if (tooltipIsClicked) {
                  setTooltipIsOpen(true);
                } else {
                  setTooltipIsOpen(false);
                }
              }}>
              <IoCopyOutline />
            </div>
          </Tooltip>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PassField;
