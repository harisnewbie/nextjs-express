/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "felicity-uploads.s3.ap-south-1.amazonaws.com",
                port: "",
                pathname: "**"
            }
        ]
    }
}

module.exports = nextConfig
