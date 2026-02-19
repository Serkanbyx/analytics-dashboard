import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "@/mocks/api";
import type {
  StatsOverview,
  RevenueData,
  TrafficData,
  ConversionData,
  User,
  RecentOrder,
} from "@/mocks/data";

interface DashboardState {
  stats: StatsOverview | null;
  revenue: RevenueData[];
  traffic: TrafficData[];
  conversions: ConversionData[];
  users: User[];
  recentOrders: RecentOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  revenue: [],
  traffic: [],
  conversions: [],
  users: [],
  recentOrders: [],
  isLoading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [stats, revenue, traffic, conversions, recentOrders] =
        await Promise.all([
          mockApi.getStats(),
          mockApi.getRevenue(),
          mockApi.getTraffic(),
          mockApi.getConversions(),
          mockApi.getRecentOrders(),
        ]);
      return { stats, revenue, traffic, conversions, recentOrders };
    } catch {
      return rejectWithValue("Failed to fetch dashboard data");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "dashboard/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await mockApi.getUsers();
    } catch {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
        state.revenue = action.payload.revenue;
        state.traffic = action.payload.traffic;
        state.conversions = action.payload.conversions;
        state.recentOrders = action.payload.recentOrders;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
