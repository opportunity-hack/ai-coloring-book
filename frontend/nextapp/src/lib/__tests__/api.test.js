import { describe, it, expect, vi, beforeEach } from "vitest";
import api, { getBooks, uploadDrawing, deleteBook, generateBook } from "@/lib/api";

// Capture outgoing requests (after interceptors run) with a stub adapter.
function stubAdapter(responder) {
  const calls = [];
  api.defaults.adapter = async (config) => {
    calls.push(config);
    if (responder) return responder(config);
    return { data: {}, status: 200, statusText: "OK", headers: {}, config };
  };
  return calls;
}

describe("api client", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("attaches the Bearer token when one is stored", async () => {
    window.localStorage.setItem("accessToken", "tok123");
    const calls = stubAdapter();
    await getBooks();
    expect(calls[0].headers.Authorization).toBe("Bearer tok123");
  });

  it("omits the Authorization header for anonymous visitors", async () => {
    const calls = stubAdapter();
    await getBooks();
    expect(calls[0].headers.Authorization).toBeUndefined();
  });

  it("hits the expected endpoints", async () => {
    const calls = stubAdapter();
    await getBooks();
    await uploadDrawing(new FormData());
    await deleteBook(42);
    await generateBook(7);
    expect(calls.map((c) => `${c.method.toUpperCase()} ${c.url}`)).toEqual([
      "GET /api/books/",
      "POST /api/upload_drawings/",
      "DELETE /api/books/42/",
      "POST /api/generate_book",
    ]);
  });

  it("clears the session and redirects to /admin on a 401", async () => {
    window.localStorage.setItem("accessToken", "expired");
    const assign = vi.fn();
    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, assign },
    });

    stubAdapter((config) => {
      const error = new Error("Unauthorized");
      error.config = config;
      error.response = { status: 401 };
      throw error;
    });

    await expect(getBooks()).rejects.toThrow();
    expect(window.localStorage.getItem("accessToken")).toBeNull();
    expect(assign).toHaveBeenCalledWith("/admin");

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("does NOT redirect on a failed login attempt", async () => {
    const assign = vi.fn();
    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, assign },
    });

    stubAdapter((config) => {
      const error = new Error("Unauthorized");
      error.config = config;
      error.response = { status: 401 };
      throw error;
    });

    const { login } = await import("@/lib/api");
    await expect(login("a@b.org", "wrong")).rejects.toThrow();
    expect(assign).not.toHaveBeenCalled();

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });
});
