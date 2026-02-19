import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUsers } from "./dashboardSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  if (isLoading && users.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage and view all registered users
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users with sorting and pagination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
