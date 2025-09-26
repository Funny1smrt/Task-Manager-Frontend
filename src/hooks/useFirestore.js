import { useState, useEffect } from "react"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
    where,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    addDoc,
    setDoc,
} from "firebase/firestore"
import { db } from "../firebase"

function useFirestore(collectionName) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const collectionRef = collection(db, collectionName)
    const queryRef = query(collectionRef, where("ownerId", "==", user.uid))

    useEffect(() => {
        const unsubscribe = onSnapshot(
            queryRef,
            (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
                )
                console.log("Дані успішно отримано")
                setLoading(false)
            },
            (error) => {
                console.log("Помилка при отриманні даних:" + error)
                setError(error)
                setLoading(false)
            },
        )
        return () => unsubscribe
    }, [])

    const addData = async (data) => {
        try {
            await addDoc(collectionRef, {
                ...data,
                createdAt: serverTimestamp(),
                ownerId: user.uid,
            })
            console.log("Дані успішно додано")
        } catch (error) {
            console.log("Помилка при додаванні даних:" + error)
            setError(error)
        }
    }

    const updateData = async (id, data) => {
        try {
            await updateDoc(doc(collectionRef, id), data)
            console.log("Дані успішно оновлено")
        } catch (error) {
            console.log("Помилка при оновленні даних:" + error)
            setError(error)
        }
    }

    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(collectionRef, id))
            console.log("Дані успішно видалено")
        } catch (error) {
            console.log("Помилка при видаленні даних:" + error)
            setError(error)
        }
    }

    return { data, addData, updateData, deleteData, loading, error }
}

export default useFirestore
