import { useState, useEffect, useMemo } from "react";

import {
    collection,
    query,
    doc,
    onSnapshot,
    where,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function useFirestore(collectionName, conditions) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const collectionRef = useMemo(
        () => collection(db, collectionName),
        [collectionName],
    );
    const memoConditions = useMemo(() => {
        const safeConditions = Array.isArray(conditions)
            ? conditions
            : [conditions];
        return [...safeConditions, where("ownerId", "==", user.uid)];
    }, [conditions, user.uid]);

    useEffect(() => {
        if (!user?.uid) return;

        const q = query(collectionRef, ...memoConditions);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(docs);
                console.log("Дані успішно отримано", docs);
                setLoading(false);
            },
            (error) => {
                console.log("Помилка при отриманні даних:" + error);
                setError(error);
                setLoading(false);
            },
        );
        return unsubscribe;
    }, [collectionName, memoConditions, user?.uid, collectionRef]);

    const addData = async (data) => {
        try {
            await addDoc(collectionRef, {
                ...data,
                createdAt: serverTimestamp(),
                ownerId: user.uid,
            });
            console.log("Дані успішно додано", data);
        } catch (error) {
            console.log("Помилка при додаванні даних:" + error);
            setError(error);
        }
    };

    const updateData = async (id, data) => {
        try {
            await updateDoc(doc(collectionRef, id), data);
            console.log("Дані успішно оновлено");
        } catch (error) {
            console.log("Помилка при оновленні даних:" + error);
            setError(error);
        }
    };

    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(collectionRef, id));
            console.log("Дані успішно видалено");
        } catch (error) {
            console.log("Помилка при видаленні даних:" + error);
            setError(error);
        }
    };

    return { data, addData, updateData, deleteData, loading, error };
}

export default useFirestore;
