import { uuidv4 } from "@firebase/util";
import { Autocomplete, StyledComponentProps, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
  AnimatePresence,
  motion as div,
  motion,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, {
  Dispatch,
  DispatchWithoutAction,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  containerVariants,
  inputContainerVariants,
  inputVariants,
  modalContainerVariants,
  platforms,
  styleFilterInput,
  userTypes,
} from "../../filters-Data";
import { CgClose } from "react-icons/cg";
import { SlControlStart } from "react-icons/sl";
import {filterByType} from "./../../ShowPasses"

interface FiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  byPlatform: filterByType;
  setByPlatform: Dispatch<SetStateAction<filterByType>>;
  byUserType: filterByType;
  setByUserType: Dispatch<SetStateAction<filterByType>>;
  setByCustomPlatform: Dispatch<SetStateAction<string>>;
  byCustomPlatform: string
}


const Filters: FC<FiltersProps> = ({
  isOpen,
  setIsOpen,
  byPlatform,
  setByPlatform,
  byUserType,
  setByUserType,
  byCustomPlatform,
  setByCustomPlatform
}) => {

  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
  const animationControls = useAnimationControls();

  useEffect(() => {
    (async () => {
      await animationControls.start("open");
      setIsFirstRender(true);
    })();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsFirstRender(false);
      animationControls.start("closed");
    }
  }, [isOpen]);

  return (
    <motion.div
      key={54}
      variants={modalContainerVariants}
      className="absolute left-0 top-0 grid place-items-center w-full h-full backdrop-filter backdrop-blur-md"
      exit="closed"
      initial={isFirstRender ? false : "closed"}
      animate={animationControls}
      // close modal on outside click
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <motion.div
        variants={containerVariants}
        className=" flex flex-col justify-center gap-4 items-center rounded-xl text-white w-[90%] h-[90%] bg-[#36454f] relative"
        // when the user click the inside, don't close. (LOOK CONTAINER PROPS)
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <motion.button
          initial={{ y: "-30%", x: "30%" }}
          whileTap={{ transition: { duration: 0.03 }, y: "-20%", x: "20%" }}
          className="filter hover:brightness-75 absolute text-2xl bg-white p-1 rounded-md right-0 top-0 text-red-500"
          onClick={() => setIsOpen(false)}
        >
          <CgClose />
        </motion.button>
        <motion.h1 variants={inputVariants} className="text-3xl roboto-font ">
          Fitler
        </motion.h1>
        <motion.div
          className="gap-2 grid place-items-center"
          variants={inputContainerVariants}
        >
          <motion.div
            className="flex flex-wrap w-min items-stretch justify-center mb-4"
            variants={inputVariants}
          >
            <Autocomplete
              id="disabled-options-demo"
              value={byPlatform}
              options={platforms}
              disableClearable={true}
              selectOnFocus={false}
              sx={{
                ...styleFilterInput,
                marginBottom: ".25rem",
                minWidth: "300px",
              }}
              onChange={(_, value: filterByType) => {
                setByPlatform(value);
              }}
              className="text-white"
              renderInput={(params) => {
                return (
                  <TextField
                    placeholder="Ex. Instagram"
                    className="w-fit"
                    {...params}
                    label="by Pass platform"
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
            {/* show only if the platform is assigned to others*/}
            {byPlatform.label == "Others" && (
              <AnimatePresence>
                {byPlatform.label == "Others" ? (
                  <motion.div
                    key={"chuppy"}
                    className="w-full"
                    exit={{
                      scale: 0.6,
                      opacity: 0.1,
                      transition: {
                        duration: 0.4,
                      },
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                      },
                    }}
                    initial={{
                      scale: 0.6,
                      opacity: 0.1,
                    }}
                  >
                    <TextField
                      className="!mt-1"
                      id="outlined-basic"
                      aria-required={true}
                      onChange={(input) => {
                        let value = input.target.value;
                        setByCustomPlatform(value)
                      }}
                      label="custom platform *"
                      autoComplete="off"
                      sx={{
                        ...styleFilterInput,
                        width: "100%",
                      }}
                      placeholder="custom platform (required)"
                      variant="outlined"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </motion.div>
          <motion.div variants={inputVariants}>
            <Autocomplete
              value={byUserType}
              id="disabled-options-demo"
              options={userTypes}
              disableClearable={true}
              onChange={(_, value: filterByType) => {
                setByUserType(value);
              }}
              selectOnFocus={false}
              sx={{
                ...styleFilterInput,
                width: "300px",
              }}
              className="text-white"
              renderInput={(params) => {
                return (
                  <TextField
                    placeholder="EX. Email"
                    className="w-fit"
                    label="by Pass type"
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Filters;
