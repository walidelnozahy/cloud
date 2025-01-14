module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_CLOUD_URL}/:path*`,
        },
        {
          source: "/public/:path*",
          destination: `${process.env.NEXT_PUBLIC_CLOUD_URL}/public/:path*`,
        },
      ],
    };
  },
};
