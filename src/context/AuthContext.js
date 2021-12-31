import React, { useContext, useEffect, useState } from 'react';
import "../../src/firebase";
import {
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () =>{
    return useContext(AuthContext);
}


export const AuthProvider =  ({children}) => {
    const [loading, setLoading] = useState(true);
    const [appCurrentUser, setAppCurrentUser] = useState();


    

    //-- Sign Up Function --//
    const signUp = async(email, password, username) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);


        //-- Update Profile --//
        await updateProfile(auth.currentUser, {
            displayName: username
        });

        const user = auth.currentUser;
        setAppCurrentUser({
            ...user
        });
    }

    //-- Login Function --//
    const logIn = (email, password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    //-- Log Out Function --//
    const logOut = () => {
        const auth = getAuth();
        return signOut(auth);
    }


    useEffect(() => {
        const auth = getAuth();
        const authStateChanged = onAuthStateChanged(auth, (user) => {
            setAppCurrentUser(user);
            setLoading(false);
        });

        return authStateChanged;
    }, []);


    const value = {
        appCurrentUser,
        signUp,
        logIn,
        logOut
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}