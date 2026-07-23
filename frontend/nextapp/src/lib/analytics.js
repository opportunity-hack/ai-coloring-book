"use client";
import { sendGAEvent } from "@next/third-parties/google";

// GA only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (production), so
// these helpers no-op everywhere else.
function isEnabled() {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  );
}

export function trackEvent(name, params = {}) {
  if (!isEnabled()) return;
  sendGAEvent("event", name, params);
}

export function trackDrawingUploadSuccess({ school }) {
  trackEvent("drawing_upload_success", { school });
}

// Fired when a family picks the "my school isn't listed" escape hatch —
// this is the demand signal for expanding to new schools/areas.
export function trackSchoolNotListed(school) {
  trackEvent("school_not_listed_used", { school });
}

export function trackSponsorCheckoutStarted({ booksCount, value }) {
  trackEvent("sponsor_checkout_started", {
    books_count: booksCount,
    value,
    currency: "USD",
  });
}

export function trackSponsorPaymentSuccess({ booksCount, value }) {
  trackEvent("sponsor_payment_success", {
    books_count: booksCount,
    value,
    currency: "USD",
  });
}

export function trackBookPdfDownload({ bookId, bookName }) {
  trackEvent("book_pdf_download", { book_id: bookId, book_name: bookName });
}

export function trackCtaClick(label) {
  trackEvent("cta_click", { label });
}
