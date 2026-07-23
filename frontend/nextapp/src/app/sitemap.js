export default function sitemap() {
  const base = "https://susieqsbooks.org";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/drawings`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sponsor`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/add-school`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
