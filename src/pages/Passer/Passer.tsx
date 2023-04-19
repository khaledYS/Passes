import Nav from "components/Nav/Nav";
import { AuthContext } from "contexts/Auth/Auth";
import { PasserContext } from "contexts/Passer/Passer";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Intro from "./components/Intro/Intro";
import PasserInput from "./components/PasserInput/PasserInput";

interface PasserProps {}

const Passer: FunctionComponent<PasserProps> = () => {
  const auth = useContext(AuthContext);
  const passer = useContext(PasserContext);
  const navigate = useNavigate();
  const [strengthMeter, setStrengthMeter] = useState<0 | 1 | 2>(0);

  // if the user already has An passer, it must redirect him back to the passes page
  useEffect(() => {
    if (auth?.user && passer?.passer?.length != null) {
      navigate("/passes");
    }
  }, [passer?.passer]);
  return (
    <div className="w-full h-full flex flex-col">
      <Nav />
      <div className="bg-fifthdary-500 grow w-full flex justify-start flex-col ">
        <Intro />
        <PasserInput {...{ strengthMeter, setStrengthMeter, auth }} />
      </div>
    </div>
  );
};

export default Passer;
