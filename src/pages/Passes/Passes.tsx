import { FunctionComponent, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { FRauth } from "src/firebase";
import Nav from "components/Nav/Nav";
import { Outlet, useNavigate } from "react-router";
import { PasserContext } from "contexts/Passer/Passer";
import { AuthContext } from "contexts/Auth/Auth";

interface PassesProps {}

const Passes: FunctionComponent<PassesProps> = () => {
  
  const auth = useContext(AuthContext)
  const passer = useContext(PasserContext);
  const navigate = useNavigate();

  // if the user doesn't have a passer, must redirect him to /passer so he creates his own passer.
  useEffect(() => {
    if(auth?.user && passer?.passer === null){
      navigate("/passer")
    }
  }, [passer?.passer]);

  return (
    <div className="w-full h-full flex flex-col">
      <Nav />
      <div className="Passses w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Passes;
