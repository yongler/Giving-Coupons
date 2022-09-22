const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: ({ request, url }) => true,
      handler: "StaleWhileRevalidate",
      options: {},
    },
  ],
})

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
})
