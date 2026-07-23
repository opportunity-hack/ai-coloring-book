import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const sendGAEvent = vi.fn();
vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: (...args) => sendGAEvent(...args),
}));

describe("analytics", () => {
  beforeEach(() => {
    sendGAEvent.mockClear();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("no-ops when the GA measurement id is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    const { trackEvent } = await import("@/lib/analytics");
    trackEvent("anything", { a: 1 });
    expect(sendGAEvent).not.toHaveBeenCalled();
  });

  it("sends events when the GA measurement id is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    const { trackEvent } = await import("@/lib/analytics");
    trackEvent("test_event", { a: 1 });
    expect(sendGAEvent).toHaveBeenCalledWith("event", "test_event", { a: 1 });
  });

  it("shapes the payment event with GA4 revenue params", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    const { trackSponsorPaymentSuccess } = await import("@/lib/analytics");
    trackSponsorPaymentSuccess({ booksCount: 2, value: 20 });
    expect(sendGAEvent).toHaveBeenCalledWith("event", "sponsor_payment_success", {
      books_count: 2,
      value: 20,
      currency: "USD",
    });
  });

  it("reports the school when the escape hatch is used", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    const { trackSchoolNotListed } = await import("@/lib/analytics");
    trackSchoolNotListed("Desert Sun Elementary");
    expect(sendGAEvent).toHaveBeenCalledWith("event", "school_not_listed_used", {
      school: "Desert Sun Elementary",
    });
  });
});
