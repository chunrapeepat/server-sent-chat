import React, { useState, useEffect } from "react";
import { sendMessage } from "./utils/chat-api";

interface ChatRoomProps {
  username: string;
  endpointURL: string;
}
function ChatRoom({ username, endpointURL }: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const events = new EventSource(`${endpointURL}/message`);
    events.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages([...messages, `[${data.username}] ${data.message}`]);
    };
  }, []);

  const handleSend = async () => {
    if (!message) {
      return;
    }
    const isOk = await sendMessage(message, username, endpointURL);
    if (isOk) {
      setMessage("");
    }
  };

  return (
    <div>
      <hr />
      <div>
        {messages.map((message, i) => {
          return <li key={i}>{message}</li>;
        })}
      </div>

      <span>Message: </span>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;
