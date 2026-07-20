import { describe, it, expect } from "vitest";
import { GRADES, NO_GRADE_LABEL, gradeSortIndex, groupByGrade } from "@/data/grades";

describe("gradeSortIndex", () => {
  it("orders grades youngest first", () => {
    expect(gradeSortIndex("Pre-K")).toBeLessThan(gradeSortIndex("Kindergarten"));
    expect(gradeSortIndex("Kindergarten")).toBeLessThan(gradeSortIndex("1st Grade"));
    expect(gradeSortIndex("3rd Grade")).toBeLessThan(gradeSortIndex("8th Grade"));
  });

  it("puts unknown or missing grades last", () => {
    expect(gradeSortIndex(null)).toBeGreaterThan(gradeSortIndex("8th Grade"));
    expect(gradeSortIndex("banana")).toBeGreaterThan(gradeSortIndex("8th Grade"));
  });
});

describe("groupByGrade", () => {
  const drawings = [
    { id: 1, grade: "3rd Grade" },
    { id: 2, grade: null },
    { id: 3, grade: "Kindergarten" },
    { id: 4, grade: "3rd Grade" },
    { id: 5, grade: "Pre-K" },
  ];

  it("groups drawings and orders groups youngest grade first, ungraded last", () => {
    const groups = groupByGrade(drawings, (d) => d.grade);
    expect(groups.map((g) => g.grade)).toEqual([
      "Pre-K",
      "Kindergarten",
      "3rd Grade",
      NO_GRADE_LABEL,
    ]);
    expect(groups[2].items.map((d) => d.id)).toEqual([1, 4]);
  });

  it("keeps every item exactly once", () => {
    const groups = groupByGrade(drawings, (d) => d.grade);
    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(drawings.length);
  });

  it("covers Pre-K through 8th grade in the choices", () => {
    expect(GRADES[0]).toBe("Pre-K");
    expect(GRADES[GRADES.length - 1]).toBe("8th Grade");
    expect(GRADES).toHaveLength(10);
  });
});
