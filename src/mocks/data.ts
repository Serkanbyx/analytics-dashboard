export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "pending";
  joinedAt: string;
  lastActive: string;
  revenue: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface TrafficData {
  day: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
}

export interface ConversionData {
  name: string;
  value: number;
  fill: string;
}

export interface StatsOverview {
  totalRevenue: number;
  revenueChange: number;
  totalUsers: number;
  usersChange: number;
  totalOrders: number;
  ordersChange: number;
  conversionRate: number;
  conversionChange: number;
}

export const statsOverview: StatsOverview = {
  totalRevenue: 284500,
  revenueChange: 12.5,
  totalUsers: 14832,
  usersChange: 8.2,
  totalOrders: 3647,
  ordersChange: -2.4,
  conversionRate: 3.8,
  conversionChange: 1.2,
};

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 18500, expenses: 12400, profit: 6100 },
  { month: "Feb", revenue: 21200, expenses: 13100, profit: 8100 },
  { month: "Mar", revenue: 19800, expenses: 11800, profit: 8000 },
  { month: "Apr", revenue: 24600, expenses: 14200, profit: 10400 },
  { month: "May", revenue: 22100, expenses: 13500, profit: 8600 },
  { month: "Jun", revenue: 26800, expenses: 15100, profit: 11700 },
  { month: "Jul", revenue: 28400, expenses: 16200, profit: 12200 },
  { month: "Aug", revenue: 25900, expenses: 14800, profit: 11100 },
  { month: "Sep", revenue: 27300, expenses: 15600, profit: 11700 },
  { month: "Oct", revenue: 30100, expenses: 16900, profit: 13200 },
  { month: "Nov", revenue: 28700, expenses: 15400, profit: 13300 },
  { month: "Dec", revenue: 31200, expenses: 17200, profit: 14000 },
];

export const trafficData: TrafficData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 0, i + 1);
  const dayName = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const baseVisitors = 800 + Math.floor(Math.random() * 600);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const visitors = isWeekend
    ? Math.floor(baseVisitors * 0.6)
    : baseVisitors;

  return {
    day: dayName,
    visitors,
    pageViews: Math.floor(visitors * (2.5 + Math.random())),
    bounceRate: Math.round((30 + Math.random() * 25) * 10) / 10,
  };
});

export const conversionData: ConversionData[] = [
  { name: "Direct", value: 35, fill: "hsl(221, 83%, 53%)" },
  { name: "Organic", value: 28, fill: "hsl(142, 71%, 45%)" },
  { name: "Referral", value: 18, fill: "hsl(38, 92%, 50%)" },
  { name: "Social", value: 12, fill: "hsl(280, 65%, 60%)" },
  { name: "Email", value: 7, fill: "hsl(0, 84%, 60%)" },
];

export const users: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", joinedAt: "2024-01-15", lastActive: "2026-02-19", revenue: 12400 },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", joinedAt: "2024-03-22", lastActive: "2026-02-18", revenue: 8700 },
  { id: "u3", name: "Carol Davis", email: "carol@example.com", role: "viewer", status: "active", joinedAt: "2024-05-10", lastActive: "2026-02-17", revenue: 3200 },
  { id: "u4", name: "David Lee", email: "david@example.com", role: "editor", status: "inactive", joinedAt: "2024-02-28", lastActive: "2026-01-05", revenue: 6100 },
  { id: "u5", name: "Emma Wilson", email: "emma@example.com", role: "viewer", status: "active", joinedAt: "2024-06-14", lastActive: "2026-02-19", revenue: 2800 },
  { id: "u6", name: "Frank Brown", email: "frank@example.com", role: "admin", status: "active", joinedAt: "2024-01-05", lastActive: "2026-02-19", revenue: 15300 },
  { id: "u7", name: "Grace Taylor", email: "grace@example.com", role: "editor", status: "pending", joinedAt: "2026-02-10", lastActive: "2026-02-10", revenue: 0 },
  { id: "u8", name: "Henry Martinez", email: "henry@example.com", role: "viewer", status: "active", joinedAt: "2024-08-20", lastActive: "2026-02-16", revenue: 4500 },
  { id: "u9", name: "Ivy Anderson", email: "ivy@example.com", role: "editor", status: "active", joinedAt: "2024-04-12", lastActive: "2026-02-18", revenue: 9200 },
  { id: "u10", name: "Jack Thomas", email: "jack@example.com", role: "viewer", status: "inactive", joinedAt: "2024-07-30", lastActive: "2025-12-20", revenue: 1800 },
  { id: "u11", name: "Karen White", email: "karen@example.com", role: "admin", status: "active", joinedAt: "2024-02-14", lastActive: "2026-02-19", revenue: 18200 },
  { id: "u12", name: "Liam Harris", email: "liam@example.com", role: "viewer", status: "active", joinedAt: "2024-09-05", lastActive: "2026-02-15", revenue: 2100 },
  { id: "u13", name: "Mia Clark", email: "mia@example.com", role: "editor", status: "active", joinedAt: "2024-11-18", lastActive: "2026-02-17", revenue: 7600 },
  { id: "u14", name: "Noah Lewis", email: "noah@example.com", role: "viewer", status: "pending", joinedAt: "2026-01-25", lastActive: "2026-01-25", revenue: 0 },
  { id: "u15", name: "Olivia Walker", email: "olivia@example.com", role: "editor", status: "active", joinedAt: "2024-10-08", lastActive: "2026-02-18", revenue: 5400 },
  { id: "u16", name: "Peter Hall", email: "peter@example.com", role: "viewer", status: "active", joinedAt: "2025-01-12", lastActive: "2026-02-14", revenue: 3900 },
  { id: "u17", name: "Quinn Allen", email: "quinn@example.com", role: "editor", status: "inactive", joinedAt: "2024-06-30", lastActive: "2025-11-10", revenue: 4200 },
  { id: "u18", name: "Rachel Young", email: "rachel@example.com", role: "viewer", status: "active", joinedAt: "2025-03-22", lastActive: "2026-02-19", revenue: 2600 },
  { id: "u19", name: "Sam King", email: "sam@example.com", role: "admin", status: "active", joinedAt: "2024-04-01", lastActive: "2026-02-19", revenue: 21000 },
  { id: "u20", name: "Tina Wright", email: "tina@example.com", role: "viewer", status: "active", joinedAt: "2025-05-15", lastActive: "2026-02-13", revenue: 1500 },
];

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "processing" | "cancelled";
  date: string;
}

export const recentOrders: RecentOrder[] = [
  { id: "ORD-7821", customer: "Alice Johnson", product: "Pro Plan", amount: 299, status: "completed", date: "2026-02-19" },
  { id: "ORD-7820", customer: "Bob Smith", product: "Enterprise Plan", amount: 799, status: "processing", date: "2026-02-18" },
  { id: "ORD-7819", customer: "Emma Wilson", product: "Starter Plan", amount: 49, status: "completed", date: "2026-02-18" },
  { id: "ORD-7818", customer: "Frank Brown", product: "Pro Plan", amount: 299, status: "cancelled", date: "2026-02-17" },
  { id: "ORD-7817", customer: "Grace Taylor", product: "Enterprise Plan", amount: 799, status: "completed", date: "2026-02-17" },
];
