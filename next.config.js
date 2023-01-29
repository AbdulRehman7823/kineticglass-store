/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "media.istockphoto.com",
      "upload.wikimedia.org",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig
