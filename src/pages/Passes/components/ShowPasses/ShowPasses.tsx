import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { FC, useState, useEffect, useContext, ReactNode } from "react";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import Pass from "./components/Pass/Pass";
import { collection, getDocsFromServer, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../../contexts/Auth/Auth";
import { db } from "../../../../firebase";
import { platforms, userTypes } from "./filters-Data";
import FilledInput from "@mui/material/FilledInput";
import { useSlotProps } from "@mui/base";
import Filters from "./components/Filters/Filters";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Modal from "../../../../components/Modal/Modal";
import {v4 as uuidv4} from "uuid";

interface ShowPassesProps { }

interface passFromDbSnap {
  id: string;
  username: string;
  password: string;
  platform: string;
  createdAt: Date;
  type: string;
}

const ShowPasses: FC<ShowPassesProps> = () => {
  
  const [passesFromDb, setPassesFromDb] = useState<Array<passFromDbSnap> | null>(null);
  const [isFilterPasasesOpen, setIsFilterPassesOpen] = useState<boolean>(false);
  const [filterByPlatform, setFilterByPlatform] = useState<{label:string, Icon: ReactNode, id: number}>(platforms[0]);
  const [filterByCustomPlatform, setFilterByCustomPlatform] = useState<string>("");
  const [filterByUserType, setFilterByUserType] = useState<{label:string, Icon: ReactNode, id: number, value: string}>(userTypes[0]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const passesRef = collection(
        db,
        "users",
        // @ts-ignore
        `${auth?.user?.email}`,
        "passes"
      );
      const passesSnaps = await getDocsFromServer(passesRef);
      setPassesFromDb(
        passesSnaps.docs.map((e) => {
          // console.log(e.data())
          return {
            id: e.id,
            username: e.data().username,
            password: e.data().password,
            platform: e.data().platform,
            type: e.data().type,
            createdAt: e.data().createdAt,
          };
        })
      );
    })();
  }, []);

  useEffect(() => {
    // console.log(filterByPlatform, filterByUserType);
  }, [filterByPlatform, filterByUserType]);

  return (
    <div className="showpasses w-full h-full flex flex-col overflow-hidden ">

      {/* upper nave */}
      <div className="upper-showpasses bg-[#36454F] flex justify-between items-center px-2 py-3 border-t border-[#647f91]">
        {/* filter modal (when opened) */}
        <Modal isShowing={isFilterPasasesOpen} >
          <Filters isOpen={isFilterPasasesOpen} byPlatform={filterByPlatform} setByPlatform={setFilterByPlatform} byUserType={filterByUserType} setByUserType={setFilterByUserType} setIsOpen={setIsFilterPassesOpen} setByCustomPlatform={setFilterByCustomPlatform} byCustomPlatform={filterByCustomPlatform} />
        </Modal>

        

        {/* add nav and filter toggle btns */}
        <div className="flex">
          <Tooltip title="Filter passes">
            <IconButton onClick={() => { setIsFilterPassesOpen(!isFilterPasasesOpen) }} className="!rounded-md !mr-2 !border-solid !backdrop-filter hover:backdrop-brightness-200 !border-2 !border-[#f7482a]">
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
      <div className="flex-1 min-h-0 overflow-auto">
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
                    createdAt: e.createdAt
                  }}
                />
            );
          })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}
          {passesFromDb && passesFromDb.map((e) => { return ( <Pass key={e.id} passData={{ id: e.id, username: e.username, password: e.password, platform: e.platform, type: e.type, createdAt: e.createdAt }} /> ); })}

      </div>
    </div>
  );
};

export default ShowPasses;
