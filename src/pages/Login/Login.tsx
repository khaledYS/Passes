import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth/Auth";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { FRauth } from "../../firebase";
import { LoadingContext } from "../../contexts/Loading/Loading";
import Loader from "/loading-animation.svg";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  async function loginWithGoogle() {
    try {
        await loading?.setIsLoading(true);
      const provider = new GoogleAuthProvider();
      let user = await signInWithPopup(FRauth, provider);
    } catch (err) {
      // @ts-ignore
      console.log(err.code);
      await loading?.setIsLoading(false);
    }finally{
    }
  }

  useEffect(() => {
    if (auth?.user) {
      console.warn(
        "User already signed in, to sign in with another account please logout from the current account. redircting...."
      );
      navigate("/");
    }
  }, [auth]);

  return !auth?.user ? (
    <div className="LoginComponent grid place-items-center flex-1">
      <button
        disabled={loading?.isLoading ? true : false}
        onClick={() => {
          if (loading?.isLoading) {
            return;
          }
          (async () => {
            await loginWithGoogle();
          })();
        }}
        className="flex items-center justify-center gap-2 px-4 p-2 bg-[#e4e4e4] rounded-xl filter transition-all hover:brightness-75 relative"
      >
        {loading?.isLoading && (
            <div className="w-full h-full absolute top-0 left-0 !backdrop-filter backdrop-brightness-50 grid place-items-center rounded-xl">
                <object
                className="max-h-10"
                type="image/svg+xml"
                data={Loader}
              ></object>
            </div>
        )}
            <FcGoogle className="text-4xl" /> Continue with Google

      </button>
    </div>
  ) : null;
};

export default Login;
