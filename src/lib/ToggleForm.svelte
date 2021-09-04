<script lang="ts">
  import type { Toggle, SaveToggleReq } from "src/toggle";
  import { newRule } from "src/rule";
  import ToggleCtl from "src/ui/Toggle.svelte";
  import Rule from "src/lib/Rule.svelte";

  export let toggle: Toggle | undefined = undefined;
  export let onSubmit: (toggle: SaveToggleReq) => Promise<void>;
  export let onCancel: () => void;

  let toggleState: Toggle = {
    ...toggle,
    usePercentage: toggle.usePercentage ?? false,
    rules: toggle.rules || [], // default for now
    accountId: "8dc8c3cd-7c2a-4a4c-bc1e-7ba042096029",
  };

  function handleSubmit(_: Event) {
    console.log("handling submit");
    onSubmit(toggleState);
  }

  function addRule() {
    toggleState.rules.push(newRule());
    toggleState.rules = toggleState.rules;
  }

  function deleteRule(idx: number) {
    return () => {
      toggleState.rules.splice(idx, 1);
      toggleState = toggleState;
    };
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex column  full">
  <div class="flex row full">
    <fieldset class="three-quarter">
      <div>
        <label for="key">KEY</label>
        <input id="key" type="text" bind:value={toggleState.key} />
      </div>
      <div class="flex space-between">
        <div class="full">
          <label for="active">ACTIVE</label>
          <ToggleCtl bind:checked={toggleState.active} />
        </div>
        <div class="full">
          <label for="usePercentage">PERCENTAGE</label>
          <ToggleCtl bind:checked={toggleState.usePercentage} />
        </div>
        {#if toggleState.usePercentage}
          <div class="quarter">
            <span><input min="0" max="100" type="number" />%</span>
          </div>
        {:else}
          <div class="quarter" />
        {/if}
      </div>
      <div>
        <label for="description">DESCRIPTION</label>
        <input
          id="description"
          type="text"
          bind:value={toggleState.description}
        />
      </div>
    </fieldset>
    <div class="tenth" />
    <fieldset class="flex column full">
      <button type="button" on:click={addRule}>Add Rule</button>
      {#each toggleState.rules as rule, idx}
        <div>
          <Rule {rule} onDelete={deleteRule(idx)} />
        </div>
      {/each}
    </fieldset>
  </div>
  <div class="flex row space-between full">
    <button type="submit">Save</button>
    <button class="neutral" type="button" on:click={onCancel}>Cancel</button>
  </div>
</form>

<style lang="scss">
  @import "../../scss/variables.scss";
  fieldset {
    button {
      margin-bottom: 0.5rem;
    }

    div {
      margin: 0.5rem 0;
    }
  }

  input {
    width: 100%;
  }

  label {
    display: block;
    font-size: 0.75rem;
  }
</style>
