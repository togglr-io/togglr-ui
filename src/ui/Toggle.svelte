<script lang="ts">
  export let checked: boolean;
  export let onClick = () => undefined;
</script>

<input on:click={onClick} type="checkbox" class="toggle" bind:checked />

<style lang="scss">
  @import "../../scss/variables.scss";

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    outline: 0;
  }

  .toggle {
    height: 24px;
    width: 44px;
    border-radius: 16px;
    display: inline-block;
    position: relative;
    margin: 0;
    border: 2px solid $highlight;
    transition: all 0.2s ease;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: $primary-text;
      transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
    }
    &:checked {
      border-color: $primary;
      &:after {
        transform: translatex(20px);
      }
    }
  }
</style>
