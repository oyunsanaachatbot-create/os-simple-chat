"use client";

import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Сайн байна уу? Юу ярилцмаар байна?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Алдаа гарлаа. Дахин оролдоно уу."
        }
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">OS Simple Chat (GPT-4.1-mini)</div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          className="chat-input"
          value={input}
          placeholder="Асуух зүйлээ бичнэ үү..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send-btn" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
