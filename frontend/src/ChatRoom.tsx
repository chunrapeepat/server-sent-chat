import React, { useState } from "react";
import { sendMessage } from "./utils/chat-api";

interface ChatRoomProps {
  username: string;
  endpointURL: string;
}

function ChatRoom({ username, endpointURL }: ChatRoomProps) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message) {
      return;
    }
    await sendMessage(message, username, endpointURL);
  };

  return (
    <div>
      <div>Chat message will display here</div>
      <hr />
      <span>Message: </span>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;
