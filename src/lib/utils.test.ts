import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatNumber, formatPercentage } from "./utils";

describe("cn", () => {
  it("merges class names and removes falsy values", () => {
    const isHidden = false;
    expect(cn("a", isHidden && "b", "c")).toBe("a c");
  });

  it("resolves conflicting tailwind classes (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("formatCurrency", () => {
  it("formats a number as USD without decimals", () => {
    expect(formatCurrency(284500)).toBe("$284,500");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});

describe("formatNumber", () => {
  it("adds thousands separators", () => {
    expect(formatNumber(14832)).toBe("14,832");
  });
});

describe("formatPercentage", () => {
  it("prefixes positive values with a plus sign", () => {
    expect(formatPercentage(12.5)).toBe("+12.5%");
  });

  it("keeps the minus sign for negative values", () => {
    expect(formatPercentage(-2.4)).toBe("-2.4%");
  });

  it("rounds to one decimal place", () => {
    expect(formatPercentage(1.23)).toBe("+1.2%");
  });
});
