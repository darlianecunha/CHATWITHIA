"use client";
import { useState } from "react";

export default function ChatClient() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<string>("");

  async function onSend() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setAnswer(data.text ?? data.error ?? "");
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Digite sua pergunta..." 
        rows={6}
      />
      <button onClick={onSend}>Enviar</button>
      <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
    </div>
  );
}
