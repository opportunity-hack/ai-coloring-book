import styles from "./page.module.css";
import AddSchoolForm from "@/components/add-school-form/AddSchoolForm";

export const metadata = {
  title: "Add Your School – Bring the Coloring Book Project to Your Classroom",
  description:
    "Don't see your school on our list? Tell us about it and we'll set it up — the project is free for schools, funded by local sponsors.",
  alternates: { canonical: "/add-school" },
};

const WHAT_HAPPENS_NEXT = [
  "We email you back to say hello and confirm the details — usually within a few days.",
  "Your school appears in the upload list, ready for your students' drawings.",
  "Your classroom draws, sponsors fund the printing, and your school gets its own coloring book.",
];

export default function AddSchoolPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Add your school</h1>
        <p className={styles.reassurance}>
          Not on our list yet? Tell us about your school — joining is free, and
          every classroom that joins gets its own coloring book.
        </p>
      </header>

      <AddSchoolForm />

      <section className={styles.nextSteps} aria-label="What happens next">
        <h2 className={styles.nextTitle}>What happens next</h2>
        <ol className={styles.nextList}>
          {WHAT_HAPPENS_NEXT.map((step, index) => (
            <li key={step}>
              <span className={styles.nextBadge} aria-hidden="true">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
