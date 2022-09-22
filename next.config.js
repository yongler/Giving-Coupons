const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: 'StaleWhileRevalidate'
});

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
});
