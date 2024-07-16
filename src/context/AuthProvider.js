import React, { createContext, useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import { gapi } from "gapi-script";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await gapi.auth2.getAuthInstance().signIn();
        const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        const oauthToken = googleUser.getAuthResponse().access_token;
        setToken(oauthToken);
      } else {
        setUser(null);
        setToken(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async () => {
      await gapi.auth2.getAuthInstance().signIn();
      const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
      const oauthToken = googleUser.getAuthResponse().access_token;
      setToken(oauthToken);
    });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      gapi.auth2.getAuthInstance().signOut();
      setUser(null);
      setToken(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
