<script lang="ts">
  import type { Toggle, SaveToggleReq } from "src/toggle";
  import type { ComboOption } from "src/ui/props";
  import { newRule } from "src/rule";
  import ToggleCtl from "src/ui/Toggle.svelte";
  import Icon from "src/ui/Icon.svelte";
  import Rule from "src/lib/Rule.svelte";

  export let toggle: Toggle | undefined = undefined;
  export let onSubmit: (toggle: SaveToggleReq) => Promise<void>;
  export let onCancel: () => void;
  let toggleState: Toggle = {
    ...toggle,
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

<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <div>
      <label for="key">KEY</label>
      <input id="key" type="text" bind:value={toggleState.key} />
    </div>
    <div>
      <label for="description">DESCRIPTION</label>
      <input
        id="description"
        type="text"
        bind:value={toggleState.description}
      />
    </div>
    <div>
      <label for="active">ACTIVE</label>
      <ToggleCtl bind:checked={toggleState.active} />
    </div>
    <div>
      <Icon name="delete" />
    </div>
  </fieldset>
  <fieldset>
    <button type="button" on:click={addRule}>Add Rule</button>
  </fieldset>
  {#each toggleState.rules as rule, idx}
    <fieldset>
      <Rule {rule} onDelete={deleteRule(idx)} />
    </fieldset>
  {/each}
  <fieldset>
    <button type="submit">Save</button>
    <button class="neutral" type="button" on:click={onCancel}>Cancel</button>
  </fieldset>
</form>

<style lang="scss">
  @import "../../scss/variables.scss";
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  fieldset {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
  }

  input {
    width: 100%;
  }

  label {
    display: block;
    font-size: 0.75rem;
  }
</style>
