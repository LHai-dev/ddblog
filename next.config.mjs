

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable transpiling specific packages (for MDX Editor or other ESM modules)
    transpilePackages: ['@mdxeditor/editor'],

    // Enable strict mode for React (recommended)
    reactStrictMode: true,

    // Modify webpack settings
    webpack: (config) => {
        // Override experiments if necessary (enabling top-level await)
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },

    // Remote image handling: allows loading images from specified domains
    images: {
        // New approach for defining remote image patterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ddkhdev.lol', // Your custom domain
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'miro.medium.com', // Example domain for images
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Cloudinary image hosting
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-images-1.readmedium.com',
                pathname: '/**'
            }
        ],
    },

    // MDX configuration
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
