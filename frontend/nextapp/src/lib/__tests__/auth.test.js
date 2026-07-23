import { describe, it, expect, beforeEach } from "vitest";
import { setSession, getSession, clearSession, isAdmin, isStaffAdmin, ROLES } from "@/lib/auth";

describe("auth session", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("round-trips a session through localStorage", () => {
    setSession({ userId: 7, role: 1, email: "a@b.org", accessToken: "tok" });
    expect(getSession()).toEqual({
      userId: "7",
      role: 1,
      email: "a@b.org",
      accessToken: "tok",
      school: null,
    });
  });

  it("round-trips a school admin's school", () => {
    setSession({
      userId: 9,
      role: ROLES.SCHOOL_ADMIN,
      email: "t@school.org",
      accessToken: "tok",
      school: "Susick Elementary",
    });
    expect(getSession().school).toBe("Susick Elementary");
  });

  it("returns null when no token is stored", () => {
    expect(getSession()).toBeNull();
  });

  it("clearSession removes everything", () => {
    setSession({ userId: 7, role: 1, email: "a@b.org", accessToken: "tok" });
    clearSession();
    expect(getSession()).toBeNull();
    expect(window.localStorage.getItem("role")).toBeNull();
  });

  it("isAdmin handles the role stored as a string", () => {
    setSession({ userId: 7, role: "1", email: "a@b.org", accessToken: "tok" });
    expect(isAdmin()).toBe(true);
  });

  it("isAdmin is false for sponsors and anonymous visitors", () => {
    expect(isAdmin()).toBe(false);
    setSession({ userId: 8, role: ROLES.SPONSOR, email: "s@b.org", accessToken: "tok" });
    expect(isAdmin()).toBe(false);
  });

  it("isStaffAdmin accepts site and school admins but not sponsors", () => {
    expect(isStaffAdmin()).toBe(false);
    setSession({ userId: 8, role: ROLES.SPONSOR, email: "s@b.org", accessToken: "tok" });
    expect(isStaffAdmin()).toBe(false);
    setSession({ userId: 9, role: ROLES.SCHOOL_ADMIN, email: "t@school.org", accessToken: "tok" });
    expect(isStaffAdmin()).toBe(true);
    setSession({ userId: 1, role: ROLES.ADMIN, email: "a@b.org", accessToken: "tok" });
    expect(isStaffAdmin()).toBe(true);
  });

  it("isAdmin is false for school admins (site-admin-only features)", () => {
    setSession({ userId: 9, role: ROLES.SCHOOL_ADMIN, email: "t@school.org", accessToken: "tok" });
    expect(isAdmin()).toBe(false);
  });
});
