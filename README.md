# Mini Compliance Tracker

A simple web app to track compliance tasks for multiple clients.

## Stack

- **Frontend**: React + Vite + TailwindCSS (deployed on Vercel)
- **Backend**: Node.js + Express (deployed on Render)
- **Database**: SQLite via `better-sqlite3`

## Features

- View clients in a sidebar
- View tasks per client with overdue highlighting
- Add new tasks via modal form
- Update task status (Pending → In Progress → Completed)
- Filter tasks by status and category
- Summary stats (total / pending / completed / overdue)
- Seed data included on first run

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
# Create .env from .env.example and set VITE_API_URL
npm run dev
# Runs on http://localhost:5173
```

## Deployment

### Backend → Render

1. Push repo to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`

### Frontend → Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Root directory: `frontend`
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`
4. Deploy

## Tradeoffs & Assumptions

- **SQLite** was chosen for simplicity — no external DB setup needed. For production, swap to PostgreSQL.
- **No auth** — the assignment didn't require it, so skipped to keep scope tight.
- **Categories are fixed** (Tax, Audit, Legal, Payroll) — easy to extend via a DB table if needed.
- Overdue = any non-completed task whose `due_date` is before today.
- Status flow is linear: Pending → In Progress → Completed (intentional UX simplicity).
