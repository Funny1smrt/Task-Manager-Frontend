// import { useEffect, useState, useContext } from "react";
// import useApiData from "./useApiData";
// import { UserContext } from "../context/context";

// export function useUserData() {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(UserContext);
//     const { sendRequest } = useApiData("/users");
//     useEffect(() => {
//         if (!user) return;

//         const newUserData = {
//             displayName: user.displayName || "Немає нікнейму",
//             email: user.email,
//             photoURL:
//                 user.photoURL ||
//                 "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//             uid: user.uid,
//             createdAt: serverTimestamp(),
//         };
//         const unsubscribe = 

//         return () => unsubscribe();
//     }, []);

//     const updateUserData = async (id,data) => {
//         try {
//             await sendRequest("PUT", `/users/${id}`, data);
//             console.log("Дані успішно оновлено");
//         } catch (error) {
//             console.error("Помилка при оновленні даних:", error);
//             setError(error);
//             throw error;
//         }
//     };

    // return { userData, loading, error, updateUserData };
// }
