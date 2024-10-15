/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
    serverActions: {
      allowedForwardedHosts: [
        "localhost:4000",
        "https://kgk0h39c-4000.asse.devtunnels.ms",
      ],
      allowedOrigins: [
        "localhost:4000",
        "https://kgk0h39c-4000.asse.devtunnels.ms",
      ],
    },
  },
};

export default nextConfig;
