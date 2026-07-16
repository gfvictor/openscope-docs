import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.11.7'],
}

export default withMDX(config)
