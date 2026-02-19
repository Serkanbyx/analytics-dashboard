import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchDashboardData } from "./dashboardSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { ConversionChart } from "@/components/charts/ConversionChart";

export default function AnalyticsPage() {
  const dispatch = useAppDispatch();
  const { revenue, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (revenue.length === 0) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, revenue.length]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your metrics
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Expenses</CardTitle>
            <CardDescription>
              Monthly revenue vs expenses comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Trends</CardTitle>
            <CardDescription>Daily visitors over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profit Margins</CardTitle>
            <CardDescription>Monthly profit breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenue.map((item) => {
                const profitMargin =
                  item.revenue > 0
                    ? Math.round((item.profit / item.revenue) * 100)
                    : 0;
                return (
                  <div key={item.month} className="flex items-center gap-4">
                    <span className="w-10 text-sm font-medium text-muted-foreground">
                      {item.month}
                    </span>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${profitMargin}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-12 text-right text-sm font-medium">
                      {profitMargin}%
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
