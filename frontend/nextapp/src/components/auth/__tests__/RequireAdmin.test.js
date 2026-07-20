import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test-utils/render";
import RequireAdmin from "@/components/auth/RequireAdmin";
import { setSession } from "@/lib/auth";

const replace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

describe("RequireAdmin", () => {
  beforeEach(() => {
    window.localStorage.clear();
    replace.mockClear();
  });

  it("redirects anonymous visitors to /admin and renders nothing", () => {
    render(
      <RequireAdmin>
        <p>secret dashboard</p>
      </RequireAdmin>
    );
    expect(screen.queryByText("secret dashboard")).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/admin");
  });

  it("redirects non-admin users", () => {
    setSession({ userId: 2, role: 2, email: "s@b.org", accessToken: "tok" });
    render(
      <RequireAdmin>
        <p>secret dashboard</p>
      </RequireAdmin>
    );
    expect(screen.queryByText("secret dashboard")).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/admin");
  });

  it("renders children for admins", () => {
    setSession({ userId: 1, role: 1, email: "a@b.org", accessToken: "tok" });
    render(
      <RequireAdmin>
        <p>secret dashboard</p>
      </RequireAdmin>
    );
    expect(screen.getByText("secret dashboard")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });
});
