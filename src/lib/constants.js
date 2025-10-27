// ✅ Переконайся, що ці значення співпадають з тим, де запущений сервер
export const BASE_URL = "http://localhost";
export const PORT = "5000"; // Якщо сервер на іншому порті - зміни тут!
export const API_URL = `${BASE_URL}:${PORT}/api`;

// Для відладки - подивись в консолі бекенду який порт використовується
console.log("🔗 API URL:", API_URL);
