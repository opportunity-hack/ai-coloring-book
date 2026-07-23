import { describe, it, expect } from "vitest";
import { generateCaptcha, validateCaptcha, CAPTCHA_LENGTH } from "@/lib/captcha";

describe("generateCaptcha", () => {
  it("produces the expected length", () => {
    expect(generateCaptcha()).toHaveLength(CAPTCHA_LENGTH);
  });

  it("only uses the allowed alphabet (no lowercase, no 'I')", () => {
    for (let i = 0; i < 50; i++) {
      expect(generateCaptcha()).toMatch(/^[ABCDEFGHJKLMNOPQRSTUVWXYZ0-9]+$/);
    }
  });
});

describe("validateCaptcha", () => {
  it("accepts an exact match", () => {
    expect(validateCaptcha("AB12CD", "AB12CD")).toBe(true);
  });

  it("is forgiving about case and whitespace", () => {
    expect(validateCaptcha("  ab12cd ", "AB12CD")).toBe(true);
  });

  it("rejects a mismatch", () => {
    expect(validateCaptcha("AB12CD", "AB12CE")).toBe(false);
  });

  it("rejects empty and null input", () => {
    expect(validateCaptcha("", "AB12CD")).toBe(false);
    expect(validateCaptcha(null, "AB12CD")).toBe(false);
  });
});
