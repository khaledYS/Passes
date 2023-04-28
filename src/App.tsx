import React, { FC, ReactChild, ReactChildren, useContext, useEffect, useState } from 'react';
import './style/index.css';
import {onAuthStateChanged, User} from "firebase/auth"
import { db, FRauth } from './firebase';
import { AuthContext } from './contexts/Auth/Auth';
import { doc, getDocFromServer, serverTimestamp, setDoc } from '@firebase/firestore';
import Nav from './components/Nav/Nav';
import { LoadingContext } from './contexts/Loading/Loading';
import { PasserContext } from 'contexts/Passer/Passer';

interface AppProps {
}

const App:FC<AppProps> = ({children}) => {
  
  const auth = useContext(AuthContext)
  const loading = useContext(LoadingContext)
  const passer = useContext(PasserContext)
  
  // removing the loading svg after the page finished loading
  useEffect(() => {
    loading?.setIsLoading(true);
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
      loading?.setIsLoading(true);
      if(user){
        auth?.setUser(user as User);
      }else {
        auth?.setUser(0);
        await loading?.setIsLoading(false);
        passer?.setPasser(undefined)
        return null;
      }
      await loading?.setIsLoading(true);
      try{
        loading?.setIsLoading(true);
        const docRef = doc(db, "users", `${user?.uid}`);
        const docSnap = await getDocFromServer(docRef);
        if(!docSnap.exists()){
            await setDoc(docRef, {
                createdAt: serverTimestamp(),
                displayName: user?.displayName,
                email: user?.email,
                emailVerified: user?.emailVerified,
                uid: user?.uid
            })
            passer?.setPasser(null)
        }else{
          let _passer = docSnap.data()?.passer;
          if(_passer) passer?.setPasser(_passer)
          else passer?.setPasser(null)
        }

    } catch (err){
        // @ts-ignore
        loading?.setIsLoading(false)
        alert(err)
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
