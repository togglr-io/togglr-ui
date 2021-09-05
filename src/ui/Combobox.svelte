<!-- A Combobox allows for free form text input with suggested values in a drop down -->
<script lang="ts">
  import type { ComboOption } from "src/ui/props";

  export let name: string;
  export let options: ComboOption[];
  export let onSelect: (value: string) => void = undefined;
  // strict means that the only valid values exist within the options
  export let strict: boolean = false;
  export let value: string;

  const up = "ArrowUp";
  const down = "ArrowDown";
  const enter = "Enter";
  const tab = "Tab";

  let focused = false;
  let selected = 0;

  function handleSelect(option: ComboOption) {
    return () => {
      value = option.value;
      onSelect && onSelect(option.value);
      option.onClick && option.onClick();
    };
  }

  let filteredOptions = [];

  // filter options based on the curent input value
  $: {
    filteredOptions = options.filter((opt) =>
      opt.value.toLowerCase().includes(value.toLowerCase())
    );

    // adjust selected index as filtered options changes length
    if (filteredOptions.length <= selected) {
      selected = filteredOptions.length - 1;
    }

    // create final options array with the currently selected option highlighted
    filteredOptions = filteredOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === selected,
    }));
  }

  function onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case down:
        if (selected < filteredOptions.length) {
          selected += 1;
        }
        break;
      case up:
        if (selected > 0) {
          selected -= 1;
        }
        break;
      case enter:
        e.preventDefault();
      case tab:
        handleSelect(filteredOptions[selected])();
        break;
    }
  }

  function onBlur() {
    if (strict) {
      if (!filteredOptions.some((opt) => opt.value === value)) {
        value = filteredOptions[0].value;
      }
    }

    focused = false;
  }
</script>

<div>
  <input
    type="text"
    placeholder={name}
    bind:value
    on:keydown={onKeyDown}
    on:focus={() => (focused = true)}
    on:blur={onBlur}
  />
  <ul class:hide={!focused}>
    {#each filteredOptions as opt}
      <!-- need to preventDefault on mousedown to prevent a blur event from firing and losing focus -->
      <li
        class:selected={opt.selected}
        on:mousedown|preventDefault
        on:click={handleSelect(opt)}
      >
        {opt.name || opt.value}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  @import "scss/variables.scss";

  .selected {
    background-color: $highlight;
  }

  ul {
    position: absolute;
    background-color: $background;
  }

  li {
    padding: 0.5rem;
    cursor: pointer;
  }

  li:hover {
    background-color: $highlight;
  }
</style>
