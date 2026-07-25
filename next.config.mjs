import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true
})

export default withNextra({
  // Next.js config options
  reactStrictMode: true,
  // Bundle only the files needed to run, so the Docker image stays small
  output: 'standalone'
})
