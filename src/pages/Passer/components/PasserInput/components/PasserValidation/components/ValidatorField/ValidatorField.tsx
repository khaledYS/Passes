import { FunctionComponent } from "react";
import {
  BsCheck,
  BsCheckCircle,
  BsCheckCircleFill,
  BsXCircle,
  BsXCircleFill,
} from "react-icons/bs";
import { FaMehBlank, FaRegMehBlank } from "react-icons/fa";

interface ValidatorFieldProps {
  name: string;
  value: string;
  check: boolean;
}

const ValidatorField: FunctionComponent<ValidatorFieldProps> = ({
  name,
  value,
  check,
}) => {
  return (
    <div className="flex flex-row text-xl items-center text-white my-4 transition-all">
      {check === null ? (
        <FaRegMehBlank className="text-white text-2xl" />
      ) : check ? (
        <BsCheckCircleFill className="text-thirdary-800 text-2xl" />
      ) : (
        <BsXCircle className="text-red-500 text-2xl" />
      )}
      <div className="ml-4">{value}</div>
    </div>
  );
};

export default ValidatorField;
