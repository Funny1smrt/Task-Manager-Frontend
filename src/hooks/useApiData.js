import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../lib/constants";
import { socket } from "../context/SocketContext";

const useApiData = (endpoint, initialData = [], options = {}) => {
    const { lazy = false } = options;
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(() => (lazy ? false : true));
    const [error, setError] = useState(null);
    const token = useMemo(() => localStorage.getItem("authToken"), []);

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

    const sendRequest = useCallback(
        async (method, path, payload = null) => {
            setError(null);
            const config = getAuthConfig();
            const upperMethod = method.toUpperCase();

            try {
                const url = `${API_URL}${path}`;
                let response;

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

                console.log(
                    `[useApiData] ${upperMethod} успішний. Очікуємо Socket.IO оновлення.
                    ${url} ${JSON.stringify(payload)}`,
                );
                return response;
            } catch (err) {
                console.error(`Error ${method}ing data:`, err);
                setError(err);
                throw err;
            }
        },
        [getAuthConfig],
    );

    const fetchData = useCallback(
        async (customEndpoint = endpoint) => {
            if (!customEndpoint) {
                setLoading(false);
                return;
            }

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
                console.error("Помилка завантаження:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, getAuthConfig],
    );

    // ✅ ВИПРАВЛЕННЯ: Парсимо endpoint один раз і мемоізуємо всі параметри
    const socketParams = useMemo(() => {
        if (!endpoint) return null;

        const [path, queryString] = endpoint.split("?");
        const resourceType = path.substring(1).split("/")[0];

        const reqQuery = {};
        if (queryString) {
            new URLSearchParams(queryString).forEach((value, key) => {
                reqQuery[key] = value;
            });
        }

        return {
            resourceType,
            eventName: resourceType,
            reqQuery,
            // Для порівняння в useEffect
            queryString: JSON.stringify(reqQuery),
        };
    }, [endpoint]);

    // Обробник real-time оновлень - стабільний через useCallback
    const handleResourceUpdate = useCallback(
        (updatedData) => {
            if (!socketParams) return;
            // console.log(
            //     `✅ Real-time оновлення для ${socketParams.resourceType}:`,
            //     updatedData,
            // );
            setData(updatedData);
            setLoading(false);
        },
        [socketParams],
    );

    // Socket.IO логіка
    useEffect(() => {
        if (!token || !socketParams || !endpoint || lazy) {
            setLoading(false);
            return;
        }

        const { resourceType, eventName, reqQuery } = socketParams;
        let isSubscribed = true;

        const joinRoom = () => {
            if (!isSubscribed) return;

            socket.emit("join-user-room", { token, resourceType, reqQuery });
            // console.log(
            //     `📡 Socket.IO: Приєднання до кімнати ${resourceType}`,
            //     reqQuery,
            // );
        };

        const handleConnectError = (error) => {
            console.error(
                `❌ Socket.IO: Не вдалося підключитися до ${resourceType}:`,
                error.message,
            );
            console.log(
                `🔄 Fallback: завантаження ${resourceType} через HTTP...`,
            );
            if (isSubscribed) {
                fetchData();
            }
        };

        // Підключення
        if (!socket.connected) {
            socket.connect();
            socket.once("connect", joinRoom);
            socket.once("connect_error", handleConnectError);
        } else {
            joinRoom();
        }

        // Підписка на оновлення
        socket.on(eventName, handleResourceUpdate);

        // Очищення
        return () => {
            isSubscribed = false;
            socket.off(eventName, handleResourceUpdate);
            socket.off("connect_error", handleConnectError);
            // console.log(`🔌 Відписка від ${eventName}`);
        };
        // ✅ Тепер всі залежності правильні і стабільні
    }, [token, socketParams, endpoint, handleResourceUpdate, fetchData, lazy]);

    return { data, loading, error, fetchData, sendRequest };
};

export default useApiData;
