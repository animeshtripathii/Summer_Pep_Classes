# Practice App

This workspace now contains a Vite React frontend and a small Express auth backend.

## Frontend

From the `Practice` folder run:

```bash
npm install
npm run dev
```

The frontend expects the auth API at `http://localhost:5000/api` by default. Override it with `VITE_API_URL` if needed.

## Backend

The backend lives in `backend/` and uses Express, bcrypt, JWT, and a file-backed user store.

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set `JWT_SECRET` in `backend/.env` before logging in or registering users.

## Routes

The backend exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

The `me` route is protected with a bearer token middleware.
