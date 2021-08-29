import dayjs, { Dayjs } from "dayjs";

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
    createdAt: dayjs(),
    updatedAt: dayjs(),
  };
}
