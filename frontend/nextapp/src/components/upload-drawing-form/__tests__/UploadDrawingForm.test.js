import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import UploadDrawingForm from "@/components/upload-drawing-form/UploadDrawingForm";

const uploadDrawing = vi.fn();
vi.mock("@/lib/api", () => ({
  uploadDrawing: (...args) => uploadDrawing(...args),
}));

vi.mock("@/lib/analytics", () => ({
  trackDrawingUploadSuccess: vi.fn(),
  trackSchoolNotListed: vi.fn(),
}));

// Pin the captcha so tests can type the right letters.
vi.mock("@/lib/captcha", async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, generateCaptcha: () => "AB12CD" };
});

describe("UploadDrawingForm", () => {
  beforeEach(() => {
    uploadDrawing.mockClear();
  });

  it("blocks submission with friendly errors when the form is empty", async () => {
    render(<UploadDrawingForm />);
    await userEvent.click(
      screen.getByRole("button", { name: "Add my drawing to the book" })
    );

    expect(screen.getByText("Oops — add your drawing first!")).toBeInTheDocument();
    expect(screen.getByText("Give your drawing a name")).toBeInTheDocument();
    expect(
      screen.getByText("Pick your school so we know where your book goes")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pick your grade so your art lines up with your classmates'")
    ).toBeInTheDocument();
    expect(uploadDrawing).not.toHaveBeenCalled();
  });

  it("flags a wrong captcha answer", async () => {
    render(<UploadDrawingForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Type the letters above"),
      "WRONG1"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Add my drawing to the book" })
    );
    expect(
      screen.getByText("Those letters don't match — try once more")
    ).toBeInTheDocument();
    expect(uploadDrawing).not.toHaveBeenCalled();
  });

  it("keeps typed values when validation fails", async () => {
    render(<UploadDrawingForm />);
    const title = screen.getByPlaceholderText("e.g. My dog on the moon");
    await userEvent.type(title, "My rocket");
    await userEvent.click(
      screen.getByRole("button", { name: "Add my drawing to the book" })
    );
    expect(title).toHaveValue("My rocket");
  });
});
