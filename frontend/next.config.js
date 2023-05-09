/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: false,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });

        return config;
    },
    images: {
        deviceSizes: [768, 1024, 1200, 1400, 1600, 1920, 2560]
    }
};

module.exports = nextConfig;
