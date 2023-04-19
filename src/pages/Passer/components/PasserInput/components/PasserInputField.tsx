import { Tooltip } from "@mui/material";
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface PasserInputFieldProps {
    strengthMeter: 0 | 1 | 2 | undefined;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder: string;
}
 
const PasserInputField: FunctionComponent<PasserInputFieldProps> = ({
    strengthMeter, value, setValue, placeholder
}) => {
    return (
      <input
      type="text"
      lang="en"
      placeholder={placeholder}
      pattern="[a-zA-Z]*"
      className={` mb-3 kh min-w-[200px] w-full center-placeholder transition-all duration-300 px-2 py-3 rounded-md border-[.4rem] text outline-none text-lg font-extrabold ${
        strengthMeter === 0
          ? "border-red-500"
          : strengthMeter === 1
          ? "border-secondary-base"
          : "border-thirdary-800"
      } `}
      value={value}
      onInput={(val: ChangeEvent<HTMLInputElement>) => {
          setValue(val.target.value);
      }}
    />
    );
}
 
export default PasserInputField;