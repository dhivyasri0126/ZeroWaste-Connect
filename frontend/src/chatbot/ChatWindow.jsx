import React, { useEffect, useMemo, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import WelcomeMessage from "./WelcomeMessage";

const OFFLINE_FAQS = [
  {
    keys: ["register", "sign up"],
    answer:
      "To register: open the app on the home page, click Sign Up, fill in your details, and submit. If you see validation errors, double-check fields like email and password format.",
  },
  {
    keys: ["login", "log in"],
    answer:
      "To login: go to the Login page, enter your email/username and password, then submit. After successful authentication, you’ll be routed to your dashboard.",
  },
  {
    keys: ["donate food", "donation", "donor"],
    answer:
      "To donate food: open Donor Dashboard → Add Donation. Provide food details (type, quantity, pickup/delivery info, and notes), then submit to create your donation listing.",
  },
  {
    keys: ["request food", "request", "recipient"],
    answer:
      "To request food: open Recipient Dashboard → find available donations and submit a request for a listing. Your request will appear in your My Requests section.",
  },
  {
    keys: ["accept requests", "accept"],
    answer:
      "To accept requests: in Donor Dashboard, open Received Requests (or the requests panel). Review the requester details, then accept the request to proceed.",
  },
  {
    keys: ["complete a donation", "complete", "complete donation"],
    answer:
      "To complete a donation: once a request is accepted and the pickup/delivery is done, mark the donation as completed in the relevant donation/request flow inside your dashboard (wording may appear as Complete/Done depending on your UI).",
  },
  {
    keys: ["donation history", "history", "my donations", "donations history"],
    answer:
      "Donation History shows your past donation entries and their status over time. Use it to track what’s upcoming, completed, or no longer active.",
  },
  {
    keys: ["edit my profile", "profile", "edit profile"],
    answer:
      "To edit your profile: go to Profile from the sidebar/top navigation, update your information, and save changes.",
  },
  {
    keys: ["settings", "setting"],
    answer:
      "Settings lets you manage preferences (like theme) and other user controls. Open Settings from your dashboard navigation.",
  },
  {
    keys: ["dark mode", "dark mode", "theme"],
    answer:
      "To change dark mode: open Settings and toggle Dark Mode. If you don’t see it, check the Theme option inside Settings.",
  },
  {
    keys: ["donate cooked food", "cooked food"],
    answer:
      "Yes—if it’s safe and within the freshness window. Prefer freshly cooked food, keep it covered, and share accurate notes so recipients can decide responsibly.",
  },
  {
    keys: ["food safety", "safety"],
    answer:
      "Food safety basics: donate only safe, uncontaminated items; avoid food with spoilage smells/visible mold; label ingredients/allergens when possible; and provide accurate cooking/packaging times.",
  },
  {
    keys: ["what food should not be donated", "should not be donated", "not donate"],
    answer:
      "Avoid donating: spoiled or moldy food, foods past their safe time, unsafe temperature-controlled items without proper handling, and anything with unknown contamination. When in doubt, don’t donate.",
  },
  {
    keys: ["dashboard", "explain dashboard"],
    answer:
      "Dashboard is your control center. Donors use it to manage donations and view requests; recipients use it to browse available donations and track their requests and history.",
  },
  {
    keys: ["add donation", "donation tips"],
    answer:
      "Add Donation tips: include clear food type + quantity, choose accurate notes (e.g., vegetarian, allergens), and add pickup timing/details so recipients can arrange collection quickly.",
  },
  {
    keys: ["help", "what can you do", "capabilities"],
    answer:
      "I can guide you through ZeroWaste Connect—registration/login, donating food, requesting food, dashboard features, profile/settings, and food safety. Ask me a question anytime.",
  },
];

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function isLikelyZeroWasteQuestion(text) {
  const t = normalize(text);
  return (
    t.includes("zerowaste") ||
    t.includes("dashboard") ||
    t.includes("donor") ||
    t.includes("recipient") ||
    t.includes("donate") ||
    t.includes("request") ||
    t.includes("profile") ||
    t.includes("settings") ||
    t.includes("food") ||
    t.includes("safety") ||
    t.includes("history")
  );
}

function offlineAnswer(question) {
  const q = normalize(question);
  if (!isLikelyZeroWasteQuestion(q)) {
    return "I can only help with questions related to ZeroWaste Connect (donating food, requesting food, dashboard, profile/settings, and food safety). Try asking something like: “How do I register?” or “How do I request food?”";
  }

  for (const item of OFFLINE_FAQS) {
    for (const k of item.keys) {
      if (q.includes(k)) return item.answer;
    }
  }

  return "I might not have that exact detail yet. If you’re trying to donate or request food, tell me where you’re stuck (e.g., “Add Donation”, “Received Requests”, “My Requests”, or “Settings”), and I’ll guide you step-by-step.";
}

export default function ChatWindow({
  id,
  isOpen,
  messages,
  onAddMessage,
  onClearMessages,
}) {
  const listRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setHasEverOpened(true);
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll when messages change or typing indicator toggles
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const showWelcome = hasEverOpened && messages.length === 0;

  const handleSend = async (text) => {
    const question = (text || "").trim();
    if (!question) return;

    onAddMessage({
      id: `u_${Date.now()}`,
      role: "user",
      text: question,
      ts: nowTime(),
    });

    setIsTyping(true);

    // Simulated typing delay (offline)
    await new Promise((r) => setTimeout(r, 650));

    const reply = offlineAnswer(question);

    onAddMessage({
      id: `a_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      role: "ai",
      text: reply,
      ts: nowTime(),
    });

    setIsTyping(false);
  };

  const quickSend = (preset) => {
    handleSend(preset);
  };

  return (
    <div
      className={
        "zwc-chatbotWindowWrap" + (isOpen ? " open" : "") + (messages.length === 0 ? " empty" : "")
      }
      aria-hidden={!isOpen}
    >
      <div id={id} className="zwc-chatbotWindow" role="dialog" aria-label="Chatbot">
        <div className="zwc-chatbotHeader">
          <div className="zwc-chatbotHeaderLeft">
            <span className="zwc-chatbotHeaderDot" aria-hidden="true" />
            <div>
              <div className="zwc-chatbotTitle">ZeroWaste AI</div>
              <div className="zwc-chatbotSubtitle">In-app assistant</div>
            </div>
          </div>

          <div className="zwc-chatbotHeaderRight">
            <button
              type="button"
              className="zwc-chatbotMiniBtn"
              onClick={onClearMessages}
              title="Clear chat"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="zwc-chatbotBody" ref={listRef}>
          {showWelcome ? (
            <WelcomeMessage onQuick={quickSend} />
          ) : (
            <>
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {isTyping && (
                <div className="zwc-typingRow" aria-live="polite">
                  <div className="zwc-typingBubble"> 
                    <span className="zwc-typingDots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="zwc-typingText">Thinking…</span>
                  </div>
                  <div className="zwc-typingTs">{nowTime()}</div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="zwc-chatbotFooter">
          <ChatInput onSend={handleSend} disabled={false} />
          <div className="zwc-chatbotFooterHint">Ask about ZeroWaste Connect (donate, request, dashboard, safety).</div>
        </div>
      </div>
    </div>
  );
}

