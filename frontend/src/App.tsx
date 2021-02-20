import React from "react";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <div>
      <span>Users: </span>
      <input type="text" placeholder="username" />

      <span>Chat Server: </span>
      <input type="text" placeholder="server url" />

      <button>Connect</button>

      <hr />

      <ChatRoom />
    </div>
  );
}

export default App;
