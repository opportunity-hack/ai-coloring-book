/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Book covers and drawings are served from public S3 buckets.
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.us-east-2.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.us-east-1.amazonaws.com" },
    ],
  },
};

export default nextConfig;
