module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://project-api.gpapadop.eu/api/:path*',
      },
      {
        source: '/api-docs',
        destination: 'https://project-api.gpapadop.eu/docs',
      }
    ]
  }
};
