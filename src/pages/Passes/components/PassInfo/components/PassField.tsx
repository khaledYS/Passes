import { Tooltip } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { BiCopy, BiCopyAlt, BiCopyright } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { Navigate } from "react-router";

interface FieldProps {
  fieldName: string | undefined;
  fieldValue: string | undefined;
  disableCopy?: boolean | undefined;
}

const Field: FunctionComponent<FieldProps> = ({ fieldName, fieldValue, disableCopy}) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);
  const [tooltipIsClicked, setTooltipIsClicked] = useState<boolean>(false);
  const [locked, setLocked] = useState<boolean>(true);
  const copyField = async () => {
    await navigator.clipboard.writeText(fieldValue!);
    setTooltipIsClicked(true);
  };

  useEffect(() => {
    if(tooltipIsClicked){
      setTimeout(()=>{
        setTooltipIsClicked(false)
        setTooltipIsOpen(false)
      }, 800)
    }
  }, [tooltipIsClicked]);
  return (
    <div className="bg-white border-pink-700 border-4 my-3 flex justify-between rounded-xl select-none text-2xl max-sm:text-xl">
      <div className="whitespace-nowrap px-2 flex items-center justify-between text-black rounded-lg">
        <div className=" pr-2 border-pink-700 border-r-2 h-full fieldname-shadow py-2">
          {fieldName}
        </div>{" "}
        <div className=" py-1 pl-2">{fieldValue}</div>
      </div>
      {!disableCopy && 
      <div
        onClick={copyField}
        className="cursor-pointer text-black  flex items-center mx-2 border-pink-700 border-l-2 pl-1 fieldname-shadow-reversed "
      >
        <Tooltip className="" title={<div className="text-base">{tooltipIsClicked ? "copied !!" : "copy"}</div>} placement="top" open={tooltipIsOpen} arrow>
          <div
            onClick={copyField}
            onMouseOver={() => {
              setTooltipIsOpen(true);
            }}
            onMouseLeave={() => {
              if(tooltipIsClicked){
                setTooltipIsOpen(true);
              }else{
                setTooltipIsOpen(false);
              }
            }}
          >
            <IoCopyOutline />
          </div>
        </Tooltip>
      </div>
      }
    </div>
  );
};

export default Field;
