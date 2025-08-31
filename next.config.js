/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // turbo: true, // Uncomment if you want to use Turbopack
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable if you need to use environment variables on client side
  env: {
    APP_NAME: process.env.APP_NAME || 'Realtor Email Assistant',
  },
}

module.exports = nextConfig