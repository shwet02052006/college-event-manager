# CampusLink — College Events Manager

A full-stack project scaffold: Node.js + Express + MongoDB backend and React + Vite + Tailwind frontend.

## Monorepo Structure
- `campuslink-backend/` — REST API
- `campuslink-frontend/` — Web UI

## Quick Start

1) Install dependencies

```powershell
cd .\campuslink-backend; npm install
cd ..\campuslink-frontend; npm install
```

2) Configure environment

- Copy `campuslink-backend/.env.example` to `campuslink-backend/.env` and fill values
- Ensure MongoDB is running (local or Atlas)

3) Run servers (VS Code tasks)

- Terminal > Run Task > "Start Backend"
- Terminal > Run Task > "Start Frontend"

Or using PowerShell:

```powershell
cd .\campuslink-backend; npm run dev
# In another terminal
cd .\campuslink-frontend; npm run dev
```

Backend API: http://localhost:5000
Frontend App: http://localhost:5173

## Notes
- Frontend reads `VITE_API_BASE_URL` from env, defaulting to backend localhost.
- This is a minimal, extendable skeleton with clear TODOs.
