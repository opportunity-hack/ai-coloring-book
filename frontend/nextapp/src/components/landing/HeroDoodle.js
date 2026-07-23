import styles from "./hero-doodle.module.css";

// One kid-style scene drawn twice: the "drawing" (crayon colors) and the
// "coloring page" it becomes (same shapes, ink outlines only). This pair IS
// the product, so it leads the hero instead of a stock photo.
function Scene({ colored }) {
  const ink = "#2b2b33";
  const fill = (color) => (colored ? color : "#ffffff");
  return (
    <svg
      viewBox="0 0 320 240"
      className={styles.scene}
      role="img"
      aria-label={
        colored
          ? "A child's colorful drawing of a house, sun, tree, and flower"
          : "The same drawing traced into black-and-white coloring book outlines"
      }
    >
      {/* sun */}
      <g transform="rotate(-4 60 55)">
        <circle cx="60" cy="55" r="24" fill={fill("#ffd43b")} stroke={ink} strokeWidth="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <line
            key={deg}
            x1="60"
            y1="55"
            x2={60 + Math.cos((deg * Math.PI) / 180) * (34 + (i % 3) * 3)}
            y2={55 + Math.sin((deg * Math.PI) / 180) * (34 + (i % 3) * 3)}
            stroke={ink}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${deg % 2 === 0 ? 2 : -2} 60 55)`}
          />
        ))}
        <circle cx="60" cy="55" r="24" fill="none" stroke={ink} strokeWidth="3" />
      </g>

      {/* cloud */}
      <path
        d="M205 52c2-10 12-15 21-12 3-8 14-11 21-5 8-4 18 1 18 10 6 2 8 12 1 15-18 3-42 3-58 0-5-1-4-6-3-8Z"
        fill={fill("#a5d8ff")}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* house */}
      <g transform="rotate(1 155 140)">
        <rect x="112" y="120" width="96" height="76" fill={fill("#ffe8cc")} stroke={ink} strokeWidth="3" strokeLinejoin="round" rx="2" />
        <path d="M104 122 160 74l58 48Z" fill={fill("#ff8787")} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <rect x="146" y="156" width="28" height="40" fill={fill("#74c0fc")} stroke={ink} strokeWidth="3" strokeLinejoin="round" rx="2" />
        <circle cx="168" cy="177" r="2.5" fill={ink} />
        <rect x="124" y="134" width="18" height="16" fill={fill("#fff")} stroke={ink} strokeWidth="3" rx="2" />
        <path d="M124 142h18M133 134v16" stroke={ink} strokeWidth="2" />
      </g>

      {/* tree */}
      <g transform="rotate(-2 268 160)">
        <rect x="261" y="146" width="13" height="52" fill={fill("#d0a061")} stroke={ink} strokeWidth="3" rx="2" />
        <path
          d="M240 132c-6-16 6-32 20-33 2-10 20-10 24 0 14 2 24 18 17 33-4 10-16 14-30 14s-27-4-31-14Z"
          fill={fill("#8ce99a")}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* flower */}
      <g transform="rotate(3 55 175)">
        <path d="M55 200c-1-13 1-24 0-33" stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx={55 + Math.cos(((deg - 90) * Math.PI) / 180) * 11}
            cy={158 + Math.sin(((deg - 90) * Math.PI) / 180) * 11}
            rx="7"
            ry="9"
            fill={fill("#faa2c1")}
            stroke={ink}
            strokeWidth="2.5"
            transform={`rotate(${deg} ${55 + Math.cos(((deg - 90) * Math.PI) / 180) * 11} ${158 + Math.sin(((deg - 90) * Math.PI) / 180) * 11})`}
          />
        ))}
        <circle cx="55" cy="158" r="6" fill={fill("#ffd43b")} stroke={ink} strokeWidth="2.5" />
        <path d="M55 185c-6-2-10-6-11-11M55 190c5-2 9-5 10-9" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* ground squiggle */}
      <path
        d="M20 205c24-5 44 6 68 2s46-7 72-2 52 6 76 1 44-4 64-1"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function HeroDoodle() {
  return (
    <div className={styles.pair}>
      <figure className={styles.panel}>
        <Scene colored />
        <figcaption className={styles.caption}>Your student draws this</figcaption>
      </figure>

      <svg viewBox="0 0 60 40" className={styles.arrow} aria-hidden="true">
        <path
          d="M4 22c14 4 30 4 42-2m0 0-9-7m9 7-10 6"
          stroke="#2b2b33"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <figure className={styles.panel}>
        <Scene colored={false} />
        <figcaption className={styles.caption}>We make this coloring page</figcaption>
      </figure>
    </div>
  );
}
