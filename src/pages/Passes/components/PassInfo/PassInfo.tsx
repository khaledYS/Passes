import {
  collection,
  doc,
  getDocFromServer,
  getDocsFromServer,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "contexts/Auth/Auth";
import { db } from "src/firebase";
import { passFromDbSnapTypes } from "../ShowPasses/ShowPasses";
import {IoMdArrowRoundBack} from "react-icons/io"
import { Link } from "react-router-dom";
import { Icon, IconButton, listItemSecondaryActionClasses } from "@mui/material";
import Field from "./components/Field";
import Loader from "components/Loader/Loader";
import PassField from "./components/PassField";


interface PassInfoProps {}

const PassInfo: FC<PassInfoProps> = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [passFromDb, setPassFromDb] = useState<passFromDbSnapTypes | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const passRef = doc(
        db,
        "users",
        // @ts-ignore
        auth?.user.uid,
        "passes",
        params.passId
      );
      try {
        const passesSnaps = await getDocFromServer(passRef);
        setPassFromDb({
          id: passesSnaps?.data()?.username,
          username: passesSnaps?.data()?.username,
          password: passesSnaps?.data()?.password,
          platform: passesSnaps?.data()?.platform,
          type: passesSnaps?.data()?.type,
          createdAt: passesSnaps?.data()?.createdAt,
          customField: passesSnaps?.data()?.customField || null
        });
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full h-full bg-[#36454f]">
        <Link to="/passes" className="ml-4">
            <IconButton>
                <IoMdArrowRoundBack className="text-white text-4xl " />
            </IconButton>
        </Link>
        <Loader {...{isLoading:loading, setIsLoading: setLoading}}>
        <div className="text-white w-full h-full grid place-items-center ">
            <div className=" px-1 py-8 rounded-xl ">
                <Field fieldName={passFromDb?.type} fieldValue={passFromDb?.username} />
                <PassField fieldName="Pass" fieldValue={passFromDb?.password} />
                <Field disableCopy={true} fieldName="Platform" fieldValue={passFromDb?.platform} />
                {passFromDb?.customField && 
                  <Field fieldName={passFromDb.platform} fieldValue={passFromDb?.customField} />
                }
            </div>
        </div>
        </Loader>
    </div>
  );
};

export default PassInfo;
