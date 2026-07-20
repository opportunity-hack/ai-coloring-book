import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Susie Q's Books – turn kids' drawings into a real coloring book";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffbf3",
          color: "#2b2b33",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 24 24">
          <path
            d="M12 20.5C7.5 16.6 3.2 13.2 3.1 9.1 3 6.4 5 4.4 7.4 4.5c1.8.1 3.3 1.2 4.6 3 1.3-1.8 2.8-2.9 4.6-3 2.4-.1 4.4 1.9 4.3 4.6-.1 4.1-4.4 7.5-8.9 11.4Z"
            fill="#ff8787"
            stroke="#2b2b33"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            marginTop: 24,
            display: "flex",
          }}
        >
          Susie Q&apos;s Books
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 18,
            color: "#4a4a52",
            display: "flex",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Turn your students&apos; drawings into a real coloring book
        </div>
        <div
          style={{
            marginTop: 36,
            background: "#12b886",
            color: "#fff",
            fontSize: 28,
            fontWeight: 600,
            padding: "14px 36px",
            borderRadius: 999,
            display: "flex",
          }}
        >
          susieqsbooks.org
        </div>
      </div>
    ),
    { ...size }
  );
}
