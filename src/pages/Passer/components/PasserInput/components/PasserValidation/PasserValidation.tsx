import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import passwordValidator from "password-validator";
import ValidatorField from "./components/ValidatorField/ValidatorField";
import { v4 } from "uuid";

interface PasserValidationProps {
  passerValue: string;
  isValid?: boolean;
  strengthMeter?: 0 | 1 | 2;
  setPasserValue?: Dispatch<SetStateAction<string>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  setStrengthMeter: Dispatch<SetStateAction<0 | 1 | 2>>;
}

const PasserValidation: FunctionComponent<PasserValidationProps> = ({
  passerValue,
  isValid,
  setPasserValue,
  setIsValid,
  setStrengthMeter,
}) => {
  const validators = [
    {
      name: "min",
      value: "must be at lease 8 characters",
    },
    {
      name: "uppercase",
      value: "contains at least 3 uppercases ",
    },
    {
      name: "lowercase",
      value: "contains at least 3 lowercases ",
    },
    {
      name: "digits",
      value: "contains at least 3 digits ",
    },
    {
      name: "spaces",
      value: "MUST not contain spaces",
    },
    {
      name: "symbols",
      value: "contains at least 2 symbols ",
    },
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
    .symbols(2);

  const [testValidation, setTestValidation] = useState([]);

  useEffect(() => {
    // @ts-ignore
    setTestValidation(validate.validate(passerValue, { list: true }));
  }, [passerValue]);
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
      <div>
        {validators &&
          validators.map((val) => {
            // @ts-ignore
            return (
              <ValidatorField
                key={v4()}
                name={val.name}
                value={val.value}
                check={
                  passerValue.length <= 0
                    ? null
                    : testValidation.includes(val.name)
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
