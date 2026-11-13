<img width="1875" height="955" alt="Image" src="https://github.com/user-attachments/assets/597f6a85-a6cc-4d70-b420-e847180fae45" />
<img width="1875" height="955" alt="Image" src="https://github.com/user-attachments/assets/5fb174c8-715b-467e-8059-05bf0d2aa91a" />
<img width="1875" height="955" alt="Image" src="https://github.com/user-attachments/assets/fedf5866-3e22-4c71-aa3c-60949c2012e5" />
<img width="1847" height="938" alt="Image" src="https://github.com/user-attachments/assets/d48f1a26-c628-4c18-98c9-5521ea6b9cda" />
<img width="1847" height="938" alt="Image" src="https://github.com/user-attachments/assets/bb6849b4-07aa-43cd-82e8-3297726ebeac" />

## Backend
For local dev, the backend lives in `backend/` and exposes:
- `GET /api/health` for basic status.
- `GET /api/messages?room=general` to fetch recent message history (requires MongoDB).
- `POST /api/message` to broadcast chat messages via Pusher.

Setup:
1. Install dependencies in `backend/`.
2. Create a `.env` in `backend/` using `backend/.env.example` as the template.
3. Start the server with `npm run dev` (or `npm start`).

Notes:
- Pusher is required for chat delivery in this minimal backend.
- Ensure `frontend/.env` uses the same Pusher `KEY` + `CLUSTER` as the backend, otherwise the chatroom realtime stream will not receive messages.
- If some Wi-Fi networks fail to resolve `mongodb+srv://` Atlas DNS records, add `MONGODB_URI_DIRECT` in `backend/.env` using Atlas's standard non-SRV connection string as a fallback.

Frontend dev server already proxies `/api` to `http://localhost:3000` via `frontend/vite.config.js`.

## Auth (Clerk)
The frontend uses Clerk for authentication. For local dev:
1. Create a Clerk application (in the Clerk dashboard).
2. Add `VITE_CLERK_PUBLISHABLE_KEY` to `frontend/.env` (see `frontend/.env.example`).
3. Restart the Vite dev server after changing env vars.

## Vercel
This repo builds the frontend from `frontend/` and serves the Express backend
through a Vercel Function at `/api/handler`, with `/api/*` requests rewritten
to it before the frontend SPA fallback.

In Vercel **Project Settings → Build and Deployment**, set **Root Directory**
to the repository root (clear `frontend` if it is selected). The root contains
`vercel.json` and `api/handler.js`; selecting `frontend/` excludes the API
function and causes `/api/*` requests to fall through to the frontend page.

Set these environment variables in Vercel for **Production**, and for Preview
if you use preview deployments:
- `MONGODB_URI` (required for community creation and persistence)
- `MONGODB_DB` (optional; defaults to the database in the connection string)
- `PUSHER_APP_ID`
- `PUSHER_KEY`
- `PUSHER_SECRET`
- `PUSHER_CLUSTER`
- `GEMINI_API_KEY` (optional; enables the chat assistant)

After adding or changing environment variables, redeploy the project. The
frontend and API share the same origin, so browser requests continue to use
relative `/api/...` URLs.
