"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  TextInput,
  Text,
  Group,
  rem,
  Image,
  Progress,
  Checkbox,
  CloseButton,
  Loader,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconHeart,
  IconConfetti,
} from "@tabler/icons-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./sponsor-wizard.module.css";
import SponsorBookSteps from "@/components/sponsor-book-steps/SponsorBookSteps";
import { getBooks, sponsorPay } from "@/lib/api";
import {
  trackSponsorCheckoutStarted,
  trackSponsorPaymentSuccess,
} from "@/lib/analytics";

const paypalClientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const parsedAmount = parseInt(
  process.env.NEXT_PUBLIC_DONATION_AMOUNT_PER_BOOK,
  10
);
const DONATION_PER_BOOK = Number.isNaN(parsedAmount) ? 10 : parsedAmount;

const STEP_NAMES = ["Choose books", "Your business", "Pay", "Done"];

const COVER_FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140"><rect width="220" height="140" fill="#fff9db"/><circle cx="60" cy="60" r="22" fill="none" stroke="#2b2b33" stroke-width="3"/><path d="M60 30v-8M60 98v-8M30 60h-8M98 60h-8M39 39l-6-6M87 87l-6-6M87 33l6-6M33 87l-6 6" stroke="#2b2b33" stroke-width="3" stroke-linecap="round"/><path d="M120 95c15-25 35-25 50 0" fill="none" stroke="#2b2b33" stroke-width="3" stroke-linecap="round"/></svg>'
  );

// Books are auto-named like "Book_20240406_230915" — show sponsors a
// friendly date-based label instead.
export function formatBookLabel(rawName) {
  const match = /^Book_(\d{4})(\d{2})(\d{2})_\d{6}$/.exec(rawName ?? "");
  if (!match) return rawName;
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3])
  );
  return `Class book · ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function BookCard({ book, onToggle }) {
  const spotsLeft = book.total_sponsors - book.current_sponsors;
  const progress =
    book.total_sponsors > 0
      ? (book.current_sponsors / book.total_sponsors) * 100
      : 0;

  return (
    <button
      type="button"
      className={`${styles.bookCard} ${book.selected ? styles.bookCardSelected : ""}`}
      onClick={() => onToggle(book.id)}
      aria-pressed={book.selected}
    >
      <Image
        src={book.url}
        alt={book.label ? `Cover of ${book.label}` : "Coloring book cover"}
        h={150}
        fit="cover"
        radius="sm"
        fallbackSrc={COVER_FALLBACK}
      />
      <div className={styles.bookCardBody}>
        <Text fw={600} size="sm" lineClamp={1}>
          {formatBookLabel(book.label)}
        </Text>
        <Text size="xs" c="dimmed">
          {book.current_sponsors} of {book.total_sponsors} sponsor spots filled
          · {spotsLeft} left
        </Text>
        <Progress value={progress} color="brand" size="sm" radius="xl" />
        <Text size="sm" fw={600} c="brand.7">
          ${DONATION_PER_BOOK} per spot
        </Text>
      </div>
      <Checkbox
        checked={book.selected}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
        className={styles.bookCheck}
      />
    </button>
  );
}

export default function SponsorWizard() {
  const [books, setBooks] = useState([]);
  const [fetchState, setFetchState] = useState("loading");
  const [active, setActive] = useState(0);
  const [sponsorName, setSponsorName] = useState("");
  const [nameError, setNameError] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [payError, setPayError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const fetchBooks = useCallback(async () => {
    setFetchState("loading");
    try {
      const response = await getBooks();
      const openBooks = response.data
        .filter((book) => book.current_sponsors !== book.total_sponsors)
        .map((book) => ({
          id: book.id,
          selected: false,
          label: book.name,
          url: book.cover_url,
          current_sponsors: book.current_sponsors || 0,
          total_sponsors: book.total_sponsors || 0,
        }));
      setBooks(openBooks);
      setFetchState("ready");
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setFetchState("error");
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  const selectedBooks = books.filter((book) => book.selected);
  const totalAmount = selectedBooks.length * DONATION_PER_BOOK;

  useEffect(() => {
    if (active === 2 && selectedBooks.length > 0) {
      trackSponsorCheckoutStarted({
        booksCount: selectedBooks.length,
        value: totalAmount,
      });
    }
    // Fire once per entry into the pay step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const toggleBook = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, selected: !book.selected } : book
      )
    );
  };

  const goToBusinessStep = () => setActive(1);

  const goToPayStep = ({ skipLogo = false } = {}) => {
    if (!sponsorName.trim()) {
      setNameError("Tell us your business or family name — it goes in the book");
      return;
    }
    if (skipLogo) setLogoFile(null);
    setNameError("");
    setPayError("");
    setActive(2);
  };

  const resetWizard = () => {
    setActive(0);
    setSponsorName("");
    setLogoFile(null);
    setNameError("");
    setPayError("");
    setReceipt(null);
    fetchBooks();
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toString(),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async () => {
      const formData = new FormData();
      if (logoFile) {
        formData.append("file", logoFile);
      }
      formData.append("books", selectedBooks.map((book) => book.id));
      formData.append("donation_amount", totalAmount.toString());
      formData.append("name", sponsorName.trim());

      try {
        await sponsorPay(formData);
        trackSponsorPaymentSuccess({
          booksCount: selectedBooks.length,
          value: totalAmount,
        });
        setReceipt({
          books: selectedBooks.map((book) => book.label),
          total: totalAmount,
        });
        setActive(3);
      } catch (error) {
        console.error("Failed to send payment confirmation:", error);
        setPayError(
          "Your PayPal payment went through, but we couldn't record it automatically. Please contact Susie Q's Kids so we can add your sponsorship by hand — you will not be charged twice."
        );
      }
    });
  };

  /* ---- step contents ---- */

  const renderChooseBooks = () => {
    if (fetchState === "loading") {
      return (
        <div className={styles.stateBox}>
          <Loader color="brand" />
          <Text c="dimmed">Finding books that need a sponsor…</Text>
        </div>
      );
    }
    if (fetchState === "error") {
      return (
        <div className={styles.stateBox}>
          <Text c="red">We couldn&apos;t load the books.</Text>
          <Button onClick={fetchBooks} variant="outline" color="dark">
            Try again
          </Button>
        </div>
      );
    }
    if (books.length === 0) {
      return (
        <div className={styles.stateBox}>
          <IconHeart size={40} color="#ff8787" fill="#ff8787" aria-hidden="true" />
          <Text fw={600} size="lg" ta="center">
            All current books are fully sponsored — thank you, Phoenix and
            Michigan!
          </Text>
          <Text c="dimmed" ta="center">
            New books are created as classrooms finish uploading. Check back
            soon.
          </Text>
        </div>
      );
    }
    return (
      <>
        <Text size="lg" ta="center" mb="md">
          Pick one or more books — ${DONATION_PER_BOOK} per sponsor spot puts
          your name and logo in every printed copy.
        </Text>
        <div className={styles.bookGrid}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} onToggle={toggleBook} />
          ))}
        </div>
        {selectedBooks.length > 0 && (
          <div className={styles.summaryBar}>
            <Text fw={600}>
              {selectedBooks.length} book{selectedBooks.length > 1 ? "s" : ""} ·
              ${totalAmount}
            </Text>
            <Button onClick={goToBusinessStep} size="md">
              Continue
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderBusinessStep = () => (
    <div className={styles.formCard}>
      <TextInput
        label="Business or sponsor name"
        description="Printed on the sponsor page of every copy"
        placeholder="e.g. Desert Bloom Dental"
        size="lg"
        radius="md"
        value={sponsorName}
        onChange={(e) => {
          setSponsorName(e.currentTarget.value);
          setNameError("");
        }}
        error={nameError}
        required
      />

      <div className={styles.logoField}>
        <Text fw={600}>Logo (optional)</Text>
        <Text size="sm" c="dimmed">
          PNG with a transparent background works best · under 1 MB
        </Text>
        {logoPreview ? (
          <div className={styles.logoPreview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoPreview} alt="Preview of your logo" />
            <div className={styles.logoPreviewMeta}>
              <Text size="sm" c="dimmed" truncate>
                {logoFile.name}
              </Text>
              <CloseButton
                aria-label="Remove this logo"
                onClick={() => setLogoFile(null)}
              />
            </div>
          </div>
        ) : (
          <Dropzone
            onDrop={(files) => {
              setLogoFile(files[0]);
              setLogoError("");
            }}
            onReject={() =>
              setLogoError("That file didn't work — use an image under 1 MB.")
            }
            maxSize={1 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            className={styles.dropzone}
          >
            <Group justify="center" gap="lg" mih={120} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload style={{ width: rem(40), height: rem(40), color: "var(--mantine-color-brand-6)" }} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX style={{ width: rem(40), height: rem(40), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto style={{ width: rem(40), height: rem(40), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
              </Dropzone.Idle>
              <Text size="sm" c="dimmed">
                Drag your logo here or click to choose a file
              </Text>
            </Group>
          </Dropzone>
        )}
        {logoError && (
          <Text c="red" size="sm">
            {logoError}
          </Text>
        )}
      </div>

      <Button size="lg" onClick={() => goToPayStep()}>
        Continue to payment
      </Button>
      <Button
        variant="subtle"
        color="gray"
        onClick={() => goToPayStep({ skipLogo: true })}
      >
        Skip the logo — name only
      </Button>
    </div>
  );

  const renderPayStep = () => (
    <div className={styles.formCard}>
      <div className={styles.orderSummary}>
        <Text fw={600} size="lg" mb="xs">
          Your sponsorship
        </Text>
        <ul className={styles.orderList}>
          {selectedBooks.map((book) => (
            <li key={book.id}>
              <span>{formatBookLabel(book.label)}</span>
              <span>${DONATION_PER_BOOK}</span>
            </li>
          ))}
        </ul>
        <div className={styles.orderTotal}>
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
        <Text size="sm" c="dimmed" mt="xs">
          Sponsoring as <strong>{sponsorName.trim()}</strong>
          {logoFile ? " with your logo" : " (name only)"} <IconConfetti size={16} aria-hidden="true" />
        </Text>
      </div>

      {payError && (
        <Text c="red" size="sm">
          {payError}
        </Text>
      )}

      <PayPalScriptProvider
        options={{ clientId: paypalClientID, components: "buttons", currency: "USD" }}
      >
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error("PayPal error:", err);
            setPayError("PayPal couldn't complete the payment. Please try again.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );

  const renderThankYou = () => (
    <div className={styles.thankYou}>
      <IconConfetti size={64} stroke={1.4} color="#12b886" aria-hidden="true" />
      <h2 className={styles.thankYouTitle}>Thank you for supporting!</h2>
      <Text className={styles.thankYouBody}>
        You sponsored {receipt?.books.length} book
        {receipt?.books.length > 1 ? "s" : ""} · ${receipt?.total} — your PayPal
        receipt is on its way. Your name{logoFile ? " and logo" : ""} will be
        printed in {receipt?.books.length > 1 ? "these books" : "this book"},
        and copies will comfort kids in your community.
      </Text>
      <div className={styles.thankYouActions}>
        <Button size="lg" onClick={resetWizard}>
          Sponsor another book
        </Button>
        <Button size="lg" variant="outline" color="dark" component={Link} href="/">
          Back to home
        </Button>
      </div>
    </div>
  );

  const stepContent = [
    renderChooseBooks,
    renderBusinessStep,
    renderPayStep,
    renderThankYou,
  ][active]();

  return (
    <div className={styles.wizard}>
      <div className={styles.stepperDesktop}>
        <SponsorBookSteps active={active} />
      </div>
      <Text className={styles.stepperMobile} fw={600} ta="center">
        Step {active + 1} of 4 — {STEP_NAMES[active]}
      </Text>

      {active > 0 && active < 3 && (
        <Button
          variant="subtle"
          color="gray"
          size="sm"
          className={styles.backButton}
          onClick={() => setActive(active - 1)}
        >
          ← Back
        </Button>
      )}

      {stepContent}
    </div>
  );
}
