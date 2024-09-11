// next.config.mjs
import mdx from '@next/mdx';

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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows any subdomain and domain over HTTPS
                pathname: '/**', // Allows any path
            },
        ],
    },

    // MDX configuration
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

// MDX configuration for ES modules
const withMDX = mdx({
    extension: /\.mdx?$/, // Enable .mdx extensions
});

// Exporting with MDX configuration applied
export default withMDX(nextConfig);
