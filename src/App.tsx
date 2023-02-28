import React, { FC, ReactChild, ReactChildren, useContext, useEffect, useState } from 'react';
import './style/index.css';
import {onAuthStateChanged} from "firebase/auth"
import { db, FRauth } from './firebase';
import { AuthContext } from './contexts/Auth/Auth';
import { doc, getDocFromServer, serverTimestamp, setDoc } from '@firebase/firestore';
import Nav from './components/Nav/Nav';
import { LoadingContext } from './contexts/Loading/Loading';

interface AppProps {
}

const App:FC<AppProps> = ({children}) => {
  
  const auth = useContext(AuthContext)
  const loading = useContext(LoadingContext)

  // removing the loading svg after the page finished loading
  useEffect(() => {
    const onPageLoad = () => {
      const loader = document.querySelector(".loader");
      loader?.remove()
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(FRauth, async (user)=>{
      await loading?.setIsLoading(true);
      if(user){
        auth?.setUser(user);
        // console.log(user)
      }else {
        auth?.setUser(0);
        await loading?.setIsLoading(false);
        return null;
      }
      await loading?.setIsLoading(true);
      try{
        const docRef = doc(db, "users", `${user?.email}`);
        const docSnap = await getDocFromServer(docRef);
        if(!docSnap.exists()){
            await setDoc(docRef, {
                createdAt: serverTimestamp(),
                displayName: user?.displayName,
                email: user?.email,
                emailVerified: user?.emailVerified,
                uid: user?.uid
            })
        }
        // console.log("hahha")

    } catch (err){
        // @ts-ignore
        console.log(err.code)
        loading?.setIsLoading(false)
        alert(err)
    }finally{
        loading?.setIsLoading(false)
    }

    })
  }, []);

  return (
    <div className="App flex flex-col">
        {children}
    </div>
  )
}

export default App
