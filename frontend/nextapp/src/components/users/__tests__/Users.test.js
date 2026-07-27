import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import Users from "@/components/users/Users";

const getUsers = vi.fn();
const registerUser = vi.fn();
vi.mock("@/lib/api", () => ({
  getUsers: (...args) => getUsers(...args),
  registerUser: (...args) => registerUser(...args),
}));

const USERS_RESPONSE = {
  data: {
    users: [
      { id: 1, email: "mary@susieqskids.org", role: 1, school: null, organization: null, date_joined: "2024-02-16T12:00:00" },
      { id: 9, email: "teacher@susick.org", role: 3, school: "Margaret I. Susick Elementary School", organization: null, date_joined: "2026-07-23T12:00:00" },
      { id: 12, email: "owner@warrenpizza.com", role: 2, school: null, organization: "Warren Pizza Co.", date_joined: "2026-07-01T12:00:00" },
    ],
  },
};

describe("Users", () => {
  beforeEach(() => {
    getUsers.mockClear();
    registerUser.mockClear();
    getUsers.mockResolvedValue(USERS_RESPONSE);
  });

  it("lists every account with role badges and school/organization", async () => {
    render(<Users notify={vi.fn()} />);

    expect(await screen.findByText("mary@susieqskids.org")).toBeInTheDocument();
    expect(screen.getByText("teacher@susick.org")).toBeInTheDocument();
    expect(screen.getByText("owner@warrenpizza.com")).toBeInTheDocument();
    expect(screen.getAllByText("School admin").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Sponsor").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Margaret I. Susick Elementary School")).toBeInTheDocument();
    expect(screen.getByText("Warren Pizza Co.")).toBeInTheDocument();
  });

  it("notifies when the list cannot load", async () => {
    getUsers.mockRejectedValue(new Error("boom"));
    const notify = vi.fn();
    render(<Users notify={notify} />);

    await vi.waitFor(() =>
      expect(notify).toHaveBeenCalledWith(
        "Could not load the user list. Please refresh and try again.",
        "error"
      )
    );
  });

  it("creates a school admin with a school and refreshes the list", async () => {
    registerUser.mockResolvedValue({ data: { success: true } });
    const notify = vi.fn();
    render(<Users notify={notify} />);
    await screen.findByText("mary@susieqskids.org");

    await userEvent.click(screen.getByPlaceholderText("Choose a role"));
    await userEvent.click(screen.getByRole("option", { name: "School admin" }));
    await userEvent.click(screen.getByPlaceholderText("Pick their school"));
    await userEvent.click(
      screen.getByRole("option", { name: "Maurice M. Wilde Elementary School" })
    );
    await userEvent.type(
      screen.getByPlaceholderText("name@example.org"),
      "newadmin@wilde.org"
    );
    const [password, confirm] = screen.getAllByLabelText(/password/i);
    await userEvent.type(password, "hunter22");
    await userEvent.type(confirm, "hunter22");
    await userEvent.click(screen.getByRole("button", { name: "Create user" }));

    expect(registerUser).toHaveBeenCalledWith({
      email: "newadmin@wilde.org",
      password: "hunter22",
      role: 3,
      organization: "",
      school: "Maurice M. Wilde Elementary School",
    });
    // Initial load + refresh after create.
    await vi.waitFor(() => expect(getUsers).toHaveBeenCalledTimes(2));
  });
});
