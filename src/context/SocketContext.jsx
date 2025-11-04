import { SOCKET_URL } from "../lib/constants";
import io from "socket.io-client";



export const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
});

// Логи для відладки
socket.on("connect", () => {
    // console.log("✅ Socket.IO connected:", socket.id);
});

// socket.on("disconnect", (reason) => {
    // console.log("🔌 Socket.IO disconnected:", reason);
// });

socket.on("connect_error", (error) => {
    console.error("❌ Socket.IO connection error:", error);
});

socket.on("reconnect", (attemptNumber) => {
    console.log("🔄 Socket.IO reconnected after", attemptNumber, "attempts");
});

socket.on("reconnect_attempt", (attemptNumber) => {
    console.log("🔄 Socket.IO reconnection attempt", attemptNumber);
});

socket.on("reconnect_failed", () => {
    console.error("❌ Socket.IO reconnection failed");
});