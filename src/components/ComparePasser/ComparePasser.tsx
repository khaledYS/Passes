import { compare } from "bcryptjs";
import Loader from "components/Loader/Loader";
import { PasserContext } from "contexts/Passer/Passer";
import {
  Dispatch,
  ElementType,
  FunctionComponent,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface ComparePasserProps {}

const ComparePasser = (
  onTrue: Function,
  onError: Function,
  visible: boolean = true
) => {
  const [show, setShow] = useState<boolean>(visible);
  const passerInputFieldValue = useRef<string>("");
  const [passerFUser, setPasserFUser] = useState<string | null>(null);
  const passerFServer = useContext(PasserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function checkPasser(strPasser: string, strHash: string) {
    const res = await compare(strPasser, strHash);
    if (res === false) {
      setPasserFUser(null);
      await onError();
    } else if (res === true) {
      setPasserFUser(strPasser);
      console.log(strPasser, " hi mother fucker")
      await onTrue(strPasser);
    }
  }

  const Compo: ElementType = () => {
    return (
      <>
        <input
          type="text"
          className="min-w-[200px] w-full center-placeholder transition-all border-b-0 duration-300 px-2 py-3 rounded-md rounded-b-none border-[.4rem] text outline-none text-lg font-extrabold border-thirdary-800 text-[#1F1F1F]"
          onInput={(event) => {
            if (isLoading) return;

            const target = event.target as HTMLInputElement;
            const value = target.value;

            passerInputFieldValue.current = value;
          }}
        />
        <Loader {...{ isLoading, setIsLoading, loaderClassName: "w-10" }}>
          <button
            onClick={() => {
              const passerIFV = passerInputFieldValue.current;
              const passerFS = passerFServer?.passer || "";

              // skip in case of no input or it is loading
              console.log(passerIFV.length)
              if (isLoading || passerIFV.length <= 0 ) return;
              

              (async () => {
                try {
                  setIsLoading(true);
                  await checkPasser(passerIFV, passerFS);
                } catch (error) {
                  setPasserFUser(null)
                  console.error(error);
                } finally {
                  setIsLoading(false);
                }
              })();
            }}
            className="w-full text-center pb-3 bg-thirdary-800 rounded-md font-bold pt-2 text-lg rounded-t-none border-red-500">
            check passer
          </button>
        </Loader>
      </>
    );
  };
  return [Compo, [show, setShow], [passerFUser, setPasserFUser]] as [
    ElementType,
    [boolean, Dispatch<SetStateAction<boolean>>],
    [string | null, Dispatch<SetStateAction<string | null>>]
  ];
};

export default ComparePasser;
