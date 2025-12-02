"use client";

import { useState } from "react";
import "./globals.css";

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Сайн байна уу, юу ярилцмаар байна?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply || "(хоосон хариу)" }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Алдаа гарлаа. Дараа дахин оролдоно уу."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">OS Simple Chat (GPT-4.1-mini)</div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.role === "user" ? "user" : "assistant"}`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          className="chat-input"
          placeholder="Асуух зүйлээ бич..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send-btn" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
