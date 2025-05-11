/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
    },
    images: {
        unoptimized: true
    },
    output: 'export',
    reactStrictMode: false
}

module.exports = nextConfig
