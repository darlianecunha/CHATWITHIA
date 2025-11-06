Use 'API_KEY' env var (fallback to 'GOOGLE_API_KEY').
Files to place at repo root:
- api/chat.ts
- api/edit-image.ts
- api/chat-voice.ts
- api/diag-env.ts (optional)

Vercel → Environment Variables:
- API_KEY = sua chave do Google AI Studio (Gemini)  (ou mantenha GOOGLE_API_KEY)

Depois: Redeploy (Clear build cache).
