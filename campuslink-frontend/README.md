# CampusLink Frontend (React + Vite + Tailwind)

This is the frontend for CampusLink — College Events Manager.

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure environment (optional)

Create `.env` and set API URL if different:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

3) Run dev server

```bash
npm run dev
```

## Structure
- `src/components` — Reusable UI components
- `src/pages` — Page components (Login, Dashboard, Event pages)
- `src/context` — AuthContext for session state
- `src/utils` — Axios instance and constants
- `src/styles` — Tailwind and global styles

## Notes
- Minimal sample views, ready to wire with backend endpoints.
- Add protected routes and role checks as you expand.
