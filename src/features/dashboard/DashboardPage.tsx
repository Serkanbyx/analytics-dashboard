import { useEffect } from "react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchDashboardData } from "./dashboardSlice";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrafficChart } from "@/components/charts/TrafficChart";

const statusVariantMap = {
  completed: "success",
  processing: "warning",
  cancelled: "destructive",
} as const;

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, recentOrders, isLoading } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (isLoading || !stats) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      change: stats.revenueChange,
      icon: DollarSign,
    },
    {
      title: "Total Users",
      value: formatNumber(stats.totalUsers),
      change: stats.usersChange,
      icon: Users,
    },
    {
      title: "Total Orders",
      value: formatNumber(stats.totalOrders),
      change: stats.ordersChange,
      icon: ShoppingCart,
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: stats.conversionChange,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your business performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.change >= 0 ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {formatPercentage(stat.change)}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily visitors this month</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
