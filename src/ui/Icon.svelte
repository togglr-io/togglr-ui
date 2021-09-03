<script lang="ts">
  export let name: string;
  export let onClick: () => void | undefined = undefined;
</script>

<span class:clickable={!!onClick} class="material-icons" on:click={onClick}
  >{name}</span
>

<style lang="scss">
  span {
    display: inline;
  }
</style>
