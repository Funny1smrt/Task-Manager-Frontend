import { useState, useMemo } from "react";
import {
    collection,
    doc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../context/context";

function useFirestore(collectionName) {
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    // Мемоізація посилання на колекцію
    const collectionRef = useMemo(
        () => collection(db, collectionName),
        [collectionName],
    );

    // Операція: Додати документ
    const addData = async (data) => {
        if (!user?.uid) {
            const err = new Error(
                "Користувач не автентифікований. Додавання даних неможливе.",
            );
            setError(err);
            throw err;
        }
        try {
            await addDoc(collectionRef, {
                ...data,
                createdAt: serverTimestamp(),
                ownerId: user.uid,
            });
            console.log("Дані успішно додано");
        } catch (error) {
            console.error("Помилка при додаванні даних:", error);
            setError(error);
            throw error;
        }
    };

    // Операція: Оновити документ
    const updateData = async (id, data) => {
        if (!user?.uid) {
            const err = new Error(
                "Користувач не автентифікований. Оновлення даних неможливе.",
            );
            setError(err);
            throw err;
        }
        try {
            await updateDoc(doc(collectionRef, id), data);
            console.log("Дані успішно оновлено");
        } catch (error) {
            console.error("Помилка при оновленні даних:", error);
            setError(error);
            throw error;
        }
    };

    // Операція: Видалити документ
    const deleteData = async (id) => {
        if (!user?.uid) {
            const err = new Error(
                "Користувач не автентифікований. Видалення даних неможливе.",
            );
            setError(err);
            throw err;
        }
        try {
            await deleteDoc(doc(collectionRef, id));
            console.log("Дані успішно видалено");
        } catch (error) {
            console.error("Помилка при видаленні даних:", error);
            setError(error);
            throw error;
        }
    };

    return { addData, updateData, deleteData, error };
}

export default useFirestore;
