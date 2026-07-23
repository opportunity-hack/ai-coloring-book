import styles from "./page.module.css";
import UploadDrawingForm from "@/components/upload-drawing-form/UploadDrawingForm";

export const metadata = {
  title: "Upload a Drawing – Turn Student Art into a Coloring Book Page",
  description:
    "Add a drawing to your school's coloring book in about two minutes. No accounts, first name only — every drawing becomes a real coloring-book page.",
  alternates: { canonical: "/drawings" },
};

const WHAT_HAPPENS_NEXT = [
  "Your drawing is traced into a clean black-and-white coloring page.",
  "It joins your school's book alongside your classmates' art.",
  "The printed book raises funds for your school and comforts kids in need.",
];

export default function DrawingsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Upload a drawing</h1>
        <p className={styles.reassurance}>
          Every drawing makes the book. There&apos;s no wrong way to draw.
        </p>
      </header>

      <UploadDrawingForm />

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
