# Neast Frontend

Next.js 16.2 + React 19 frontend for the Neast learning platform.

## Tech Stack

- **Framework:** Next.js 16.2 (App Router), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui (base-nova), HeroUI
- **Auth:** Better-auth (with MongoDB adapter)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod 4

## Setup

```bash
npm install
# create .env.local:
#   MONGODB_URI=...
#   BETTER_AUTH_SECRET=...
#   BETTER_AUTH_URL=http://localhost:3000
npm run dev   # port 3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint (flat config) |

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/explore` | Browse courses |
| `/courses/:id` | Course details |
| `/items/add` | Create course (auth required) |
| `/items/manage` | Manage courses (auth required) |
| `/dashboard` | User dashboard (auth required) |
| `/profile` | User profile (auth required) |
| `/admin/*` | Admin panel (role: admin) |
| `/login` / `/register` | Auth pages |

## Environment

```
MONGODB_URI=mongodb://127.0.0.1:27017/neast
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
```

## Architecture Notes

- **Auth**: Better-auth manages sessions directly via MongoDB (no backend auth proxy)
- **API calls**: Frontend calls backend at `http://localhost:5000/api` for items, admin, stats
- **Start backend first**, then frontend
