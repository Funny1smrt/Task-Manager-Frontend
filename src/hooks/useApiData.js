import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Custom Hook для отримання даних з API
 * @param {string} endpoint - Частина URL-адреси API (наприклад, '/products')
 * @param {object} initialData - Початкове значення для даних
 */
const useApiData = (endpoint, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5000/api";

    const getAuthConfig = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return {};
    };

    // ----------------------------------------------------------------------
    // 2. Функція для отримання даних (fetchData)
    // ----------------------------------------------------------------------
    const fetchData = useCallback(
        async (customEndpoint = endpoint) => {
            const token = localStorage.getItem("authToken");
            // 🛑 ВАЖЛИВА ПЕРЕВІРКА: Не робити запит, якщо немає токена
            if (!token) {
                console.warn(
                    "[useApiData] Токен відсутній. Пропускаємо початкове отримання даних.",
                );
                setLoading(false);
                return;
            }

            console.log(`[useApiData] Fetching data for ${endpoint}.`);
            setLoading(true);
            setError(null);
            const config = getAuthConfig();
            try {
                const response = await axios.get(
                    `${BASE_URL}${customEndpoint}`,
                    config,
                );
                setData(response.data);
            } catch (err) {
                // Логуємо 403, але не обов'язково встановлюємо помилку, якщо це просто початок сесії
                if (err.response && err.response.status === 403) {
                    console.error(
                        "[useApiData] Отримано 403 Forbidden. Необхідна авторизація.",
                    );
                } else {
                    console.error("Error fetching data:", err);
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        },
        [endpoint],
    );

    // ----------------------------------------------------------------------
    // 3. useEffect: Запускається при зміні fetchData
    // ----------------------------------------------------------------------
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ----------------------------------------------------------------------
    // 4. Функція для відправки (sendRequest) - без змін
    // ----------------------------------------------------------------------
    const sendRequest = async (method, path, payload = null) => {
        setError(null);

        const config = getAuthConfig();
        const upperMethod = method.toUpperCase();
        try {
            const url = `${BASE_URL}${path}`;
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

            if (
                response.status >= 200 &&
                response.status < 300 &&
                (upperMethod === "POST" ||
                    upperMethod === "PUT" ||
                    upperMethod === "DELETE")
            ) {
                console.log(
                    `[useApiData] Successful ${upperMethod}. Auto-refetching data...`,
                );
                fetchData();
            }

            return response;
        } catch (err) {
            console.error(`Error ${method}ing data:`, err);
            setError(err);
            throw err;
        }
    };

    return { data, loading, error, fetchData, sendRequest };
};

export default useApiData;
