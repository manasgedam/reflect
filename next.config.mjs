
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'reflect-xl.vercel.app',
            }
        ]
    }
};



export default nextConfig;
