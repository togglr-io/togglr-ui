import dayjs, { Dayjs } from "dayjs";
import type { Rule } from "src/rule";

export interface ID {
  id: string;
}

export interface ListTogglesReq {}

export interface Toggle {
  id: string;
  accountId: string;
  key: string;
  description: string;
  active: boolean;
  rules: Rule[];
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export interface SaveToggleReq {
  id?: string;
  key?: string;
  description?: string;
  active?: boolean;
}

export function newToggle(): Toggle {
  return {
    id: "",
    accountId: "",
    key: "",
    description: "",
    active: true,
    rules: [],
    createdAt: dayjs(),
    updatedAt: dayjs(),
  };
}
