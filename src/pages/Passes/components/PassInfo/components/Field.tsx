import { FunctionComponent } from "react";
import { BiCopy, BiCopyAlt, BiCopyright } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

interface FieldProps {
  fieldName: string | undefined;
  fieldValue: string | undefined;
}

const Field: FunctionComponent<FieldProps> = ({ fieldName, fieldValue }) => {
    const copyField = ()=>{
        // must include the copy function 
        console.log("copied !!")
    }
  return (
    <div className="bg-white border-pink-700 border-4 my-3 flex justify-between rounded-xl select-none">
      <div className="whitespace-nowrap px-2 flex text-4xl items-center justify-between text-black rounded-lg">
        <div className="text-2xl pr-2 border-pink-700 border-r-2 h-full fieldname-shadow py-2">
          {fieldName}
        </div>{" "}
        <div className="text-2xl py-1 pl-2">{fieldValue}</div>
      </div>
      <div onClick={copyField} className="cursor-pointer text-black text-2xl flex items-center mx-2 border-pink-700 border-l-2 pl-1 fieldname-shadow-reversed ">
        <IoCopyOutline />
      </div>
    </div>
  );
};

export default Field;
