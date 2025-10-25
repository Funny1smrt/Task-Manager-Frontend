import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../lib/constants";
import { socket } from "../context/SocketContext";

const useApiData = (endpoint, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Токен читається тут для доступу в useEffect
    const token = localStorage.getItem("authToken");

    const getAuthConfig = useCallback(() => {
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return {};
    }, [token]);

    const sendRequest = async (method, path, payload = null) => {
        setError(null);
        const config = getAuthConfig();
        const upperMethod = method.toUpperCase();

        try {
            const url = `${API_URL}${path}`;
            let response;

            // ... (SWITCH: POST/PUT/DELETE) ...
            switch (upperMethod) {
                case "POST":
                    response = await axios.post(url, payload, config);
                    break;
                case "PUT":
                    response = await axios.put(url, payload, config);
                    break;
                case "DELETE":
                    response = await axios.delete(url, config);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }

            if (
                response.status >= 200 &&
                response.status < 300 &&
                (upperMethod === "POST" ||
                    upperMethod === "PUT" ||
                    upperMethod === "DELETE")
            ) {
                // ✅ Залишаємо лог, але знаємо, що Socket.IO зробить оновлення
                console.log(
                    `[useApiData] Successful ${upperMethod}. Real-time update expected from server.`,
                );
            }
            return response;
        } catch (err) {
            console.error(`Error ${method}ing data:`, err);
            setError(err);
            throw err;
        }
    };

    // fetchData також потребує getAuthConfig, тому є залежність.
    const fetchData = useCallback(
        async (customEndpoint = endpoint) => {
            setLoading(true);
            setError(null);
            const config = getAuthConfig();
            try {
                const response = await axios.get(
                    `${API_URL}${customEndpoint}`,
                    config,
                );
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, getAuthConfig],
    );

    // ====================================================================
    // SOCKET.IO LOGIC
    // ====================================================================
// --- 1. Обчислення параметрів та імен (СТАБІЛІЗАЦІЯ) ---
    const { resourceType, eventName, reqQuery } = useMemo(() => {
        const [path, queryString] = endpoint.split('?');
        const rType = path.substring(1).split('/')[0];
        
        const query = {};
        if (queryString) {
            new URLSearchParams(queryString).forEach((value, key) => {
                query[key] = value;
            });
        }

        return {
            resourceType: rType,
            eventName: rType,
            reqQuery: query,
        };
    }, [endpoint]); // ✅ Залежить тільки від endpoint
    const handleResourceUpdate = useCallback(
        (updatedData) => {
            // Тут логіка, яка оновлює стан
            console.log(`Real-time update received for ${resourceType}.`);
            setData(updatedData);
            setLoading(false);
        },
        [resourceType],
    ); // Залежить від типу ресурсу
    // ✅ Виносимо joinRoom у useCallback, щоб він не створювався на кожному рендері
    const joinRoom = useCallback(() => {
        // 💡 ТУТ ВИКОРИСТОВУЮТЬСЯ ВСІ НЕОБХІДНІ ЗМІННІ
        socket.emit("join-user-room", { token, resourceType, reqQuery });
        console.log(
            `Socket.IO connected. Requesting room: ${resourceType} with query:`,
            reqQuery,
        );
    }, [token, resourceType, reqQuery]);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        // --- 3. Логіка підключення та приєднання ---

        if (!socket.connected) {
            socket.connect();
            setLoading(true);
            const initialJoin = () => {
                joinRoom();
                socket.off("connect", initialJoin); // Видаляємо після першого запуску
            };
            socket.on("connect", initialJoin);
        } else {
            // ✅ ЯКЩО ВЖЕ ПІДКЛЮЧЕНО (Навігація/Зміна endpoint):
            // Викликаємо joinRoom напряму, щоб оновити кімнату без повторного connect.
            // Інакше, socket.on("connect", joinRoom) викликається при першому підключенні
            joinRoom();
            setLoading(true);
        }

        // Встановлюємо слухача для даних (працює і для початкового завантаження, і для оновлень)
        socket.on(eventName, handleResourceUpdate);

        // --- 4. Очищення ---
        return () => {
            // Видаляємо обробник оновлення даних
            socket.off("connect", joinRoom);
            socket.off(eventName, handleResourceUpdate);
        };
        // ✅ Залежності: endpoint змушує перепідключатися при навігації. token - при логіні/логауті.
    }, [token, eventName, joinRoom, handleResourceUpdate, endpoint]);

    return { data, loading, error, fetchData, sendRequest };
};

export default useApiData;
