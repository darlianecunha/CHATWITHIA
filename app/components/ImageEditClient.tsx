"use client";
import { useState } from "react";

export default function ImageEditClient() {
  const [file, setFile] = useState<File | null>(null);
  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState("");

  async function onEdit() {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    form.append("instruction", instruction);
    const res = await fetch("/api/edit-image", { method: "POST", body: form });
    const data = await res.json();
    setResult(data.result ?? data.error ?? "");
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Instrução (opcional)" />
      <button onClick={onEdit}>Editar imagem</button>
      <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}
