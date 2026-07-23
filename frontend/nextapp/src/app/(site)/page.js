import Link from "next/link";
import styles from "./page.module.css";
import HeroDoodle from "@/components/landing/HeroDoodle";
import JsonLd from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/data/faq";

export const metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const HOW_IT_WORKS_STEPS = [
  {
    title: "Students draw",
    body: "Any drawing, any subject — paper and markers are all it takes. There's no wrong way to draw.",
  },
  {
    title: "Upload in minutes",
    body: "Kids or teachers snap a photo and upload it here. First name only, no accounts needed.",
  },
  {
    title: "We make the book",
    body: "Every drawing is traced into a clean coloring page, and local sponsors cover the printing.",
  },
  {
    title: "Books do double duty",
    body: "Your school fundraises with the finished book, and copies go into comfort bags for children in crisis.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Turn your students&apos; drawings into a{" "}
            <span className={styles.heroHighlight}>real coloring book</span>
          </h1>
          <p className={styles.heroSubhead}>
            A free classroom project and fundraiser from the nonprofit Susie
            Q&apos;s Kids. Your students draw, we transform every drawing into a
            coloring-book page, and local sponsors cover the printing — so every
            book raises funds for your school <em>and</em> comforts a child in
            need.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/drawings" className={styles.primaryCta}>
              Start with your class
            </Link>
            <Link href="/sponsor" className={styles.secondaryCta}>
              Sponsor a book
            </Link>
          </div>
        </div>
        <HeroDoodle />
      </section>

      {/* How it works */}
      <section className={styles.section} id="how-it-works">
        <h2 className={styles.sectionTitle}>How it works</h2>
        <ol className={styles.steps}>
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className={styles.stepCard}>
              <span className={styles.stepBadge} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* For teachers */}
      <section className={styles.section} id="teachers">
        <h2 className={styles.sectionTitle}>
          For teachers: a class project with a purpose
        </h2>
        <ul className={styles.benefits}>
          <li>
            <strong>Zero cost, zero prep</strong> beyond drawing time —
            sponsors fund everything.
          </li>
          <li>
            <strong>Every student gets published</strong> in a real, printed
            book their family can hold.
          </li>
          <li>
            <strong>Art class meets service learning</strong> — kids see
            their creativity comfort another child.
          </li>
        </ul>
        <p className={styles.geoNote}>
          Now welcoming classrooms across metro Phoenix — Mesa, Chandler,
          Gilbert, Scottsdale, Tempe, Glendale, and Peoria — alongside our
          founding schools in Warren and Sterling Heights, Michigan.
        </p>
        <div className={styles.teacherCtas}>
          <Link href="/drawings" className={styles.primaryCta}>
            Start with your class
          </Link>
          <Link href="/add-school" className={styles.secondaryCta}>
            School not listed? Add it
          </Link>
        </div>
      </section>

      {/* For sponsors */}
      <section className={`${styles.section} ${styles.sponsorBand}`}>
        <h2 className={styles.sectionTitle}>
          For local businesses: be the name on every page
        </h2>
        <p className={styles.sectionBody}>
          Sponsor a book and your logo is printed in every copy — a coloring
          book created from local kids&apos; art, sold at school fundraisers and
          tucked into comfort bags across your community. Sponsorships are
          tax-deductible through the nonprofit Susie Q&apos;s Kids.
        </p>
        <Link href="/sponsor" className={styles.secondaryCta}>
          See books that need sponsors
        </Link>
      </section>

      {/* Mission */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why we do this</h2>
        <p className={styles.sectionBody}>
          Susie Q&apos;s Books is part of{" "}
          <a
            href="https://susieqskids.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Susie Q&apos;s Kids
          </a>
          . Every comfort bag we give a child in crisis includes one of these
          coloring books — along with crayons, a soft bear, a warm blanket, and
          a journal — so a hard day starts a little easier.
        </p>
      </section>

      {/* FAQ */}
      <section className={styles.section} id="faq">
        <h2 className={styles.sectionTitle}>Questions teachers ask us</h2>
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.question}</summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
