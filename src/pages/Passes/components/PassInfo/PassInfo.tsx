import { collection, doc, getDocFromServer, getDocsFromServer, limit, orderBy, query } from "@firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../../../contexts/Auth/Auth";
import { db } from "../../../../firebase";
import { passFromDbSnapTypes } from "../ShowPasses/ShowPasses";

interface PassInfoProps {
    
}
 
const PassInfo:FC<PassInfoProps> = () => {

    const auth = useContext(AuthContext)
    const params = useParams()
    const [passFromDb, setPassFromDb] = useState<passFromDbSnapTypes | null>();
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            // @ts-ignore
            const passRef = doc(db, "users", auth?.user.email, "passes", params.passId);
          try {
            const passesSnaps = await getDocFromServer(passRef);
            setPassFromDb(
                  {id: passesSnaps?.id,
                  username: passesSnaps?.data()?.username,
                  password: passesSnaps?.data()?.password,
                  platform: passesSnaps?.data()?.platform,
                  type: passesSnaps?.data()?.type,
                  createdAt: passesSnaps?.data()?.createdAt}

            );
          } catch (error) {
            setLoading(false)
          } finally {
            setLoading(false)
          }
        })();
      }, []);

    return (
        <div>
            this is show PassInfo
        </div>
    );
}
 
export default PassInfo;