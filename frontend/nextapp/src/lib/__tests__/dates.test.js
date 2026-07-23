import { describe, it, expect } from "vitest";
import { formatBookDate } from "@/lib/dates";

describe("formatBookDate", () => {
  it("formats an ISO UTC timestamp into a friendly local date", () => {
    // Assert on the stable parts rather than the timezone-dependent time.
    const formatted = formatBookDate("2024-04-06T23:09:15.625779");
    expect(formatted).toMatch(/^[A-Z][a-z]{2} \d{1,2}(st|nd|rd|th) 2024 \d{1,2}:\d{2}(am|pm)$/);
  });
});
