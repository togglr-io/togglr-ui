<script lang="ts">
  import { onMount } from "svelte";

  import type { Toggle } from "src/toggle";
  import { getToggleApi } from "src/api";
  export let id: string = "";

  let toggle: Toggle | undefined;
  const api = getToggleApi({ baseUrl: "http://localhost:9001" });

  onMount(async () => {
    toggle = await api.fetchToggle(id);
  });
</script>

<div>
  {#if !toggle}
    <h2>Loading toggle</h2>
  {:else}
    <h2>Toggle: {toggle.key}</h2>
  {/if}
</div>
