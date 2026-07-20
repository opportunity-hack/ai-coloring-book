import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import Captcha from "@/components/captcha/Captcha";

describe("Captcha", () => {
  it("shows each character of the code", () => {
    render(
      <Captcha value="" onChange={() => {}} captchaValue="AB12" onRefresh={() => {}} />
    );
    for (const char of ["A", "B", "1", "2"]) {
      expect(screen.getByText(char)).toBeInTheDocument();
    }
  });

  it("propagates typed input", async () => {
    const onChange = vi.fn();
    render(
      <Captcha value="" onChange={onChange} captchaValue="AB12" onRefresh={() => {}} />
    );
    await userEvent.type(screen.getByPlaceholderText("Type the letters above"), "A");
    expect(onChange).toHaveBeenCalled();
  });

  it("requests new letters via the refresh button", async () => {
    const onRefresh = vi.fn();
    render(
      <Captcha value="" onChange={() => {}} captchaValue="AB12" onRefresh={onRefresh} />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Show me different letters" })
    );
    expect(onRefresh).toHaveBeenCalled();
  });
});
