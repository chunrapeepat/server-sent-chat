import React, { useState } from "react";
import ChatRoom from "./ChatRoom";
import { initConnection, sendMessage } from "./utils/chat-api";
import { SERVER_ENDPOINT_URL } from "./utils/config";

function App() {
  const [username, setUsername] = useState("");
  const [endpointURL, setEndpointURL] = useState(SERVER_ENDPOINT_URL);

  const [isConnected, setIsConnected] = useState(false);

  const handleConnection = async () => {
    if (!username || !endpointURL) {
      return;
    }

    const isOk = await initConnection(username, endpointURL);
    if (isOk) {
      setIsConnected(true);
    }
  };

  return (
    <div>
      <span>Users: </span>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <span>Chat Server: </span>
      <input
        type="text"
        placeholder="server url"
        value={endpointURL}
        onChange={(e) => setEndpointURL(e.target.value)}
      />
      <button onClick={handleConnection}>Connect</button>

      {isConnected && (
        <ChatRoom username={username} endpointURL={endpointURL} />
      )}
    </div>
  );
}

export default App;
