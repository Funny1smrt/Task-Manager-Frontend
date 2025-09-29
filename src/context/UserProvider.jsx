import { UserContext } from "./context";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // додатково для spinner

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Підставляємо дефолтні значення, щоб не було undefined
                const safeUser = {
                    displayName: currentUser.displayName || "",
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || "",
                    uid: currentUser.uid,
                    creationTime: currentUser.metadata?.creationTime || null,
                };
                setUser(safeUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
