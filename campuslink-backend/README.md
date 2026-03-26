# CampusLink Backend (Node.js + Express + MongoDB)

This is the backend API for CampusLink — College Events Manager.

## Features
- Express server with CORS and JSON parsing
- MongoDB connection via Mongoose
- JWT authentication structure
- Modular folders: routes, models, controllers, middleware, config, utils
- Nodemailer configuration (SMTP) for future email invites
- .env support using dotenv

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Create an `.env` file (use `.env.example` as a template)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/campuslink
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FROM_NAME=CampusLink
CLIENT_URL=http://localhost:5173
```

3) Run the server (development)

```bash
npm run dev
```

4) Run the server (production)

```bash
npm start
```

## API Routes

- Auth: `/api/auth`
  - POST `/register` — register new user
  - POST `/login` — login and receive JWT
  - GET `/me` — get current user (requires token)
  - PUT `/profile` — update profile (requires token)

- Events: `/api/events`
  - GET `/` — list events (public)
  - GET `/:id` — event details (public)
  - POST `/` — create event (organizer/admin)
  - PUT `/:id` — update event (organizer/admin)
  - DELETE `/:id` — delete event (organizer/admin)
  - GET `/user/my-events` — user's created events (private)

- Registrations: `/api/registrations`
  - POST `/` — register for an event (private)
  - GET `/my-registrations` — my registrations (private)
  - GET `/event/:eventId` — registrations for an event (organizer/admin)
  - DELETE `/:id` — cancel my registration (private)
  - PUT `/:id/status` — update registration status (organizer/admin)
  - POST `/:id/feedback` — submit feedback (private)

## Notes
- Minimal logic only; TODO comments indicate where to expand features.
- Ensure MongoDB is running locally or provide a cloud URI in `.env`.

## License
MIT
