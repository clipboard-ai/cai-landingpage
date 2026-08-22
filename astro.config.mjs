import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://getcai.app",
  trailingSlash: "always",
  redirects: {
    "/docs/usage/custom-actions/": "/docs/usage/how-it-works/#ask-ai",
  },
  integrations: [pagefind()],
});
