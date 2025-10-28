// ✅ Переконайся, що ці значення співпадають з тим, де запущений сервер
export const BASE_URL = "http://localhost";
// export const PORT = "5000"; // Якщо сервер на іншому порті - зміни тут!
export const API_URL = `https://api-tasks-server-83993e209bd4.herokuapp.com/api`;
// export const API_URL = `${BASE_URL}:${5000}/api`;
export const SOCKET_URL = `https://api-tasks-server-83993e209bd4.herokuapp.com`;

// export const SOCKET_URL = `http://localhost:5000`;

// Для відладки - подивись в консолі бекенду який порт використовується
console.log("🔗 API URL:", API_URL);
