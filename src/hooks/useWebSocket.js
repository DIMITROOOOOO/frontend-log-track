import { useEffect, useRef, useState } from "react";

export default function useWebSocket(url) {
  const socketRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!url) {
      return undefined;
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;
    setStatus("connecting");

    socket.addEventListener("open", () => setStatus("open"));
    socket.addEventListener("message", (event) => setLastMessage(event.data));
    socket.addEventListener("close", () => setStatus("closed"));
    socket.addEventListener("error", () => setStatus("error"));

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return {
    status,
    lastMessage,
    sendMessage,
  };
}
