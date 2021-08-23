import { writable } from "svelte/store";
import type { Toggle, ListTogglesReq } from "./toggle";

const defaultToggles: Toggle[] = [];
export const toggleStore = writable(defaultToggles);

const defaultSearch: ListTogglesReq = {};
export const currentSearch = writable(defaultSearch);
