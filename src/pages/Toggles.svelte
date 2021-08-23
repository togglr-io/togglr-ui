<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import type { Toggle } from "../toggle";

  import { getToggleApi } from "../api";
  import { toggleStore } from "../stores";
  import ToggleEditModal from "../lib/ToggleEditModal.svelte";
  import Card from "../lib/Card.svelte";

  let toggles: Toggle[] = [];
  let showEditModal = false;

  const api = getToggleApi({ baseUrl: "http://localhost:9001" });
  const unsubscribe = toggleStore.subscribe((newToggles: Toggle[]) => {
    toggles = newToggles;
  });

  onMount(async () => {
    await fetchToggles();
  });

  onDestroy(unsubscribe);

  function openModal() {
    showEditModal = true;
  }

  function closeModal() {
    showEditModal = true;
  }

  async function handleSubmit(toggle: Toggle) {
    await api.createToggle(toggle);
    await fetchToggles();
  }

  async function fetchToggles() {
    const fetched = await api.listToggles({});
    toggleStore.update(() => fetched);
  }
</script>

<div>
  <Card>
    <div class="container">
      {#if toggles.length === 0}
        <h2>Loading toggles...</h2>
      {:else}
        <button on:click={openModal}>Create Toggle</button>
        {#each toggles as toggle}
          <ul>
            <li>
              <a href="" on:click={() => navigate(`toggle/${toggle.id}`)}
                >{toggle.key}</a
              >
            </li>
          </ul>
        {/each}
      {/if}
    </div>
  </Card>
  <ToggleEditModal
    onSubmit={handleSubmit}
    onClose={closeModal}
    show={showEditModal}
  />
</div>
