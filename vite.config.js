import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tsconfigPaths()],
  // required for routing to work during dev.
  // https://github.com/EmilTholin/svelte-routing/pull/200
  optimizeDeps: { exclude: ["svelte-routing"] },
});
