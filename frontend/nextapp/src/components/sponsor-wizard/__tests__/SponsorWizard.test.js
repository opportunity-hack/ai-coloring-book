import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import SponsorWizard, { formatBookLabel } from "@/components/sponsor-wizard/SponsorWizard";

const getBooks = vi.fn();
vi.mock("@/lib/api", () => ({
  getBooks: (...args) => getBooks(...args),
  sponsorPay: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackSponsorCheckoutStarted: vi.fn(),
  trackSponsorPaymentSuccess: vi.fn(),
}));

vi.mock("@paypal/react-paypal-js", () => ({
  PayPalScriptProvider: ({ children }) => children,
  PayPalButtons: () => <div data-testid="paypal-buttons" />,
}));

const BOOKS = [
  {
    id: 1,
    name: "Book_20240406_230915",
    cover_url: "https://example.com/a.jpg",
    current_sponsors: 0,
    total_sponsors: 3,
  },
  {
    id: 2,
    name: "Book_20240218_163458",
    cover_url: "https://example.com/b.jpg",
    current_sponsors: 1,
    total_sponsors: 2,
  },
  {
    id: 3,
    name: "Full book",
    cover_url: "https://example.com/c.jpg",
    current_sponsors: 2,
    total_sponsors: 2,
  },
];

describe("formatBookLabel", () => {
  it("turns auto-generated names into friendly dates", () => {
    expect(formatBookLabel("Book_20240406_230915")).toBe(
      "Class book · Apr 6, 2024"
    );
  });

  it("leaves custom names alone", () => {
    expect(formatBookLabel("Mrs. Lee's 3rd Grade")).toBe("Mrs. Lee's 3rd Grade");
  });
});

describe("SponsorWizard", () => {
  beforeEach(() => {
    getBooks.mockReset();
  });

  it("hides fully sponsored books", async () => {
    getBooks.mockResolvedValue({ data: BOOKS });
    render(<SponsorWizard />);
    expect(await screen.findByText("Class book · Apr 6, 2024")).toBeInTheDocument();
    expect(screen.queryByText("Full book")).not.toBeInTheDocument();
  });

  it("totals the selection and gates the business step on a name", async () => {
    getBooks.mockResolvedValue({ data: BOOKS });
    render(<SponsorWizard />);

    await userEvent.click(await screen.findByText("Class book · Apr 6, 2024"));
    await userEvent.click(screen.getByText("Class book · Feb 18, 2024"));
    expect(screen.getByText("2 books · $20")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Continue to payment" })
    );
    expect(
      screen.getByText("Tell us your business or family name — it goes in the book")
    ).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("e.g. Desert Bloom Dental"),
      "Test Sponsor Co"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Continue to payment" })
    );

    expect(await screen.findByTestId("paypal-buttons")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  it("shows a retry state when books fail to load", async () => {
    getBooks.mockRejectedValue(new Error("network"));
    render(<SponsorWizard />);
    expect(await screen.findByText("We couldn't load the books.")).toBeInTheDocument();

    getBooks.mockResolvedValue({ data: BOOKS });
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("Class book · Apr 6, 2024")).toBeInTheDocument();
  });
});
