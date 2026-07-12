import React from "react";

const QUICK_BUTTONS = [
  { label: "Donate Food", value: "How do I donate food?" },
  { label: "Request Food", value: "How do I request food?" },
  { label: "Dashboard", value: "Explain Dashboard." },
  { label: "Profile", value: "How do I edit my profile?" },
  { label: "Settings", value: "What is Settings?" },
  { label: "Food Safety", value: "What is food safety?" },
  { label: "Donation Tips", value: "Explain Add Donation." },
  { label: "Help", value: "Help" },
];

export default function WelcomeMessage({ onQuick }) {
  return (
    <div className="zwc-welcomeWrap">
      <div className="zwc-chatRow ai">
        <div className="zwc-chatBubble aiBubble">
          <div className="zwc-welcomeTitle">👋 Welcome to ZeroWaste Connect!</div>
          <div className="zwc-welcomeText">I'm ZeroWaste AI Assistant.</div>
          <div className="zwc-welcomeText">
            I can help you learn how to use this application and answer questions about food donation.
          </div>

          <div className="zwc-quickButtons">
            {QUICK_BUTTONS.map((b) => (
              <button
                type="button"
                key={b.label}
                className="zwc-quickBtn"
                onClick={() => onQuick?.(b.value)}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="zwc-welcomeFooter">Ask me anything about donating, requesting, dashboard, profile, settings, or food safety.</div>
        </div>
      </div>
    </div>
  );
}

