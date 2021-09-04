<script lang="ts">
  import type { Rule } from "src/rule";
  import type { ComboOption } from "src/ui/props";
  import { onDestroy } from "svelte";
  import {
    binOpFromString,
    logicOpFromString,
    getBinOps,
    getLogicOps,
  } from "src/rule";
  import Combobox from "src/ui/Combobox.svelte";
  import Icon from "src/ui/Icon.svelte";
  import { keyStore } from "src/stores";

  export let rule: Rule;
  export let onDelete: () => void;

  let keys: ComboOption[] = [];
  const unsubscribe = keyStore.subscribe((newKeys: string[]) => {
    keys = newKeys.map((value) => ({ value }));
  });

  const logicOps: ComboOption[] = getLogicOps().map((value) => ({ value }));
  const binOps: ComboOption[] = getBinOps().map((value) => ({ value }));
  const ops = binOps.concat(logicOps);

  function handleOpSelect(value: string) {
    const op = binOpFromString(value) ?? logicOpFromString(value);
    rule.expression.op = op;
  }

  onDestroy(unsubscribe);
</script>

<div>
  <div class="quarter">
    <Combobox name="Rule Op" options={logicOps} bind:value={rule.op} />
  </div>
  <div class="full">
    <Combobox
      name="Key"
      bind:value={rule.expression.left.value}
      options={keys}
    />
  </div>
  <div class="quarter">
    <Combobox
      strict
      onSelect={handleOpSelect}
      options={ops}
      name="Op"
      value={rule.expression.op}
    />
  </div>
  <Combobox
    name="Value"
    bind:value={rule.expression.right.value}
    options={[]}
  />
  <Icon name="delete" onClick={onDelete} />
</div>

<style lang="scss">
  div {
    display: flex;
  }
</style>
