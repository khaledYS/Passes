import { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/Auth";
import { TbLogout } from "react-icons/tb";
import { Button, IconButton } from "@mui/material";
import { IoHome } from "react-icons/io5";
import { signOut } from "@firebase/auth";
import { FRauth } from "../../firebase";
import { LoadingContext } from "../../contexts/Loading/Loading";
import Loader from "/loading-animation.svg";
import { PasserContext } from "contexts/Passer/Passer";


interface NavProps {
  sticky?: boolean | "";
}

const Nav: FC<NavProps> = ({ sticky }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [showGoToPassesLink, setShowGoToPassesLink] = useState(true);
  const loading = useContext(LoadingContext);
  const passer = useContext(PasserContext);

  useEffect(() => {
    if (location.pathname.startsWith("/passes") || location.pathname.startsWith("/passer")) {
      setShowGoToPassesLink(false);
    }
  }, [location]);

  return (
    <nav
      className={`nav w-full bg-[#36454F] px-2 py-2 text-lg ${
        sticky ? "sticky top-0 " : ""
      } flex justify-between items-center overflow-hidden`}
    >
      <div className="links gap- flex">
        <Link className="" to="/">
          <IconButton color="inherit" className="!p-2">
            <IoHome className="text-white" />
          </IconButton>
        </Link>
      </div>
      {
      auth?.user ? (
        <div className="flex items-center">
          {showGoToPassesLink && (
            <Button variant="contained" color="primary">
              <Link className="" to="/passes">
                Go to passes
              </Link>
            </Button>
          )}
          <Button
            variant="outlined"
            className="!p-0 !border-black !ml-4 !border-[.15rem] !min-w-fit !rounded-full"
          >
            <Link to="/myaccount">
              <img
                className="w-[2.4rem] rounded-full"
                src={
                    // @ts-ignore
                  auth?.user?.photoURL
                //   @ts-ignore
                    ? auth?.user?.photoURL
                    : "https://xsgames.co/randomusers/avatar.php?g=pixel"
                }
                referrerPolicy="no-referrer"
              />
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="contained" color="primary">
            {loading?.isLoading && (
              <div className="w-full h-full absolute top-0 left-0 !backdrop-filter backdrop-brightness-75 grid place-items-center rounded">
                <object
                  className="max-h-10"
                  type="image/svg+xml"
                  data={Loader}
                ></object>
              </div>
            )}

            <Link className="" to="/login">
              Login
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
