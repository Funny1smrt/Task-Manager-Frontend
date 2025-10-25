import { BASE_URL, PORT } from "../lib/constants";
import io from "socket.io-client";
const SOCKET_URL = `${BASE_URL}:${PORT}`;
export const socket = io(SOCKET_URL, {
    autoConnect: false,
    // Можливо, допоможе, якщо у вас проблеми з WebSocket на хості
    transports: ["websocket", "polling"],
});