/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Custom headers for caching static assets and images served from /public
  async headers() {
    return [
      {
        source: "/:all*.(png|jpg|jpeg|gif|webp|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
