import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import ComparePasser from "components/ComparePasser/ComparePasser";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PlaceError from "src/hooks/PlaceError/PlaceError";
import { v4 as uuidv4} from "uuid";
import {
  platforms,
  styleFilterInput,
  userTypes,
} from "../../ShowPasses/filters-Data";
import { filterByType } from "../../ShowPasses/ShowPasses";
import Loader from "components/Loader/Loader";

interface NewPassFormProps {
  submitPass: Function;
  submitBtnIsLoading: boolean;
  setSubmitBtnIsLoading: Dispatch<SetStateAction<boolean>>;
}

const NewPassForm: FunctionComponent<NewPassFormProps> = ({
  setSubmitBtnIsLoading,
  submitBtnIsLoading,
  submitPass,
}) => {
  const formRef = useRef<null | HTMLFormElement>(null);

  //   removing the first element which is "All"
  const userTypes_ = userTypes.slice(1);
  const platforms_ = platforms.slice(1);
  const [passType, setPassType] = useState<string>(
    userTypes_[userTypes_.length - 1].value
  );
  const [passPassword, setPassPassword] = useState<string>("");
  const [passPassword_, setPassPassword_] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passUser, setPassUser] = useState<string>("");
  const [passPlatform, setPassField] = useState<string>("");
  const [customPassField, setCustomPassField] = useState<string | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [disableCustomField, setDisableCustomField] = useState<boolean>(true);

  const { errors, setError, clearErrors } = PlaceError();
  const [ComparePasserComp, [showComp, setShowComp], [passerFromUser]] =
    ComparePasser(
      (passerFromUserParam:string) => {
        clearErrors();
        submitPass({
          passUser,
          passPlatform,
          customPassField,
          passwordIsValid,
          passType,
          passPassword,
          passerKey: passerFromUserParam,
        });
      },
      () => {
        setError("Wrong passer")
      },
      false
    );
  const navigate = useNavigate();


  // check if the type of the platform is url or others so it enables the custom field
  useEffect(() => {
    if (
      passPlatform.toLowerCase() == "others" ||
      passPlatform.toLowerCase() == "url"
    ) {
      setDisableCustomField(false);
    } else {
      setDisableCustomField(true);
      setCustomPassField(null);
    }
  }, [passPlatform]);

  // check if the two passwords (passPassword & passPassword_) are the same
  useEffect(() => {
    if (
      passPassword != "" &&
      passPassword_ != "" &&
      passPassword_ !== passPassword
    ) {
      setPasswordIsValid(false);
    } else if (passPassword == passPassword_) {
      setPasswordIsValid(true);
    }
  }, [passPassword, passPassword_]);

  // if the custom platform is disabled and has old data stored, the setCustomePassField state must be null.
  useEffect(() => {
    if (passPlatform.toLowerCase() != "others") {
    }
  }, [passPlatform]);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="my-6 pl-5 mx-auto w-fit"
      autoComplete="off">
      {showComp && errors.map(val=>{
        return <div key={uuidv4()} className="text-red-500 mb-2 text-lg">
          {val}
        </div>
      })}
      {!showComp ? (
        <div className="relative ">
          <Stack
            width="300px"
            sx={{
              position: "relative",
              ...styleFilterInput,
            }}>
            <h1 className="mt-7 mb-3 text-[#c4c4c4]">Type:- </h1>
            <Autocomplete
              defaultValue={userTypes_[userTypes_.length - 1]}
              id="PassType"
              options={userTypes_}
              disableClearable={true}
              onChange={(_, value) => {
                setPassType(value.value);
              }}
              selectOnFocus={false}
              className="text-white mb-4"
              renderInput={(params) => {
                return (
                  <TextField
                    placeholder="Ex: Email"
                    className="w-fit"
                    label="Pass type"
                    required={true}
                    {...params}></TextField>
                );
              }}
              renderOption={(props, option: any, state) => {
                return (
                  <li value={option.value} {...props}>
                    {option.Icon} &nbsp;&nbsp;{option.label}
                  </li>
                );
              }}
            />
            <TextField
              placeholder={
                passType == "PhoneNumber"
                  ? "Ex: 055***782"
                  : passType == "Username"
                  ? "Ex: w_rd9"
                  : "example@email.com"
              }
              disabled={!passType && true}
              label={
                "User" +
                (passType == "PhoneNumber"
                  ? " Number"
                  : passType == "Username"
                  ? "name"
                  : " " + passType)
              }
              inputProps={{
                autofill: "off",
              }}
              type={
                passType == "PhoneNumber"
                  ? "tel"
                  : passType == "Username"
                  ? "username"
                  : passType.toLowerCase()
              }
              onInput={(val) => {
                // @ts-ignore
                let value = val.target.value;
                if (value) setPassUser(value);
              }}
              required={true}
            />

            <h1 className="mt-7 mb-1 text-[#c4c4c4]">Password:- </h1>
            {!passwordIsValid && (
              <h1 className="text-red-400">
                * The passwords are not the same *
              </h1>
            )}
            <div className="flex !flex-row items-center select-none">
              <Stack sx={{ width: "300px" }}>
                <TextField
                  placeholder="never use: 12345678"
                  disabled={!passType && true}
                  label="Password"
                  inputProps={{
                    autofill: "off",
                  }}
                  sx={{ width: "100%" }}
                  type={showPassword ? "text" : "password"}
                  onInputCapture={(val) => {
                    // @ts-ignore
                    let value = val.target.value;
                    setPassPassword(value);
                  }}
                  required={true}
                />
                <TextField
                  placeholder="never use: 12345678"
                  disabled={!passType && true}
                  label="Confirm Password"
                  inputProps={{
                    autofill: "off",
                  }}
                  sx={{ width: "100%" }}
                  className="!mt-3"
                  type={showPassword ? "text" : "password"}
                  onInputCapture={(val) => {
                    // @ts-ignore
                    let value = val.target.value;
                    setPassPassword_(value);
                  }}
                  required={true}
                />
              </Stack>
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="flex !flex-row items-center !mx-1 !text-3xl">
                {showPassword ? (
                  <FaEye className="!text-3xl" />
                ) : (
                  <FaEyeSlash className="!text-3xl" />
                )}
              </IconButton>
            </div>

            <h1 className="mt-7 mb-3 text-[#c4c4c4]">platform:- </h1>
            <Autocomplete
              id="PassPlatform"
              aria-required="true"
              options={platforms_}
              disableClearable={true}
              selectOnFocus={false}
              sx={{
                ...styleFilterInput,
                marginBottom: ".25rem",
                minWidth: "300px",
              }}
              onChange={(_, value: filterByType) => {
                setPassField(value.label);
              }}
              className="text-white"
              renderInput={(params) => {
                return (
                  <TextField
                    placeholder="Ex. Instagram"
                    className="w-fit"
                    {...params}
                    label="by Pass platform"
                    id={uuidv4()}></TextField>
                );
              }}
              renderOption={(props, option: any, state) => {
                return (
                  <li {...props}>
                    <option.Icon className="text-2xl" /> &nbsp;&nbsp;
                    {option.label}
                  </li>
                );
              }}
            />
            <div
              className={`!my-2 h-full w-full ${
                disableCustomField && "filter brightness-50"
              } `}>
              <TextField
                placeholder={`EX: ${
                  passPlatform == "Others"
                    ? "YangDo"
                    : passPlatform == "URL"
                    ? "coco.com"
                    : ""
                }`}
                disabled={disableCustomField}
                label={`custom ${
                  passPlatform == "Others"
                    ? "App"
                    : passPlatform == "URL"
                    ? "URL"
                    : "Field"
                }`}
                inputProps={{
                  autofill: "off",
                }}
                value={customPassField || ""}
                className="w-full h-full"
                type="text"
                onInput={(val) => {
                  // @ts-ignore
                  let value = val.target.value;
                  if (value == "") {
                    setCustomPassField(null);
                  } else {
                    setCustomPassField(value);
                  }
                }}
                required={true}
              />
            </div>
          </Stack>
        </div>
      ) : (
        <ComparePasserComp />
      )}
      <Loader
        {...{
          isLoading: submitBtnIsLoading,
          setIsLoading: setSubmitBtnIsLoading,
          wrapperClassName: "w-full mt-3 flex flex-nowrap h-min",
          containerClassName: "backdrop-brightness-50",
          loaderClassName: "w-10",
        }}>
        <div className=" flex items-center cursor-pointer justify-center w-3/4 bg-green-500 rounded-lg text-center mr-2">
          <input
            value="Pass It!"
            onClick={() => {
              (async()=>{
                if (!showComp) {
                  setShowComp(true);
                  return;
                } else if (!passerFromUser) {
                  setShowComp(true);
                  return;
                }
                await submitPass({
                  passUser,
                  passPlatform,
                  customPassField,
                  passwordIsValid,
                  passType,
                  passPassword,
                  passerKey: passerFromUser,
                });
              })();
            }}
            className="w-full h-full cursor-pointer"
            type="submit"
          />
        </div>
        <button
          onClick={() => {
            // if it's want to edit the inputs and come back it can click cancel
            if (showComp) {
              setShowComp(false);
            } else {
              navigate("/passes");
            }
          }}
          className="w-1/4 px-3 p-2 bg-red-500 rounded-lg">
          {showComp ? "Back" : "Cancel"}
        </button>
      </Loader>
    </form>
  );
};

export default NewPassForm;
