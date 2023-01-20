import { Autocomplete, IconButton, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styleFilterInput, userTypes } from "../ShowPasses/filters-Data";
import { filterByType } from "../ShowPasses/ShowPasses";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/system";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface NewPassProps { }

const NewPass: FC<NewPassProps> = () => {
    // removing the first option which is "All"
    const userTypes_ = userTypes.slice(-3)
    const [passType, setPassType] = useState<string>(userTypes_[userTypes_.length - 1].value);
    const [passUser, setPassUser] = useState<string>("");
    const [passPassword, setPassPassword] = useState<string>("");
    const [passPassword_, setPassPassword_] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
    const navigate = useNavigate();

    // check if the two passwords (passPassword & passPassword_) are the same
    useEffect(() => {
        if(passPassword != "" && passPassword_ != "" && passPassword_ !== passPassword){
            setPasswordIsValid(false)
        }else if (passPassword == passPassword_){
            setPasswordIsValid(true)
        }
    }, [passPassword, passPassword_]);

    useEffect(() => {
        console.log(passwordIsValid, passPassword == passPassword_)
    }, [passwordIsValid]);
    return (
        <div className="w-full h-full bg-[#36454f] text-white border-t-8 btb-border pt-4 pr-2 flex flex-col overflow-y-auto seven-scrollbar">
            <h1 className="text-3xl ml-2 text-[#f5deb3]">Add new Pass</h1>

            <form className="my-6 pl-5 mx-auto w-fit" autoComplete="off">
                <Stack width="300px" sx={{
                    ...styleFilterInput
                }} >
                    <h1 className="mt-7 mb-3 text-[#c4c4c4]">Type:- </h1>
                    <Autocomplete
                        defaultValue={userTypes_[userTypes_.length - 1]}
                        id="disabled-options-demo"
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
                            (passType == "PhoneNumber"
                                ? "Ex: 055***782"
                                : passType == "User Name"
                                    ? "Ex: w_rd9"
                                    : "example@email.com")
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
                            autofill: "off"
                        }}
                        type={
                            (passType == "PhoneNumber"
                                ? "tel"
                                : passType == "Username"
                                    ? "username"
                                    : passType.toLowerCase())
                        }
                        onInput={(val) => {
                            // @ts-ignore
                            let value = val.target.value;
                            if (value) setPassUser(value);
                        }}
                        required={true}
                    />

                    <h1 className="mt-7 mb-1 text-[#c4c4c4]">Password:- </h1>
                    {
                        !passwordIsValid && <h1 className="text-red-400 mb-2">* The passwords are not the same *</h1>
                    }
                    <div className="flex !flex-row items-center select-none">
                        <Stack sx={{width: "300px"}} >
                            <TextField
                                placeholder="never use: 12345678"
                                disabled={!passType && true}
                                label="Password"
                                inputProps={{
                                    autofill: "off"
                                }}
                                sx={{width: "100%"}}
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
                                    autofill: "off"
                                }}
                                sx={{width: "100%"}}
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
                        <IconButton onClick={()=>{setShowPassword(!showPassword)}} className="flex !flex-row items-center !mx-1 !text-3xl">
                            {showPassword ? <FaEye className="!text-3xl" /> : <FaEyeSlash className="!text-3xl" /> }
                        </IconButton>
                    </div>

                <h1 className="mt-7 mb-3 text-[#c4c4c4]">platform:- </h1>
                    <TextField
                        placeholder="never use: 12345678"
                        disabled={!passType && true}
                        label="Password"
                        inputProps={{
                            autofill: "off"
                        }}
                        type="password"
                        onInput={(val) => {
                            // @ts-ignore
                            let value = val.target.value;
                            if (value) setPassUser(value);
                        }}
                        required={true}
                    />
                    <TextField
                        placeholder="never use: 12345678"
                        disabled={!passType && true}
                        label="Password"
                        inputProps={{
                            autofill: "off"
                        }}
                        className="!my-3"
                        type="password"
                        onInput={(val) => {
                            // @ts-ignore
                            let value = val.target.value;
                            if (value) setPassUser(value);
                        }}
                        required={true}
                    />

                </Stack>
            </form>
        </div>
    );
};

export default NewPass;
