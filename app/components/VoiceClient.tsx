"use client";
import { useEffect, useRef, useState } from "react";

export default function VoiceClient() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [answer, setAnswer] = useState("");

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
    chunksRef.current = [];
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("audio", blob, "audio.webm");
      form.append("instruction", instruction);
      const res = await fetch("/api/chat-voice", { method: "POST", body: form });
      const data = await res.json();
      setAnswer(data.text ?? data.error ?? "");
    };
    mr.start();
    mediaRecorderRef.current = mr;
    setRecording(true);
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Instrução (opcional), ex: 'responda curto'"/>
      <div style={{ display: "flex", gap: 8 }}>
        {!recording ? <button onClick={start}>🎙️ Gravar</button> : <button onClick={stop}>⏹️ Parar</button>}
      </div>
      <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
    </div>
  );
}
