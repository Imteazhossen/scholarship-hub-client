import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/firebase.init';


 const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('user in the auth state change', currentUser);
            setLoading(false);

        });
        return () => {
            unSubscribe();
        };

    }, []);

    const signInWithGoogle = () => {
       
        return  signInWithPopup(auth, provider);

    }


    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const authInfo = {
        user,
        logOut,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile
       
       

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;