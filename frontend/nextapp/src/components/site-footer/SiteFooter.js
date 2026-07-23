import Link from "next/link";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <p className={styles.wordmark}>Susie Q&apos;s Books</p>
          <p>
            A project of{" "}
            <a
              href="https://susieqskids.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Susie Q&apos;s Kids
            </a>
            . Every book made here is also tucked into a comfort bag for a
            child in crisis, so a hard day starts a little easier.
          </p>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>Get involved</p>
          <ul className={styles.linkList}>
            <li>
              <Link href="/drawings">Upload a drawing</Link>
            </li>
            <li>
              <Link href="/sponsor">Sponsor a book</Link>
            </li>
            <li>
              <Link href="/#faq">Questions teachers ask us</Link>
            </li>
            <li>
              <a
                href="https://susieqskids.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Susie Q&apos;s Kids
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <p className={styles.heading}>Where we work</p>
          <p>
            Serving classrooms in Warren &amp; Sterling Heights, Michigan and
            across the greater Phoenix, Arizona area — including Mesa,
            Chandler, Gilbert, Scottsdale, Tempe, Glendale, and Peoria.
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>
          © {new Date().getFullYear()} Susie Q&apos;s Kids. Made with love and
          crayons.
        </span>
        <Link href="/admin" className={styles.adminLink}>
          Admin
        </Link>
      </div>
    </footer>
  );
}
