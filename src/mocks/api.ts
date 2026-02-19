import {
  statsOverview,
  revenueData,
  trafficData,
  conversionData,
  users,
  recentOrders,
  type StatsOverview,
  type RevenueData,
  type TrafficData,
  type ConversionData,
  type User,
  type RecentOrder,
} from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}

export const mockApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);

    if (
      credentials.email === "admin@dashboard.com" &&
      credentials.password === "admin123"
    ) {
      return {
        token: "mock-jwt-token-abc123",
        user: {
          name: "Admin User",
          email: credentials.email,
          role: "admin",
          avatar: "",
        },
      };
    }

    throw new Error("Invalid email or password");
  },

  getStats: async (): Promise<StatsOverview> => {
    await delay(400);
    return statsOverview;
  },

  getRevenue: async (): Promise<RevenueData[]> => {
    await delay(500);
    return revenueData;
  },

  getTraffic: async (): Promise<TrafficData[]> => {
    await delay(450);
    return trafficData;
  },

  getConversions: async (): Promise<ConversionData[]> => {
    await delay(350);
    return conversionData;
  },

  getUsers: async (): Promise<User[]> => {
    await delay(600);
    return users;
  },

  getRecentOrders: async (): Promise<RecentOrder[]> => {
    await delay(400);
    return recentOrders;
  },
};
