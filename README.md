# AI Media Studio — Next.js + Vercel

Pronto para deploy no Vercel com suporte a:
- Chat de texto com Gemini
- Edição de imagem via upload
- **Voz** (permite microfone) com envio de áudio para Gemini

## Como usar
1) Crie `.env.local` (não commitar) com:
```
GOOGLE_API_KEY=coloque_sua_chave_aqui
```
2) No Vercel: *Project* → **Settings → Environment Variables** → adicione `GOOGLE_API_KEY`.
3) `npm i` → `npm run dev` (local) e depois deploy no Vercel.
4) A página inicial (`/`) tem exemplos de UI.

## Rotas
- `POST /api/chat` → `{ prompt }`
- `POST /api/edit-image` → `multipart/form-data` com `image` e (opcional) `instruction`
- `POST /api/chat-voice` → `multipart/form-data` com `audio` (`audio/webm` recomendado) e (opcional) `instruction`

## Observações
- Não exponha a chave no cliente. Todas as chamadas ao Gemini ocorrem no servidor.
- O `metadata.json` na raiz declara a permissão de **microfone**.
