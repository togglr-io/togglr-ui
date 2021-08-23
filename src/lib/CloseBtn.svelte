<script lang="ts">
  export let onClick: () => void;
</script>

<a href="#" on:click={onClick}>X</a>

<style lang="scss">
  @import "../../scss/variables";

  a {
    font-weight: 600;
  }

  a:hover {
    color: $shadow;
  }
</style>
