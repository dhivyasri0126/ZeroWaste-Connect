import React from "react";

export default function ChatMessage({ message }) {
  const { role, text, ts } = message || {};
  const isUser = role === "user";

  return (
    <div className={"zwc-chatRow " + (isUser ? "user" : "ai")}> 
      <div className={"zwc-chatBubble " + (isUser ? "userBubble" : "aiBubble")}> 
        <div className="zwc-chatText">{text}</div>
        <div className="zwc-chatTs">{ts}</div>
      </div>
    </div>
  );
}

