# Mini Compliance Tracker

A clean, production-ready web app to manage compliance tasks across multiple clients — built as an internship assignment for LedgersCFO.

**Live Demo:** https://flourishing-moxie-1f9537.netlify.app  
**Backend API:** https://mini-compliance-tracker-r0lx.onrender.com

---

## Screenshots

> Client sidebar with task list, stats, filters, and overdue highlighting.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, TailwindCSS v4 |
| Backend | Node.js, Express |
| Database | SQLite (via `better-sqlite3`) |
| Frontend Deploy | Netlify |
| Backend Deploy | Render |

---

## Features

- View all clients in a sidebar with avatar initials
- Select a client to see their tasks
- Stats bar — total, pending, completed, overdue counts
- Filter tasks by status and category
- Add new tasks via a modal form
- Update task status: Pending → In Progress → Completed
- Overdue tasks are clearly highlighted in red with a countdown
- Seed data included on first run

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
npm run dev
# API running at http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
# create .env from .env.example
cp .env.example .env
# edit VITE_API_URL if needed
npm run dev
# App running at http://localhost:5173
```

### Environment Variables

**frontend/.env**
```
VITE_API_URL=http://localhost:4000/api
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/clients` | Get all clients |
| GET | `/api/clients/:id` | Get a single client |
| GET | `/api/tasks/client/:clientId` | Get tasks for a client (supports `?status=` and `?category=` filters) |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id/status` | Update task status |

---

## Data Models

**Client**
```json
{
  "id": 1,
  "company_name": "Acme Corp",
  "country": "USA",
  "entity_type": "LLC"
}
```

**Task**
```json
{
  "id": 1,
  "client_id": 1,
  "title": "Q1 Tax Filing",
  "description": "File quarterly taxes",
  "category": "Tax",
  "due_date": "2026-03-20",
  "status": "Pending",
  "priority": "High"
}
```

---

## Project Structure

```
mini-compliance-tracker/
├── backend/
│   ├── routes/
│   │   ├── clients.js
│   │   └── tasks.js
│   ├── db.js          # SQLite setup + seed data
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClientList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── AddTaskModal.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## Deployment

### Backend → Render
- New Web Service → connect GitHub repo
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`

### Frontend → Netlify
- New Site → connect GitHub repo
- Base Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `frontend/dist`
- Environment Variable: `VITE_API_URL=https://mini-compliance-tracker-r0lx.onrender.com/api`

---

## Tradeoffs & Assumptions

- **SQLite over PostgreSQL** — zero setup, file-based, perfect for this scope. Easy to swap for Postgres in production by changing the `db.js` driver.
- **No authentication** — out of scope for the assignment. Would add JWT-based auth as the next step.
- **Fixed categories** — Tax, Audit, Legal, Payroll are hardcoded. Could be moved to a DB table for flexibility.
- **Linear status flow** — Pending → In Progress → Completed is intentional for UX simplicity.
- **Render free tier** — spins down after 15 mins of inactivity. First request after idle takes ~30s to wake up. Expected behavior on the free plan.
- Overdue is defined as any non-completed task where `due_date < today`.
