import { useEffect, useState } from "react"
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"
export function useUserData() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user) return
        const userDocRef = doc(db, "users", user.uid)
        const newUserData = {
            displayName: user.displayName || "Немає нікнейму",
            email: user.email,
            photoURL:
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            uid: user.uid,
            createdAt: serverTimestamp(),
        }
        const unsubscribe = onSnapshot(userDocRef, async (doc) => {
            try {
                if (doc.exists()) {
                    setUserData(doc.data())
                } else {
                    await setDoc(userDocRef, newUserData)
                    setUserData(newUserData)
                }
            } catch (error) {
                console.log("Помилка при отриманні даних:" + error)
                setError(error)
            } finally {
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [])

    const updateUserData = async (data) => {
        try {
            await setDoc(doc(db, "users", user.uid), data, { merge: true })
            setUserData((prevData) => ({ ...prevData, ...data }))
        } catch (error) {
            console.log("Помилка при оновленні даних:" + error)
            setError(error)
        }
    }

    return { userData, loading, error, updateUserData }
}
