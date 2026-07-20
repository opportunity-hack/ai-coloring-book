// Grade choices for the upload form, ordered youngest-first. The backend
// stores grade as a plain string, so these labels are the canonical values.
export const GRADES = [
  "Pre-K",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
];

export const NO_GRADE_LABEL = "No grade listed";

// Sort key: known grades in GRADES order, anything unknown/missing last.
export function gradeSortIndex(grade) {
  const index = GRADES.indexOf(grade);
  return index === -1 ? GRADES.length : index;
}

// Group items by their grade, youngest grade first, ungraded last.
// getGrade extracts the grade string from an item.
export function groupByGrade(items, getGrade) {
  const groups = new Map();
  for (const item of items) {
    const grade = getGrade(item);
    const label = GRADES.includes(grade) ? grade : NO_GRADE_LABEL;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(item);
  }
  return [...groups.entries()]
    .map(([grade, groupItems]) => ({ grade, items: groupItems }))
    .sort(
      (a, b) =>
        gradeSortIndex(a.grade === NO_GRADE_LABEL ? null : a.grade) -
        gradeSortIndex(b.grade === NO_GRADE_LABEL ? null : b.grade)
    );
}
