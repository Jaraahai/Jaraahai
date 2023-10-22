import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        setLoading(false);
      } else {
        // User is signed out.
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts.
      unsubscribe();
    };
  }, []);

  return { user, loading };
};

export default useAuthState;
