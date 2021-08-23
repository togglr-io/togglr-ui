<script lang="ts">
  import Modal from "./Modal.svelte";
  import Card from "./Card.svelte";
  import type { Toggle } from "../toggle";
  import ToggleForm from "./ToggleForm.svelte";

  export let toggle: Toggle | undefined = undefined;
  export let show: boolean = false;
  $: heading = !!toggle ? "Edit Toggle" : "Create Toggle";
  export let onSubmit: (toggle: Toggle) => Promise<void>;
  export let onClose: () => void;
</script>

<Modal {heading} {show} {onClose}>
  <ToggleForm {toggle} {onSubmit} />
</Modal>

<style lang="scss">
</style>
