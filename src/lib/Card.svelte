<div>
  <slot />
</div>

<style lang="scss">
  @import "../../scss/variables.scss";

  div {
    background-color: $foreground;
    margin: 1rem;
    border-radius: 5px;
    box-shadow: 0 3px 4px $shadow;
  }
</style>
