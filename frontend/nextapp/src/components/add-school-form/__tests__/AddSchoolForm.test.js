import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test-utils/render";
import AddSchoolForm from "@/components/add-school-form/AddSchoolForm";

const requestSchool = vi.fn();
vi.mock("@/lib/api", () => ({
  requestSchool: (...args) => requestSchool(...args),
}));

const trackSchoolRequestSubmitted = vi.fn();
vi.mock("@/lib/analytics", () => ({
  trackSchoolRequestSubmitted: (...args) => trackSchoolRequestSubmitted(...args),
}));

async function fillRequiredFields() {
  await userEvent.type(
    screen.getByPlaceholderText("First and last name"),
    "Pat Teacher"
  );
  await userEvent.click(screen.getByPlaceholderText("Pick one"));
  await userEvent.click(screen.getByRole("option", { name: "Teacher" }));
  await userEvent.type(
    screen.getByPlaceholderText("you@example.org"),
    "pat@school.org"
  );
  await userEvent.type(
    screen.getByPlaceholderText("e.g. Desert Sun Elementary"),
    "Desert Sun Elementary"
  );
  await userEvent.type(screen.getByPlaceholderText("e.g. Surprise"), "Surprise");
  await userEvent.click(screen.getByPlaceholderText("Pick a state"));
  await userEvent.click(screen.getByRole("option", { name: "Arizona" }));
}

describe("AddSchoolForm", () => {
  beforeEach(() => {
    requestSchool.mockClear();
    trackSchoolRequestSubmitted.mockClear();
  });

  it("requires the role and state selects before sending", async () => {
    render(<AddSchoolForm />);
    await userEvent.type(
      screen.getByPlaceholderText("First and last name"),
      "Pat Teacher"
    );
    await userEvent.type(
      screen.getByPlaceholderText("you@example.org"),
      "pat@school.org"
    );
    await userEvent.type(
      screen.getByPlaceholderText("e.g. Desert Sun Elementary"),
      "Desert Sun Elementary"
    );
    await userEvent.type(screen.getByPlaceholderText("e.g. Surprise"), "Surprise");
    await userEvent.click(screen.getByRole("button", { name: "Send request" }));

    expect(
      screen.getByText(
        "Please tell us who you are and which state your school is in."
      )
    ).toBeInTheDocument();
    expect(requestSchool).not.toHaveBeenCalled();
  });

  it("submits the request and shows the success state", async () => {
    requestSchool.mockResolvedValue({ data: { success: true } });
    render(<AddSchoolForm />);
    await fillRequiredFields();
    await userEvent.click(screen.getByRole("button", { name: "Send request" }));

    expect(requestSchool).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Pat Teacher",
        email: "pat@school.org",
        requester_role: "Teacher",
        school_name: "Desert Sun Elementary",
        city: "Surprise",
        state: "Arizona",
        website: "",
      })
    );
    expect(trackSchoolRequestSubmitted).toHaveBeenCalledWith({
      school: "Desert Sun Elementary",
      state: "Arizona",
    });
    expect(await screen.findByText("Request sent!")).toBeInTheDocument();
  });

  it("shows a friendly error when the request fails", async () => {
    requestSchool.mockRejectedValue(new Error("boom"));
    render(<AddSchoolForm />);
    await fillRequiredFields();
    await userEvent.click(screen.getByRole("button", { name: "Send request" }));

    expect(
      await screen.findByText(
        "Something went wrong sending your request. Please try again in a minute."
      )
    ).toBeInTheDocument();
    expect(trackSchoolRequestSubmitted).not.toHaveBeenCalled();
  });
});
