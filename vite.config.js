import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // required for routing to work during dev.
  // https://github.com/EmilTholin/svelte-routing/pull/200
  optimizeDeps: { exclude: ["svelte-routing"] },
});
