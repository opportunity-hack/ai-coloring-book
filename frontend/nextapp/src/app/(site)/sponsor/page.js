import styles from "./page.module.css";
import SponsorWizard from "@/components/sponsor-wizard/SponsorWizard";

const donationPerBook =
  parseInt(process.env.NEXT_PUBLIC_DONATION_AMOUNT_PER_BOOK, 10) || 10;

export const metadata = {
  title: "Sponsor a Kids' Coloring Book – Phoenix & Michigan Schools",
  description: `For $${donationPerBook} a book, your business name and logo are printed in a coloring book created from local kids' art — sold at school fundraisers and tucked into comfort bags for children in crisis.`,
  alternates: { canonical: "/sponsor" },
};

export default function SponsorPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Sponsor a coloring book</h1>
        <p className={styles.valueProp}>
          For ${donationPerBook} a book, your business name and logo are
          printed in a coloring book created from local kids&apos; art — given
          to families at school fundraisers and tucked into comfort bags for
          children in crisis.
        </p>
        <ul className={styles.trustList}>
          <li>Your logo in every printed copy</li>
          <li>Community goodwill in Phoenix &amp; Michigan schools</li>
          <li>Tax-deductible through the nonprofit Susie Q&apos;s Kids</li>
        </ul>
      </header>

      <SponsorWizard />
    </div>
  );
}
