import { writable } from "svelte/store";
import { getToggleApi } from "src/api";
import type { Toggle, ListTogglesReq } from "src/toggle";

const api = getToggleApi({ baseUrl: "http://localhost:9001" });

const defaultToggles: Toggle[] = [];
export const toggleStore = writable(defaultToggles);

const defaultSearch: ListTogglesReq = {};
export const currentSearch = writable(defaultSearch);

const defaultKeys: string[] = [];
export const keyStore = writable(defaultKeys);

export const refreshKeyStore = async () => {
  const keys = await api.fetchMetadata();
  keyStore.update(() => keys);
};

export const refreshToggleStore = async () => {
  // TODO (etate): Figure out how to pull current search here.
  const toggles = await api.listToggles({});
  toggleStore.update(() => toggles);
};
