// School/district choices for the upload form. The backend stores school as a
// plain string, so expanding coverage is just adding entries here.
// Michigan entries are the founding schools and must keep their exact names —
// existing drawings in the database reference these strings.
export const SCHOOL_GROUPS = [
  {
    group: "Warren & Sterling Heights, Michigan",
    items: [
      "Maurice M. Wilde Elementary School",
      "Margaret I. Susick Elementary School",
      "John H. Siersma Elementary School",
      "Pearl O. Lean Elementary School",
      "Pinewood Elementary School",
      "Briarwood Elementary School",
      "Great Oaks Academy",
      "Michigan Mathematics and Science Academy (MMSA)",
    ],
  },
  {
    group: "Phoenix",
    items: [
      "Madison Elementary School District (Phoenix)",
      "Washington Elementary School District (Phoenix)",
      "Osborn School District (Phoenix)",
      "Creighton School District (Phoenix)",
      "Roosevelt School District (Phoenix)",
      "Paradise Valley Unified School District (Phoenix)",
    ],
  },
  {
    group: "East Valley — Mesa, Chandler, Gilbert, Tempe",
    items: [
      "Mesa Public Schools (Mesa)",
      "Chandler Unified School District (Chandler)",
      "Gilbert Public Schools (Gilbert)",
      "Higley Unified School District (Gilbert)",
      "Kyrene School District (Tempe & Chandler)",
      "Tempe Elementary School District (Tempe)",
    ],
  },
  {
    group: "Scottsdale",
    items: ["Scottsdale Unified School District (Scottsdale)"],
  },
  {
    group: "West Valley — Glendale, Peoria",
    items: [
      "Glendale Elementary School District (Glendale)",
      "Deer Valley Unified School District (Phoenix & Glendale)",
      "Peoria Unified School District (Peoria)",
    ],
  },
];

export const SCHOOL_NOT_LISTED = "My school isn't listed";
