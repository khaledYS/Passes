import {
    FC,
    useEffect,
    useState,
    useRef,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "contexts/Auth/Auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
} from "@firebase/firestore";
import { db } from "src/firebase";
import ComparePasser from "components/ComparePasser/ComparePasser";
import { AES } from "crypto-js";
import NewPassForm from "./components/NewPassForm";
import Loader from "components/Loader/Loader";

interface NewPassProps {}
interface submitPassProps {
    passUser: string;
    passPlatform: string;
    customPassField: string;
    passwordIsValid: string;
    passType: string;
    passPassword: string;
    passerKey: string;
}
const NewPass: FC<NewPassProps> = () => {
    const [submitBtnIsLoading, setSubmitBtnIsLoading] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    async function submitPass({
        passUser,
        passPlatform,
        customPassField,
        passwordIsValid,
        passType,
        passPassword,
        passerKey,
    }: submitPassProps) {
        if (
            !passUser ||
            !passPlatform ||
            (passPlatform.toLowerCase() == "others" && !customPassField) ||
            !passwordIsValid ||
            submitBtnIsLoading
        ) {
            return;
        }
        setSubmitBtnIsLoading(true);
        // @ts-ignore
        const userUid = auth?.user?.uid;
        const passesRef = collection(db, "users", `${userUid}`, "passes");
        const docCollRef = collection(db, "users", `${userUid}`, "passes");
        try {
            // check if the pass already has another pass with the same username
            // code must check if there is similar doc
            const q = query(
                docCollRef,
                where("platform", "==", passPlatform),
                where("type", "==", passType),
                where("username", "==", passUser),
                where("customField", "==", customPassField)
            );
            const checkIfAvailable = await getDocs(q);

            const hashedPassword = await AES.encrypt(
                passPassword,
                passerKey
            ).toString();

            // in case he want's to edit.
            if (!checkIfAvailable.empty) {
                // NOTE: must add functionality to the next line;
                const confirmation = window.confirm(
                    "this pass has already been exist, do you want to delete it or update it ?"
                );
                if (confirmation === true) {
                    const docId = checkIfAvailable.docs[0].id;
                    const docRef = doc(db, "users", userUid, "passes", docId);

                    let settedDoc = await setDoc(docRef, {
                        createdAt: serverTimestamp(),
                        // NOTE: "change the below password to the encrypted one"
                        password: hashedPassword,
                        platform: passPlatform,
                        type: passType,
                        username: passUser,
                        customField: customPassField,
                    });

                    setSubmitBtnIsLoading(false);
                    navigate("/passes");
                    return;
                } else {
                    throw new Error(
                        "There is a pass with the same inputs, must differentiate."
                    );
                    return;
                }
            }

            let addedDoc = await addDoc(docCollRef, {
                createdAt: serverTimestamp(),
                // NOTE: "change the below password to the encrypted one"
                password: hashedPassword,
                platform: passPlatform,
                type: passType,
                username: passUser,
                customField: customPassField,
            });

            setSubmitBtnIsLoading(false);
            navigate("/passes");
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitBtnIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full bg-[#36454f] text-white pt-4 pr-2 flex flex-col overflow-y-auto seven-scrollbar">
            <h1 className="text-3xl ml-2 text-[#f5deb3]">Add new Pass</h1>
            <Loader
                {...{
                    isLoading: submitBtnIsLoading,
                    setIsLoading: setSubmitBtnIsLoading,
                }}>
                <NewPassForm
                    {...{
                        submitPass,
                        submitBtnIsLoading,
                        setSubmitBtnIsLoading,
                    }}
                />
            </Loader>
        </div>
    );
};

export default NewPass;
