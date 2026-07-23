import Link from "next/link";
import styles from "./site-header.module.css";
import HeartDoodle from "@/components/heart-doodle/HeartDoodle";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.wordmark}>
          <HeartDoodle className={styles.heart} />
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
