import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";
import LoadingImg from "/loading-animation.svg";

interface LoaderProps {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    containerClassName?: string;
    loaderClassName?: string;
    wrapperClassName?:string;
}

const Loader: FunctionComponent<LoaderProps> = ({
  isLoading,
  setIsLoading,
  containerClassName = " ",
  loaderClassName = " ",
  wrapperClassName = " ",
  children
}) => {
    
  return (
    <div className={"relative " + wrapperClassName }>
        {children}
        {isLoading && 
            <div
            className={
                "w-full h-full absolute top-0 left-0 !backdrop-filter backdrop-brightness-75 grid place-items-center rounded " +
                containerClassName
            }
            >
            <object
                className={"w-16 " + loaderClassName}
                type="image/svg+xml"
                data={LoadingImg}
            ></object>
            </div>
        }
    </div>
  );
};

export default Loader;
