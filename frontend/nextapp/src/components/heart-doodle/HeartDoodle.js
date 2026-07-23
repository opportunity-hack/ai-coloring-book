// Small crayon-drawn heart, the wordmark's one flourish. Shared between the
// public site header and the admin pages so the brand reads the same everywhere.
export default function HeartDoodle({ size = 22, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
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
