"use client";
import { useState } from "react";
import Link from "next/link";
import { Alert, Button, Select, Textarea, TextInput } from "@mantine/core";
import { IconAlertCircle, IconConfetti } from "@tabler/icons-react";
import styles from "./add-school-form.module.css";
import { requestSchool } from "@/lib/api";
import { trackSchoolRequestSubmitted } from "@/lib/analytics";

const ROLE_CHOICES = ["Teacher", "Parent", "School staff", "Other"];

const STUDENT_CHOICES = [
  "Just my class (up to 30)",
  "A few classes (30–150)",
  "The whole school (150+)",
  "Not sure yet",
];

const STATE_CHOICES = [
  {
    group: "Where we work today",
    items: ["Michigan", "Arizona"],
  },
  {
    group: "Somewhere else",
    items: [
      "Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut",
      "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
      "Maryland", "Massachusetts", "Minnesota", "Mississippi", "Missouri",
      "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
      "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
      "Washington", "Washington, D.C.", "West Virginia", "Wisconsin", "Wyoming",
    ],
  },
];

export default function AddSchoolForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requesterRole, setRequesterRole] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [studentsEstimate, setStudentsEstimate] = useState(null);
  const [message, setMessage] = useState("");
  // Honeypot: hidden from people, tempting to bots.
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!requesterRole || !state) {
      setError("Please tell us who you are and which state your school is in.");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestSchool({
        name: name.trim(),
        email: email.trim(),
        requester_role: requesterRole,
        school_name: schoolName.trim(),
        city: city.trim(),
        state,
        students_estimate: studentsEstimate || "",
        message: message.trim(),
        website,
      });
      trackSchoolRequestSubmitted({ school: schoolName.trim(), state });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to send school request:", err);
      setError(
        "Something went wrong sending your request. Please try again in a minute."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <IconConfetti size={44} stroke={1.5} className={styles.successIcon} />
          <h2 className={styles.successTitle}>Request sent!</h2>
          <p className={styles.successText}>
            Thanks, {name.trim() || "friend"} — we&apos;ll email you at{" "}
            <strong>{email.trim()}</strong> once {schoolName.trim() || "your school"}{" "}
            is ready to go. Keep an eye on your inbox!
          </p>
          <div className={styles.successActions}>
            <Button component={Link} href="/" variant="light">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <TextInput
          label="Your name"
          placeholder="First and last name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className={styles.grow}
        />
        <Select
          label="I'm a…"
          placeholder="Pick one"
          data={ROLE_CHOICES}
          value={requesterRole}
          onChange={setRequesterRole}
          className={styles.grow}
        />
      </div>

      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.org"
        description="We'll only use this to follow up about your school."
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />

      <TextInput
        label="School name"
        placeholder="e.g. Desert Sun Elementary"
        required
        value={schoolName}
        onChange={(e) => setSchoolName(e.currentTarget.value)}
      />

      <div className={styles.row}>
        <TextInput
          label="City"
          placeholder="e.g. Surprise"
          required
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          className={styles.grow}
        />
        <Select
          label="State"
          placeholder="Pick a state"
          data={STATE_CHOICES}
          value={state}
          onChange={setState}
          searchable
          className={styles.grow}
        />
      </div>

      <Select
        label="About how many students might join?"
        placeholder="Your best guess is fine"
        data={STUDENT_CHOICES}
        value={studentsEstimate}
        onChange={setStudentsEstimate}
      />

      <Textarea
        label="Anything else we should know?"
        placeholder="Timing, a fundraiser you have in mind, questions — anything!"
        autosize
        minRows={2}
        maxRows={5}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.currentTarget.value)}
          />
        </label>
      </div>

      {error && (
        <Alert color="red" variant="light" icon={<IconAlertCircle size={16} />}>
          {error}
        </Alert>
      )}

      <Button type="submit" size="md" fullWidth loading={isSubmitting}>
        Send request
      </Button>
    </form>
  );
}
