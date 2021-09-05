<script lang="ts">
  import Toggle from "src/lib/Toggle.svelte";
  import type { Toggle as ToggleType } from "src/toggle";
  export let toggles: ToggleType[] = [];

  let activeId = "";
  // maybe a "hack"? Makes isActive re-evalutate for each Toggle
  // when the activeId changes
  $: isActive = (toggle: ToggleType) => {
    return toggle.id === activeId;
  };

  function setActive(id: string) {
    return () => {
      activeId = id;
    };
  }

  function onCancel() {
    activeId = "";
  }
</script>

<ul>
  <header>
    <span class="full">KEY</span>
    <span class="full">DESCRIPTION</span>
    <span class="half">LAST EVALUATED</span>
    <span class="quarter">ACTIVE</span>
    <span class="quarter">EDIT</span>
    <span class="quarter">DELETE</span>
  </header>
  {#each toggles as toggle (toggle.id)}
    <li>
      <Toggle
        {toggle}
        {onCancel}
        onEdit={setActive(toggle.id)}
        active={isActive(toggle)}
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "../../scss/variables.scss";

  li {
    background-color: $foreground;
    margin-bottom: 0.5rem;
    padding: 1rem 0;
  }

  header {
    display: flex;
    span {
      text-align: center;
    }
  }
</style>
