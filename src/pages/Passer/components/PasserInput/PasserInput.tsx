import { TextField, Tooltip } from "@mui/material";
import Loader from "components/Loader/Loader";
import {
  ChangeEvent,
  Dispatch,
  DispatchWithoutAction,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import NextButton from "./components/NextButton";
import PasserInputField from "./components/PasserInputField";
import PasserValidation from "./components/PasserValidation/PasserValidation";

interface PasserInputProps {
  setStrengthMeter: Dispatch<SetStateAction<0 | 1 | 2>>;
  strengthMeter?: 0 | 1 | 2;
}

const PasserInput: FunctionComponent<PasserInputProps> = ({
  strengthMeter,
  setStrengthMeter,
}) => {
  const [passerValue, setPasserValue] = useState("");
  const [_passerValue, _setPasserValue] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col mx-auto mt-3">
        <Loader {...{isLoading, setIsLoading, wrapperClassName:"px-3 py-2 flex justify-between items-center"}}>
          <div className="flex flex-col">
              <PasserInputField {...{placeholder: "Enter your password", strengthMeter, setValue: setPasserValue, value: passerValue}} />
              <PasserInputField {...{placeholder: "Confirm the password", strengthMeter, setValue: _setPasserValue, value: _passerValue}} />
          </div>
          <NextButton {...{passerValue, _passerValue, strengthMeter, setIsLoading, isLoading}} />
          </Loader>

        <div className="flex flex-col mx-auto">
          <PasserValidation
            {...{
              passerValue,
              _passerValue,
              setPasserValue,
              isValid,
              setIsValid,
              setStrengthMeter,
            }}
          />
        </div>
      </div>
  );
};

export default PasserInput;
