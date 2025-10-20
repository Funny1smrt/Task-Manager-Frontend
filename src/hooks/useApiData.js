import { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Або вбудований fetch

/**
 * Custom Hook для отримання даних з API
 * @param {string} endpoint - Частина URL-адреси API (наприклад, '/products')
 * @param {object} initialData - Початкове значення для даних
 */
const useApiData = (endpoint, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = "http://localhost:5000/api"; // Замініть на свій URL бекенду

    const getAuthConfig = () => {
        const token = localStorage.getItem("authToken"); // Отримання токена
        if (token) {
            return {
                headers: {
                    // Формат має бути 'Bearer [TOKEN]', як очікує ваш бекенд
                    Authorization: `Bearer ${token}`,
                },
            };
        }
        return {}; // Повертаємо пустий об'єкт, якщо токена немає
    };
    // Функція для отримання даних
    const fetchData = useCallback(
        async (customEndpoint = endpoint) => {
            setLoading(true);
            setError(null);
            const config = getAuthConfig(); // Отримуємо конфігурацію з токеном
            try {
                // Використовуємо axios.get
                const response = await axios.get(
                    `${BASE_URL}${customEndpoint}`, config
                );
                setData(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    console.error(
                        "Неавторизований доступ. Токен відсутній або недійсний.",
                    );
                    // Тут можна додати логіку перенаправлення на сторінку входу (Login page)
                }
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [endpoint],
    ); // 'endpoint' як залежність

    // Викликаємо функцію отримання даних при першому рендері або зміні endpoint
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Функція для відправки (POST) або оновлення (PUT/PATCH) даних
    const sendRequest = useCallback(async (method, path, payload = null) => {
        setLoading(true);
        setError(null);

        const config = getAuthConfig(); // Отримуємо конфігурацію з токеном
        try {
            const url = `${BASE_URL}${path}`;
            let response;

            switch (method.toUpperCase()) {
                case "POST":
                    response = await axios.post(url, payload, config);
                    break;
                case "PUT":
                    response = await axios.put(url, payload, config);
                    break;
                case "DELETE":
                    response = await axios.delete(url, config);
                    break;
                // Додайте інші методи при необхідності
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            setLoading(false);
            
            // Оновлюємо дані після успішної операції, якщо потрібно
            if (method === "POST") {
                // Якщо POST, ви можете оновити список, додавши нові дані, або просто викликати fetchData
                // setData(prevData => [...prevData, response.data]);
            }

            return response.data; // Повертаємо відповідь для подальшої обробки в компоненті
        } catch (err) {
            console.error(`Error ${method}ing data:`, err);
            setError(err);
            setLoading(false);
            throw err; // Повторно кидаємо помилку, щоб компонент міг її обробити
        }
    }, []);

    // Повертаємо стан і функції для використання в компонентах
    return { data, loading, error, refetch: fetchData, sendRequest };
};

export default useApiData;
