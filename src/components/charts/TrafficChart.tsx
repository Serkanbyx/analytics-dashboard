import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "@/app/hooks";
import { formatNumber } from "@/lib/utils";

export function TrafficChart() {
  const { traffic } = useAppSelector((state) => state.dashboard);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={traffic}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 10 }}
          interval={4}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip
          formatter={(value) => formatNumber(Number(value))}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar
          dataKey="visitors"
          name="Visitors"
          fill="hsl(221, 83%, 53%)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
