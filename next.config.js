/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return ["writing", "reading"].flatMap((section) =>
      ["exploring%20attnres", "exploring attnres"].map((slug) => ({
        source: `/${section}/${slug}`,
        destination: "/writing/exploring-attnres",
        permanent: false,
      })),
    );
  },
  // Custom headers for caching static assets and images served from /public
  async headers() {
    return [
      {
        source: "/:all*.(png|jpg|jpeg|gif|webp|avif|svg)",
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
