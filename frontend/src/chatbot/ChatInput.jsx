import React, { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const send = () => {
    const v = text;
    const trimmed = (v || "").trim();
    if (!trimmed) return;
    setText("");
    onSend?.(trimmed);
  };

  return (
    <div className="zwc-chatInputRow">
      <input
        className="zwc-chatInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about donating, requesting, dashboard, safety…"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            send();
          }
        }}
      />
      <button
        type="button"
        className="zwc-chatSendBtn"
        onClick={send}
        disabled={disabled}
        aria-label="Send"
      >
        Send
      </button>
    </div>
  );
}

