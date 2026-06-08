import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import type { User } from "@/mocks/data";

const buildUser = (overrides: Partial<User> = {}): User => ({
  id: "u1",
  name: "Alice Johnson",
  email: "alice@example.com",
  role: "admin",
  status: "active",
  joinedAt: "2024-01-15",
  lastActive: "2026-02-19",
  revenue: 12400,
  ...overrides,
});

const sampleUsers: User[] = [
  buildUser(),
  buildUser({ id: "u2", name: "Bob Smith", email: "bob@example.com", role: "editor" }),
  buildUser({ id: "u3", name: "Carol Davis", email: "carol@example.com", role: "viewer" }),
];

describe("DataTable", () => {
  it("renders all users initially", () => {
    render(<DataTable data={sampleUsers} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("3 users")).toBeInTheDocument();
  });

  it("filters users by the search query", async () => {
    const user = userEvent.setup();
    render(<DataTable data={sampleUsers} />);

    await user.type(screen.getByPlaceholderText("Search users..."), "bob");

    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    expect(screen.getByText("1 user")).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<DataTable data={sampleUsers} />);

    await user.type(screen.getByPlaceholderText("Search users..."), "zzz");

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("sorts by name when the column header is clicked", async () => {
    const user = userEvent.setup();
    render(<DataTable data={sampleUsers} />);

    const getFirstRowName = () => {
      const rows = screen.getAllByRole("row");
      // rows[0] is the header row
      return within(rows[1]!).getByText(/Alice|Bob|Carol/).textContent;
    };

    expect(getFirstRowName()).toBe("Alice Johnson");

    await user.click(screen.getByRole("button", { name: /Name/i }));
    expect(getFirstRowName()).toBe("Carol Davis");
  });
});
