import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import SchoolSelect from "@/components/school-select/SchoolSelect";
import { SCHOOL_NOT_LISTED } from "@/data/schools";

vi.mock("@/lib/analytics", () => ({
  trackSchoolNotListed: vi.fn(),
}));

describe("SchoolSelect", () => {
  it("offers Michigan and Phoenix-area choices", async () => {
    render(<SchoolSelect onChange={() => {}} />);
    await userEvent.click(screen.getByPlaceholderText("Pick your school"));
    expect(
      await screen.findByText("Maurice M. Wilde Elementary School")
    ).toBeInTheDocument();
    expect(screen.getByText("Mesa Public Schools (Mesa)")).toBeInTheDocument();
    expect(
      screen.getByText("Peoria Unified School District (Peoria)")
    ).toBeInTheDocument();
  });

  it("emits the picked school", async () => {
    const onChange = vi.fn();
    render(<SchoolSelect onChange={onChange} />);
    await userEvent.click(screen.getByPlaceholderText("Pick your school"));
    await userEvent.click(
      await screen.findByText("Chandler Unified School District (Chandler)")
    );
    expect(onChange).toHaveBeenLastCalledWith(
      "Chandler Unified School District (Chandler)"
    );
  });

  it("reveals a free-text input when the school isn't listed", async () => {
    const onChange = vi.fn();
    render(<SchoolSelect onChange={onChange} />);
    await userEvent.click(screen.getByPlaceholderText("Pick your school"));
    await userEvent.click(await screen.findByText(SCHOOL_NOT_LISTED));

    const custom = await screen.findByPlaceholderText(
      "e.g. Desert Sun Elementary, Surprise, AZ"
    );
    await userEvent.type(custom, "Desert Sun Elementary");
    expect(onChange).toHaveBeenLastCalledWith("Desert Sun Elementary");
  });
});
