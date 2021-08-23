<script lang="ts">
  import Card from "./Card.svelte";
  import CloseBtn from "./CloseBtn.svelte";

  export let show: boolean;
  export let heading: string | undefined = undefined;
  export let onClose: () => void;
</script>

<div class:hide={!show} class="modal">
  <div class="modal-content">
    <Card>
      <div class="container">
        <div class="topbar">
          {#if !!heading}
            <div class="heading">
              <h2>{heading}</h2>
            </div>
          {/if}
          <div class="escape">
            <CloseBtn onClick={onClose} />
          </div>
        </div>

        <slot />
      </div>
    </Card>
  </div>
</div>

<style lang="scss">
  @import "../../scss/variables";
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: $shadow;

    .modal-content {
      width: 75%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .hide {
    visibility: hidden;
    opacity: 0;
  }

  .topbar {
    display: flex;
  }

  .escape {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  .heading {
    margin: 0 0 1rem 0;
  }
</style>
