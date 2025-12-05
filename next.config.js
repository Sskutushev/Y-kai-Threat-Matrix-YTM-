/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src'],
  },
  experimental: {
    // Опционально, если нужны абсолютные импорты в SCSS
  }
};

module.exports = nextConfig;