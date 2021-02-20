import React, { useState, useEffect } from "react";
import { sendMessage } from "./utils/chat-api";

interface ChatRoomProps {
  username: string;
  endpointURL: string;
}
interface MessageEvent {
  type: "message";
  username: string;
  message: string;
}

function ChatRoom({ username, endpointURL }: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const events = new EventSource(`${endpointURL}/message`);
    events.onmessage = (event) => {
      const data = JSON.parse(event.data) as MessageEvent;

      if (data.username !== username) {
        setMessages([...messages, data]);
      }
    };
  }, []);

  const handleSend = async () => {
    if (!message) {
      return;
    }
    await sendMessage(message, username, endpointURL);
  };

  return (
    <div>
      <hr />
      <div>
        {messages.map((e, i) => {
          return (
            <li key={i}>
              [{e.username}] {e.message}
            </li>
          );
        })}
      </div>

      <span>Message: </span>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;
