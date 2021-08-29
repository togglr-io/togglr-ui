<script lang="ts">
  import type { Toggle, SaveToggleReq } from "../toggle";
  import { getToggleApi } from "../api";
  import { toggleStore } from "../stores";
  import { relativeTime } from "../dates";

  import Icon from "./Icon.svelte";
  import UIToggle from "./UIToggle.svelte";

  export let toggle: Toggle;
  export let active: boolean;
  export let onEdit: () => void;
  export let onDelete: () => void = undefined;
  export let onCancel = () => undefined;

  const api = getToggleApi({ baseUrl: "http://localhost:9001" });

  // internal state for modifying toggle
  let toggleState: Toggle = {
    ...toggle,
    accountId: "8dc8c3cd-7c2a-4a4c-bc1e-7ba042096029",
  };

  async function saveToggle() {
    await api.saveToggle(toggleState as SaveToggleReq);
    const fetched = await api.listToggles({});
    toggleStore.update(() => fetched);
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
    <div>
      {toggle.key}
    </div>
    <div class="truncate">
      {toggle.description}
    </div>
    <div>
      {relativeTime(toggle.updatedAt)}
    </div>
    <div>
      <UIToggle onClick={toggleActive} checked={toggle.active} />
    </div>
    <div>
      <Icon onClick={onEdit} name="edit" />
    </div>
    <div>
      <Icon onClick={onDelete} name="delete" />
    </div>
  {:else}
    <form on:submit|preventDefault={saveToggle}>
      <fieldset>
        <div>
          <label for="key">KEY</label>
          <input id="key" type="text" bind:value={toggleState.key} />
        </div>
        <div>
          <label for="active">ACTIVE</label>
          <UIToggle bind:checked={toggleState.active} />
        </div>
        <div>
          <Icon name="delete" />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label for="description">DESCRIPTION</label>
          <input
            id="description"
            type="text"
            bind:value={toggleState.description}
          />
        </div>
        <div />
        <div />
      </fieldset>
      <fieldset>
        <button type="submit">Save</button>
        <button class="neutral" type="button" on:click={onCancel}>Cancel</button
        >
      </fieldset>
    </form>
  {/if}
</article>

<style lang="scss">
  article {
    display: flex;
    div {
      flex: 1;
      text-align: center;
    }
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  fieldset {
    display: flex;
    justify-content: space-between;

    div {
      flex: 1;
      padding-right: 1rem;
    }
  }

  input {
    width: 100%;
  }

  label {
    display: block;
    font-size: 0.75rem;
  }

  article {
    display: flex;
    justify-content: space-between;
  }
</style>
