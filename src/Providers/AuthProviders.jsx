import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app)

// eslint-disable-next-line react/prop-types
const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider);
    }
    
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,loggedUser=>{
             console.log("logged User",loggedUser);
             setUser(loggedUser);
             setLoading(false);
         })
         return()=>{
             unSubscribe();
         }
     },[])

    const authInfo ={
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;