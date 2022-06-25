// eslint-disable-next-line no-undef
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com',
      'niftables-qa-collection-bucket.s3.eu-central-1.amazonaws.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
