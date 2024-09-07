/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mdxeditor/editor'],
    reactStrictMode: true,
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, topLevelAwait: true }
        // this will just update topLevelAwait property of config.experiments
        config.experiments.topLevelAwait = true
        return config
    },
    images:{
        domains: ['miro.medium.com',"example.com","localhost"], // Add the domain(s) of your external image source
      }
};

export default nextConfig;
