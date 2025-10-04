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
import { UserContext } from "../context/context";

function useFirestore(collectionName, conditions) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    // Мемоізація посилання на колекцію
    const collectionRef = useMemo(
        () => collection(db, collectionName),
        [collectionName],
    );

    // Мемоізація умов запиту
    const memoConditions = useMemo(() => {
        // Якщо користувача немає, ми не формуємо умов
        if (!user?.uid) {
            return [];
        }

        // Забезпечення, що conditions є масивом where-клауз
        const safeConditions = Array.isArray(conditions)
            ? conditions.filter(Boolean)
            : conditions
              ? [conditions]
              : [];

        // Додаємо обов'язкову умову ownerId для безпеки
        return [...safeConditions, where("ownerId", "==", user.uid)];
    }, [conditions, user?.uid]);

    // Хук для підписки на дані в реальному часі
    useEffect(() => {
        setError(null);

        if (!user?.uid) {
            // Очищаємо дані та зупиняємо завантаження, якщо користувач вийшов
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const q = query(collectionRef, ...memoConditions);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(docs);
                console.log(
                    `Дані з колекції ${collectionName} успішно отримано`,
                    docs,
                );
                setLoading(false);
            },
            (error) => {
                console.error(
                    `Помилка при отриманні даних з ${collectionName}:`,
                    error,
                );
                setError(error);
                setLoading(false);
            },
        );
        return unsubscribe; // Відписка при демонтажі або зміні залежностей
    }, [collectionName, memoConditions, user?.uid, collectionRef]);

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

    return { data, addData, updateData, deleteData, loading, error };
}

export default useFirestore;
