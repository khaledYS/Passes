import {initializeApp, } from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { firebaseConfig } from "./config/firebaseConfig"

export const app = initializeApp(firebaseConfig);
export const FRauth = getAuth(app);
export const db = getFirestore(app);