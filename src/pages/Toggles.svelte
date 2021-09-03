<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import type { Toggle } from "../toggle";
  import { newToggle } from "../toggle";

  import { getToggleApi } from "../api";
  import { toggleStore, keyStore } from "../stores";
  import ToggleList from "../lib/ToggleList.svelte";

  let toggles: Toggle[] = [];

  const api = getToggleApi({ baseUrl: "http://localhost:9001" });
  const unsubscribe = toggleStore.subscribe((newToggles: Toggle[]) => {
    toggles = newToggles;
  });

  onMount(async () => {
    await fetchToggles();
    await fetchKeys();
  });

  onDestroy(unsubscribe);

  function addToggle() {
    toggles.unshift(newToggle());
    toggles = toggles;
  }

  async function fetchToggles() {
    const fetched = await api.listToggles({});
    toggleStore.update(() => fetched);
  }

  async function fetchKeys() {
    const fetched = await api.fetchMetadata();
    keyStore.update(() => fetched);
  }

  $: canCreate = toggles.every((toggle) => toggle.id);
</script>

<div>
  <div class="container">
    <div class="title">
      <h2>Toggles</h2>
      <button on:click={addToggle} disabled={!canCreate}>Create Toggle</button>
    </div>
    {#if toggles.length === 0}
      <h2>Loading toggles...</h2>
    {:else}
      <ToggleList {toggles} />
    {/if}
  </div>
</div>

<style lang="scss">
  .title {
    display: flex;
    justify-content: space-between;
    margin: 0 0 1rem 0;
  }
</style>
