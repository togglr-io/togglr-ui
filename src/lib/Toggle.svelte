<script lang="ts">
  import type { Toggle, SaveToggleReq } from "src/toggle";
  import { getToggleApi } from "src/api";
  import { refreshToggleStore, refreshKeyStore } from "src/stores";
  import { relativeTime } from "src/dates";

  import Icon from "src/ui/Icon.svelte";
  import ToggleCtl from "src/ui/Toggle.svelte";
  import ToggleForm from "src/lib/ToggleForm.svelte";

  export let toggle: Toggle;
  export let active: boolean;
  export let onEdit: () => void;
  export let onDelete: () => void = undefined;
  export let onCancel: () => void = undefined;

  const api = getToggleApi({ baseUrl: "http://localhost:9001" });

  async function saveToggle(toggle: SaveToggleReq) {
    console.log("saving toggle");
    await api.saveToggle(toggle);
    refreshKeyStore();
    refreshToggleStore();
    onCancel && onCancel();
  }

  async function toggleActive() {
    toggle.active = !toggle.active;
    const payload = {
      id: toggle.id,
      active: toggle.active,
    };
    await api.saveToggle(payload);
  }
</script>

<article>
  {#if !active}
    <div class="whole">
      {toggle.key}
    </div>
    <div class="truncate whole">
      {toggle.description}
    </div>
    <div class="half">
      {relativeTime(toggle.updatedAt)}
    </div>
    <div class="quarter">
      <ToggleCtl onClick={toggleActive} checked={toggle.active} />
    </div>
    <div class="quarter">
      <Icon onClick={onEdit} name="edit" />
    </div>
    <div class="quarter">
      <Icon onClick={onDelete} name="delete" />
    </div>
  {:else}
    <ToggleForm onSubmit={saveToggle} {onCancel} {toggle} />
  {/if}
</article>

<style lang="scss">
  article {
    display: flex;
    div {
      text-align: center;
    }
  }

  article {
    display: flex;
    justify-content: space-between;
  }
</style>
