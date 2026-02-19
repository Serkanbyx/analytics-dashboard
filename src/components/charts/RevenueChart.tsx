import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAppSelector } from "@/app/hooks";
import { formatCurrency } from "@/lib/utils";

export function RevenueChart() {
  const { revenue } = useAppSelector((state) => state.dashboard);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={revenue}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(221, 83%, 53%)"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(221, 83%, 53%)"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(0, 84%, 60%)"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(0, 84%, 60%)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          className="text-muted-foreground"
        />
        <Tooltip
          formatter={(value) => formatCurrency(Number(value))}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="hsl(221, 83%, 53%)"
          fill="url(#colorRevenue)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="Expenses"
          stroke="hsl(0, 84%, 60%)"
          fill="url(#colorExpenses)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
