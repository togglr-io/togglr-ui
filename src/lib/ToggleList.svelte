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
    console.log(`Setting active: ${id}`);
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
    <span>KEY</span>
    <span>DESCRIPTION</span>
    <span>LAST EVALUATED</span>
    <span>ACTIVE</span>
    <span>EDIT</span>
    <span>DELETE</span>
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
    padding: 1rem;
  }

  header {
    display: flex;
    span {
      flex: 1;
      text-align: center;
    }
  }
</style>
