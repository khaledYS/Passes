import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import passwordValidator from "password-validator";
import ValidatorField from "./components/ValidatorField/ValidatorField";
import { uuidv4 } from "@firebase/util";

interface PasserValidationProps {
  passerValue: string;
  _passerValue: string;
  isValid?: boolean;
  strengthMeter?: 0 | 1 | 2;
  setPasserValue?: Dispatch<SetStateAction<string>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setStrengthMeter: Dispatch<SetStateAction<0 | 1 | 2>>;
}

const PasserValidation: FunctionComponent<PasserValidationProps> = ({
  passerValue,
  _passerValue,
  isValid,
  setPasserValue,
  setIsValid,
  setStrengthMeter,
}) => {
  const validators: Array<{ name: string; value: string }> = [
    {
      name: "min",
      value: "Must be at lease 12 characters",
    },
    {
      name: "uppercase",
      value: "Contains at least 3 uppercases ",
    },
    {
      name: "lowercase",
      value: "Contains at least 3 lowercases ",
    },
    {
      name: "digits",
      value: "Contains at least 3 digits ",
    },
    {
      name: "spaces",
      value: "Must not contain spaces",
    },
    {
      name: "symbols",
      value: "Contains at least 2 symbols ",
    },
    {
      name:"oneOf",
      value: "Must be equal to each other"
    }
  ];
  const validate = new passwordValidator();
  validate
    .is()
    .min(12)
    .is()
    .max(100)
    .has()
    .uppercase(3)
    .has()
    .lowercase(3)
    .has()
    .digits(3)
    .has()
    .not()
    .spaces()
    .has()
    .symbols(2).is().oneOf([_passerValue]);

  const [testValidation, setTestValidation] = useState([]);

  useEffect(() => {
    // @ts-ignore
    setTestValidation(validate.validate(passerValue, { list: true }));
  }, [passerValue, _passerValue]);
  useEffect(() => {
    if (passerValue.length > 0) {
      if (testValidation.length === 0) {
        setStrengthMeter(2);
      } else if (testValidation.length <= 3) {
        setStrengthMeter(1);
      } else {
        setStrengthMeter(0);
      }
    } else {
      setStrengthMeter(0);
    }
  }, [testValidation]);
  return (
    <>
      <div className="overflow-auto">
        {validators &&
          validators.map((val: { name: string; value: string }) => {
            return (
              <ValidatorField
                key={uuidv4()}
                name={val.name}
                value={val.value}
                check={
                  passerValue.length <= 0
                    ? null
                    : // @ts-ignore
                    testValidation.includes(val.name)
                    ? false
                    : true
                }
              />
            );
          })}
      </div>
    </>
  );
};

export default PasserValidation;
