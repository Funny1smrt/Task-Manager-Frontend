import { useEffect, useState, useContext, useMemo } from "react";
import { query, onSnapshot, where, collection } from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "../context/context";
function useOnSnapshotFirestore(collectionName, conditions = []) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    // Мемоізація посилання на колекцію
    const collectionRef = useMemo(
        () => collection(db, collectionName),
        [collectionName],
    );
    // Формуємо фінальні умови запиту
    const memoConditions = useMemo(() => {
        // Якщо немає користувача або умови пусті, повертаємо null
        if (!user?.uid || !conditions || conditions.length === 0) return null;
        if (conditions === "*" && user?.uid) return [where("ownerId", "==", user.uid)];
        return [...conditions, where("ownerId", "==", user.uid)];
    }, [user?.uid, conditions]);

    // Хук для підписки на дані в реальному часі
    useEffect(() => {
        setError(null);
        setData([]);

        if (!user?.uid) {
            // Очищаємо дані та зупиняємо завантаження, якщо користувач вийшов
            setLoading(false);
            return;
        }
        // Якщо немає memoConditions — нічого не робимо
        if (!memoConditions) {
            setData([]);
            setLoading(false);
            return;
        }

        // setLoading(true);
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
                    `Дані з колекції ${collectionName} успішно отримано. Кількість документів: ${docs.length}`,
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
        return () => unsubscribe(); // Відписка при демонтажі або зміні залежностей
    }, [collectionName, memoConditions, user?.uid, collectionRef]);

    return { data, loading, error };
}

export default useOnSnapshotFirestore;
