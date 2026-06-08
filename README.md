# 📊 Analytics Dashboard

A modern, feature-rich analytics dashboard built with React 19, TypeScript, and Vite. Track your business KPIs, revenue, traffic, and user data with interactive charts and a clean admin panel UI.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Authentication System** — Secure login form with Zod schema validation and mock API integration
- **Protected Routes** — Automatic redirection for unauthenticated users to the login page
- **Dashboard Overview** — KPI stat cards with percentage changes, revenue chart, traffic chart, and recent orders table
- **Analytics Page** — Detailed charts including revenue vs expenses, traffic trends, traffic sources pie chart, and profit margins
- **Users Management** — Full-featured data table with search, column sorting, and pagination
- **Responsive Design** — Mobile-friendly layout with collapsible sidebar navigation
- **Dark Mode** — One-click theme toggle with system-preference detection and `localStorage` persistence (no flash on reload)
- **Mock API** — Simulated API calls with realistic delays (400-800ms) for demo purposes
- **Tested & Linted** — Unit tests with Vitest + Testing Library and static analysis with ESLint

## Live Demo

[🚀 View Live Demo](https://analytics-dashboardd.netlify.app/login)

**Demo Credentials:**

```
Email:    admin@dashboard.com
Password: admin123
```

## Technologies

- **React 19** — Latest React with modern hooks and concurrent features
- **TypeScript 5.9** — Full type safety across the entire codebase
- **Vite 7** — Lightning-fast build tool and dev server
- **Redux Toolkit** — Predictable state management with async thunks
- **React Router v7** — Client-side routing with protected route wrappers
- **React Hook Form + Zod** — Performant form handling with schema-based validation
- **Tailwind CSS 3.4** — Utility-first CSS framework for rapid styling
- **shadcn/ui** — Accessible, customizable UI components built on Radix UI
- **Recharts** — Composable charting library for interactive data visualization
- **Lucide React** — Beautiful, consistent icon library
- **Vitest + Testing Library** — Fast unit and component testing in a jsdom environment
- **ESLint** — Flat-config linting with TypeScript, React Hooks, and React Refresh rules

## Installation

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Serkanbyx/s2.16_Analytics-Dashboard.git
cd s2.16_Analytics-Dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Testing & Linting

```bash
npm run lint           # ESLint static analysis
npm run test           # Run the Vitest suite once
npm run test:watch     # Watch mode for development
npm run test:coverage  # Generate a coverage report
```

> For a phase-by-phase build playbook of how this project was assembled, see [docs/build-guide.md](docs/build-guide.md).

## Usage

1. Open the application and you will be redirected to the **Login** page
2. Enter the demo credentials (`admin@dashboard.com` / `admin123`) and click **Sign In**
3. Explore the **Dashboard** page to view KPI stats, revenue chart, traffic overview, and recent orders
4. Navigate to the **Analytics** page for detailed revenue, traffic trends, and conversion source charts
5. Visit the **Users** page to search, sort, and paginate through the user data table
6. Use the **sidebar** to navigate between pages (collapsible on mobile)
7. Click the **user menu** in the header to log out

## How It Works?

### State Management

The app uses Redux Toolkit with feature-based slices for clean state separation:

```typescript
// Auth slice manages login state and token persistence
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isAuthenticated: false },
  reducers: { logout },
  extraReducers: (builder) => { /* async login thunk */ }
});

// Dashboard slice handles KPIs, charts, and table data
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { stats: [], revenue: [], users: [] },
  extraReducers: (builder) => { /* async data fetch thunks */ }
});
```

### Form Validation

Login form uses Zod schemas with React Hook Form for type-safe validation:

```typescript
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

### Protected Routes

Route protection is handled by a wrapper component that checks authentication state:

```typescript
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

### Mock API

All API calls are simulated with realistic delays to mimic real backend behavior:

```typescript
export const mockLogin = async (email: string, password: string) => {
  await delay(randomDelay(400, 800));
  // Validates credentials and returns user + token
};
```

## Project Structure

```
src/
├── app/                      # Redux store configuration & typed hooks
│   ├── hooks.ts              # useAppDispatch, useAppSelector
│   └── store.ts              # Store setup with auth + dashboard slices
├── components/
│   ├── charts/               # Recharts visualization components
│   │   ├── ConversionChart.tsx
│   │   ├── RevenueChart.tsx
│   │   └── TrafficChart.tsx
│   ├── layout/               # Page layout components
│   │   ├── AdminLayout.tsx   # Main layout wrapper with sidebar
│   │   ├── Footer.tsx
│   │   ├── Header.tsx        # Top bar with user menu
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   └── ThemeToggle.tsx   # Light/dark theme switch button
│   ├── tables/               # Data display components
│   │   ├── DataTable.tsx     # Sortable, searchable, paginated table
│   │   └── DataTable.test.tsx
│   └── ui/                   # shadcn/ui primitive components
├── features/
│   ├── auth/                 # Authentication feature module
│   │   ├── authSlice.ts      # Auth state, login thunk, logout
│   │   ├── LoginPage.tsx     # Login form with validation
│   │   └── ProtectedRoute.tsx
│   └── dashboard/            # Dashboard feature module
│       ├── dashboardSlice.ts # Dashboard data & async thunks
│       ├── DashboardPage.tsx # Overview with KPIs & charts
│       ├── AnalyticsPage.tsx # Detailed analytics charts
│       └── UsersPage.tsx     # User management table
├── hooks/                    # Reusable custom hooks
│   └── useTheme.ts           # Theme state, persistence & system preference
├── lib/                      # Shared utilities
│   ├── utils.ts              # Currency, number, percentage formatters
│   └── utils.test.ts
├── mocks/                    # Mock data & API simulation
│   ├── api.ts                # Simulated API endpoints
│   └── data.ts               # Realistic mock datasets (seeded for determinism)
├── test/                     # Test setup
│   └── setup.ts              # Vitest + jest-dom configuration
├── App.tsx                   # Route definitions & app structure
├── main.tsx                  # Application entry point
└── index.css                 # Global styles & CSS variables (light + dark)
```

## Customization

### Add New Dashboard Pages

Create a new page component inside `src/features/dashboard/` and register it in `App.tsx`:

```typescript
// src/features/dashboard/ReportsPage.tsx
const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      {/* Your content */}
    </div>
  );
};
```

### Add New Chart Components

Create chart components using Recharts in `src/components/charts/`:

```typescript
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="hsl(var(--primary))" />
    </BarChart>
  </ResponsiveContainer>
);
```

### Change Theme Colors

Modify CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 222 47% 31%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 96%;
  /* Add or modify variables as needed */
}
```

## Features in Detail

### Completed Features

- ✅ Login page with form validation (Zod + React Hook Form)
- ✅ Token-based authentication with localStorage persistence
- ✅ Protected route system with automatic redirects
- ✅ Dashboard overview with 4 KPI stat cards
- ✅ Revenue overview area chart (revenue vs expenses)
- ✅ Traffic overview chart (daily visitors)
- ✅ Recent orders table with status badges
- ✅ Analytics page with revenue, traffic, and conversion charts
- ✅ Profit margins visualization
- ✅ Users page with search, sorting, and pagination
- ✅ Responsive sidebar navigation
- ✅ Mobile-friendly layout
- ✅ Dark mode toggle with system-preference detection and persistence
- ✅ Unit & component tests with Vitest and Testing Library
- ✅ ESLint flat-config setup
- ✅ Netlify deployment configuration

### Future Features

- [ ] 🔮 Real backend API integration
- [ ] 🔮 User registration and role management
- [ ] 🔮 Data export (CSV, PDF)
- [ ] 🔮 Date range filters for charts
- [ ] 🔮 Real-time data updates with WebSocket
- [ ] 🔮 Dashboard widget customization (drag & drop)
- [ ] 🔮 Notification system
- [ ] 🔮 Multi-language support (i18n)

## Deploy

### Netlify

The project is pre-configured for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **SPA redirects:** Configured for client-side routing

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/amazing-feature`
3. **Commit** your changes: `git commit -m "feat: add amazing feature"`
4. **Push** to the branch: `git push origin feat/amazing-feature`
5. **Open** a Pull Request

### Commit Message Format

```
feat:     New feature
fix:      Bug fix
refactor: Code refactoring
docs:     Documentation changes
chore:    Maintenance tasks
style:    Code style changes (formatting, etc.)
test:     Adding or updating tests
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Developer

**Serkan Bayraktar**

- 🌐 [serkanbayraktar.com](https://serkanbayraktar.com/)
- 💻 [GitHub @Serkanbyx](https://github.com/Serkanbyx)
- 📧 [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)

## Acknowledgments

- [React](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) — State management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Recharts](https://recharts.org/) — Charting library
- [Lucide](https://lucide.dev/) — Icon library
- [Zod](https://zod.dev/) — Schema validation

## Contact

- 📋 [Open an Issue](https://github.com/Serkanbyx/s2.16_Analytics-Dashboard/issues)
- 📧 [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)
- 🌐 [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
