
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["*"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ]
    }
};



export default nextConfig;
