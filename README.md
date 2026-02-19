# Analytics Dashboard

A modern analytics dashboard built with React, TypeScript, and Vite. Features a clean admin panel UI with interactive charts, data tables, and authentication.

## Tech Stack

- **React 19** + **TypeScript** + **Vite** — Fast development with type safety
- **Redux Toolkit** — Global state management for dashboard data
- **React Router v6** — Client-side routing with protected routes
- **React Hook Form + Zod** — Form validation on the login page
- **Tailwind CSS + shadcn/ui** — Utility-first styling with accessible components
- **Recharts** — Interactive charts (area, bar, pie)
- **Lucide React** — Icon library

## Features

- **Authentication** — Login form with Zod validation and mock API
- **Protected Routes** — Redirect unauthenticated users to login
- **Dashboard Overview** — KPI stat cards, revenue chart, traffic chart, recent orders
- **Analytics Page** — Detailed charts with revenue, traffic trends, and traffic sources
- **Users Page** — Data table with search, column sorting, and pagination
- **Responsive Design** — Mobile-friendly with collapsible sidebar
- **Mock API** — Simulated API calls with realistic data

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials

```
Email:    admin@dashboard.com
Password: admin123
```

## Project Structure

```
src/
├── app/                  # Redux store & typed hooks
├── components/
│   ├── charts/           # Recharts components
│   ├── layout/           # AdminLayout, Sidebar, Header
│   ├── tables/           # DataTable with pagination & sorting
│   └── ui/               # shadcn/ui primitives
├── features/
│   ├── auth/             # Auth slice, login page, protected route
│   └── dashboard/        # Dashboard slice & pages
├── lib/                  # Utility functions
├── mocks/                # Mock data & API
├── App.tsx               # Route definitions
└── main.tsx              # Entry point
```

## Deploy

Configured for **Netlify** deployment. Connect your GitHub repo and it will auto-deploy.

Build command: `npm run build`
Publish directory: `dist`

## License

MIT
