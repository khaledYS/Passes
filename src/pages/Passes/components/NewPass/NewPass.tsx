import { Autocomplete, IconButton, TextField } from "@mui/material";
import { FC, useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import {
  platforms,
  styleFilterInput,
  userTypes,
} from "../ShowPasses/filters-Data";
import { filterByType } from "../ShowPasses/ShowPasses";
import { Stack } from "@mui/system";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "/loading-animation.svg";
import {v4 as uuidv4} from "uuid"
import { AuthContext } from "contexts/Auth/Auth";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, where } from "@firebase/firestore";
import { db } from "src/firebase";
import EncryptionKey from "./components/EnryptionKey/EncryptionKey";
import {AES} from "crypto-js";

interface NewPassProps {}

const NewPass: FC<NewPassProps> = () => {
  // removing the first option which is "All"
  const userTypes_ = userTypes.slice(1);
  const platforms_ = platforms.slice(1);

  const formRef = useRef<null | HTMLFormElement>(null);

  const [passType, setPassType] = useState<string>(
    userTypes_[userTypes_.length - 1].value
  );
  const [passUser, setPassUser] = useState<string>("");
  const [passPlatform, setPassField] = useState<string>("");
  const [customPassField, setCustomPassField] = useState<string | null>(null);
  const [passPassword, setPassPassword] = useState<string>("");
  const [passPassword_, setPassPassword_] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false);
  const [disableCustomField, setDisableCustomField] = useState<boolean>(true);
  const [encryptionKeyIsOpen, setEncryptionKeyIsOpen] = useState<boolean>(false);
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null)
  const auth = useContext(AuthContext)
  const navigate = useNavigate();



  async function submitPass(){
    if(!passUser || !passPlatform || (passPlatform.toLowerCase() == "others" && !customPassField) || !passwordIsValid || submitBtnIsLoading ){
      console.log("false")
      // note: must add code to show the user that he must fill all the fields 
      return;
    }
    setSubmitBtnIsLoading(true)
    // @ts-ignore
    const userEmail = auth?.user?.uid;
    const passesRef = collection(db, "users", `${userEmail}`, "passes")
    const docCollRef = collection(db, "users", `${userEmail}`, "passes")
    try {
      // check if the pass already has another pass with the same username
      // code must check if there is similar doc 
      const q = query(docCollRef, where("platform", "==", passPlatform), where("type", "==", passType), where("username", "==", passUser), where("customField", "==", customPassField))
      const checkIfAvailable = await getDocs(q);
      console.log(checkIfAvailable.empty)
      if(!checkIfAvailable.empty){
        window.alert("this pass has already been exist, do you want to delete it or update it ?")
        throw new Error("There is a pass with the same inputs, must differentiate.")
        return ;
      }

      if(!encryptionKey) {
        console.log("stopped")
        setEncryptionKeyIsOpen(true)
        throw new Error("waiting for the encryption key")
        return ;
      }

      let addedDoc = await addDoc(docCollRef, {
        createdAt: serverTimestamp(),
        password: AES.encrypt(passPassword, encryptionKey!),
        platform: passPlatform,
        type: passType,
        username: passUser,
        customField: customPassField
      })

      console.log(addedDoc, "finshed")  
      setSubmitBtnIsLoading(false)
      navigate("/passes")
    } catch (error) {
      setSubmitBtnIsLoading(false)
    }
    
  }


  // check if the type of the platform is url or others so it enables the custom field
  useEffect(() => {
    if (passPlatform.toLowerCase() == "others" || passPlatform.toLowerCase() == "url"){
      setDisableCustomField(false)
    }else { 
      setDisableCustomField(true)
      setCustomPassField(null)
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

  useEffect(() => {
    console.log(passPlatform == "URL" && false);
  }, [showPassword]);


  // if the custom platform is disabled and has old data stored, the setCustomePassField state must be null.
  useEffect(() => {
    if(passPlatform.toLowerCase() != "others"){
    }
  }, [passPlatform]);
  return (
    <div className="w-full h-full bg-[#36454f] text-white pt-4 pr-2 flex flex-col overflow-y-auto seven-scrollbar">
      <h1 className="text-3xl ml-2 text-[#f5deb3]">Add new Pass</h1>

      <form ref={formRef} onSubmit={e=>e.preventDefault()} className="my-6 pl-5 mx-auto w-fit" autoComplete="off">
        <div className="relative ">
        <Stack
          width="300px"
          sx={{
            position:"relative",
            ...styleFilterInput,
          }}
        >
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
                  {...params}
                ></TextField>
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
            <h1 className="text-red-400">* The passwords are not the same *</h1>
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
              className="flex !flex-row items-center !mx-1 !text-3xl"
            >
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
                  id={uuidv4()}
                ></TextField>
              );
            }}
            renderOption={(props, option: any, state) => {
              return (
                <li {...props}>
                  <option.Icon className="text-2xl" /> &nbsp;&nbsp;{option.label}
                </li>
              );
            }}
          />
          <div
            className={`!my-2 h-full w-full ${
              disableCustomField && "filter brightness-50"
            } `}
          >
            <TextField
              placeholder={`EX: ${passPlatform == "Others" ? "YangDo": passPlatform == "URL" ? "coco.com" : ""}`}
              disabled={disableCustomField}
              label={`custom ${passPlatform == "Others" ? "App": passPlatform == "URL" ? "URL" : "Field"}`}
              inputProps={{
                autofill: "off",
              }}
              value={customPassField || ""}
              className="w-full h-full"
              type="text"
              onInput={(val) => {
                // @ts-ignore
                let value = val.target.value;
                if(value == ""){
                  setCustomPassField(null)
                }else{
                  setCustomPassField(value)
                }
              }}
              required={true}
            />
          </div>

        </Stack>

        {encryptionKeyIsOpen && <EncryptionKey setEncryptionKey={setEncryptionKey} />}
        </div>

        <div className="w-full mt-3 flex flex-nowrap h-min">
          <div className=" flex items-center cursor-pointer justify-center w-3/4 bg-green-500 rounded-lg text-center mr-2">
            {submitBtnIsLoading ? (
              <object
                className="w-fit max-h-10"
                type="image/svg+xml"
                data={Loader}
              ></object>
            ) : (
              <input value="Pass It!" onClick={e=>{submitPass()}} className="w-full h-full cursor-pointer" type="submit"/>
            )}
          </div>
          <button onClick={()=>{navigate("/passes")}} className="w-1/4 px-3 p-2 bg-red-500 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPass;
