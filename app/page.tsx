export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>AI Media Studio</h1>
      <p>Edite imagens, converse por texto e use voz com Gemini.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <section>
          <h2>Chat de Texto</h2>
          {/* @ts-expect-error Server/Client boundary */}
          <ChatClient />
        </section>
        <section>
          <h2>Edição de Imagem</h2>
          {/* @ts-expect-error Server/Client boundary */}
          <ImageEditClient />
        </section>
      </div>
      <section style={{ marginTop: 24 }}>
        <h2>Voz (Microfone)</h2>
        {/* @ts-expect-error Server/Client boundary */}
        <VoiceClient />
      </section>
    </main>
  );
}

function ChatClient() {
  return <div suppressHydrationWarning>{typeof window !== "undefined" ? require("./components/ChatClient").default() : null}</div>;
}

function ImageEditClient() {
  return <div suppressHydrationWarning>{typeof window !== "undefined" ? require("./components/ImageEditClient").default() : null}</div>;
}

function VoiceClient() {
  return <div suppressHydrationWarning>{typeof window !== "undefined" ? require("./components/VoiceClient").default() : null}</div>;
}
