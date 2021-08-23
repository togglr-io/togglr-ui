<script lang="ts">
  import type { Toggle } from "../toggle";

  export let toggle: Toggle | undefined = undefined;
  export let onSubmit: (toggle: Toggle) => Promise<void>;
  let toggleData = {
    key: "",
    description: "",
  };

  function handleSubmit(_: Event) {
    const toggle: Toggle = {
      ...(toggleData as Toggle), // make typescript happy
      // hardcoded for now
      accountId: "8dc8c3cd-7c2a-4a4c-bc1e-7ba042096029",
    };

    onSubmit && onSubmit(toggle);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <label for="key">Key</label>
    <input id="key" type="text" bind:value={toggleData.key} />
  </fieldset>
  <fieldset>
    <label for="description">Description</label>
    <input id="description" type="text" bind:value={toggleData.description} />
  </fieldset>
  <button type="submit">Create</button>
  <button class="secondary" type="button">Cancel</button>
</form>

<style lang="scss">
  @import "../../scss/variables.scss";
  form {
    background-color: $foreground;
    border-radius: 5px;
  }

  label {
    display: block;
  }
</style>
