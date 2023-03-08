import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { FC, useState, useEffect, useContext, ReactNode } from "react";
import { TiPlus } from "react-icons/ti";
import { Link, Outlet, useParams } from "react-router-dom";
import Pass from "./components/Pass/Pass";
import { collection, getDocsFromServer, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { AuthContext } from "../../../../contexts/Auth/Auth";
import { db } from "../../../../firebase";
import { platforms, userTypes } from "./filters-Data";
import FilledInput from "@mui/material/FilledInput";
import { useSlotProps } from "@mui/base";
import Filters from "./components/Filters/Filters";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Modal from "../../../../components/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import Loader from "/loading-animation.svg"

interface ShowPassesProps { }

export interface passFromDbSnapTypes {
  id: string;
  username: string;
  password: string;
  platform: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  type: string;
  customField: string | null
}

export interface filterByType {
  label: string;
  value?: string;
  Icon: ReactNode | null;
  id: number;
}

const ShowPasses: FC<ShowPassesProps> = () => {

  const [passesFromDb, setPassesFromDb] = useState<Array<passFromDbSnapTypes> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterPassesOpen, setIsFilterPassesOpen] = useState<boolean>(false);
  const [filterByPlatform, setFilterByPlatform] = useState<filterByType>(platforms[0]);
  const [filterByUserType, setFilterByUserType] = useState<filterByType>(userTypes[0]);
  const [filterByCustomPlatform, setFilterByCustomPlatform] = useState<string>("");
  const params = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const passesRef = query(collection(
        db,
        "users",
        // @ts-ignore
        `${auth?.user?.email}`,
        "passes"
      ), orderBy("createdAt", "desc"), limit(20));
      try {
        const passesSnaps = await getDocsFromServer(passesRef);
        setPassesFromDb(
          passesSnaps.docs.map((e) => {
            return {
              id: e.id,
              username: e.data().username,
              password: e.data().password,
              platform: e.data().platform,
              type: e.data().type,
              createdAt: e.data().createdAt,
              customField: e.data().customField
            };
          })
        );
      } catch (error) {
        setLoading(false)
      } finally {
        setLoading(false)
      }
    })();
  }, []);


  return (
    <div className="showpasses w-full h-full flex flex-col overflow-hidden ">
      {!params.passId ? <>
        {/* upper nave */}
        <div className="upper-showpasses bg-[#36454F] flex justify-between items-center px-2 py-3 border-t border-[#647f91]">
          {/* filter modal (when opened) */}
          <Modal isShowing={isFilterPassesOpen} >
            <Filters isOpen={isFilterPassesOpen} byPlatform={filterByPlatform} setByPlatform={setFilterByPlatform} byUserType={filterByUserType} setByUserType={setFilterByUserType} setIsOpen={setIsFilterPassesOpen} setByCustomPlatform={setFilterByCustomPlatform} byCustomPlatform={filterByCustomPlatform} />
          </Modal>



          {/* add nav and filter toggle btns */}
          <div className="flex">
            <Tooltip title="Filter passes">
              <IconButton onClick={() => { setIsFilterPassesOpen(!isFilterPassesOpen) }} className="!rounded-md !mr-2 !border-solid !backdrop-filter hover:backdrop-brightness-200 !border-2 !border-[#f7482a]">
                <BsFillFilterSquareFill className="text-2xl !rounded-md !text-[#f7482a]" />
              </IconButton>
            </Tooltip>
            <Link to="new" className="">
              <Tooltip title="Add new pass">
                <IconButton className="!rounded-md !border-solid !backdrop-filter hover:backdrop-brightness-200 !transition-all !border-2 !border-green-500">
                  <TiPlus className="text-2xl !rounded-md text-green-400" />
                </IconButton>
              </Tooltip>
            </Link>
          </div>

        </div>
        <div className="w-full h-full overflow-auto seven-scrollbar">
          {loading && (
            <div className="w-full h-full flex justify-center items-center backdrop-filter backdrop-opacity-10" style={{ backgroundColor: "rgb(255 255 255 / .3)" }} >
              <object className="w-1/6" type="image/svg+xml" data={Loader} ></object>
            </div>
          )}
          <div className="flex-1 flex flex-col w-full max-w-[500px] px-2 mx-auto min-h-0 overflow-auto py-3">
            {passesFromDb &&
              passesFromDb.map((e) => {
                return (
                  <Pass
                    key={e.id}
                    passData={{
                      id: e.id,
                      username: e.username,
                      password: e.password,
                      platform: e.platform,
                      type: e.type,
                      createdAt: e.createdAt,
                      customField: e.customField
                    }}
                  />
                );
              })}
          </div>
        </div> </>
        : <Outlet />}
    </div>
  );
};

export default ShowPasses;
