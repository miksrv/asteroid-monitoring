/** @type {import('next').NextConfig} */
const nextConfig = {
    // unoptimized - When true, the source image will be served as-is instead of changing quality,
    // size, or format. Defaults to false.
    images: {
        unoptimized: true
    },
    output: 'export'
}

module.exports = nextConfig
