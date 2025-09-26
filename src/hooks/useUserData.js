import { useEffect, useState } from "react"
import { doc, setDoc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export function useUserData() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const newUserData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: user.metadata.creationTimestamp,
    }
    useEffect(() => {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, async (doc) => {
            try {
                if (doc.exists()) {
                    setUserData(doc.data())
                } else {
                    await setDoc(userDocRef, newUserData);
                    setUserData(newUserData);
                }
            } catch (error) {
                console.log("Помилка при отриманні даних:" + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        })
        
        return () => unsubscribe()
    }, [])

    const updateUserData = async (data) => {
        try {
            await setDoc(doc(db, "users", user.uid), data, { merge: true });
            setUserData((prevData) => ({ ...prevData, ...data }));
        } catch (error) {
            console.log("Помилка при оновленні даних:" + error);
            setError(error);
        }
    }

    return { userData, loading, error, updateUserData };
}
