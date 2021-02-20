import React from "react";

function ChatRoom() {
  return (
    <div>
      <div>Chat message will display here</div>
      <hr />
      <span>Message: </span>
      <input type="text" placeholder="" />

      <button>Send</button>
    </div>
  );
}

export default ChatRoom;
