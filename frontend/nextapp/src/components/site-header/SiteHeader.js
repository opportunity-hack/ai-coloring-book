import Link from "next/link";
import styles from "./site-header.module.css";

// Small crayon-drawn heart, the wordmark's one flourish.
function HeartDoodle() {
  return (
    <svg
      className={styles.heart}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path
        d="M12 20.5C7.5 16.6 3.2 13.2 3.1 9.1 3 6.4 5 4.4 7.4 4.5c1.8.1 3.3 1.2 4.6 3 1.3-1.8 2.8-2.9 4.6-3 2.4-.1 4.4 1.9 4.3 4.6-.1 4.1-4.4 7.5-8.9 11.4Z"
        fill="#ff8787"
        stroke="#2b2b33"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.wordmark}>
          <HeartDoodle />
          <span>Susie Q&apos;s Books</span>
        </Link>

        <div className={styles.links}>
          <Link href="/#how-it-works" className={styles.navLink}>
            How it works
          </Link>
          <Link href="/#teachers" className={styles.navLink}>
            For teachers
          </Link>
          <Link href="/sponsor" className={styles.navLink}>
            Sponsor a book
          </Link>
          <Link href="/drawings" className={styles.cta}>
            Upload a drawing
          </Link>
        </div>
      </nav>
    </header>
  );
}
