import { TextField } from "@mui/material";
import { ChangeEvent, Dispatch, DispatchWithoutAction, FunctionComponent, SetStateAction, useState } from "react";
import PasserValidation from "./components/PasserValidation/PasserValidation";

interface PasserInputProps {
  setStrengthMeter: Dispatch<SetStateAction<0 | 1 | 2>>;
  strengthMeter?: 0|1|2;
}

const PasserInput: FunctionComponent<PasserInputProps> = ({strengthMeter, setStrengthMeter}) => {
  const [passerValue, setPasserValue] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <div className="flex flex-col mx-auto mt-9">
        <div className="flex justify-between">
            <input
                type="text"
                lang="en"
                placeholder="Enter your Password "
                pattern="[a-zA-Z]*"
                className={`min-w-[350px] w-full center-placeholder transition-all duration-300 px-2 py-3 rounded-md border-[.4rem] text outline-none text-lg font-extrabold ${strengthMeter === 0 ? "border-red-500" : strengthMeter === 1 ? "border-secondary-base" : "border-thirdary-800"} `}
                value={passerValue}
                onInput={(val: ChangeEvent<HTMLInputElement>) => {
                setPasserValue(val.target.value);
                }}
            />
        </div>

      <div className="flex flex-col mx-auto">
          <PasserValidation {...{passerValue, setPasserValue, isValid, setIsValid, setStrengthMeter} }/>
      </div>
    </div>
  );
};

export default PasserInput;
