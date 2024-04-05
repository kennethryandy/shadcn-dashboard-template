/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api-dev-minimal-v510.vercel.app",
            }
        ]
    },
    cacheMaxMemorySize: process.env.NODE_ENV === "development" ? 0 : 50 // disable caching on dev
};

export default nextConfig;
