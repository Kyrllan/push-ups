export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/base.css"],
  modules: ["@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "Push-ups",
      short_name: "Push-ups",
      description: "Push-ups app",
      lang: "pt-BR",
      display: "standalone",
      start_url: "/",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === "document",
          handler: "NetworkFirst",
          options: {
            cacheName: "html-cache",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: ({ url }) => url.pathname.startsWith("/difficulty/"),
          handler: "NetworkFirst",
          options: {
            cacheName: "dynamic-html-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: ({ request }) =>
            ["style", "script", "worker"].includes(request.destination),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "assets-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
