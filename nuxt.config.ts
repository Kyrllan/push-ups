// https://nuxt.com/docs/api/configuration/nuxt-config

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
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
