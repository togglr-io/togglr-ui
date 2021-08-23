<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { getToggleApi } from "./api";
  import type { Toggle } from "./toggle";
  import { toggleStore } from "./stores";
  import ToggleEditModal from "./lib/ToggleEditModal.svelte";
  import Nav from "./lib/Nav.svelte";
  import Card from "./lib/Card.svelte";

  let toggles: Toggle[] = [];
  let showEditModal = false;

  const api = getToggleApi({ baseUrl: "http://localhost:9001" });
  const unsubscribe = toggleStore.subscribe((newToggles: Toggle[]) => {
    console.log(newToggles);
    toggles = newToggles;
  });

  // on App mount, load initial data into the toggle store
  onMount(async () => {
    const fetchedToggles = await api.listToggles({});
    toggleStore.update(() => fetchedToggles);
  });

  onDestroy(unsubscribe);

  async function handleSubmit(toggle: Toggle) {
    await api.createToggle(toggle);
    const fetchedToggles = await api.listToggles({});
    toggleStore.update(() => fetchedToggles);
  }

  function closeModal() {
    showEditModal = false;
  }

  function openModal() {
    showEditModal = true;
  }
</script>

<main>
  <Nav />
  {#if toggles.length === 0}
    <p>Loading toggles...</p>
  {:else}
    <Card>
      <div class="container">
        <button on:click={openModal}>Create Toggle</button>
        {#each toggles as toggle}
          <p>{toggle.key}</p>
        {/each}
      </div>
    </Card>
  {/if}
  <ToggleEditModal
    onSubmit={handleSubmit}
    onClose={closeModal}
    show={showEditModal}
  />
</main>

<style global lang="scss">
  @import "../scss/main.scss";
</style>
