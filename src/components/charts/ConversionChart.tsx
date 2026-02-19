import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { useAppSelector } from "@/app/hooks";

export function ConversionChart() {
  const { conversions } = useAppSelector((state) => state.dashboard);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={conversions}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
          label={(props: PieLabelRenderProps) =>
            `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {conversions.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${value}%`}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
