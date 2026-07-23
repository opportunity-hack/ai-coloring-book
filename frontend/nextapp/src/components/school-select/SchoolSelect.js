"use client";
import { useState } from "react";
import Link from "next/link";
import { Select, Text, TextInput } from "@mantine/core";
import { SCHOOL_GROUPS, SCHOOL_NOT_LISTED } from "@/data/schools";
import { trackSchoolNotListed } from "@/lib/analytics";

const selectData = [
  ...SCHOOL_GROUPS,
  { group: "Somewhere else?", items: [SCHOOL_NOT_LISTED] },
];

// Emits a single school string to the parent: either a listed school/district
// or whatever the family types in the escape hatch.
export default function SchoolSelect({ onChange, error, size = "lg" }) {
  const [choice, setChoice] = useState(null);
  const [customSchool, setCustomSchool] = useState("");

  const handleChoice = (value) => {
    setChoice(value);
    if (value === SCHOOL_NOT_LISTED) {
      trackSchoolNotListed("");
      onChange(customSchool.trim());
    } else {
      onChange(value ?? "");
    }
  };

  const handleCustomSchool = (event) => {
    const value = event.currentTarget.value;
    setCustomSchool(value);
    onChange(value.trim());
  };

  return (
    <>
      <Select
        label="School"
        description="Which school's book is this drawing for?"
        placeholder="Pick your school"
        size={size}
        radius="md"
        searchable
        nothingFoundMessage={`Can't find it? Choose "${SCHOOL_NOT_LISTED}"`}
        data={selectData}
        value={choice}
        onChange={handleChoice}
        error={choice === SCHOOL_NOT_LISTED ? undefined : error}
        checkIconPosition="right"
      />
      {choice === SCHOOL_NOT_LISTED && (
        <>
          <TextInput
            label="Your school and city"
            description="We use this to plan where Susie Q's Books goes next"
            placeholder="e.g. Desert Sun Elementary, Surprise, AZ"
            size={size}
            radius="md"
            value={customSchool}
            onChange={handleCustomSchool}
            error={error}
            mt="xs"
          />
          <Text size="sm" c="dimmed" mt={6}>
            Want your school to join for real?{" "}
            <Link href="/add-school">Ask us to add it</Link> — it&apos;s free.
          </Text>
        </>
      )}
    </>
  );
}
