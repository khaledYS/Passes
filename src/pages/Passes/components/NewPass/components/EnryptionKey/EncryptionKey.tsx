import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  LegacyRef,
} from "react";

interface EncryptionKeyProps {
  setEncryptionKey: Dispatch<SetStateAction<string | null>>;
}

const EncryptionKey: FunctionComponent<EncryptionKeyProps> = ({
  setEncryptionKey,
}) => {




  return (
    <div className="h-full w-full absolute top-0 left-0 grid place-items-center bg-[#36454f]" >
      <div className="w-full bg-white box-content border-8 border-[#4bbdbd] rounded py-3">
      </div>
    </div>
  );
};

export default EncryptionKey;
