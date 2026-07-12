import React, { useMemo, useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

const STORAGE_KEY = "zwc_chatbot_messages_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

const EcoIcon = () => (
  <svg
    viewBox="0 0 64 64"
    width="22"
    height="22"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M32 6c8 6 20 6 24 18 5 14-3 28-16 30C23 56 12 48 12 35c0-12 12-23 20-29Z"
      fill="rgba(255,255,255,0.9)"
    />
    <path
      d="M41 22c-6 4-10 10-10 16 0 3 1 6 3 8"
      stroke="#0B5"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M26 42c6-4 10-10 10-16"
      stroke="#0B5"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default function AIChatbot() {
  const initialMessages = useMemo(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = safeParse(raw, null);
    if (Array.isArray(parsed)) return parsed;
    return [];
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);

  const persistMessages = (next) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const onToggle = () => {
    setIsOpen((v) => !v);
  };

  const addMessage = (msg) => {
    setMessages((prev) => {
      const next = [...prev, msg];
      persistMessages(next);
      return next;
    });
  };

  const clearMessages = () => {
    setMessages([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="zwc-chatbotRoot" aria-label="ZeroWaste Connect AI Chatbot">
      <button
        type="button"
        className="zwc-chatbotButton"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="zwc-chatbot-window"
        title={isOpen ? "Minimize" : "Open chatbot"}
      >
        <span className="zwc-chatbotIcon" aria-hidden="true">
          <EcoIcon />
        </span>
      </button>

      <ChatWindow
        id="zwc-chatbot-window"
        isOpen={isOpen}
        messages={messages}
        onAddMessage={addMessage}
        onClearMessages={clearMessages}
      />
    </div>
  );
}

