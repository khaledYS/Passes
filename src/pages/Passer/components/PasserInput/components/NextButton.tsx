import { Tooltip } from "@mui/material";
import bcrypt from "bcryptjs";
import { saltRounds } from "config/generalAttributes";
import { AuthContext } from "contexts/Auth/Auth";
import {
  doc,
  getDocFromServer,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db } from "src/firebase";

interface NextButtonProps {
  strengthMeter: 0 | 1 | 2 | undefined;
  passerValue: string;
  _passerValue: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const NextButton: FunctionComponent<NextButtonProps> = ({
  strengthMeter,
  passerValue,
  _passerValue,
  isLoading,
  setIsLoading,
}) => {
  let mounted = true;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const sendPasserToDB = async (val: string) => {
    if (!auth) return 409;
    try {
      // @ts-ignore
      const docRef = doc(db, "users", `${auth?.user?.uid!}`);
      const docSnap = await getDocFromServer(docRef);
      const _passerFromDb = docSnap.data()?.passer;
      if (!_passerFromDb) {

        // using a high salt for my app so It can be hard for em'
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedText = await bcrypt.hash(val, salt);
        const res = await setDoc(docRef, {passer: hashedText});
        console.log(res, "res")
        mounted && setIsLoading(false);
        navigate("/")
      }else {
        navigate("/passes")
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    } finally {
      mounted && setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Tooltip title={strengthMeter === 2 ? "Enter" : ""}>
      <div
        onClick={() => {
          // only allow to click this button if it's only if it's have passed the strength meter;
          if (strengthMeter === 2 && !isLoading) {
            (async () => {
              try {
                setIsLoading(true);
                await sendPasserToDB(passerValue);
              } catch (err) {
                console.log(err);
              }
            })();
          }
        }}
        className={
          "filter ml-3 transition-all duration-400 rounded-md grid place-items-center cursor-pointer text-4xl px-4 py-4" +
          ` ${
            strengthMeter === 2
              ? "hover:brightness-75"
              : "contrast-75 cursor-not-allowed"
          } ${
            strengthMeter === 0
              ? "bg-fifthdary-700"
              : strengthMeter === 1
              ? "bg-secondary-base"
              : "bg-thirdary-800"
          }`
        }
      >
        <AiOutlineArrowRight
          className={`${
            strengthMeter !== 0 ? "text-[#2b2b2b]" : "text-[#e4e4e4]"
          }`}
        />
      </div>
    </Tooltip>
  );
};

export default NextButton;
